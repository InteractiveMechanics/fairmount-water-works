
//welcome modal displays on load, but completion modal is hidden
$(window).load(function(){
        $('#myModal').modal('show');
        $('.modal-content-completion').hide();

    });


// on click, button changes from red to green, if all buttons are green, completion modal displays
$(function(){
	$('.game-btn').click(function(event) {
		$(this).addClass('game-btn-complete');
		$(this).removeClass('game-btn-waiting');
		//event.preventDefault();
		if (!$('.game-btn').not('.game-btn-complete').length) {
			$('#myModal').modal('show');
    		$('.modal-content-intro').hide();
    		$('.modal-content-completion').show();
            event.preventDefault();	
		}
	});
});


// invisibile page reload 
$('.magic-button').mousedown(function(e) {
    clearTimeout(this.downTimer);
    this.downTimer = setTimeout(function() {
        // alert('mousedown > 3 sec');
        location.reload();   
    }, 3000);
}).mouseup(function(e) {
    clearTimeout(this.downTimer);
});

// prevents links from opening in Safari 
$( document ).on(
    "click",
    "a",
    function( event ){

        // Stop the default behavior of the browser, which
        // is to change the URL of the page.
        event.preventDefault();

        // Manually change the location of the page to stay in
        // "Standalone" mode and change the URL at the same time.
        location.href = $( event.target ).attr( "href" );

    }
);







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