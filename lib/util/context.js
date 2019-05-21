'use strict';

/**
 * @class Context
 *
 * Provides a small helper library to generate a standard
 * context object from given input args
 */
class Context {
    /*
     * return a new validated context instance
     */
    constructor(args) {
        this.country = '';
        this.region = '';
        this.languages = [];

        if (args.country) this.country = args.country;
        if (args.region) this.region = args.region;

        if (args.languages) {
            if (typeof args.languages === 'string') {
                this.languages = args.languages.split(',');
            } else if (Array.isArray(args.languages)) {
                this.langauges = args.languages;
            }
        }

        if (this.country && this.country.length !== 2) {
            throw new Error('context.country length must be ISO-3166 code');
        }
    }

    /**
     * Return JSON representation of Context Object
     */
    as_json() {
        return {
            country: this.country,
            region: this.region,
            languages: this.languages
        };
    }

    /**
     * extent a minimist instance to include the arguments
     * necessary for context input
     */
    static args(minimist) {
        if (!minimist) minimist = {};

        if (!minimist.string) minimist.string = [];
        if (!minimist.alias) minimist.string = {};

        if (!minimist.string.contains('languages')) {
            minimist.string.push('languages');
        }

        if (!minimist.string.contains('country')) {
            minimist.string.push('country');
        }

        if (!minimist.string.contains('region')) {
            minimist.string.push('region');
        }

        minimist.alias.languages = 'language';

        return minimist;
    }
}

module.exports = Context;