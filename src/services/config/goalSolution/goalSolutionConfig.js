export const goalSolutionConfig={
        mjAppConfig:{
            retrieve_RTQ_Enabled : true,
			display_joint_customer_enabled : false,		
			showIA : true,
    		SPN_APPLY_INFLATION_INDICATOR : "Y",
    		SPN_CURRENCY_CODE : "EUR",
    		SPN_GOAL_DESCRIPTION : "Financial Needs Analysis",
    		RTQ_ENABLE_CHECK : "Y",
    		reviewGoal_WIRE_WD_DEST : "wealthv2_4.goaltracking-holdings-portlet-screenid",
    		productView_WIRE_WD_DEST : "wealthv2_4.wealthdashboard-currentholdings-portlet-screenid",
    		retrieveRTQSummary_enabled : false,
    		retrieveKNESummary_enabled : false
        },
        GoalPlannerConstants:{
            JOURNEY_MJ_PIQ :"MJ_PIQ",
            JOURNEY_MJ_FNA : "MJ_FNA",
            JOURNEY_MJ_RTQ : "MJ_RTQ"
        },
        mjWireDestMsgSrc:{
            S_W_IP:"preferences",
            S_W_CP:"fna"
        },
        RetrieveInvolvedPartyDetailsIndividualModel:{
                cdmBusinessObjectIdentification : {
                    businessObjectType : "IP",
                    externalReferenceNumber : ""
                },
                cdmResponseScope : {
                    scopeName : "OHAPE_IND",
                    scopeVersion : "0001"
                },
                cdmResponseScope2 : {
                    scopeName : "OHAPE_NAME",
                    scopeVersion : "0001"
                },
                cdmResponseScope3 : {
                    scopeName : "OHAPE_ADDR_DFLT",
                    scopeVersion : "0001"
                },
                cdmResponseScope4 : {
                    scopeName : "OHAPE_EMAIL",
                    scopeVersion : "0001"
                },
                cdmResponseScope5 : {
                    scopeName : "OHAPE_TEL_NO",
                    scopeVersion : "0001"
                },
                cdmResponseScope6 : {
                    scopeName : "OHAPE_CDE",
                    scopeVersion : "0001"
                },
                cdmResponseScope7 : {
                    scopeName : "OHAPE_ID",
                    scopeVersion : "0001"
                },
                cdmResponseScope8 : {
                    scopeName : "OHAPE_IP_ADD_DTLS",
                    scopeVersion : "0001"
                },
                cdmResponseScope9 : {
                    scopeName : "OHAPE_ADDR_CORR",
                    scopeVersion : "0001"
                },
                cdmResponseScope10 : {
                    scopeName : "OHAPE_ADDR_WORK",
                    scopeVersion : "0001"
                },
                cdmResponseScope11 : {
                    scopeName : "OHAPE_FIN_DTLS",
                    scopeVersion : "0001"
                },
                coreReserveAreaDetails : [
                    {

                    }
                ],
                localFieldsAreaDetails : [{

                    }]
        },
        filterCriteriaConfig:{
            tab_for_product_type:{
                FE_UT:"TAB_UT",
                FE_INS:"TAB_INS",
                FE_BOND:"TAB_OTHER",
                FE_SP:"TAB_OTHER",
                FE_DPS:"TAB_OTHER"
            },
            wpc_product_type_codes:{
                FE_UT:"UT",
                FE_BOND:"BOND",
                FE_SP:"DPS,ELI,SID,SN",
                FE_DPS:"FCYDEP,LCYDEP",
                TAB_INS:"INS",
                TAB_OTHER:"BOND,DPS,ELI,SID,SN,FCYDEP,LCYDEP"
            },
            duct_type_codes:{
                TAB_UT:"UT"
            },
            number_of_records_per_page:"40",
            show_all_risk_level:"Y",
            max_allowable_products:"20",
            ignoreCheckingBlackChar:"Y",
            save_discussed_product_timeout:"20000",
            show_asset_class_list:"N",
            product_types_belong_to_other :" FE_BOND,FE_SP,FE_DPS",
            show_spn_insurance_tab:"N",
            suitable_products_nsp:"Y",
            suitable_products_eo:"Y",
            suitable_product_spn:"Y",
            COUNT_SEARCH_ENABLE:true,
            enable_suitable_product_filter:"NSP,SPN,EO",
            enable_shortlist_checkbox_checked:"Y",
            CHECK_SELECTED_RISK_LEVEL:"Y",
            skipDiscussInvalidProd:"Y",
            INSCONPERD:"INSCONPERD_ANSWER_1,INSCONPERD_ANSWER_2,INSCONPERD_ANSWER_3,INSCONPERD_ANSWER_4,INSCONPERD_ANSWER_5,INSCONPERD_ANSWER_6",
            INSTIMEFRAME:"INSTIMEFRAME_ANSWER_1,INSTIMEFRAME_ANSWER_2,INSTIMEFRAME_ANSWER_3,INSTIMEFRAME_ANSWER_4,INSTIMEFRAME_ANSWER_5",
            customerObjectiveList:"PROD_UDR_OBJ_FUR_INC,PROD_UDR_OBJ_SAV,PROD_UDR_OBJ_INV,PROD_UDR_OBJ_OTHER",
            showInsuranceFilterDropdownList:"N",
            DISABLE_SEARCH_WO_INS_PIQ:"Y",
            min_allowable_fund_compare_products:"2",
            max_allowable_fund_compare_products:"10",
            max_allowable_fund_compare_selected_products:"5",
            RTQ_ENABLE_CHECK:"Y",
            RTQ_ENABLE_WARNING:"Y",
            Investment_Journey_Higher_Risk_Profiles_enabled:false,
            TAB_ALL_FOR_PROD_SELECTION:{
                formula:" (({100} AND {101} AND {102}) OR ({110} AND {111} AND {112} AND {113}) OR ((({120} AND {121}) OR ({122} AND {123}) OR {124}) AND {125})) ",
                criterias:"c_ut_a,c_ut_b,c_ut_c,c_ins_a,c_ins_b,c_ins_c,c_ins_d,c_other_a,c_other_b,c_other_c,c_other_d,c_other_e,c_other_f"
            },
            TAB_ALL_FOR_PROD_SELECTION_NO_INS:{
                formula:" (({100} AND {101} AND {102}) OR ({110} AND {111} AND {112} AND {113}) OR ((({120} AND {121}) OR ({122} AND {123}) OR {124}) AND {125})) ",
                criterias:"c_ut_a,c_ut_b,c_ut_c,c_ins_a,c_ins_b_no,c_ins_c,c_ins_d,c_other_a,c_other_b,c_other_c,c_other_d,c_other_e,c_other_f"
            },
            TAB_UT:{
                formula:"{100} AND {101} AND {102}",
                criterias:"c_ut_a,c_ut_b,c_ut_c"
            },
            c_ut_a:{
                key:"PROD_TYPE_CDE",
                values:"UT",
                index:100,
                valueType:"REFDAT"
            },
            c_ut_b:{
                key:"DMY_PROD_SUBTP_REC_IND",
                values:"N,NULL",
                index:101
            },
            c_ut_c:{
                key : "ALLOW_BUY_PROD_IND",
                values : "Y",
                index : 102
            },
            TAB_INS:{
                formula:" {110} AND {111} AND {112} AND {113} ",
                criterias:"c_ins_a,c_ins_b,c_ins_c,c_ins_d"
            },
            TAB_INS_NO:{
                formula:" {110} AND {111} AND {112} AND {113} ",
                criterias:"c_ins_a,c_ins_b_no,c_ins_c,c_ins_d"
            },
            c_ins_a:{
                key:"PROD_TYPE_CDE",
                values:"INS",
                index:110,
                valueType:"REFDAT"
            },
            c_ins_b:{
                key:"PROD_SUBTP_CDE",
                values:"INSP,INSS,INSII,INSIL",
                index:111
            },
            c_ins_b_no:{
                key:"PROD_SUBTP_CDE",
                values:"INS_DUMMY",
                index:111
            },
            c_ins_c:{
                key:"DMY_PROD_SUBTP_REC_IND",
                values:"N,NULL",
                index:112
            },
            c_ins_d:{
                key : "ALLOW_BUY_PROD_IND",
                values : "Y",
                index : 113
            },
            TAB_OTHER:{
                formula:" (({120} AND {121}) OR ({122} AND {123}) OR {124}) AND {125} ",
                criterias:"c_other_a,c_other_b,c_other_c,c_other_d,c_other_e,c_other_f",
            },
            c_other_a:{
                key:"PROD_TYPE_CDE",
                values:"BOND",
                index:120,
                valueType:"REFDAT"
            },
            c_other_b:{
                key:"DMY_PROD_SUBTP_REC_IND",
                values:'N,NULL,Y',
                index:121
            },
            c_other_c:{
                key : "PROD_TYPE_CDE",
                values : "DPS,SID,ELI,SN",
                index : 122
            },
            c_other_d:{
                key : "DMY_PROD_SUBTP_REC_IND",
                values : "Y",
                index : 123
            },
            c_other_e:{
                key : "PROD_TYPE_CDE",
                values : "FCYDEP,LCYDEP",
                index : 124
            },
            c_other_f:{
                key : "ALLOW_BUY_PROD_IND",
                values : "Y",
                index : 125
            }
        },
        sortingCriteriaConfig:{
            search_shortlist_prod_only_feature:'Y',
            sortingCriteriaKeysList:'priorityKeysList,riskLevelKeysList,productNameKeysList',
            riskLevelKeysList:'PRODUCT_RISK',
            productNameKeysList:'PRODUCT_NAME',
            priorityKeysList:'WEAL_ACCUM,PLAN_RET,EDUC,LIV_RET,PROTC',
            PRODUCT_RISK:'A.RISK_LVL_CDE,-',
            WEAL_ACCUM:'A.PRTY_WLTH_ACCUM_GOAL_CDE,+',
            PLAN_RET:'A.PRTY_PLN_FOR_RTIRE_CDE,+',
            EDUC:'A.PRTY_EDUC_CDE,+',
            LIV_RET:'A.PRTY_LIVE_IN_RTIRE_CDE,+',
            PROTC:'A.PRTY_PROTC_CDE,+',
            PRODUCT_NAME:'A.PROD_NAME,+',
            DEFALUT_ORDER:'+',
        }
}