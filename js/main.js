$(window).load(function(){
        $('#myModal').modal('show');
    });


// page reload 
$('.magic-button').mousedown(function(e) {
    clearTimeout(this.downTimer);
    this.downTimer = setTimeout(function() {
        // alert('mousedown > 3 sec');
        location.reload();   
    }, 3000);
}).mouseup(function(e) {
    clearTimeout(this.downTimer);
});




//////////////////////////////////
// notes from meeting with Jeff //
//////////////////////////////////

// $(document).ready(function() {

	 
// 	 // grab all the values
// 	 // var someVar = $('element');
// 	 // var hasInteractedWith = false

// 	 // someVar.onClick = function() {
// 	 // 	var crossWordItem = (this).data('crossword-item');
// 	 // 	if(!hasInteractedWith) { hasInteractedWith = true; //show continue button
// 	 // 	}
// 	 // }

// 	 // // how to call JSON file
// 	 // $getJSON('file.json', function(data) {
// 	 // 	console.log(data);
// 	 // })  

// });