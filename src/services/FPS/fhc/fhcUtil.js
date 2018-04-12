
const fhcUtil={
    _buildRequestCalculationDto:(requestData) =>{
		// console.log("requestData",requestData);
		var calculationDto = requestData.calculationDto;
		// console.log("calculationDto",calculationDto);
		var calculationResults = calculationDto.calculationResults;
		// console.log("calculationResults",calculationResults);
		for(let i=0;i<calculationResults.length;i++){
			if(calculationResults[i].calculationTypeCode=="CAL_LIFE_COVERAGE"){
				calculationDto.calculationResults[i].priority = requestData.updatePriorityObject.lifeCoveragePriority;
			}
			if(calculationResults[i].calculationTypeCode=="CAL_RETIREMENT"){
				calculationDto.calculationResults[i].priority = requestData.updatePriorityObject.retirementPriority;
			}
			if(calculationResults[i].calculationTypeCode=="CAL_CRITICAL_ILL"){
				calculationDto.calculationResults[i].priority = requestData.updatePriorityObject.criticalIllnessPriority;
			}
			if(calculationResults[i].calculationTypeCode=="CAL_EDUCATION"){
				calculationDto.calculationResults[i].priority = requestData.updatePriorityObject.educationPriority;
			}
			if(calculationResults[i].calculationTypeCode=="CAL_LEGACY"){
				calculationDto.calculationResults[i].priority = requestData.updatePriorityObject.legacyPriority;
			}
			if(calculationResults[i].calculationTypeCode=="CAL_PROPERTY"){
				calculationDto.calculationResults[i].priority = requestData.updatePriorityObject.propertyPriority;
			}
			if(calculationResults[i].calculationTypeCode=="CAL_GENERAL"){
				calculationDto.calculationResults[i].priority = requestData.updatePriorityObject.healthPriority;
			}
			if(calculationResults[i].calculationTypeCode=="CAL_SHORT_TERM_GO"){
				calculationDto.calculationResults[i].priority = requestData.updatePriorityObject.growYourWealthPriority;
			}
			
		}
		
		return calculationDto;
    },

	_updateStillNeedValue:(value) => {
		return (value<0)?0:value;
	}


}

export default fhcUtil;