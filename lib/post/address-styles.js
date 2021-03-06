'use strict';

/**
 * Exposes a post function to add a property denoting which address styles are in a feature
 * @param {Object} feat     GeoJSON Feature to apply address styles prop to
 * @return {Object}         Output GeoJSON feature to write to output
 */
function post(feat) {
    if (!feat) return feat;

    if (feat.properties.address_props) throw new Error('address-styles must be run after the props post script');

    const styles = new Set();

    if (feat.properties['carmen:address_style']) {
        styles.add(feat.properties['carmen:address_style']);
    } else {
        styles.add('standard');
    }

    if (feat.properties['carmen:addressprops'] && feat.properties['carmen:addressprops']['carmen:address_style']) {
        Object.values(feat.properties['carmen:addressprops']['carmen:address_style'])
            .forEach((val) => {
                if (val === null || val === undefined) {
                    styles.add('standard');
                } else {
                    styles.add(val);
                }
            });
    }

    // if only standard was applied, then this feature has no style-related properties
    if (styles.size === 1 && styles.has('standard')) return feat;

    feat.properties['carmen:address_styles'] = Array.from(styles);

    return feat;
}

module.exports.post = post;
