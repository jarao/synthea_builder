		var module = {};
		var states = {};
		var Initial = {
			type:"Initial",
			transition: ""
		};

		var Terminal = {
			type:"Terminal"
		};
		
		var Simple = {
			type:"Simple",
			transition: ""
		};
		var Age = {
			type:"Simple",
			transition: ""
		};
		
		var ActionMedication = {
			type:"Simple",
			transition: ""
		};
		
		var logicalCondition = ["null", Gender, SocioeconomicStatus, Race, Age, Date, Symptom, Observation, VitalSign, ActiveCondition, ActionMedication,
		ActiveCarePlan, Attribute, PriorState, And, Or, Not, AtLeast, AtMost]; //Conditions True and False were removed from this list on purpose
		
		var Guard = {
			type:"Guard",
			allow: logicalCondition,
			transition: ""
		};
		
		var exactUnit = {
			quantity: null,
			unit: unitOfTime
		};
		
		var rangeUnit = {
			low: null,
			high: null,
			unit: unitOfTime
		};
		
		var Delay = {
			type:"Delay",
			exact:exactUnit,
			range:rangeUnit,
			transition: ""
		};
		
		var unitOfTime = ["null", "years", "months", "weeks", "days", "hours", "minutes", "seconds"];
		
		var codesSNOMED = {
			system: "SNOMED-CT",
			code: 0,
			display: ""
		};
		
		var Encounter = {
			type:"Encounter",
			wellness: ["true","false"], // one of these
			encounter_class: ["emergency", "inpatient", "ambulatory"],
			reason: "",
			codes: codesSNOMED,
			transition: ""
		};
		
		var dischargeDisposition = {
			system: "NUBC",
			code: dischargeCode,
			display: dischargeCode
		};
		
		var EncounterEnd = {
			type:"EncounterEnd",
			discharge_disposition: dischargeDisposition,
			transition: ""
		};
		
		var dischargeCode = [{"conceptCode": "1", "display": "Discharged to home care or self care (routine discharge)"},
			{"conceptCode": "2", "display": "Discharged/transferred to a short term general hospital for inpatient care"},
			{"conceptCode": "3", "display": "Discharged/transferred to skilled nursing facility (SNF) with Medicare certification in anticipation of covered skilled care"},
			{"conceptCode": "4", "display": "Discharged/transferred to a facility that provides custodial or supportive care"},
			{"conceptCode": "5", "display": "Discharged/transferred to a designated cancer center or children’s hospital"},
			{"conceptCode": "6", "display": "Discharged/transferred to home under care of organized home health service organization in anticipation of covered skilled care"},
			{"conceptCode": "7", "display": "Left against medical advice or discontinued care"},
			{"conceptCode": "8", "display": "Discharged/transferred to home under care of a Home IV provider"},
			{"conceptCode": "9", "display": "Admitted as an inpatient to this hospital"},
			{"conceptCode": "10", "display": "Discharge to be defined at state level, if necessary"},
			{"conceptCode": "11", "display": "Discharge to be defined at state level, if necessary"},
			{"conceptCode": "12", "display": "Discharge to be defined at state level, if necessary"},
			{"conceptCode": "13", "display": "Discharge to be defined at state level, if necessary"},
			{"conceptCode": "14", "display": "Discharge to be defined at state level, if necessary"},
			{"conceptCode": "15", "display": "Discharge to be defined at state level, if necessary"}
		];
		
		var ConditionOnset = {
			type: "ConditionOnset",
			target_encounter: "",
			assign_to_attribute: "",
			codes: codesSNOMED,
			transition: ""
		};
		
		var ConditionEnd = {
			type: "ConditionEnd",
			codes: codesSNOMED,
			referenced_by_attribute: "",
			transition: ""
		};
		
		var AllergyOnset = {
			type: "AllergyOnset",
			target_encounter: "",
			"codes": codesSNOMED,
			transition: ""
		};
		
		var AllergyEnd = {
			type: "AllergyEnd",
			codes: codesSNOMED,
			referenced_by_attribute: "",
			transition: ""
		};
		
		var dosageInfo = {
			amount: 0,
			frequency: 0,
			period: 0,
			unit: unitOfTime
		};
		
		var durationInfo = {
			quantity: 0,
			unit: unitOfTime
		};
		
		var rxInfo = {
			refills: 0,
			as_needed: false,
			dosage: dosageInfo,
			duration: durationInfo,
			instructions: codesSNOMED
		};
		
		var MedicationOrder = {
			type: "MedicationOrder",
			assign_to_attribute: "",
			reason: "",
			codes: codesSNOMED,
			prescription: rxInfo,
			transition: ""
		};
		
		var MedicationEnd = {
			type: "MedicationEnd",
			codes: codesSNOMED,
			referenced_by_attribute: "",
			transition: ""
		};
		
		var CarePlanStart = {
			type: "CarePlanStart",
			assign_to_attribute: "",
			reason: "",
			codes: codesSNOMED,
			activities: codesSNOMED,
			transition: ""
		};
		
		var CarePlanEnd = {
			type: "CarePlanEnd",
			careplan: "",
			referenced_by_attribute: "",
			codes: codesSNOMED,
			transition: ""
		};
		
		var Procedure = {
			type: "Procedure",
			reason: "",
			codes: codesSNOMED,
			duration: durationInfo,
			transition: ""
		};
		
		var unitOfLength = ["cm", "m", "mm", "in", "yds"];
		
		var VitalSign = {
			type: "VitalSign",
			vital_sign: "",
			unit: unitOfLength,
			exact: exactUnit,
			range: rangeUnit,
			transition: ""
		};
		
		var observationCategory = ["vital-signs", "procedure", "laboratory", "exam", "social-history"];
		
		var codesLOINC = {
			system: "LOINC",
			code: 0,
			display: ""
		};
		
		var Observation = {
			type: "Observation",
			category: observationCategory[0],
			unit: unitOfLength,
			codes: codesLOINC,
			transition: ""
		};
		
		var MultiObservation = {
			type: "MultiObservation",
			category: observationCategory[0],
			number_of_observations: 0,
			codes: codesLOINC,
			transition: ""
		};
		
		var DiagnosticReport = {
			type: "DiagnosticReport",
			number_of_observations: 0,
			codes: codesLOINC,
			transition: ""
		};
		
		var Symptom = {
			type: "Symptom",
			symptom: "",
			cause: "",
			exact: exactUnit, //handle 0-100 through interface input validation
			range: rangeUnit,
			transition: ""
		};
		
		var SetAttribute = {
			type: "SetAttribute",
			attribute: "",
			value: 0,
			transition: ""
		};
		
		var Counter = {
			type: "Counter",
			attribute: "",
			action: "increment", //one of these
			transition: ""
		};
		
		var Death = {
			type: "Death",
			exact: null, //exactUnit
			range: null, //rangeUnit
			codes: codesSNOMED,
			condition_onset: "",
			referenced_by_attribute: "",
			transition: ""			
		};
		
		var CallSubModule = {
			type: "CallSubModule",
			submodule: null, //make dropdown of modules
			transition: ""
		};
		
		var Gender = {
			condition_type: "Gender",
			gender: ["M", "F"] //one of these
		};
		
		var SocioeconomicStatus = {
			condition_type: "Socioeconomic Status",
			category: ["High", "Middle", "Low"] //one of these
		};
		
		var Race = {
			condition_type: "Race",
			race: ["Hispanic", "Not Hispanic"] // one of these
		};
		
		var Symptom = {
			condition_type: "Symptom",
			symptom: "",
			operator: ["==", "!=", "<", ">", "<=", ">="],
			value: 0 //handle 0 to 100 through logic 
		};
		
		var Observation = {
			condition_type: "Observation",
			operator: ["==", "!=", "<", ">", "<=", ">=", "is nil", "is not nil"],
			value: 0, //handle 0 through 100 through logic 
			codes: codesLOINC
		};
		
		var VitalSign = {
			condition_type: "Vital Sign",
			vital_sign: "",
			operator: ["==", "!=", "<", ">", "<=", ">="],
			value: 0 
		};
		
		var ActiveCondition = {
			condition_type: "Active Condition",
			codes: codesSNOMED
		};
		
		var ActiveMedication = {
			condition_type: "Active Medication",
			codes: codesSNOMED
		};
		
		var ActiveCarePlan = {
			condition_type: "Active CarePlan",
			codes: codesSNOMED
		};
		
		var Attribute = {
			condition_type: "Attribute",
			attribute: "",
			operator: ["==", "!=", "<", ">", "<=", ">=", "is nil", "is not nil"], //one of these
			value: ""
		};
		
		var PriorState = { //special logic needed here for ER
			condition_type: "Prior State",
			name: "",
			within: {"quantity": 3, "unit": "years"},
			since: ""
		};
		
		var And = {
			condition_type: "And",
			conditions: logicalCondition //subconditions to test
		};
		
		var Or = {
			condition_type: "Or",
			conditions: logicalCondition //subconditions to test
		};
		
		var Not = {
			condition_type: "Not",
			conditions: logicalCondition //negate this 
		};
		
		var AtLeast = {
			condition_type: "At Least",
			minimum: 1, //1 to num of sub conditions inclusive
			conditions: logicalCondition
		};
		
		var AtMost = {
			condition_type: "At Most",
			minimum: 1, //1 to num of sub conditions inclusive
			conditions: logicalCondition
		};
		
		var state = [Initial, Terminal, Simple, Guard, Delay, Encounter, EncounterEnd, ConditionOnset, ConditionEnd, AllergyOnset, AllergyEnd,
		MedicationOrder, MedicationEnd, CarePlanStart, CarePlanEnd, Procedure,
		VitalSign, Observation, MultiObservation, DiagnosticReport, Symptom,
		SetAttribute, Counter, Death, CallSubModule];
		
		var unitOfAge = ["years", "months", "weeks", "days", "hours", "minutes", "seconds"];
		
		var transitionType = ["Direct","Distributed","Conditional","Complex"];