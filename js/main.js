
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


// tooltip shows on page load
$('[data-toggle=tooltip]').tooltip({trigger: 'click'}).tooltip('show');

// crossword modal shows when user clicks on tooltip
$('[role=tooltip]').click(function() {
    $(this).attr('data-toggle', 'modal').attr('data-target', '#crosswordModal');
})

// crossword answer visible when next button clicked
$('.modal-trivia-next-button').click(function() {
    $('.crossword-clue-container').removeClass('crossword-clue-hidden');
})


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