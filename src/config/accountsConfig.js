export default {
    settlementForStandalone: [
        "SSSAV",
        "SSCUA",
        "SSSEE",
        "SSUSC",
        "SSCAC",
        "SSRCF",
        "SSSSA",
        "MCSAV",
        "AVSAV",
        "AVCUA",
        "PVSAV",
        "PVCUA",
        "SVSAV",
        "SVCUA"
    ],
    settlementForbundle : [
        "AVSAV",
        "AVCUA",
        "PVSAV",
        "PVCUA",
        "SVSAV",
        "SVCUA"
    ],
    INVERSTMENT_ACCOUNT_BUNDLE_TYPE : ['AV', 'SV', 'PV'],
    accountFormat : {
        "3_6_3": {
            keys: [
                "AVINV",
                "PVINV",
                "SVINV",
                "AVSAV",
                "AVCUA",
                "PVSAV",
                "PVCUA",
                "SVSAV",
                "SVCUA",
                "SSINV",
                "SSSEC",
                "SSCUA",
                "SSSEE",
                "SSUSC",
                "SSCAC",
                "SSRCF",
                "SSSSA"
            ],
            pattern : /^(\d{3})(\d{6})(\d{3})$/,
            format : '$1-$2-$3'
        },
        "3_1_6": {
            keys: [
                "SSSAV",
                "MCSAV"
            ],
            pattern : /^(\d{3})(\d{1})(\d{6})$/,
            format : '$1-$2-$3'
        },
        "length_9": {
            pattern : /^(\d{3})(\d{6})$/,
            format : '$1-$2'
        },
        "length_10": {
            pattern : /^(\d{3})(\d{1})(\d{6})$/,
            format : '$1-$2-$3'
        },
        "length_12": {
            pattern : /^(\d{3})(\d{6})(\d{3})$/,
            format : '$1-$2-$3'
        },
        "length_13": {
            pattern : /^(\d{3})(\d{6})(\d{4})$/,
            format : '$1-$2'
        },
        "length_16": {
            pattern : /^(\d{3})(\d{6})(\d{4})(\d{3})$/,
            format : '$1-$2-$3-$4'
        },
        "others": {
            pattern : '',
            format : ''
        }                                
    },
    INVERSTMENT_ACCOUNT_NAME_MAPPING : {
        'AVINV':{
            seq:1 
        },
        'PVINV':{
            seq:2
        },
        'SVINV':{
            seq:3
        },
        'SSINV':{
            seq:4
        },
        'SSSEC':{
            seq:5
        }
    },
    SETTLEMENT_ACCOUNT_NAME_MAPPING : {
        'SSSAV':{
            seq:1
        },
        'SSCUA':{
            seq:2
        },
        'SSSEE':{
            seq:3 
        },
        'SSUSC':{
            seq:4 
        },
        'SSCAC':{
            seq:5
        },
        'SSRCF':{
            seq:6 
        },
        'SSSSA':{
            seq:7
        },
        'MCSAV':{
            seq:8
        },
        'AVSAV':{
            seq:9
        },
        'AVCUA':{
            seq:10
        },
        'PVSAV':{
            seq:11
        },
        'PVCUA':{
            seq:12
        },
        'SVSAV':{
            seq:13
        },
        'SVCUA':{
            seq:14
        }
    }
}