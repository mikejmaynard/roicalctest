(function () {
	
$(document).ready(function(){
	//need to add the change/blur function
	console.log("Document ready - calculator v15");
	$('#RoI-conversion-reset-button').click( function() {resetConversion();});
	$('#RoI-target-reset-button').click( function() {resetTargets();});
	$('#RoI-calculator-button').click( function() {runROIcalculator();});
	$('#webVisitors').blur( function() {funnelModel();});
	$('#visitorToContact').blur( function() {funnelModel();});
	$('#contactsToMQL').blur( function() {funnelModel();});
	$('#mqlToSQL').blur( function() {funnelModel();});
	$('#sqlToCustomer').blur( function() {funnelModel();});	
	$('#profitMargin').blur( function() {profitModel();});	
	$('#revenuePerCustomer').blur( function() {profitModel();});		
	resetConversion();
});

function setResults(investment,additionalCustomers,increaseProfit,returnOnInvestment,resultsVisible) {
	var visibleColor = "white";
	var invisibleColor = "black";
	 if (resultsVisible == "visible") {
		 //console.log("results visible");
		 $('#totalInvestment').text( investment );
		 $('#additionalCustomers').text( additionalCustomers );
		 $('#totalReturn').text( increaseProfit );
		 $('#returnOnInvestment').text( returnOnInvestment );
		 $('#totalInvestment').css("color", visibleColor);
		 $('#additionalCustomers').css("color", visibleColor);
		 $('#totalReturn').css("color", visibleColor);
		 $('#returnOnInvestment').css("color", visibleColor);
		 $('#totalInvestment').css("font-weight", "bold");
		 $('#additionalCustomers').css("font-weight", "bold");
		 $('#totalReturn').css("font-weight", "bold");
		 $('#returnOnInvestment').css("font-weight", "bold");
		 $('#totalInvestment').css("visibility", "visible");	
		 $('#totalReturn').css("visibility", "visible");			 
		 $('#returnOnInvestment').css("visibility", "visible");
		 $('#additionalCustomers').css("visibility", "visible");	
	 }
	 else {
		 //console.log("results invisible");
		 $('#totalInvestment').text( investment );
		 $('#additionalCustomers').text( additionalCustomers );
		 $('#totalReturn').text( increaseProfit );
		 $('#returnOnInvestment').text( returnOnInvestment );
		 $('#totalInvestment').css("color", visibleColor);
		 $('#additionalCustomers').css("color", visibleColor);
		 $('#totalReturn').css("color", visibleColor);
		 $('#returnOnInvestment').css("color", visibleColor);
		 $('#totalInvestment').css("font-weight", "bold");
		 $('#additionalCustomers').css("font-weight", "bold");
		 $('#totalReturn').css("font-weight", "bold");
		 $('#returnOnInvestment').css("font-weight", "bold");
		 $('#totalInvestment').css("visibility", "hidden");	
		 $('#totalReturn').css("visibility", "hidden");			 
		 $('#returnOnInvestment').css("visibility", "hidden");
		 $('#additionalCustomers').css("visibility", "hidden");						 
	 }
	 return true;
}

function resetResults() {
	//console.log("running resetResults");
	setResults(0,0,0,0,"invisible");
}

function resetConversion() {
	//console.log("reset conversion");
	var visTOcontact = 2;
	var contactTOMQL = 25;
	var MQLTSQL = 50;
	var SQLTOcustomer = 40;
	$('#visitorToContact').val(visTOcontact.toString() );
	$('#contactsToMQL').val(contactTOMQL.toString() );
	$('#mqlToSQL').val(MQLTSQL.toString() );
	$('#sqlToCustomer').val(SQLTOcustomer.toString() );
}

function resetTargets() {
	var webVisitors = 0;
	var visTOcontact = Number( $("#visitorToContact").val() );
	var contactTOMQL = Number( $("#contactsToMQL").val() );
	var MQLTSQL = Number( $("#mqlToSQL").val() );
	var SQLTOcustomer = Number( $("#sqlToCustomer").val() );
	if (webVisitors >= 0) {
		$('#newWebVisitors').val(webVisitors.toString() );
	}
	if (visTOcontact >= 0 && visTOcontact <= 100) {
		$('#newVisitorToContact').val(visTOcontact.toString() );		
	}
	if (contactTOMQL >= 0 && contactTOMQL <= 100) {
		$('#newContactsToMQL').val(contactTOMQL.toString() );
	}
	if (MQLTSQL >= 0 && MQLTSQL <= 100) {
		$('#newMqlToSQL').val(MQLTSQL.toString() );
	}
	if (SQLTOcustomer >= 0 && SQLTOcustomer <= 100) {
	$('#newSqlToCustomer').val(SQLTOcustomer.toString() );
	}
}

function runROIcalculator() {
	//console.log("entering runROI calculator");
	var webVisitors = Number( $("#webVisitors").val() );
	//console.log("running funnel model");
	var funnelOK = funnelModel();
	//console.log("finished funnel model");
	//console.log(funnelOK);
	if (funnelOK == true) {
		//console.log("funnelModel() is true");
		var oldCustomers = Number( $("#totalCustomers").val() );
		var newCustomers = ( Number( $("#newWebVisitors").val() ) + 100 )* Number( $("#webVisitors").val() ) / 100;
//console.log(newCustomers);
		newCustomers = newCustomers * Number( $("#newVisitorToContact").val() ) / 100 ;
//console.log(newCustomers);
		newCustomers = newCustomers * Number( $("#newContactsToMQL").val() ) /100 ;
//console.log(newCustomers);
		newCustomers = newCustomers * Number( $("#newMqlToSQL").val() ) / 100;
//console.log(newCustomers);
		newCustomers = newCustomers * Number( $("#newSqlToCustomer").val() ) / 100;
//console.log(newCustomers);
		var additionalCustomers = newCustomers - oldCustomers;
		var profitIncrease = additionalCustomers * Number( $("#profitPerCustomer").val() );
		var totalInvestment = Number( $("#totalBudget").val() );
		var returnOnInvestment = 100 * profitIncrease /  totalInvestment;
		//console.log("calling set results");
		setResults(totalInvestment,additionalCustomers,profitIncrease,returnOnInvestment,"visible");
		//console.log("completed set results");
	}
	else {
		//console.log("funnelModel() returned error");
		resetResults();
	}
	
}	
	
function funnelModel() {
	var webVisitors = Number( $("#webVisitors").val() );
	var visTOcontact = Number( $("#visitorToContact").val() );
	var contactTOMQL = Number( $("#contactsToMQL").val() );
	var MQLToSQL = Number( $("#mqlToSQL").val() );
	var SQLToCustomer = Number( $("#sqlToCustomer").val() );
	var totalContacts = 0;
	var MQLs = 0;
	var SQLs = 0;
	var totalCustomers = 0;
	var returnValue = false;
	//console.log("doing if statement, value of web visitors");
	//console.log(webVisitors);
	if (webVisitors > 0) {
		//console.log("webVisitors OK");
		if (visTOcontact >= 0 && visTOcontact <= 100) {
			totalContacts = (webVisitors * visTOcontact) / 100;
			$('#totalContacts').val(totalContacts.toString() );	
//console.log("visTOcontact OK");			

			if (contactTOMQL >= 0 && contactTOMQL <= 100) {
				MQLs = (totalContacts * contactTOMQL) / 100;
				$('#MQLs').val(MQLs.toString() );	
//console.log("contactTOMQL OK");				
			
				if (MQLToSQL >= 0 && MQLToSQL <= 100) {
					SQLs = (MQLs * MQLToSQL) / 100;
					$('#SQLs').val(SQLs.toString() );			
//console.log("MQLToSQL OK");
					if (SQLToCustomer >= 0 && SQLToCustomer <= 100) {
						totalCustomers = (SQLs * SQLToCustomer) / 100;
						$('#totalCustomers').val(totalCustomers.toString() );
						returnValue = true;
						//console.log("All OK, return true");
					}
				}
			}
		}		
	}
	//console.log("callingResetResults");
	resetResults();
	//console.log("resetResults done");
	return (returnValue);
}

function profitModel () {
	var revenuePerCustomer = Number( $("#revenuePerCustomer").val() );
	var profitMargin = Number( $("#profitMargin").val() );
	var returnValue = false;
	if (revenuePerCustomer >0 && profitMargin > 0 && profitMargin <=100) {
		var profitPerCustomer = revenuePerCustomer * profitMargin / 100;
		$('#profitPerCustomer').val(profitPerCustomer.toString() );
		returnValue = true;
	}
	return(returnValue);
}


})();
