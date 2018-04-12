import { changeLocale, changeLocaleLong, changeMessages } from './common/actions/intl';
import { LONG_LOCALES, DEFAULT_LONG_LOCALE, NLS } from './locale/constant'; 
import routeHelper from 'common/lib/routeHelper';
import commonConfig from 'config/commonConfig';
import { exampleRouters } from './exmaple/index';

export function commonRouterHandler (store) {

}

export default function createRoutes (store) {
    const locale_map = commonConfig.locale_map;
    return {
        childRoutes: [
            {
                path: `${CONFIG.WEB_ROOT}`,
                component: require('./FinancialPlanning/login/containers/login_ctn').default
            },
            {
                path: `${CONFIG.WEB_ROOT}main`,
                indexRoute: {
                    onEnter: (nextState, replace) => {
                        const preferred_Locale = routeHelper.getCookie(locale_map.locale_preferred.key);
                        const index = locale_map.locale_preferred.val.indexOf(preferred_Locale);
                        const locale = index > -1 && locale_map.locale_eli.val[index] || DEFAULT_LONG_LOCALE;
                        replace(`${CONFIG.WEB_ROOT}main/${locale}`)
                    }
                },
                component: require('./common/containers/App').default,
                childRoutes: [
                    {
                        path: `${CONFIG.WEB_ROOT}main/:locale`,
                        indexRoute: {
                            onEnter: (nextState, replace) => {
                                // replace(`${CONFIG.WEB_ROOT}main/${nextState.params.locale}/index`);
                            }
                        },
                        // component: require('./common/containers/App').default,
                        getChildRoutes: (location, cb) => {
                            const long_locale = location.params.locale.toLowerCase();
                            const index = locale_map.locale_eli.val.indexOf(long_locale);
                            const preferred_Locale = locale_map.locale_preferred.val[index];
                            if ( LONG_LOCALES.indexOf(long_locale) > -1) {
                                const state = store.getState();
                                if (state.intl.localeLong !== long_locale) {
                                    store.dispatch(changeLocaleLong(long_locale));
                                     store.dispatch(changeLocale(NLS[long_locale].locale));
                                    store.dispatch(
                                        changeMessages(NLS[long_locale].msg)
                                    );
                                }

                                cb(null, [
                                    {
                                        path: 'sample',
                                        getComponent (nextState, cb) {
                                            require.ensure(
                                                ['./Sample/containers/index'],
                                                (require) => {
                                                    const component = require('./Sample/containers/index').default;
                                                    commonRouterHandler(store);
                                                    cb(null, component);
                                                }
                                            );
                                        }
                                    },
                                    {
                                        path: 'index',
                                        getComponent (nextState, cb) {
                                            require.ensure(
                                                ['./FinancialPlanning/landing/containers/index'],
                                                (require) => {
                                                    const component = require('./FinancialPlanning/landing/containers/index').default;
                                                    commonRouterHandler(store);
                                                    cb(null, component);
                                                }
                                            );
                                        }
                                    },
                                    {
                                        path: 'landing',
                                        getComponent (nextState, cb) {
                                            require.ensure(
                                                ['./FinancialPlanning/landing/containers/index'],
                                                (require) => {
                                                    const component = require('./FinancialPlanning/landing/containers/index').default;
                                                    commonRouterHandler(store);
                                                    cb(null, component);
                                                }
                                            );
                                        }
                                    },
                                    {
                                        path: 'knowledgeAndExperience',
                                        getComponent (nextState, cb) {
                                            require.ensure(
                                                ['./FinancialPlanning/knowledgeAndExperience/containers/knowledgeAndExperience'],
                                                (require) => {
                                                    const component = require('./FinancialPlanning/knowledgeAndExperience/containers/knowledgeAndExperience').default;
                                                    commonRouterHandler(store);
                                                    cb(null, component);
                                                }
                                            );
                                        }
                                    },
                                    {
                                        path: 'affordability',
                                        getComponent (nextState, cb) {
                                            require.ensure(
                                                ['./FinancialPlanning/affordability/containers/affordability_ctn'],
                                                (require) => {
                                                    const component = require('./FinancialPlanning/affordability/containers/affordability_ctn').default;
                                                    commonRouterHandler(store);
                                                    cb(null, component);
                                                }
                                            );
                                        }
                                    },
                                    {
                                        path: 'fhc',
                                        getComponent (nextState, cb) {
                                            require.ensure(
                                                ['./FinancialPlanning/FHC/containers/fhc_ctn'],
                                                (require) => {
                                                    const component = require('./FinancialPlanning/FHC/containers/fhc_ctn').default;
                                                    commonRouterHandler(store);
                                                    cb(null, component);
                                                }
                                            );
                                        }
                                    },
                                    {
                                        path: 'goalSimulator(/:goalType)',
                                        getComponent (nextState, cb) {
                                            require.ensure(
                                                ['./FinancialPlanning/goalSimulator/containers/goalSimulator_ctn'],
                                                (require) => {
                                                    const component = require('./FinancialPlanning/goalSimulator/containers/goalSimulator_ctn').default;
                                                    commonRouterHandler(store);
                                                    cb(null, component);
                                                }
                                            );
                                        }
                                    },
                                    {
                                        path: 'rtq/riskProfileQuestionnaire006',
                                        getComponent (nextState, cb) {
                                            require.ensure(
                                                ['./FinancialPlanning/riskProfileQuestionnaire/containers/riskprofileQuestionnaire'],
                                                (require) => {
                                                    const component = require('./FinancialPlanning/riskProfileQuestionnaire/containers/riskprofileQuestionnaire').default;
                                                    commonRouterHandler(store);
                                                    cb(null, component);
                                                }
                                            );
                                        }
                                    },
                                    {
                                        path: 'rtq/history',
                                        getComponent (nextState, cb) {
                                            require.ensure(
                                                ['./FinancialPlanning/riskProfileQuestionnaire/containers/riskProfileQuestionnaireHistroicalRecords'],
                                                (require) => {
                                                    const component = require('./FinancialPlanning/riskProfileQuestionnaire/containers/riskProfileQuestionnaireHistroicalRecords').default;
                                                    commonRouterHandler(store);
                                                    cb(null, component);
                                                }
                                            );
                                        }
                                    },
									{
                                        path: 'rtq/index',
                                        getComponent (nextState, cb) {
                                            require.ensure(
                                                ['./FinancialPlanning/riskProfileQuestionnaire/containers/riskProfileQuesitonnaire_index'],
                                                (require) => {
                                                    const component = require('./FinancialPlanning/riskProfileQuestionnaire/containers/riskProfileQuesitonnaire_index').default;
                                                    commonRouterHandler(store);
                                                    cb(null, component);
                                                }
                                            );
                                        }
									},

									{
                                        path: 'rtq',
                                        getComponent (nextState, cb) {
                                            require.ensure(
                                                ['./FinancialPlanning/riskProfileQuestionnaire/containers/riskProfile_ctn'],
                                                (require) => {
                                                    const component = require('./FinancialPlanning/riskProfileQuestionnaire/containers/riskProfile_ctn').default;
                                                    commonRouterHandler(store);
                                                    cb(null, component);
                                                }
                                            );
                                        }
                                    },
									 {
                                        path: 'financialProfile',
                                        getComponent (nextState, cb) {
                                            require.ensure(
                                                ['./FinancialPlanning/financialProfile/containers/financialProfile_ctn'],
                                                (require) => {
                                                    const component = require('./FinancialPlanning/financialProfile/containers/financialProfile_ctn').default;
                                                    commonRouterHandler(store);
                                                    cb(null, component);
                                                }
                                            );
                                        }
                                    },
                                    {
                                        path: 'productSummary',
                                        getComponent (nextState, cb) {
                                            require.ensure(
                                                ['./FinancialPlanning/productSummary/containers/productSummary_ctn'],
                                                (require) => {
                                                    const component = require('./FinancialPlanning/productSummary/containers/productSummary_ctn').default;
                                                    commonRouterHandler(store);
                                                    cb(null, component);
                                                }
                                            );
                                        }
                                    },
                                    // {
                                    //     path: 'HistoricalPlans',
                                    //     getComponent (nextState, cb) {
                                    //         require.ensure(
                                    //             ['./FinancialPlanning/HistoricalPlans/containers/HistoricalPlans'],
                                    //             (require) => {
                                    //                 const component = require('./FinancialPlanning/HistoricalPlans/containers/HistoricalPlans').default;
                                    //                 cb(null, component);
                                    //             }
                                    //         );
                                    //     }
                                    // },
                                    {
                                        path: 'recentPirority',
                                        getComponent (nextState, cb) {
                                            require.ensure(
                                                ['./FinancialPlanning/landing/containers/recentPirority_ctn'],
                                                (require) => {
                                                    const component = require('./FinancialPlanning/landing/containers/recentPirority_ctn').default;
                                                    commonRouterHandler(store);
                                                    cb(null, component);
                                                }
                                            );
                                        }
                                    },
                                    {
                                        path: 'flowDemo',
                                        getComponent (nextState, cb) {
                                            require.ensure(
                                                ['./FinancialPlanning/flowApi/containers/flowDemo_ctn'],
                                                (require) => {
                                                    const component = require('./FinancialPlanning/flowApi/containers/flowDemo_ctn').default;
                                                    commonRouterHandler(store);
                                                    cb(null, component);
                                                }
                                            );
                                        }
                                    },
                                    {
                                        path: 'invJourney',
                                        getComponent (nextState, cb) {
                                            require.ensure(
                                                ['./FinancialPlanning/Inv/investmentProductSelection/containers/investmentProductSelection_ctn'],
                                                (require) => {
                                                    const component = require('./FinancialPlanning/Inv/investmentProductSelection/containers/investmentProductSelection_ctn').default;
                                                    commonRouterHandler(store);
                                                    cb(null, component);
                                                }
                                            );
                                        }
                                    },
                                    //invProdSearch
                                    //  {
                                    //     path: 'invProdSearch',
                                    //     getComponent (nextState, cb) {
                                    //         require.ensure(
                                    //             ['./FinancialPlanning/Inv/component/productSelection/productSelection/index'],
                                    //             (require) => {
                                    //                 const component = require('./FinancialPlanning/Inv/component/productSelection/productSelection/index').default;
                                    //                 cb(null, component);
                                    //             }
                                    //         );
                                    //     }
                                    // },
                                    {
                                        path: 'invProdSummary',
                                        getComponent (nextState, cb) {
                                            // ./FinancialPlanning/productSummary/containers/productSummary_ctn
                                            //./FinancialPlanning/Inv/goalSummary/containers/goalSummay_ctn
                                            require.ensure(
                                                ['./FinancialPlanning/Inv/goalSummary/containers/goalSummay_ctn'],
                                                (require) => {
                                                    const component = require('./FinancialPlanning/Inv/goalSummary/containers/goalSummay_ctn').default;
                                                    commonRouterHandler(store);
                                                    cb(null, component);
                                                }
                                            );
                                        }
                                    }
                                    ,
                                    //meetingSummary
                                    {
                                        path: 'meetingSummary',
                                        getComponent (nextState, cb) {
                                            require.ensure(
                                                ['./FinancialPlanning/meetingSummary/containers/meetingSummy_ctn'],
                                                (require) => {
                                                    const component = require('./FinancialPlanning/meetingSummary/containers/meetingSummy_ctn').default;
                                                    commonRouterHandler(store);
                                                    cb(null, component);
                                                }
                                            );
                                        }
                                    },
                                    //report
                                    {
                                        path: 'report',
                                        getComponent (nextState, cb) {
                                            require.ensure(
                                                ['./FinancialPlanning/report/components/report/index'],
                                                (require) => {
                                                    const component = require('./FinancialPlanning/report/components/report/index').default;
                                                    commonRouterHandler(store);
                                                    cb(null, component);
                                                }
                                            );
                                        }
                                    },
                                    //orderPlacement
                                    {
                                        path: 'orderPlacement',
                                        getComponent (nextState, cb) {
                                            require.ensure(
                                                ['./FinancialPlanning/orderPlacement/containers/orderPlacement_ctn'],
                                                (require) => {
                                                    const component = require('./FinancialPlanning/orderPlacement/containers/orderPlacement_ctn').default;
                                                    commonRouterHandler(store);
                                                    cb(null, component);
                                                }
                                            );
                                        }
                                    },
                                    //insJourney
                                    {
                                        path: 'insJourney',
                                        getComponent (nextState, cb) {
                                            require.ensure(
                                                ['./FinancialPlanning/SIJ/needAnalysis/containers/needAnalysisPanel_ctn'],
                                                (require) => {
                                                    const component = require('./FinancialPlanning/SIJ/needAnalysis/containers/needAnalysisPanel_ctn').default;
                                                    commonRouterHandler(store);
                                                    cb(null, component);
                                                }
                                            );
                                        }
                                    },
                                    //insFinProfile
                                    {
                                        path: 'insFinProfile',
                                        getComponent (nextState, cb) {
                                            require.ensure(
                                                ['./FinancialPlanning/SIJ/financialProfile/components/index'],
                                                (require) => {
                                                    const component = require('./FinancialPlanning/SIJ/financialProfile/components/index').default;
                                                    commonRouterHandler(store);
                                                    cb(null, component);
                                                }
                                            );
                                        }
                                    },
                                    //insProdSelection
                                     {
                                        path: 'insProdSelection',
                                        getComponent (nextState, cb) {
                                            require.ensure(
                                                ['./FinancialPlanning/SIJ/productSelection/containers/sij_ps_ctn'],
                                                (require) => {
                                                    const component = require('./FinancialPlanning/SIJ/productSelection/containers/sij_ps_ctn').default;
                                                    commonRouterHandler(store);
                                                    cb(null, component);
                                                }
                                            );
                                        }
                                    },
                                    //insProdSummary
                                    {
                                        path: 'insProdSummary',
                                        getComponent (nextState, cb) {
                                            require.ensure(
                                                ['./FinancialPlanning/SIJ/productSummary/containers/sij_gs_ctn'],
                                                (require) => {
                                                    const component = require('./FinancialPlanning/SIJ/productSummary/containers/sij_gs_ctn').default;
                                                    commonRouterHandler(store);
                                                    cb(null, component);
                                                }
                                            );
                                        }
                                    }
                                ]);
                            }
                        }
                    }
                ]
            },
            ...exampleRouters
        ]
    };
}
