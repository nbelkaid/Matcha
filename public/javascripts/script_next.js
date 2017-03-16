$(document).ready(function() {
	console.log("toto");
	var current_fs, next_fs, previous_fs;

	$(".next").click(function(){
		current_fs = $(this).parent();
		console.log(current_fs);
		next_fs = $(this).parent().next();
		next_fs.show(); 
		current_fs.hide();
	});
});