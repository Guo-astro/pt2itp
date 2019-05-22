use std::collections::HashMap;
use crate::{Context, text};
use crate::Tokenized;
use geocoder_abbreviations::TokenType;

///
/// InputName is only used internally to serialize a names array to the
/// Names type. It should not be used unless as an intermediary into or out of the Names type
///
#[derive(Serialize, Deserialize, Debug, PartialEq)]
pub struct InputName {
    /// Street Name
    pub display: String,

    /// When choosing which street name is primary, order by priority
    pub priority: i8
}

impl From<Name> for InputName {
    fn from(name: Name) -> Self {
        InputName {
            display: name.display,
            priority: name.priority
        }
    }
}

#[derive(Serialize, Deserialize, Debug, PartialEq)]
pub struct Names {
    pub names: Vec<Name>
}

impl Names {
    pub fn new(mut names: Vec<Name>, context: &Context) -> Self {
        let mut synonyms: Vec<Name> = Vec::new();

        if context.country == String::from("US") {
            for name in names.iter_mut() {
                name.display = text::str_remove_octo(&name.display);

                synonyms.append(&mut text::syn_number_suffix(&name, &context));
                synonyms.append(&mut text::syn_written_numeric(&name, &context));
                synonyms.append(&mut text::syn_state_hwy(&name, &context));
                synonyms.append(&mut text::syn_us_hwy(&name, &context));
                synonyms.append(&mut text::syn_us_cr(&name, &context));
            }
        } else if context.country == String::from("CA") {
            for name in names.iter_mut() {
                name.display = text::str_remove_octo(&name.display);

                synonyms.append(&mut text::syn_ca_hwy(&name, &context));

                if context.region.is_some() && context.region.as_ref().unwrap() == "QC" {
                    synonyms.append(&mut text::syn_ca_french(&name, &context));
                }
            }
        }

        for synonym in synonyms.iter_mut() {
            synonym.source = String::from("generated");
        }

        names.append(&mut synonyms);

        Names {
            names: names
        }
    }

    ///
    /// Parse a Names object from a serde_json value, returning
    /// an empty names vec if unparseable
    ///
    pub fn from_value(value: Option<serde_json::Value>, context: &Context) -> Result<Self, String> {
        let names: Vec<Name> = match value {
            Some(street) => {
                if street.is_string() {
                    vec![Name::new(street.as_str().unwrap().to_string(), 0, &context)]
                } else {
                    let names: Vec<InputName> = match serde_json::from_value(street) {
                        Ok(street) => street,
                        Err(err) => { return Err(format!("Invalid Street Property: {}", err)); }
                    };

                    let names: Vec<Name> = names.iter().map(|name| {
                        Name::new(name.display.clone(), name.priority, &context)
                    }).collect();

                    names
                }
            },
            None => Vec::new()
        };

        Ok(Names::new(names, &context))
    }

    ///
    /// Take a second names object and add any synonyms that do not
    /// already exist on the original names object based on the
    /// tokenized version of the string.
    ///
    pub fn concat(&mut self, new_names: Names) {
        self.names.extend(new_names.names);
        self.dedupe();
    }

    ///
    /// Dedupe a names object based on the tokenized
    /// version of each name
    ///
    pub fn dedupe(&mut self) {
        let mut tokenized: HashMap<String, _> = HashMap::new();

        let mut old_names = Vec::with_capacity(self.names.len());

        loop {
            match self.names.pop() {
                Some(name) => old_names.push(name),
                None => {
                    break;
                }
            }
        }

        for name in old_names {
            if tokenized.contains_key(&name.tokenized_string()) {
                continue;
            }

            tokenized.insert(name.tokenized_string(), true);
            self.names.push(name);
        }
    }

    ///
    /// Sort names object by priority
    ///
    pub fn sort(&mut self) {
        self.names.sort_by(|a, b| {
            if a.priority > b.priority {
                std::cmp::Ordering::Less
            } else if a.priority < b.priority {
                std::cmp::Ordering::Greater
            } else {
                std::cmp::Ordering::Equal
            }
        });
    }

    ///
    /// Set the source on all the given names
    ///
    pub fn set_source(&mut self, source: String) {
        for name in self.names.iter_mut() {
            name.source = source.clone();
        }
    }
}

#[derive(Serialize, Deserialize, Debug, PartialEq)]
pub struct Name {
    /// Street Name
    pub display: String,

    /// When choosing which street name is primary, order by priority
    pub priority: i8,

    /// Geometry Type of a given name (network/address/generated)
    pub source: String,

    /// full token structure tokenless is derived from
    pub tokenized: Vec<Tokenized>,

    /// Frequency of the given name
    pub freq: i64
}

impl Name {
    /// Returns a representation of a street name
    ///
    /// # Arguments
    ///
    /// * `display` - A string containing the street name (Main St)
    ///
    /// ```
    pub fn new(display: impl ToString, priority: i8, context: &Context) -> Self {
        let mut display = display.to_string();

        let tokenized = context.tokens.process(&display);

        display = display
            .replace(r#"""#, "")
            .replace("\t", "")
            .replace("\n", "");

        Name {
            display: display,
            priority: priority,
            source: String::from(""),
            tokenized: tokenized,
            freq: 1
        }
    }

    pub fn tokenized_string(&self) -> String {
        let tokens: Vec<String> = self.tokenized
            .iter()
            .map(|x| x.token.to_owned())
            .collect();
        let tokenized = String::from(tokens.join(" ").trim());

        tokenized
    }

    pub fn tokenless_string(&self) -> String {
        let tokens: Vec<String> = self.tokenized
            .iter()
            .filter(|x| x.token_type.is_none())
            .map(|x| x.token.to_owned())
            .collect();
        let tokenless = String::from(tokens.join(" ").trim());

        tokenless
    }

    pub fn has_type(&self, token_type: Option<TokenType>) -> bool {
        let tokens: Vec<&Tokenized> = self.tokenized
            .iter()
            .filter(|x| x.token_type == token_type)
            .collect();

        tokens.len() > 0
    }

}

#[cfg(test)]
mod tests {
    use serde_json::json;
    use super::*;
    use std::collections::HashMap;
    use crate::Tokens;

    #[test]
    fn test_name() {
        let context = Context::new(String::from("us"), None, Tokens::new(HashMap::new()));

        assert_eq!(Name::new(String::from("Main St NW"), 0, &context), Name {
            display: String::from("Main St NW"),
            priority: 0,
            source: String::from(""),
            tokenized: vec![
                Tokenized::new(String::from("main"), None),
                Tokenized::new(String::from("st"), None),
                Tokenized::new(String::from("nw"), None)],
            freq: 1
        });
    }

    #[test]
    fn test_names_sort() {
        let context = Context::new(String::from("us"), None, Tokens::new(HashMap::new()));

        let mut names = Names::new(vec![
            Name::new(String::from("Highway 123"), -1, &context),
            Name::new(String::from("Route 123"), 2, &context),
            Name::new(String::from("Test 123"), 0, &context)
        ], &context);

        names.sort();

        let names_sorted = Names::new(vec![
            Name::new(String::from("Route 123"), 2, &context),
            Name::new(String::from("Test 123"), 0, &context),
            Name::new(String::from("Highway 123"), -1, &context)
        ], &context);

        assert_eq!(names, names_sorted);
    }

    #[test]
    fn test_names_concat() {
        let context = Context::new(String::from("us"), None, Tokens::new(HashMap::new()));

        let mut names = Names::new(vec![
            Name::new(String::from("Highway 123"), -1, &context),
        ], &context);

        let names2 = Names::new(vec![
            Name::new(String::from("Highway 123"), -1, &context),
            Name::new(String::from("Highway 123"), -1, &context),
        ], &context);

        names.concat(names2);

        let names_concat = Names::new(vec![
            Name::new(String::from("Highway 123"), -1, &context),
        ], &context);

        assert_eq!(names, names_concat);
    }

    #[test]
    fn test_names_dedupe() {
        let context = Context::new(String::from("us"), None, Tokens::new(HashMap::new()));

        let mut names = Names::new(vec![
            Name::new(String::from("Highway 123"), -1, &context),
            Name::new(String::from("Highway 123"), -1, &context),
        ], &context);

        names.dedupe();

        let names_deduped = Names::new(vec![
            Name::new(String::from("Highway 123"), -1, &context),
        ], &context);

        assert_eq!(names, names_deduped);
    }

    #[test]
    fn test_names_from_value() {
        let context = Context::new(String::from("us"), None, Tokens::new(HashMap::new()));

        let expected = Names::new(vec![Name::new(String::from("Main St NE"), 0, &context)], &context);

        assert_eq!(Names::from_value(Some(json!("Main St NE")), &context).unwrap(), expected);

        assert_eq!(Names::from_value(Some(json!([{
            "display": "Main St NE",
            "priority": 0
        }])), &context).unwrap(), expected);
    }

    #[test]
    fn test_names() {
        let context = Context::new(String::from("us"), None, Tokens::new(HashMap::new()));

        assert_eq!(Names::new(vec![], &context), Names {
            names: Vec::new()
        });

        assert_eq!(Names::new(vec![Name::new(String::from("Main St NW"), 0, &context)], &context), Names {
            names: vec![Name::new(String::from("Main St NW"), 0, &context)]
        });
    }
}
