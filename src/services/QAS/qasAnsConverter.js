const qasAnsConverter={
    convertVaildAns:(params) =>{
        let answerSet={};
        const MAX_QUE = 6;
        let q1Start;
        let q2Start;
        let q3Start;
        let q4Start;
        let q1End;
        let q2End;
        let q3End;
        let q4End;
        let questionText= params.questionnaireDocumentTextList;
        for(var i =0;i<questionText.length;i++){  
            let indicator = questionText[i].textIdentificationNumber;
            if(indicator.indexOf("AT_1_A_001") !== -1 || indicator.indexOf("AT_1_C_002") !== -1  ){
                if(indicator.indexOf("AT_1_A_001") !== -1){
                    q1Start= i;
                }else{
                    q1End = i;
                }
            }
            if(indicator.indexOf("AT_2_A_001") !== -1 || indicator.indexOf("AT_2_C_002") !== -1  ){
                if(indicator.indexOf("AT_2_A_001") !== -1){
                    q2Start= i;
                }else{
                    q2End = i;
                }
            }
            if(indicator.indexOf("AT_3_A_001") !== -1 || indicator.indexOf("AT_3_E_002") !== -1  ){
                if(indicator.indexOf("AT_3_A_001") !== -1){
                    q3Start= i;
                }else{
                    q3End = i;
                }
            }
            if(indicator.indexOf("AT_4_A_001") !== -1 || indicator.indexOf("AT_4_E_002") !== -1  ){
                if(indicator.indexOf("AT_4_A_001") !== -1){
                    q4Start= i;
                }else{
                    q4End = i;
                }
            }
        }  
        let answer1Array=[];
        let answer2Array=[];
        let answer3Array=[];
        let answer4Array=[];
        let answer5Array=[];
        let answer6Array=[];
        let q5AText="";
        let q5CText="";
        let q5DText="";
        let q5EText="";
        let q6AText="";
        let q6BText="";
        let q6CText="";
        let q6DText="";
        let q6EText=""; 
        for(var i =0;i<questionText.length;i++){
            let indicator = questionText[i].textIdentificationNumber;
  
            if(i>=q1Start && i<=q1End){
                answer1Array.push(questionText[i].text);
            }
            if(i>=q2Start && i<=q2End){
                answer2Array.push(questionText[i].text);
            }
            if(i>=q3Start && i<=q3End){
                answer3Array.push(questionText[i].text);
            }
            if(i>=q4Start && i<=q4End){
                answer4Array.push(questionText[i].text);
            }
            if(indicator.indexOf("AT_5_A")!== -1){
                if(indicator.indexOf("AT_5_A_001")!== -1){
                    answer5Array.push(questionText[i].text);
                }if(indicator.indexOf("AT_5_A_002")!== -1 || indicator.indexOf("AT_5_A_003")!== -1){
                    q5AText = q5AText + questionText[i].text;
                }if(indicator.indexOf("AT_5_A_003")!== -1){
                    answer5Array.push(q5AText);
                }
            }
            if(indicator.indexOf("AT_5_B")!== -1){
                answer5Array.push(questionText[i].text);
            }
            if(indicator.indexOf("AT_5_C")!== -1){
                if(indicator.indexOf("AT_5_C_001")!== -1){
                    answer5Array.push(questionText[i].text);
                }if(indicator.indexOf("AT_5_C_002")!== -1 || indicator.indexOf("AT_5_C_003")!== -1){
                    q5CText = q5CText + questionText[i].text;
                } if(indicator.indexOf("AT_5_C_003")!== -1){
                    answer5Array.push(q5CText);
                }
            }
            if(indicator.indexOf("AT_5_D")!== -1){
                if(indicator.indexOf("AT_5_D_001")!== -1){
                    answer5Array.push(questionText[i].text);
                }if(indicator.indexOf("AT_5_D_002")!== -1 || indicator.indexOf("AT_5_D_003")!== -1){
                    q5DText = q5DText + questionText[i].text;
                }if(indicator.indexOf("AT_5_D_003")!== -1){
                    answer5Array.push(q5DText);
                }
            }
            if(indicator.indexOf("AT_5_E")!== -1){
                if(indicator.indexOf("AT_5_E_001")!== -1){
                    answer5Array.push(questionText[i].text);
                }if(indicator.indexOf("AT_5_E_002")!== -1 || indicator.indexOf("AT_5_E_003")!== -1){
                    q5EText = q5EText + questionText[i].text;
                }if(indicator.indexOf("AT_5_E_003")!== -1){
                    answer5Array.push(q5EText);
                }
            }
            if(indicator.indexOf("AT_6_A")!== -1){
                if(indicator.indexOf("AT_6_A_001")!== -1){
                    answer6Array.push(questionText[i].text);
                }if(indicator.indexOf("AT_6_A_002")!== -1 || indicator.indexOf("AT_6_A_003")!== -1){
                    q6AText = q6AText + questionText[i].text;
                }if(indicator.indexOf("AT_6_A_003")!== -1){
                    answer6Array.push(q6AText);
                }
            }
            
            if(indicator.indexOf("AT_6_B")!== -1){
                if(indicator.indexOf("AT_6_B_001")!== -1){
                    answer6Array.push(questionText[i].text);
                }if(indicator.indexOf("AT_6_B_002")!== -1 || indicator.indexOf("AT_6_B_003")!== -1){
                    q6BText = q6BText + questionText[i].text;
                }if(indicator.indexOf("AT_6_B_003")!== -1){
                    answer6Array.push(q6BText);
                }
            }
            if(indicator.indexOf("AT_6_C")!== -1){
                if(indicator.indexOf("AT_6_C_001")!== -1){
                    answer6Array.push(questionText[i].text);
                }if(indicator.indexOf("AT_6_C_002")!== -1 || indicator.indexOf("AT_6_C_003")!== -1){
                    q6CText = q6CText + questionText[i].text;
                }if(indicator.indexOf("AT_6_C_003")!== -1){
                    answer6Array.push(q6CText);
                }
            }
            if(indicator.indexOf("AT_6_D")!== -1){
                if(indicator.indexOf("AT_6_D_001")!== -1){
                    answer6Array.push(questionText[i].text);
                }if(indicator.indexOf("AT_6_D_002")!== -1 || indicator.indexOf("AT_6_D_003")!== -1){
                    q6DText = q6DText + questionText[i].text;
                }if(indicator.indexOf("AT_6_D_003")!== -1){
                    answer6Array.push(q6DText);
                }
            }
            if(indicator.indexOf("AT_6_E")!== -1){
                if(indicator.indexOf("AT_6_E_001")!== -1){
                    answer6Array.push(questionText[i].text);
                }if(indicator.indexOf("AT_6_E_002")!== -1 || indicator.indexOf("AT_6_E_003")!== -1){
                    q6EText = q6EText + questionText[i].text;
                }if(indicator.indexOf("AT_6_E_003")!== -1){
                    answer6Array.push(q6EText);
                }
            }
      }
    
      answerSet ={
        a1:answer1Array,
        a2:answer2Array,
        a3:answer3Array,
        a4:answer4Array,
        a5:answer5Array,
        a6:answer6Array,

      }
      console.log("answer Set....", answerSet);
      return answerSet;


    },
    convertVaildRds:(params) =>{
        const MAX_QUE =6
        let riskDes = {}
        let questionText= params.questionnaireDocumentTextList;
        let tempDesRd = [];
        let tempTitile =[];
        for(var i=0;i<questionText.length;i++){         
            let rdIndex = "RD_RISKTLRN";
            let rdTitleIndex = "RN_RISKTLRN"
            let indicator = questionText[i].textIdentificationNumber;
            if(indicator.indexOf(rdTitleIndex) !== -1){
                tempTitile.push(questionText[i].text);
            }
        }
        console.log("tempTitile",tempTitile);
        for(var index =0; index < MAX_QUE; index++){
            let firstLine="";
            let secondLine="";
            let thridLine="";
            let rdIndex = "RD_RISKTLRN";
            let rdTitleIndex = "RN_RISKTLRN"
            for(var i=0;i<questionText.length;i++){
                let indicator = questionText[i].textIdentificationNumber;   
                if(indicator.indexOf(rdIndex) !== -1){
             
                        if(index === 0){
                            if(indicator.indexOf(rdIndex+"_"+index+"_001") !== -1){
                                firstLine = firstLine+questionText[i].text;
                            }
                            if(indicator.indexOf(rdIndex+"_"+index+"_002") !== -1){
                                secondLine =secondLine+ questionText[i].text;
                            }
                            if(indicator.indexOf(rdIndex+"_"+index+"_003") !== -1 || indicator.indexOf(rdIndex+"_"+index+"_004") !== -1){
                                thridLine = thridLine + questionText[i].text;
                            }
    
                        }
                        if(index === 1 ||index === 2 ){
                            if(indicator.indexOf(rdIndex+"_"+index+"_001") !== -1 || indicator.indexOf(rdIndex+"_"+index+"_002") !== -1 || indicator.indexOf(rdIndex+"_"+index+"_003") !== -1){
                                firstLine = firstLine+questionText[i].text;
                            }
                            if(indicator.indexOf(rdIndex+"_"+index+"_004" )!== -1 || indicator.indexOf(rdIndex+"_"+index+"_005") !== -1 ||indicator.indexOf(rdIndex+"_"+index+"_006") !== -1){
                                secondLine = secondLine+questionText[i].text;
                            }
                            if(indicator.indexOf(rdIndex+"_"+index+"_007") !== -1){
                                thridLine = thridLine + questionText[i].text;
                            }
                        }
                        if(index === 3 ||index === 4){
                            if(indicator.indexOf(rdIndex+"_"+index+"_001") !== -1 || indicator.indexOf(rdIndex+"_"+index+"_002") !== -1 || indicator.indexOf(rdIndex+"_"+index+"_003") !== -1){
                                firstLine = firstLine+questionText[i].text;
                            }
                            if(indicator.indexOf(rdIndex+"_"+index+"_004") !== -1||indicator.indexOf(rdIndex+"_"+index+"_005") !== -1||indicator.indexOf(rdIndex+"_"+index+"_006") !== -1){
                                secondLine = secondLine+questionText[i].text;
                            }
                            if(indicator.indexOf(rdIndex+"_"+index+"_007") !== -1){
                                thridLine = thridLine + questionText[i].text;
                            }
      
                        }      
                        if(index === 5){
                            if(indicator.indexOf(rdIndex+"_"+index+"_001") !== -1|| indicator.indexOf(rdIndex+"_"+index+"_002") !== -1|| indicator.indexOf(rdIndex+"_"+index+"_003" )!== -1){
                                firstLine = firstLine+questionText[i].text;
                            }
                            if(indicator.indexOf(rdIndex+"_"+index+"_004") !== -1||indicator.indexOf(rdIndex+"_"+index+"_005") !== -1){
                                secondLine = secondLine+questionText[i].text;
                            }
                            if(indicator.indexOf(rdIndex+"_"+index+"_006") !== -1){
                                thridLine = thridLine + questionText[i].text;
                            }
                            
                        }
                    
                }    
            }  
            switch (index) {
                case 0:
                    let R0 = 
                    {
                                firstLine:firstLine,
                                secondLine:secondLine,
                                thridLine:thridLine,
                                des:tempTitile[index]
                    }
                    tempDesRd.push(R0);
                    break;
                case 1:
                    let R1 = 
                    {
                                firstLine:firstLine,
                                secondLine:secondLine,
                                thridLine:thridLine,
                                des:tempTitile[index]
                    }
                    tempDesRd.push(R1);
                    break;
                case 2:
                    let R2 = 
                    {
                                firstLine:firstLine,
                                secondLine:secondLine,
                                thridLine:thridLine,
                                des:tempTitile[index]
                    }
                    tempDesRd.push(R2);
                    break;
                case 3:
                    let R3 = 
                    {
                                firstLine:firstLine,
                                secondLine:secondLine,
                                thridLine:thridLine,
                                des:tempTitile[index]
                    }
                    tempDesRd.push(R3);
                    break;
                case 4:
                    let R4 = 
                    {
                                firstLine:firstLine,
                                secondLine:secondLine,
                                thridLine:thridLine,
                                des:tempTitile[index]
                    }
                    tempDesRd.push(R4);
                    break;
                case 5:
                    let R5 = 
                    {
                                firstLine:firstLine,
                                secondLine:secondLine,
                                thridLine:thridLine,
                                des:tempTitile[index]
                    }
                    tempDesRd.push(R5);
                    break;            
                default:
                    break;
            }  

        }
        riskDes={
           R0: tempDesRd[0],
           R1: tempDesRd[1],
           R2: tempDesRd[2],
           R3: tempDesRd[3],
           R4: tempDesRd[4],
           R5: tempDesRd[5]
        }
        console.log("riskDes in C ",riskDes);
        return riskDes;    
    }
             
        
    






}


export default qasAnsConverter;