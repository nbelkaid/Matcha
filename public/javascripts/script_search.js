$("#ex7").slider();

$("#ex7-enabled").click(function() {
	if(this.checked) {
		// With JQuery
		$("#ex7").slider("enable");
	}
	else {
		// With JQuery
		$("#ex7").slider("disable");
	}
});