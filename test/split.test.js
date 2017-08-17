const fs = require('fs');
const test = require('tape');
const pg = require('pg');
const split = require('../lib/split');
const Index = require('../lib/index');

const pool = new pg.Pool({
    max: 10,
    user: 'postgres',
    database: 'pt_test',
    idleTimeoutMillis: 30000
});

test('Init Database', (t) => {
    const index = new Index(pool);

    index.init((err) => {
        t.error(err);
        t.end();
    });
});

test('Split: Dulaney Valley Rd, MD', (t) => {
    t.test('Populate', (q) => {
        pool.query(`
            BEGIN;

            INSERT INTO network_cluster (
                text,
                _text,
                address,
                geom
            ) VALUES (
                'dulaney vly rd',
                'Dulaney Valley Road',
                1,
                ST_SetSRID(ST_GeomFromGeoJSON('{"type":"MultiLineString","coordinates":[[[-76.576516,39.464153],[-76.5769,39.463908],[-76.577122,39.463783],[-76.577421,39.463643],[-76.577877,39.463512],[-76.578492,39.463369]],[[-76.602014,39.402035],[-76.601978,39.402217],[-76.601954,39.402319],[-76.601917,39.402539],[-76.601845,39.402765]],[[-76.578492,39.463369],[-76.582147,39.462461],[-76.582404,39.462397]],[[-76.600369,39.41315],[-76.600366,39.413354]],[[-76.600406,39.411645],[-76.600382,39.412418]],[[-76.600492,39.410394],[-76.600451,39.410653],[-76.60041,39.41088],[-76.600336,39.411446],[-76.600406,39.411645]],[[-76.593006,39.450177],[-76.593305,39.449648],[-76.594053,39.448353]],[[-76.574924,39.464219],[-76.574729,39.464269],[-76.574219,39.464399],[-76.57344,39.46457],[-76.573092,39.464651],[-76.572714,39.46473],[-76.572136,39.464832],[-76.571591,39.464935],[-76.571038,39.46504],[-76.570812,39.46509],[-76.570619,39.465133],[-76.570455,39.465176],[-76.57018,39.465255],[-76.569994,39.465303],[-76.56971,39.465373],[-76.569342,39.465465],[-76.569079,39.465541],[-76.568736,39.465632],[-76.568498,39.4657],[-76.56828,39.465742],[-76.567992,39.465782],[-76.567658,39.465828],[-76.567398,39.465864],[-76.567136,39.465905],[-76.566835,39.46594],[-76.566575,39.465982],[-76.566107,39.466057],[-76.566008,39.466069],[-76.56593,39.466085],[-76.565675,39.466123],[-76.565167,39.466205],[-76.56441,39.466322],[-76.563693,39.466431],[-76.562984,39.466548],[-76.562633,39.466601]],[[-76.601239,39.405939],[-76.6012,39.40607]],[[-76.600376,39.412627],[-76.600373,39.412857]],[[-76.582404,39.462397],[-76.582729,39.462317],[-76.582965,39.462269],[-76.583168,39.462246],[-76.583408,39.462229],[-76.583675,39.462234],[-76.583948,39.462265],[-76.58421,39.462314],[-76.584724,39.462423],[-76.584838,39.462447],[-76.585182,39.462519],[-76.585538,39.46257],[-76.58583,39.462585],[-76.586165,39.462579],[-76.586339,39.462563],[-76.586438,39.462554],[-76.586804,39.462493],[-76.587058,39.462431],[-76.58736,39.462336],[-76.587632,39.462222],[-76.58787,39.462106],[-76.588141,39.461937],[-76.588385,39.461763],[-76.588681,39.46153],[-76.588933,39.461323],[-76.589066,39.461203],[-76.589203,39.461071]],[[-76.600382,39.412418],[-76.600376,39.412627]],[[-76.589203,39.461071],[-76.589278,39.460996],[-76.589364,39.460892]],[[-76.600406,39.411645],[-76.600489,39.411464],[-76.600499,39.411338]],[[-76.601587,39.40416],[-76.60152,39.404488]],[[-76.589364,39.460892],[-76.589423,39.460819],[-76.58947,39.460761],[-76.589582,39.4606],[-76.58975,39.460303],[-76.589939,39.459931],[-76.5905,39.458797],[-76.59147,39.456834],[-76.591905,39.455952],[-76.592051,39.455657],[-76.592176,39.455388],[-76.592216,39.455281],[-76.592274,39.455124],[-76.592345,39.454874],[-76.592391,39.454595],[-76.592422,39.454321],[-76.592426,39.454018],[-76.592456,39.451923],[-76.592464,39.451671],[-76.592471,39.451621],[-76.592494,39.451435],[-76.592544,39.451218],[-76.592609,39.451008],[-76.592679,39.450817],[-76.592798,39.45056],[-76.593006,39.450177]],[[-76.601424,39.405984],[-76.60148,39.405684],[-76.601504,39.405536],[-76.601565,39.405193]],[[-76.601334,39.4054],[-76.601239,39.405939]],[[-76.600366,39.413354],[-76.600345,39.413727],[-76.600316,39.413967]],[[-76.601882,39.403391],[-76.601901,39.403272],[-76.601947,39.402979],[-76.602005,39.402702],[-76.602099,39.402235],[-76.602138,39.402172],[-76.602205,39.402116]],[[-76.562633,39.466601],[-76.562225,39.466653],[-76.561805,39.466717],[-76.561565,39.466755],[-76.561022,39.466834],[-76.560887,39.466856],[-76.560435,39.46693],[-76.559938,39.467008],[-76.558849,39.467181],[-76.558268,39.467274],[-76.557817,39.467346],[-76.557552,39.467389],[-76.557331,39.46743],[-76.556974,39.467507],[-76.556764,39.467556],[-76.55646,39.467645],[-76.556336,39.467684],[-76.555562,39.467919],[-76.552434,39.468888],[-76.552262,39.468941],[-76.552127,39.468977],[-76.551989,39.469007],[-76.551815,39.469031],[-76.551611,39.469046],[-76.551363,39.469049],[-76.551169,39.469033],[-76.551079,39.469018],[-76.550969,39.468993],[-76.550842,39.468961],[-76.550705,39.468921],[-76.550493,39.468848],[-76.550352,39.468784],[-76.550124,39.46868],[-76.549697,39.468478],[-76.547758,39.46756],[-76.547661,39.467514],[-76.547553,39.467455],[-76.547479,39.467405],[-76.547417,39.46735],[-76.547329,39.467275]],[[-76.601276,39.406995],[-76.601292,39.406892],[-76.60137,39.406369]],[[-76.595458,39.445992],[-76.595553,39.445832]],[[-76.595553,39.445832],[-76.596122,39.444875],[-76.596405,39.444372],[-76.596528,39.444116],[-76.596642,39.443864],[-76.596711,39.44367],[-76.596779,39.443434],[-76.596843,39.44319],[-76.596884,39.442967],[-76.596913,39.442723],[-76.596926,39.442509],[-76.596928,39.441396],[-76.59692,39.441196],[-76.596918,39.44022]],[[-76.600499,39.411338],[-76.600558,39.410891],[-76.600593,39.410672],[-76.600693,39.410131],[-76.600774,39.409686]],[[-76.601737,39.404221],[-76.601748,39.404158],[-76.601804,39.403841]],[[-76.600056,39.414926],[-76.600155,39.414631],[-76.60021,39.414429],[-76.600267,39.414208],[-76.600316,39.413967]],[[-76.599893,39.41542],[-76.600056,39.414926]],[[-76.601399,39.406105],[-76.601424,39.405984]],[[-76.601804,39.403841],[-76.601882,39.403391]],[[-76.594053,39.448353],[-76.594626,39.4474],[-76.595096,39.446604],[-76.595325,39.446211],[-76.595458,39.445992]],[[-76.601024,39.408414],[-76.601042,39.408312],[-76.601115,39.40794],[-76.601167,39.407678]],[[-76.596918,39.44022],[-76.596898,39.436518],[-76.596897,39.436472],[-76.596889,39.434313],[-76.596867,39.431962],[-76.596848,39.431778],[-76.596803,39.43161],[-76.59674,39.431453],[-76.596661,39.431306],[-76.596543,39.431121],[-76.596502,39.431071],[-76.596388,39.430936],[-76.596057,39.430574],[-76.595885,39.430368],[-76.595766,39.430187],[-76.595668,39.430005],[-76.595582,39.429797],[-76.595531,39.429567],[-76.59552,39.4294],[-76.595526,39.429192],[-76.595553,39.429042],[-76.595606,39.42884],[-76.595626,39.428777],[-76.595632,39.428759],[-76.595783,39.428275],[-76.595969,39.42764]],[[-76.601669,39.404603],[-76.601685,39.404512],[-76.601737,39.404221]],[[-76.6012,39.40607],[-76.601134,39.406453],[-76.601073,39.406839],[-76.600943,39.407652],[-76.600765,39.408823],[-76.600711,39.409208],[-76.600695,39.409302]],[[-76.601746,39.403258],[-76.601724,39.403371],[-76.601587,39.40416]],[[-76.600373,39.412857],[-76.600369,39.41315]],[[-76.600774,39.409686],[-76.600857,39.409227]],[[-76.595969,39.42764],[-76.596092,39.427106]],[[-76.60152,39.404488],[-76.60151,39.404542],[-76.601503,39.404581],[-76.601424,39.405054],[-76.601342,39.405355],[-76.601334,39.4054]],[[-76.596092,39.427106],[-76.596147,39.426882],[-76.596197,39.426705]],[[-76.599795,39.415695],[-76.599893,39.41542]],[[-76.596197,39.426705],[-76.596268,39.426468],[-76.596369,39.42617],[-76.596486,39.425856],[-76.596596,39.425604],[-76.596652,39.425461],[-76.596766,39.425172],[-76.596985,39.424507],[-76.597012,39.424424],[-76.597301,39.423454],[-76.597402,39.423097],[-76.597594,39.422482],[-76.597965,39.421246],[-76.598288,39.420189],[-76.598626,39.419155],[-76.598739,39.41881],[-76.59892,39.418253],[-76.599305,39.417081],[-76.599795,39.415695]],[[-76.60137,39.406369],[-76.601382,39.406292],[-76.601399,39.406105]],[[-76.547329,39.467275],[-76.54726,39.467217],[-76.547139,39.467144],[-76.547081,39.467117],[-76.547032,39.467109],[-76.546996,39.467106],[-76.546973,39.467109],[-76.546929,39.46712],[-76.546904,39.467136],[-76.546869,39.467158],[-76.546825,39.467207],[-76.546797,39.467264],[-76.546605,39.467657],[-76.54603,39.468831],[-76.54575,39.469372],[-76.545512,39.469869],[-76.545393,39.470077],[-76.545251,39.47027],[-76.545103,39.470416],[-76.544997,39.470512],[-76.544834,39.47064],[-76.544761,39.470694],[-76.544603,39.470779],[-76.544457,39.470848],[-76.54441,39.470873],[-76.544018,39.471032],[-76.543776,39.471134],[-76.543538,39.471234],[-76.543104,39.471411],[-76.54231,39.471739],[-76.541944,39.47189],[-76.541123,39.472255],[-76.540592,39.472522],[-76.540341,39.472663],[-76.540136,39.472792],[-76.539991,39.472901],[-76.539904,39.472969],[-76.539809,39.473066],[-76.539338,39.473639],[-76.539125,39.473937],[-76.538945,39.474136],[-76.538784,39.474323],[-76.538611,39.474504],[-76.538454,39.474664],[-76.53804,39.475066],[-76.537532,39.475552],[-76.537352,39.475719],[-76.537156,39.475914],[-76.536873,39.476194],[-76.536729,39.476352],[-76.536634,39.476469],[-76.53606,39.477108],[-76.535863,39.477352],[-76.535423,39.477853],[-76.535117,39.478209],[-76.534695,39.478798],[-76.534547,39.47901],[-76.534403,39.479203],[-76.534359,39.479259],[-76.534185,39.479518],[-76.534044,39.479694],[-76.533781,39.479982],[-76.533702,39.480069],[-76.533628,39.480134],[-76.533574,39.480181],[-76.533423,39.480326],[-76.533282,39.480447],[-76.532651,39.480912],[-76.532109,39.481308],[-76.531774,39.481545],[-76.531448,39.481746],[-76.529239,39.483128],[-76.529073,39.483223],[-76.52891,39.483339],[-76.528772,39.483441],[-76.528694,39.483515],[-76.528616,39.483592],[-76.528538,39.483692],[-76.52846,39.483829],[-76.528302,39.484154],[-76.528199,39.484381],[-76.528119,39.484571],[-76.528069,39.484715],[-76.528031,39.484818],[-76.527997,39.484989],[-76.527969,39.485176],[-76.527957,39.485676],[-76.527948,39.4859],[-76.527937,39.486051],[-76.527915,39.486228],[-76.527783,39.487001],[-76.527729,39.487231],[-76.527653,39.487481],[-76.527578,39.487635],[-76.527503,39.487759],[-76.527452,39.487833],[-76.527384,39.487909],[-76.527238,39.488027],[-76.527171,39.488069],[-76.52705,39.488145],[-76.526918,39.488227],[-76.526676,39.488351],[-76.526464,39.488439],[-76.526436,39.488449],[-76.526212,39.488525],[-76.525626,39.488683],[-76.525343,39.488756],[-76.525136,39.488803],[-76.524699,39.488927],[-76.524397,39.489011],[-76.52425,39.48906],[-76.524132,39.489102],[-76.52397,39.489178],[-76.523305,39.489583],[-76.523107,39.489698],[-76.522888,39.489815]],[[-76.601565,39.405193],[-76.601669,39.404603]],[[-76.601845,39.402765],[-76.601833,39.402801],[-76.601746,39.403258]],[[-76.576516,39.464153],[-76.576371,39.464027],[-76.576276,39.463968],[-76.576202,39.463946],[-76.576118,39.463939],[-76.576024,39.463953],[-76.575812,39.464002],[-76.57536,39.46411],[-76.57509,39.464178],[-76.574924,39.464219]],[[-76.600857,39.409227],[-76.600978,39.408678],[-76.601024,39.408414]],[[-76.601167,39.407678],[-76.601226,39.407312],[-76.601276,39.406995]],[[-76.600695,39.409302],[-76.600492,39.410394]]]}'), 4326)
            );

            INSERT INTO address_cluster (
                _text,
                geom
            ) VALUES (
                'DULANEY VALLEY ROAD',
                ST_SetSRID(ST_GeomFromGeoJSON('{"type":"MultiPoint","coordinates":[[-76.554825,39.460839,12301],[-76.567178,39.462854,12101],[-76.597763,39.442952,2106],[-76.597381,39.438022,2004],[-76.599005,39.431047,1798],[-76.599332,39.415862,1213],[-76.598647,39.41753,1225],[-76.600995,39.410555,1012],[-76.602079,39.423173,1320],[-76.594571,39.451609,2300],[-76.595055,39.459747,2300],[-76.602419,39.405303,812],[-76.597323,39.420842,1311],[-76.598909,39.416646,1219],[-76.60084,39.411361,1018],[-76.601097,39.410104,1008],[-76.598452,39.404,825],[-76.592984,39.435944,2100],[-76.599829,39.407802,949],[-76.602287,39.423609,1320],[-76.593549,39.4481,2203],[-76.601095,39.409904,1006],[-76.600076,39.416008,1202],[-76.597404,39.432329,1802],[-76.596191,39.411014,1021],[-76.597225,39.457633,2300],[-76.596336,39.452082,2300],[-76.59753,39.433314,1808],[-76.601294,39.40888,956],[-76.59391,39.449525,2204],[-76.595955,39.42509,1411],[-76.596843,39.458131,2300],[-76.592457,39.407039,1021],[-76.599057,39.421769,1310],[-76.597347,39.431869,1800],[-76.597259,39.420817,1311],[-76.599676,39.42118,1306],[-76.591964,39.412279,1021],[-76.600887,39.410925,1014],[-76.59889,39.416928,1221],[-76.600931,39.420055,1300],[-76.599494,39.417756,1214],[-76.597226,39.451942,2300],[-76.60105,39.410127,1008],[-76.597355,39.433929,1810],[-76.595201,39.447394,2124],[-76.600341,39.430875,1718],[-76.595848,39.420572,1307],[-76.597943,39.430071,1710],[-76.602784,39.42249,1318],[-76.599207,39.403309,825],[-76.598698,39.430773,1798],[-76.601148,39.402946,825],[-76.597044,39.455811,2300],[-76.599369,39.403989,825],[-76.598339,39.418525,1233],[-76.598985,39.422383,1314],[-76.598634,39.417429,1225],[-76.594387,39.411753,1021],[-76.588623,39.407698,1021],[-76.603153,39.40446,730],[-76.597373,39.439394,2010],[-76.597426,39.432264,1802],[-76.594155,39.449169,2202],[-76.592199,39.412682,1021],[-76.592441,39.408569,1021],[-76.59645,39.427759,1506],[-76.59737,39.443442,2108],[-76.603217,39.404758,744],[-76.597374,39.437583,2002],[-76.595917,39.42057,1307],[-76.597487,39.438337,2006],[-76.595421,39.446971,2122],[-76.599771,39.431002,1720],[-76.596322,39.428186,1508],[-76.599162,39.421665,1310],[-76.591846,39.413208,1021],[-76.599083,39.416125,1215],[-76.596111,39.445922,2118],[-76.597601,39.432674,1806],[-76.599338,39.422278,1314],[-76.596456,39.427725,1506],[-76.600201,39.430654,1718],[-76.597812,39.419648,1301],[-76.59619,39.428624,1510],[-76.596563,39.427385,1504],[-76.598386,39.418248,1231],[-76.596668,39.457248,2300],[-76.597256,39.443418,2108],[-76.59952,39.41803,1216],[-76.597218,39.455125,2310],[-76.601136,39.409891,1006],[-76.593866,39.449276,2204],[-76.596214,39.445898,2118],[-76.601205,39.409452,1002],[-76.599029,39.416432,1217],[-76.600982,39.410896,1014],[-76.600895,39.410942,1014],[-76.598315,39.418551,1233],[-76.600095,39.416328,1204],[-76.600101,39.416505,1206],[-76.597339,39.433247,1808],[-76.599,39.416374,1217],[-76.599997,39.416614,1206],[-76.595616,39.446501,2120],[-76.599772,39.406398,903],[-76.599616,39.417746,1214],[-76.597454,39.442942,2106],[-76.597391,39.439389,2010],[-76.599792,39.406175,903],[-76.599298,39.415773,1213],[-76.601003,39.410537,1012],[-76.597029,39.421799,1317],[-76.597338,39.435625,1908],[-76.599725,39.404793,825],[-76.594363,39.448671,2200],[-76.60084,39.411393,1018],[-76.598558,39.417723,1227],[-76.599706,39.417476,1212],[-76.600288,39.415772,1200],[-76.598731,39.417187,1223],[-76.59479,39.44797,2126],[-76.598652,39.417431,1225],[-76.599332,39.421075,1306],[-76.601524,39.421777,1322],[-76.601157,39.409676,1004],[-76.600739,39.421804,1316],[-76.59758,39.435141,1902],[-76.597246,39.431646,1800],[-76.598356,39.418517,1233],[-76.599897,39.41691,1208],[-76.597531,39.439896,2012],[-76.601384,39.408861,956],[-76.597736,39.45163,2296],[-76.595574,39.446993,2122],[-76.597378,39.433912,1810],[-76.594227,39.449188,2202],[-76.594134,39.448979,2202],[-76.596978,39.444135,2110],[-76.597356,39.432774,1806],[-76.601132,39.40387,813],[-76.598675,39.422536,1314],[-76.596631,39.426941,1502],[-76.597387,39.438919,2008],[-76.596843,39.426383,1500],[-76.599795,39.417212,1210],[-76.597364,39.437523,2002],[-76.600183,39.416076,1202],[-76.595839,39.421041,1309],[-76.597387,39.438421,2006],[-76.597375,39.43797,2004],[-76.597072,39.451993,2292],[-76.593629,39.449721,2204],[-76.593592,39.44811,2203],[-76.600867,39.411162,1016],[-76.598824,39.416906,1221],[-76.593298,39.448623,2205],[-76.600665,39.407012,901],[-76.596637,39.426856,1502],[-76.603105,39.404854,740],[-76.601053,39.410333,1010],[-76.598472,39.417984,1229],[-76.600268,39.419924,1300],[-76.590596,39.407567,1021],[-76.599531,39.417507,1214],[-76.59972,39.417213,1210],[-76.596759,39.426496,1500],[-76.597517,39.431685,1800],[-76.594833,39.447936,2126],[-76.602534,39.404707,812],[-76.591549,39.407361,1021],[-76.599537,39.418062,1216],[-76.59489,39.410153,1021],[-76.598516,39.417985,1229],[-76.601129,39.410262,1010],[-76.59791,39.453274,2300],[-76.601982,39.404271,714],[-76.596484,39.42784,1506],[-76.598507,39.418003,1229],[-76.593692,39.436317,2001],[-76.598927,39.416692,1219],[-76.602513,39.404791,820],[-76.600677,39.421963,1316],[-76.597376,39.439869,2012],[-76.598452,39.418256,1231],[-76.597041,39.444189,2110],[-76.597611,39.455451,2300],[-76.596387,39.428215,1508],[-76.596036,39.425277,1411],[-76.596499,39.453758,2300],[-76.602419,39.456389,2300],[-76.600562,39.403152,825],[-76.596255,39.428225,1508],[-76.595141,39.447435,2124],[-76.599153,39.416159,1215],[-76.59992,39.430391,1798],[-76.602351,39.404375,716],[-76.600348,39.405224,825],[-76.600305,39.415957,1202],[-76.593265,39.407821,1021],[-76.593032,39.409373,1021],[-76.600402,39.415745,1200],[-76.600449,39.419797,1300],[-76.593414,39.408362,1021],[-76.603135,39.40467,732],[-76.595735,39.446465,2120],[-76.597166,39.421044,1311],[-76.599751,39.422243,1314],[-76.593316,39.448626,2205],[-76.599915,39.416621,1206],[-76.598598,39.41783,1227],[-76.602456,39.404377,720],[-76.596808,39.426378,1500],[-76.593352,39.435989,2100],[-76.59668,39.426959,1502],[-76.595694,39.446583,2120],[-76.596806,39.421771,1317],[-76.595673,39.409889,1021],[-76.600996,39.410347,1010],[-76.594586,39.409311,1021],[-76.599178,39.41622,1215],[-76.595746,39.421003,1309],[-76.600848,39.41154,1024],[-76.597362,39.43567,1908],[-76.597474,39.435583,1902],[-76.600854,39.411138,1016],[-76.601948,39.423157,1320],[-76.60247,39.405067,828],[-76.597382,39.438471,2006],[-76.597521,39.458861,2300],[-76.594466,39.44873,2200],[-76.597407,39.433238,1808],[-76.600938,39.421852,1316],[-76.600715,39.406766,901],[-76.602503,39.405267,834],[-76.597932,39.461558,2300],[-76.60248,39.405519,838],[-76.599938,39.41676,1208],[-76.601591,39.42246,1322],[-76.601218,39.410154,1008],[-76.599237,39.415894,1213],[-76.596134,39.421098,1309],[-76.597548,39.437435,2002],[-76.601255,39.409035,956],[-76.598625,39.417741,1227],[-76.59626,39.420653,1307],[-76.601125,39.409699,1004],[-76.601273,39.408806,956],[-76.594342,39.448523,2200],[-76.600907,39.411071,1016],[-76.602408,39.404379,718],[-76.599341,39.42175,1310],[-76.593267,39.435979,2100],[-76.59984,39.416873,1208],[-76.597554,39.438802,2008],[-76.597681,39.42563,1400],[-76.59741,39.438896,2008],[-76.597522,39.443422,2108],[-76.600024,39.416291,1204],[-76.602311,39.423451,1320],[-76.600143,39.406218,903],[-76.591424,39.412213,1021],[-76.599608,39.417507,1212],[-76.59756,39.435583,1908],[-76.602521,39.40439,722],[-76.597962,39.419459,1301],[-76.599692,39.430476,1720],[-76.597371,39.442982,2106],[-76.59164,39.406302,1021],[-76.596562,39.427414,1504],[-76.602566,39.404601,806],[-76.601133,39.403835,813],[-76.601189,39.409491,1002],[-76.596157,39.428628,1510],[-76.601076,39.403862,813],[-76.599056,39.416404,1217],[-76.59794,39.407882,1021],[-76.597164,39.451877,2292],[-76.595473,39.446854,2122],[-76.597542,39.433804,1810],[-76.598822,39.431035,1798],[-76.590475,39.408255,1021],[-76.602491,39.404907,824],[-76.597371,39.439292,2010],[-76.594668,39.44779,2126],[-76.597053,39.421717,1317],[-76.597889,39.419592,1301],[-76.594592,39.459876,2300],[-76.597172,39.454906,2310],[-76.598808,39.416972,1221],[-76.589619,39.454343,2101],[-76.599856,39.416971,1210],[-76.602468,39.405141,830],[-76.601461,39.422231,1322],[-76.599777,39.430911,1720],[-76.601151,39.40983,1006],[-76.595679,39.408751,1021],[-76.599414,39.420978,1306],[-76.602469,39.404988,826],[-76.597289,39.435177,1902],[-76.60245,39.405162,812],[-76.600655,39.40697,901],[-76.59325,39.448584,2205],[-76.600943,39.411345,1018],[-76.593105,39.435949,2100],[-76.586888,39.409884,1021],[-76.595824,39.42534,1411],[-76.60151,39.455999,2300],[-76.594139,39.409897,1021],[-76.597385,39.432834,1806],[-76.602544,39.404663,810],[-76.5988,39.417202,1223],[-76.596127,39.428719,1510],[-76.601179,39.409456,1002],[-76.600206,39.415751,1200],[-76.598754,39.417221,1223],[-76.593612,39.448117,2203],[-76.600181,39.416218,1204],[-76.601172,39.410579,1012],[-76.597176,39.444152,2110],[-76.599547,39.417774,1216],[-76.597351,39.420742,1311],[-76.598451,39.418149,1231],[-76.602523,39.404749,814],[-76.598992,39.416659,1219],[-76.596546,39.427367,1504],[-76.597546,39.437861,2004],[-76.601138,39.409683,1004],[-76.590142,39.409872,1021],[-76.597697,39.432245,1802],[-76.594641,39.412796,1021],[-76.596258,39.45946,2300],[-76.597902,39.434902,1902],[-76.599596,39.417214,1212],[-76.592096,39.410693,1021],[-76.597636,39.439757,2012],[-76.595018,39.447368,2124],[-76.596901,39.450649,2296],[-76.602501,39.404858,822],[-76.596244,39.446057,2118],[-76.600717,39.403181,825],[-76.592931,39.408533,1021],[-76.527422,39.489461,13214],[-76.524296,39.490224,13218],[-76.529332,39.48453,13100],[-76.53581,39.47799,12808],[-76.534494,39.478217,12813],[-76.54733,39.468673,12450],[-76.533673,39.479453,12901],[-76.535776,39.478026,12808],[-76.547381,39.467525,12460],[-76.536176,39.478819,12814],[-76.534155,39.47879,12815],[-76.536327,39.477737,12806],[-76.536452,39.47565,12721],[-76.527098,39.488672,13200],[-76.527446,39.489787,13214],[-76.527646,39.484285,13101],[-76.5266,39.485457,13115],[-76.534229,39.478144,12813],[-76.527513,39.484715,13103],[-76.532959,39.480079,12907],[-76.526316,39.488773,13204],[-76.536438,39.477194,12804],[-76.535611,39.478386,12810],[-76.53242,39.48028,12909],[-76.533373,39.479853,12905],[-76.535126,39.476937,12807],[-76.542126,39.47142,12567],[-76.540465,39.471853,12605],[-76.528797,39.483932,13020],[-76.528179,39.483625,13019],[-76.528153,39.488047,13140],[-76.528601,39.483158,13015],[-76.542696,39.471193,12563],[-76.530886,39.481714,13001],[-76.530196,39.481963,13005],[-76.543099,39.470891,12559],[-76.530386,39.483458,13008],[-76.527728,39.484303,13101],[-76.525704,39.489134,13208],[-76.526478,39.487767,13201],[-76.528551,39.485167,13114],[-76.52491,39.489138,13212],[-76.529719,39.482139,13007],[-76.5244,39.488045,13211],[-76.533362,39.481846,12916],[-76.528304,39.484914,13100],[-76.532285,39.481983,13000],[-76.531918,39.480526,12911],[-76.525375,39.487982,13207],[-76.534599,39.477937,12811],[-76.532228,39.480735,12911],[-76.533347,39.479923,12905],[-76.532452,39.482011,13000],[-76.532122,39.481755,13000],[-76.538239,39.476193,12720],[-76.525572,39.488963,13208],[-76.54262,39.471089,12563],[-76.527037,39.485739,13115],[-76.524896,39.489117,13212],[-76.525614,39.489976,13216],[-76.535519,39.478343,12810],[-76.535733,39.47925,12900],[-76.526919,39.488556,13200],[-76.527788,39.487749,13140],[-76.546762,39.467789,12460],[-76.523206,39.490049,13224],[-76.529035,39.488489,13142],[-76.530775,39.482723,13006],[-76.534511,39.47838,12813],[-76.524917,39.487841,13209],[-76.532949,39.481702,12916],[-76.52544,39.487928,13207],[-76.531974,39.480929,12915],[-76.5469,39.468063,12460],[-76.540741,39.471394,12605],[-76.535199,39.477097,12807],[-76.53081,39.482924,13006],[-76.527738,39.484617,13103],[-76.53859,39.476546,12720],[-76.525812,39.489831,13216],[-76.527145,39.488446,13200],[-76.531789,39.481278,12919],[-76.53529,39.47963,12900],[-76.52984,39.489081,13142],[-76.531326,39.480924,12919],[-76.534891,39.477567,12809],[-76.523377,39.489891,13224],[-76.528344,39.489528,13146],[-76.540891,39.471722,12605],[-76.531352,39.481216,12919],[-76.528351,39.486595,13132],[-76.531726,39.482988,13004],[-76.536772,39.477009,12804],[-76.547599,39.468235,12450],[-76.531653,39.481153,12919],[-76.540044,39.473859,12620],[-76.53449,39.481137,12908],[-76.528888,39.489345,13144],[-76.531833,39.481432,12919],[-76.531236,39.483202,13006],[-76.534416,39.480139,12906],[-76.537912,39.473283,12615],[-76.532592,39.480467,12909],[-76.535672,39.476811,12805],[-76.531698,39.4809,12915],[-76.531388,39.482848,13004],[-76.53306,39.480151,12907],[-76.535612,39.476562,12805],[-76.536859,39.478518,12814],[-76.526761,39.48766,13201],[-76.54288,39.471166,12563],[-76.528345,39.486654,13132],[-76.53909,39.472363,12615],[-76.538383,39.473184,12615],[-76.52899,39.48392,13020],[-76.524569,39.488406,13211],[-76.532761,39.480426,12909],[-76.531284,39.482491,13004],[-76.530322,39.482996,13008],[-76.534764,39.478077,12811],[-76.525228,39.488305,13211],[-76.524118,39.489737,13218],[-76.530291,39.489484,13142],[-76.5285,39.483233,13015],[-76.529203,39.48396,13020],[-76.533692,39.479372,12901],[-76.529731,39.48227,13007],[-76.529174,39.483791,13020],[-76.525234,39.490243,13216],[-76.524616,39.490099,13218],[-76.529268,39.489676,13144],[-76.536245,39.477838,12808],[-76.534147,39.481277,12908],[-76.526276,39.487785,13201],[-76.533522,39.481988,12916],[-76.526501,39.489351,13214],[-76.530274,39.481979,13005],[-76.529869,39.490674,13146],[-76.525011,39.48901,13212],[-76.542051,39.471408,12567],[-76.536097,39.477629,12806],[-76.533931,39.479299,12901],[-76.528656,39.489053,13144],[-76.535306,39.47726,12807],[-76.531074,39.481593,13001],[-76.534476,39.480173,12906],[-76.527558,39.484734,13103],[-76.539773,39.47446,12620],[-76.531344,39.481255,12919],[-76.528792,39.485365,13114],[-76.539474,39.473041,12615],[-76.535542,39.479286,12900],[-76.529981,39.48238,13007],[-76.529085,39.48455,13100],[-76.543251,39.470856,12559],[-76.533603,39.48061,12908],[-76.52564,39.487938,13207],[-76.536649,39.475952,12721],[-76.532507,39.480697,12911],[-76.5343,39.478627,12815],[-76.547051,39.467497,12460],[-76.528087,39.48368,13019],[-76.535046,39.477689,12809],[-76.536236,39.478942,12814],[-76.52575,39.488791,13208],[-76.536389,39.477181,12804],[-76.532798,39.479805,12907],[-76.536977,39.475791,12721],[-76.533438,39.479695,12905],[-76.534611,39.477822,12811],[-76.540032,39.474527,12620],[-76.547158,39.467962,12460],[-76.528446,39.485236,13114],[-76.535016,39.477473,12809],[-76.526321,39.488546,13204],[-76.530874,39.481751,13001],[-76.53422,39.478723,12815],[-76.534114,39.480798,12908],[-76.531602,39.481262,12919],[-76.528252,39.488294,13140],[-76.526997,39.485432,13115],[-76.532887,39.48267,13000],[-76.528602,39.483445,13019],[-76.531162,39.483717,13008],[-76.523631,39.489771,13224],[-76.528778,39.48305,13015],[-76.53532,39.479613,12900],[-76.531595,39.482088,13000],[-76.526306,39.488777,13204],[-76.531757,39.480983,12915],[-76.536784,39.477446,12806],[-76.542326,39.471356,12567],[-76.53258,39.482622,13000],[-76.532483,39.482035,13000],[-76.534796,39.480469,12906],[-76.53062,39.490525,13146],[-76.543071,39.470887,12559],[-76.535908,39.47822,12810],[-76.527893,39.48416,13101],[-76.538905,39.476083,12720],[-76.54778,39.468261,12450],[-76.528436,39.48675,13132],[-76.530391,39.481947,13005],[-76.579991,39.446206,2101],[-76.580033,39.443925,2101],[-76.582554,39.444624,2101],[-76.581615,39.445157,2101],[-76.581168,39.445211,2101],[-76.583862,39.445015,2101]]}'), 4326)
            );

            COMMIT;
        `, (err, res) => {
            q.error(err);
            q.end();
        });
    });

    t.test('Run', (q) => {
        split.init({
            pool: {
                max: 10,
                user: 'postgres',
                database: 'pt_test',
                idleTimeoutMillis: 30000
            },
            stdout: false,
            debug: true,
            country: 'us'
        });

        split.split(1, (err, res) => {
            q.error(err);

            t.equals(res.type, 'Feature', 'Type should be feature');
            t.equals(res.geometry.type, 'GeometryCollection', 'Geometry should be GeometryCollection');
            t.equals(res.geometry.geometries.length, 2, 'GeometryCollection should have 2 child geometries');

            t.equals(res.properties['carmen:text'], 'Dulaney Valley Road', 'Text should be Dulaney Valley Road');
            t.deepEquals(res.properties['carmen:addressnumber'], [ null, [ 714, 716, 718, 720, 722, 730, 732, 740, 744, 806, 810, 812, 813, 814, 820, 822, 824, 825, 826, 828, 830, 834, 838, 901, 903, 949, 956, 1002, 1004, 1006, 1008, 1010, 1012, 1014, 1016, 1018, 1021, 1024, 1200, 1202, 1204, 1206, 1208, 1210, 1212, 1213, 1214, 1215, 1216, 1217, 1219, 1221, 1223, 1225, 1227, 1229, 1231, 1233, 1300, 1301, 1306, 1307, 1309, 1310, 1311, 1314, 1316, 1317, 1318, 1320, 1322, 1400, 1411, 1500, 1502, 1504, 1506, 1508, 1510, 1710, 1718, 1720, 1798, 1800, 1802, 1806, 1808, 1810, 1902, 1908, 2001, 2002, 2004, 2006, 2008, 2010, 2012, 2100, 2101, 2106, 2108, 2110, 2118, 2120, 2122, 2124, 2126, 2200, 2202, 2203, 2204, 2205, 2292, 2296, 2300, 2310, 12101, 12301, 12450, 12460, 12559, 12563, 12567, 12605, 12615, 12620, 12720, 12721, 12804, 12805, 12806, 12807, 12808, 12809, 12810, 12811, 12813, 12814, 12815, 12900, 12901, 12905, 12906, 12907, 12908, 12909, 12911, 12915, 12916, 12919, 13000, 13001, 13004, 13005, 13006, 13007, 13008, 13015, 13019, 13020, 13100, 13101, 13103, 13114, 13115, 13132, 13140, 13142, 13144, 13146, 13200 , 13201, 13204, 13207, 13208, 13209, 13211, 13212, 13214, 13216, 13218, 13224 ] ], 'carmen:addressnumber should be stable');

            t.deepEquals(res.properties['carmen:parityl'], [ [ 'O', null, 'O', null, 'E', 'O', 'O', 'E', null, 'E', null, 'E', 'E', 'E', 'E', null, null ], null ], 'carmen:parityl should be stable');
            t.deepEquals(res.properties['carmen:parityr'], [ [ 'E', 'O', 'E', 'E', 'E', 'E', 'E', 'O', 'E', 'O', 'O', null, 'O', 'O', 'O', null, null ], null ], 'carmen:parityr should be stable');

            t.deepEquals(res.properties['carmen:lfromhn'], [ [ 1021, null, 2101, null, 2004, 1411, 1311, 714, null, 13204, null, 12450, 12620, 12620, 13000, null, null ], null ], 'carmen:lfromhn should be stable');
            t.deepEquals(res.properties['carmen:ltohn'], [ [ 1, null, 2205, null, 1800, 1317, 1213, 838, null, 13224, null, 12450, 12620, 12908, 20000, null, null ], null ], 'carmen:ltohn should be stable');

            t.deepEquals(res.properties['carmen:rfromhn'], [ [ 1024, 1021, 2300, 2122, 2004, 1710, 1306, 825, 2300, 13207, 12101, null, 12559, 12615, 12915, null, null ], null ], 'carmen:rfromhn should be stable');
            t.deepEquals(res.properties['carmen:rtohn'], [ [ 0, 1021, 2296, 2010, 1800, 1322, 1200, 1021, 2300, 13209, 12301, null, 12615, 12911, 20001, null, null ], null ], 'carmen:rtohn should be stable');

            split.kill();
            q.end();
        });
    });

    t.end();
});

test('End Connection', (t) => {
    pool.end();
    t.end();
});
