#!/usr/bin/env node

'use strict';

const help = require('./lib/help');
const settings = require('./package.json');

if (require.main === module) {
    const argv = require('minimist')(process.argv, {
        boolean: ['help', 'version'],
        alias: {
            'version': 'v',
            'help': '?'
        }
    });

    if (argv.help) {
        help(argv);
        process.exit(0);
    } else if (argv.version) {
        console.log(settings.name + '@' + settings.version);
        process.exit(0);
    }

    switch (argv._[2]) {
        case ('help'):
            help(argv);
            break;
        case ('debug'):
            require('./lib/debug')(process.argv, (err) => {
                if (err) throw err;

                process.exit(0);
            });
            break;
        case ('map'):
            require('./lib/map')(process.argv, (err) => {
                if (err) throw err;

                console.log('ok - processing complete');
                process.exit(0);
            });
            break;
        case ('stat'):
        case ('stats'): {
            const stat_arg = require('minimist')(process.argv, {
                string: ['input']
            });

            const stats = require('./native/index.node').stats({
                input: stat_arg.input
            });

            console.log(JSON.stringify(stats));

            break;

        }
        case ('test'):
            require('./lib/test')(process.argv, (err) => {
                if (err) throw err;

                process.exit(0);
            });
            break;
        case ('testcsv'):
            require('./lib/testcsv')(process.argv, (err) => {
                if (err) throw err;

                process.exit(0);
            });
            break;
        case ('strip'):
            require('./lib/strip')(process.argv, (err) => {
                if (err) throw err;

                process.exit(0);
            });
            break;
        case ('analyze'):
            require('./lib/analyze')(process.argv, (err) => {
                if (err) throw err;

                process.exit(0);
            });
            break;
        case ('convert'): {
            const convert_arg = require('minimist')(process.argv, {
                string: ['input', 'output']
            });

            require('./native/index.node').convert({
                input: convert_arg.input,
                output: convert_arg.output
            });

            break;
        }
        case ('conflate'): {
            const conflate_arg = require('minimist')(process.argv, {
                string: ['input', 'output', 'tokens', 'db', 'country', 'region'],
                boolean: ['hecate'],
                alias: {
                    database: 'db'
                }
            });

            let context = undefined;
            if (conflate_arg.country) {
                context = {
                    country: conflate_arg.country,
                    region: conflate_arg.region
                };
            }

            if (!conflate_arg.db) {
                console.error('--db <DATABASE> argument required');
                process.exit(1);
            }

            require('./native/index.node').conflate({
                input: conflate_arg.input,
                output: conflate_arg.output,
                tokens: conflate_arg.tokens,
                hecate: conflate_arg.hecate,
                context: context,
                db: conflate_arg.db
            });

            break;
        }
        case ('dedupe'): {
            const dedupe_arg = require('minimist')(process.argv, {
                string: ['buildings', 'input', 'output', 'languages', 'db', 'country', 'region'],
                boolean: ['hecate'],
                alias: {
                    database: 'db'
                }
            });

            let context = undefined;
            if (dedupe_arg.country) {
                context = {
                    country: dedupe_arg.country,
                    region: dedupe_arg.region
                };
            }

            if (!dedupe_arg.db) {
                console.error('--db <DATABASE> argument required');
                process.exit(1);
            }

            require('./native/index.node').dedupe({
                buildings: dedupe_arg.buildings,
                input: dedupe_arg.input,
                output: dedupe_arg.output,
                languages: dedupe_arg.languages,
                hecate: dedupe_arg.hecate,
                context: context,
                db: dedupe_arg.db
            });

            break;
        }
        case ('classify'): {
            const classify_arg = require('minimist')(process.argv, {
                string: ['buildings', 'parcels', 'input', 'output', 'db'],
                boolean: ['hecate'],
                alias: {
                    database: 'db',
                    buildings: 'building',
                    parcels: 'parcel'
                }
            });

            if (!classify_arg.db) {
                console.error('--db <DATABASE> argument required');
                process.exit(1);
            } else if (!classify_arg.input) {
                console.error('--input <FILE> argument required');
                process.exit(1);
            } else if (!classify_arg.output) {
                console.error('--output <FILE> argument required');
                process.exit(1);
            } else if (!classify_arg.parcels && !classify_arg.buildings) {
                console.error('at least 1 of --buildings or --parcels arguments required');
                process.exit(1);
            }

            require('./native/index.node').classify({
                buildings: classify_arg.buildings,
                parcels: classify_arg.parcels,
                input: classify_arg.input,
                output: classify_arg.output,
                db: classify_arg.db,
                hecate: classify_arg.hecate
            });

            break;
        }
        default:
            help(argv);
            break;
    }
} else {
    module.exports = {
        classify: require('./native/index.node').classify,
        conflate: require('./native/index.node').conflate,
        dedupe: require('./native/index.node').dedupe,
        stat: require('./native/index.node').stats,
        convert: require('./native/index.node').convert,
        debug: require('./lib/debug'),
        map: require('./lib/map'),
        conflate: require('./lib/conflate'),
        test: require('./lib/test'),
        testcsv: require('./lib/testcsv'),
        strip: require('./lib/strip'),
        analyze: require('./lib/analyze')
    };
}
