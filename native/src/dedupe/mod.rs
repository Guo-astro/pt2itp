use std::convert::From;
use postgres::{Connection, TlsMode};

use neon::prelude::*;

use super::stream::GeoStream;
use super::stream::AddrStream;
use super::stream::NetStream;
use super::pg;

#[derive(Serialize, Deserialize, Debug)]
struct DedupeArgs {
    db: String,
    input: Option<String>,
    output: Option<String>,
    tokens: Option<String>,
    hecate: Option<bool>
}

impl DedupeArgs {
    pub fn new() -> Self {
        DedupeArgs {
            db: String::from("dedupe"),
            input: None,
            output: None,
            tokens: None,
            hecate: None
        }
    }
}

pub fn dedupe(mut cx: FunctionContext) -> JsResult<JsBoolean> {
    let args: DedupeArgs = match cx.argument_opt(0) {
        None => DedupeArgs::new(),
        Some(arg) => {
            if arg.is_a::<JsUndefined>() || arg.is_a::<JsNull>() {
                DedupeArgs::new()
            } else {
                let arg_val = cx.argument::<JsValue>(0)?;
                neon_serde::from_value(&mut cx, arg_val)?
            }
        }
    };

    let conn = Connection::connect(format!("postgres://postgres@localhost:5432/{}", &args.db).as_str(), TlsMode::None).unwrap();

    pg::Table::address(&conn);
    let addresses = AddrStream::from(GeoStream::new(args.input));
    pg::addrstream(&conn, addresses);

    /*
    pg::Table::network(&conn);
    let networks = NetStream::from(GeoStream::new(args.input));
    pg::netstream(&conn, networks);
    */


    Ok(cx.boolean(true))
}
