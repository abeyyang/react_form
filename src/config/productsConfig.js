export default {
    maxStringLength: 14,
    maxStringLength_landing: {
        'en-gb': 10,
        'zh-hk': 6,
        'zh-cn': 6
    },
    EditorPanelMinHight: 1620,
    underlyingHight: 26,
    // add these prefix for NLS mapping
    prefix_period_unit: 'period_unit_',
    prefix_tenor_unit: 'tenor_unit_',
    prefix_autocallFrequency: 'autocallFrequency_',
    prefix_knockInFrequency : 'knockInFrequency_',
    prefix_ELI_Type: 'ELI_Type_',

    underlyingStockName: {
        'en-gb': {
            attr: "undl_prodName",
            val: "underlyingStockName_en"
        },
        'zh-cn': {
            attr: "undl_prodSllName",
            val: "underlyingStockName_cn"
        },
        'zh-hk': {
            attr: "undl_prodPllName",
            val: "underlyingStockName_hk"
        }
    },
    links: {
        a_ProgrammeMemorandum: 'https://hfi-qualityassurance.p2g.netd2.hsbc.com.hk/data/hk/invest/eli/eli_ad_pm_LOCALE.pdf',
        a_FinancialDisclosureDocument: 'https://hfi-qualityassurance.p2g.netd2.hsbc.com.hk/data/hk/invest/eli/eli_ad_fdd_LOCALE.pdf',
        a_ProductBooklet: 'https://hfi-qualityassurance.p2g.netd2.hsbc.com.hk/data/hk/invest/eli/eli_ad_pb_LOCALE.pdf'
    },
    links_locale: {
        'en-gb': 'en',
        'zh-cn': 'tw',
        'zh-hk': 'tw'
    },
    links_locale_palce_holder: 'LOCALE'
}