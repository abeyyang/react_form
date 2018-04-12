import checkLocal from '../../locale/checkLocal'
const list = {
    localeEnGB:{
        RPQWarningMsg: {
            TITLE: 'Risk Profile Check',
            EMPTY: {
                warningText: 'You are required to complete the Risk Profiling Questionnaire before placing Equity Linked Investment.',
                msg: 'We do not have your attitude towards risk on record. Please click below button to complete the Questionnaire to understand your risk tolerance before you perform any investment transactions.',
                leftBtn: 'Complete Risk Profile Questionnaire'
            },
            EXPIRE: {
                warningText: 'You are required to complete the Risk Profiling Questionnaire before placing Equity Linked Investment.',
                msg: 'Your latest risk assessment has become invalid. Please click the button below to complete the Questionnaire to update your risk tolerance before you perform any investment transactions.',
                leftBtn: 'Review Risk Profile'
            },
            HIGHER: {
                warningText: 'The Product Risk Level is higher than your risk tolerance. As such the product may not be suitable for you.',
                msg: 'If you wish to proceed with the subscription, please click the ‘Accept the Risk and Proceed’ button below to accept the risk and proceed with the subscription.  Alternatively, you may click the ‘Review Risk Profile’ button below to complete the Risk Profiling Questionnaire to update your risk tolerance.' ,
                moreDetail: 'This alert message does not constitute a solicitation of the sale or recommendation of any product. If you wish to receive a solicitation or recommendation from us, you should contact us and, where relevant, go through our suitability assessment before transacting.',
                leftBtn: 'Review Risk Profile',
                rightBtn: 'Accept the Risk and Proceed'
            }
        },
        PICOPWarningMsg: {
            TITLE: 'Pre-Investment Cooling Off Period',
            A: {
                guideline: 'Effective from 1 Jan 2011, a Pre-Investment Cooling Off Period (PICOP) arrangement is required by the Hong Kong Monetary Authority (HKMA) for customers aged 65 or above (subject to limited exceptions), to ensure these customers have sufficient time to consider their non-listed derivative product purchase.',
                requirement: 'Under the above guideline, the HKMA allows you the flexibility to be exempted from the arrangement, given that you have previous investment experience of equity linked product and your investment amount is below 20% of your total net worth (excluding real estate properties) across all banks.',
                option1: 'You can choose to be exempted from the arrangement and proceed with the investment transaction now, or',
                leftBtn: 'Proceed with Transaction Now',
                option2: 'You can choose to apply the Pre-Investment Cooling Off Period (PICOP). You have completed a product discussion at branch or via phone on <%= date %>, hence the 2 calendar days cooling off requirement is fulfilled.',
                footerBtn: 'Accept PICOP and Proceed with Transaction'
            },
            B: {
                guideline: 'Effective from 1 Jan 2011, a Pre-Investment Cooling Off Period (PICOP) arrangement is required by the Hong Kong Monetary Authority (HKMA) for customers aged 65 or above (subject to limited exceptions), to ensure these customers have sufficient time to consider their non-listed derivative product purchase.',
                requirement: 'Under the above guideline, the HKMA allows you the flexibility to be exempted from the arrangement, given that you have previous investment experience of equity linked product and your investment amount is below 20% of your total net worth (excluding real estate properties) across all banks.',
                option1: 'You can choose to be exempted from the arrangement and proceed with the investment transaction now, or',
                leftBtn: 'Proceed with Transaction Now',
                option2: 'You can choose to apply the Pre-Investment Cooling Off Period (PICOP) and visit our branch for discussion and order placement.',
                footerBtn: 'Exit'
            },
            C: {
                guideline: 'Effective from 1 Jan 2011, a Pre-Investment Cooling Off Period (PICOP) arrangement is required by the Hong Kong Monetary Authority (HKMA) for customers aged 65 or above (subject to limited exceptions), to ensure these customers have sufficient time to consider their non-listed derivative product purchase.',
                requirement: 'Under the above guideline, the HKMA allows you the flexibility to be exempted from the arrangement, given that you have previous investment experience of equity linked product and your investment amount is below 20% of your total net worth (excluding real estate properties) across all banks.',
                option1: 'You can choose to be exempted from the arrangement and proceed with the investment transaction now, or',
                leftBtn: 'Proceed with Transaction Now',
                option2: 'You can choose to apply the Pre-Investment Cooling Off Period (PICOP). You have completed a product discussion at branch or via phone, but the 2 calendar days of cooling off period has not yet expired. Please revisit us 2 calendar days after <%= date %> for order placement via any channel.',
                footerBtn: 'Exit'
            },
            D: {
                requirement: 'We regret that we are unable to proceed with the transaction base on the information you provided to us.',
                rightBtn: 'Exit'
            },
            E: {
                requirement: 'We regret that we are unable to proceed with the transaction base on the information you provided to us.',
                rightBtn: 'Exit'
            },
            F: {
                guideline: 'Effective from 1 Jan 2011, a Pre-Investment Cooling Off Period (PICOP) arrangement is required by the Hong Kong Monetary Authority (HKMA) for customers aged 65 or above (subject to limited exceptions), to ensure these customers have sufficient time to consider their non-listed derivative product purchase.',
                requirement: 'Under the above guideline, you are required to follow the Pre-Investment Cooling Off Period (PICOP) arrangement given that you do not have previous investment experience of equity linked product.',
                option1: 'To place your order, please visit our branch for discussion.',
                rightBtn: 'Exit'
            },
            G: {
                guideline: 'Effective from 1 Jan 2011, a Pre-Investment Cooling Off Period (PICOP) arrangement is required by the Hong Kong Monetary Authority (HKMA) for customers aged 65 or above (subject to limited exceptions), to ensure these customers have sufficient time to consider their non-listed derivative product purchase.',
                requirement: 'Under the above guideline, you are required to follow the Pre-Investment Cooling Off Period (PICOP) arrangement given that you do not have previous investment experience of equity linked product.',
                option1: 'You have completed a product discussion at branch or via phone, but the calendar days of cooling off period has not yet expired. Please revisit us 2 calendar days after <%= date %> for order placement via any channel.',
                rightBtn: 'Exit'
            },
            H: {
                guideline: 'Effective from 1 Jan 2011, a Pre-Investment Cooling Off Period (PICOP) arrangement is required by the Hong Kong Monetary Authority (HKMA) for certain types of non-listed derivative product purchases to enhance investor protection.',
                requirement: 'Under the above guideline, you are required to follow the Pre-Investment Cooling Off Period (PICOP) arrangement given that you do not have previous investment experience of equity linked product and your investment amount exceeds 20% of your total net worth (excluding real estate properties) across all banks.',
                option1: 'To place your order, please visit our branch for discussion.',
                leftBtn: 'Back',
                rightBtn: 'Exit'
            },
            I: {
                guideline: 'Effective from 1 Jan 2011, a Pre-Investment Cooling Off Period (PICOP) arrangement is required by the Hong Kong Monetary Authority (HKMA) for certain types of non-listed derivative product purchases to enhance investor protection.',
                requirement: 'Under the above guideline, you are required to follow the Pre-Investment Cooling Off Period (PICOP) arrangement given that you do not have previous investment experience of equity linked product and your investment amount exceeds 20% of your total net worth (excluding real estate properties) across all banks.',
                option1: 'You have completed a product discussion at branch or via phone, but the calendar days of cooling off period has not yet expired. Please revisit us 2 calendar days after <%= date %> for order placement via any channel.',
                leftBtn: 'Back',
                rightBtn: 'Exit'
            },
            error: {
                contentText1: 'Effective from 1 Jan 2011, a Pre-Investment Cooling Off Period (PICOP) arrangement is required by the Hong Kong Monetary Authority (HKMA) for certain types of non-listed derivative product purchase to enhance investor protection.',
                contentText2: 'Under the above guideline, you may be required to follow the Pre-Investment Cooling Off Period (PICOP) arrangement.',
                contentText3: 'Please contact HSBC Personal Banking Hotline or local branch for details.'
            },
            GENERAL_ERROR: 'Service is temporarily unavailable. Please try again later.'
        },
        DCDErrorMessage: {
            CUS001: 'Since your personal information has just been updated, we are unable to check your purchase/subscription order against regulatory requirements. Please log off and log on to your Personal Internet Banking again to proceed the order placement. Should you have any questions, please call your Relationship Manager or (852) 2233 3322 for HSBC Premier customers, (852) 2748 8333 for HSBC Advance customers or Customer Service Hotline (852) 2233 3000 for other customers.(Ref: CUS001)',
        }
    },
    localeZhHK:{ RPQWarningMsg: {
            TITLE: '投資風險評級',
            EMPTY: {
                warningText: '您需要完成風險取向問卷以買入股票掛鈎投資。',
                msg: '我們並沒有您的風險評估記錄。於進行任何投資交易前，請按下面按鍵完成問卷以了解您的風險取向。',
                leftBtn: '完成風險取向問卷'
            },
            EXPIRE: {
                warningText: '您需要完成風險取向問卷以買入股票掛鈎投資。',
                msg: '您最近一次的風險評估已無效。於進行任何投資交易前，請按下面按鍵重新檢視您的風險取向。',
                leftBtn: '重新檢視風險取向'
            },
            HIGHER: {
                warningText: '產品風險水平較您的投資風險取向為高。因此，該產品可能不適合您。',
                msg: '如您欲繼續進行認購，請按下面「接受風險並繼續」鍵以接受此風險。或者您亦可按下面「重新檢視風險取向」鍵重新檢視您的風險取向。' ,
                moreDetail: '此提示訊息並不構成任何產品的招攬銷售或建議。如您欲獲得我們的招攬或建議，應聯絡我們，並在交易前接受我們的合適性評估（如相關）。',
                leftBtn: '重新檢視風險取向',
                rightBtn: '接受風險並繼續'
            }
        },
        PICOPWarningMsg: {
            TITLE: '落單冷靜期',
            A: {
                guideline: '因應香港金融管理局（金管局）為保障投資者發出的指引，由2011年1月1日起，65歲或以上的客戶（除特別豁免情況下）認購非上市衍生產品須實施落單冷靜期（冷靜期）之安排，讓客戶有充足的時間考慮投資。',
                requirement: '由於您過往曾投資股票掛鈎產品及您是次的投資金額低於您在所有銀行的總資產凈值（不包括物業）的20%，金管局准許您選擇不需要落單冷靜期（冷靜期）之安排。',
                option1: '您可選擇豁免落單冷靜期（冷靜期）之安排，即時進行交易，或',
                leftBtn: '即時進行交易',
                option2: '您可選擇依從落單冷靜期（冷靜期）之安排。您已於<%= date %>在分行或通過電話了解產品詳情，因此2個曆日的冷靜期已屆滿。',
                footerBtn: '依從冷靜期安排及繼續進行交易'
            },
            B: {
                guideline: '因應香港金融管理局（金管局）為保障投資者發出的指引，由2011年1月1日起，65歲或以上的客戶（除特別豁免情況下）認購非上市衍生產品須實施落單冷靜期（冷靜期）之安排，讓客戶有充足的時間考慮投資。',
                requirement: '由於您過往曾投資股票掛鈎產品及您是次的投資金額低於您在所有銀行的總資產凈值（不包括物業）的20%，金管局准許您選擇不需要落單冷靜期（冷靜期）之安排。',
                option1: '您可選擇豁免落單冷靜期（冷靜期）之安排，即時進行交易，或',
                leftBtn: '即時進行交易',
                option2: '您可選擇依從落單冷靜期（冷靜期）之安排，到任何滙豐分行了解產品詳情及進行交易。',
                footerBtn: '離開'
            },
            C: {
                guideline: '因應香港金融管理局（金管局）為保障投資者發出的指引，由2011年1月1日起，65歲或以上的客戶（除特別豁免情況下）認購非上市衍生產品須實施落單冷靜期（冷靜期）之安排，讓客戶有充足的時間考慮投資。',
                requirement: '由於您過往曾投資股票掛鈎產品及您是次的投資金額低於您在所有銀行的總資產凈值（不包括物業）的20%，金管局准許您選擇不需要落單冷靜期（冷靜期）之安排。',
                option1: '您可選擇豁免落單冷靜期（冷靜期）之安排，即時進行交易，或',
                leftBtn: '即時進行交易',
                option2: '您可選擇依從落單冷靜期（冷靜期）之安排。您已在分行或通過電話了解產品詳情，但2個曆日的冷靜期仍未屆滿。請於<%= date %>的2個曆日後於匯豐分行或網上理財落單進行交易。',
                footerBtn: '離開'
            },
            D: {
                requirement: '因應您所提供的資料，我們很抱歉未能為您繼續此交易。',
                rightBtn: '離開'
            },
            E: {
                requirement: '因應您所提供的資料，我們很抱歉未能為您繼續此交易。',
                rightBtn: '離開'
            },
            F: {
                guideline: '因應香港金融管理局為保障投資者發出的指引，由2011年1月1日起，65歲或以上的客戶(除特別豁免情況下)認購非上市衍生產品須實施落單冷靜期（冷靜期）之安排，讓客戶有充足的時間考慮投資。',
                requirement: '由於您過往沒有股票掛鈎產品的投資經驗，金管局要求您須依從落單冷靜期（冷靜期）的安排。',
                option1: '如欲進行認購，請到任何滙豐分行了解詳情。',
                rightBtn: '離開'
            },
            G: {
                guideline: '因應香港金融管理局為保障投資者發出的指引，由2011年1月1日起，65歲或以上的客戶(除特別豁免情況下)認購非上市衍生產品須實施落單冷靜期（冷靜期）之安排，讓客戶有充足的時間考慮投資。',
                requirement: '由於您過往沒有股票掛鈎產品的投資經驗，金管局要求您須依從落單冷靜期（冷靜期）的安排。',
                option1: '您已在分行或通過電話了解產品詳情，但2個曆日的冷靜期仍未屆滿。請於<%= date %>2個曆日後於任何滙豐分行或網上理財進行交易。',
                rightBtn: '離開'
            },
            H: {
                guideline: '因應香港金融管理局為保障投資者發出的指引，由2011年1月1日起，部份非上市衍生產品的認購須實施落單冷靜期（冷靜期）之安排。',
                requirement: '由於您過往沒有股票掛鈎產品的投資經驗，而您是次的投資金額高於您在所有銀行的總資產凈值（不包括物業）的20%，金管局要求您須依從落單冷靜期（冷靜期）的安排。',
                option1: '如欲進行認購，請到任何滙豐分行了解詳情。',
                leftBtn: '上一步',
                rightBtn: '離開'
            },
            I: {
                guideline: '因應香港金融管理局為保障投資者發出的指引，由2011年1月1日起，部份非上市衍生產品的認購須實施落單冷靜期（冷靜期）之安排。',
                requirement: '由於您過往沒有股票掛鈎產品的投資經驗，而您是次的投資金額高於您在所有銀行的總資產凈值（不包括物業）的20%，金管局要求您須依從落單冷靜期（冷靜期）的安排。',
                option1: '您已在分行或通過電話了解產品詳情，但2個曆日的冷靜期仍未屆滿。請於<%= date %>的2個曆日後於任何滙豐分行或網上理財進行交易。',
                leftBtn: '上一步',
                rightBtn: '離開'
            },
            error: {
                contentText1: '因應香港金融管理局為保障投資者發出的指引，由2011年1月1日起，部份非上市衍生產品的認購須實施落單冷靜期（冷靜期）之安排。',
                contentText2: '根據以上指引您或需遵循落單冷靜期（冷靜期）之安排。',
                contentText3: '如欲進行認購，請到任何滙豐分行了解詳情。'
            },
            GENERAL_ERROR: 'Service is temporarily unavailable. Please try again later.'
        },
        DCDErrorMessage: {
            CUS001: '由於您的個人資料剛被更新，本行暫時未能核對您的認購指示是否符合監管機構的要求。請先登出然後重新登入您的個人網上理財服務，以便本行執行您的認購指示。如有查詢，卓越理財客戶可聯絡你的客戶經理或致電(852) 2233 3322；運籌理財客戶請致電(852) 2748 8333；其他客戶請致電客戶服務熱線(852) 2233 3000。(Ref: CUS001)',
        }
    },
    localeZhCN:{RPQWarningMsg: {
            TITLE: '投资风险评级',
            EMPTY: {
                warningText: '您需要完成风险取向问卷以买入股票挂钩投资。',
                msg: '我们并没有您的风险评估记录。于进行任何投资交易前，请按下面按键完成问卷以了解您的风险取向。',
                leftBtn: '完成风险取向问卷'
            },
            EXPIRE: {
                warningText: '您需要完成风险取向问卷以买入股票挂钩投资。',
                msg: '您最近一次的风险评估已无效。于进行任何投资交易前，请按下面按钮重新检视您的风险取向。',
                leftBtn: '重新检视风险取向'
            },
            HIGHER: {
                warningText: '产品风险水平较您的投资风险取向为高。因此，该产品可能不适合您。',
                msg: '如您欲继续进行认购，请按下面「接受风险并继续」按键以接受此风险。或者您亦可按下面「重新检视风险取向」键重新检视您的风险取向。' ,
                moreDetail: '此提示讯息并不构成任何产品的招揽销售或建议。如您欲获得我们的招揽或建议，应联络我们，并在交易前接受我们的合适性评估（如相关）。',
                leftBtn: '重新检视风险取向',
                rightBtn: '接受风险并继续'
            }
        },
        PICOPWarningMsg: {
            TITLE: '落单冷静期',
            A: {
                guideline: '因应香港金融管理局（金管局）为保障投资者发出的指引，由2011年1月1日起，65岁或以上的客户（除特别豁免情况下）认购非上市衍生产品须实施落单冷静期（冷静期）之安排，让客户有充足的时间考虑投资。',
                requirement: '由于您过往曾投资股票挂钩产品及您是次的投资金额低于您在所有银行的总资产净值（不包括物业）的20%，金管局准许您选择不需要落单冷静期（冷静期）之安排。',
                option1: '您可选择豁免落单冷静期（冷静期）之安排，即时进行交易，或',
                leftBtn: '即时进行交易',
                option2: '您可选择依从落单冷静期（冷静期）之安排。您已于<%= date %>在分行或通过电话了解产品详情，因此2个历日的冷静期已届满。',
                footerBtn: '依从冷静期安排及继续进行交易'
            },
            B: {
                guideline: '因应香港金融管理局（金管局）为保障投资者发出的指引，由2011年1月1日起，65岁或以上的客户（除特别豁免情况下）认购非上市衍生产品须实施落单冷静期（冷静期）之安排，让客户有充足的时间考虑投资。',
                requirement: '由于您过往曾投资股票挂钩产品及您是次的投资金额低于您在所有银行的总资产净值（不包括物业）的20%，金管局准许您选择不需要落单冷静期（冷静期）之安排。',
                option1: '您可选择豁免落单冷静期（冷静期）之安排，即时进行交易，或',
                leftBtn: '即时进行交易',
                option2: '您可选择依从落单冷静期（冷静期）之安排，到任何汇丰分行了解产品详情及进行交易。',
                footerBtn: '离开'
            },
            C: {
                guideline: '因应香港金融管理局（金管局）为保障投资者发出的指引，由2011年1月1日起，65岁或以上的客户（除特别豁免情况下）认购非上市衍生产品须实施落单冷静期（冷静期）之安排，让客户有充足的时间考虑投资。',
                requirement: '由于您过往曾投资股票挂钩产品及您是次的投资金额低于您在所有银行的总资产净值（不包括物业）的20%，金管局准许您选择不需要落单冷静期（冷静期）之安排。',
                option1: '您可选择豁免落单冷静期（冷静期）之安排，即时进行交易，或',
                leftBtn: '即时进行交易',
                option2: '您可选择依从落单冷静期（冷静期）之安排。您已在分行或通过电话了解产品详情，但2个历日的冷静期仍未届满。请于<%= date %>的2个历日后于任何汇丰分行或网上理财落单进行交易。',
                footerBtn: '离开'
            },
            D: {
                requirement: '因应您所提供的资料，我们很抱歉未能为您继续此交易。',
                rightBtn: '离开'
            },
            E: {
                requirement: '因应您所提供的资料，我们很抱歉未能为您继续此交易。',
                rightBtn: '离开'
            },
            F: {
                guideline: '因应香港金融管理局为保障投资者发出的指引，由2011年1月1日起，65岁或以上的客户(除特别豁免情况下)认购非上市衍生产品须实施落单冷静期（冷静期）之安排，让客户有充足的时间考虑投资。',
                requirement: '由于您过往没有股票挂钩产品的投资经验，金管局要求您须依从落单冷静期（冷静期）的安排。',
                option1: '如欲进行认购，请到任何汇丰分行了解详情。',
                rightBtn: '离开'
            },
            G: {
                guideline: '因应香港金融管理局为保障投资者发出的指引，由2011年1月1日起，65岁或以上的客户(除特别豁免情况下)认购非上市衍生产品须实施落单冷静期（冷静期）之安排，让客户有充足的时间考虑投资。',
                requirement: '由于您过往没有股票挂钩产品的投资经验，金管局要求您须依从落单冷静期（冷静期）的安排。',
                option1: '您已在分行或通过电话了解产品详情，但2个历日的冷静期仍未届满。请于<%= date %>2个历日后于任何滙丰分行或网上理财进行交易。',
                rightBtn: '离开'
            },
            H: {
                guideline: '因应香港金融管理局为保障投资者发出的指引，由2011年1月1日起，部份非上市衍生产品的认购须实施落单冷静期（冷静期）之安排。',
                requirement: '由于您过往没有股票挂钩产品的投资经验，而您是次的投资金额高于您在所有银行的总资产净值（不包括物业）的20%，金管局要求您须依从落单冷静期（冷静期）的安排。',
                option1: '如欲进行认购，请到任何汇丰分行了解详情。',
                leftBtn: '上一步',
                rightBtn: '离开'
            },
            I: {
                guideline: '因应香港金融管理局为保障投资者发出的指引，由2011年1月1日起，部份非上市衍生产品的认购须实施落单冷静期（冷静期）之安排。',
                requirement: '由于您过往没有股票挂钩产品的投资经验，而您是次的投资金额高于您在所有银行的总资产净值（不包括物业）的20%，金管局要求您须依从落单冷静期（冷静期）的安排。',
                option1: '您已在分行或通过电话了解产品详情，但2个历日的冷静期仍未届满。请於<%= date %>的2个历日後於任何滙丰分行或网上理财进行交易。',
                leftBtn: '上一步',
                rightBtn: '离开'
            },
            error: {
                contentText1: '因应香港金融管理局为保障投资者发出的指引，由2011年1月1日起，部份非上市衍生产品的认购须实施落单冷静期（冷静期）之安排。',
                contentText2: '根据以上指引您或需遵循落单冷静期（冷静期）之安排。',
                contentText3: '如欲进行认购，请到任何滙丰分行了解详情。'
            },
            GENERAL_ERROR: 'Service is temporarily unavailable. Please try again later.'
        },
        DCDErrorMessage: {
            CUS001: '由于您的个人资料剛已被更新，本行暂时未能核对您的认购指示是否符合监管机构的要求。请先登出然後重新登入您的个人网上理财服务，以便本行执行您的认购指示。如有查询，卓越理财客户可联络你的客户经理或致电(852) 2233 3322；运筹理财客户请致电(852) 2748 8333；其他客户请致电客户服务热线(852) 2233 3000。(Ref: CUS001)'
        }
    }
}


const checkList = _=>list[ checkLocal() ]

export default checkList