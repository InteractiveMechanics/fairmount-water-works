
//show modal only once
$(document).ready(function(event) {
    if(localStorage.getItem('modal_content_intro') != 'show'){
        $('#myModal').modal('show');
        localStorage.setItem('modal_content_intro','show');
    }
}); 

// check for active buttons
$(document).ready(function() {
  checkForActiveButtons();
});

function checkForActiveButtons() {
  if( localStorage.getItem('btn_1') == 'complete') {
    console.log('ytfd');
    $('.btn-1').removeClass('game-btn-waiting');
    $('.btn-1').addClass('game-btn-complete');
  }

  if( localStorage.getItem('btn_2') == 'complete') {
    $('.btn-2').addClass('disabled');
  }

  if( localStorage.getItem('btn_3') == 'complete') {
    $('.btn-3').addClass('disabled');
  }

  if( localStorage.getItem('btn_4') == 'complete') {
    $('.btn-4').addClass('disabled');
  }

  if( localStorage.getItem('btn_5') == 'complete') {
    $('.btn-5').addClass('disabled');
  }
};

// click events for each button

$('.continue-btn-game-1').click(function() {
  localStorage.setItem('btn_1', 'complete');
})


// on click, button changes from red to green, if all buttons are green, completion modal displays
$(function(){
		if (!$('.game-btn').not('.game-btn-complete').length) {
			$('#myModal').modal('show');
    		$('.modal-content-intro').hide();
    		$('.modal-content-completion').show();
        event.preventDefault();	
		}
	});



// invisibile page reload 
$('.magic-button').mousedown(function(e) {
    clearTimeout(this.downTimer);
    this.downTimer = setTimeout(function() {
        // alert('mousedown > 3 sec');
        location.reload();
        localStorage.clear('.modal-content-intro');   
    }, 3000);
}).mouseup(function(e) {
    clearTimeout(this.downTimer);
});


// tooltip shows on page load
$('[data-toggle=tooltip]').tooltip({trigger: 'click'}).tooltip('show');

//crossword modal shows when user clicks on tooltip
$('[role=tooltip]').click(function() {
    var clue = $(this)[0].textContent;
    $('.modal-content').html($('.clue-' + clue).html());
    $(this).attr('data-toggle', 'modal').attr('data-target', '#crosswordModal');
    $('.modal-trivia-next-button').hide();
});

//crossword answer visible when next button clicked
$('#crosswordModal').on('hidden.bs.modal', function() {
    var $crosswordAnswer = $('.crossword-answer');
    var $modalClueClassName = $('.clueNumber:first').text();
    var $modalClueName = $modalClueClassName.substr(1);
    var $crosswordClueClass = ".crossword-clue-" + $modalClueName;
    
    $($crosswordClueClass).find('>:first-child').removeClass('crossword-clue-hidden');

    //alert($crosswordClueClass);
});


// handlebars - crossword trivia
$(function () {
  var raw_template = $('#trivia-template').html();   
  var template = Handlebars.compile(raw_template);
  var placeHolder = $(".modal-data");

  $.get("../data/crossword.json",function(data,status,xhr){
        $.each(data,function(index,element){
            console.log(data);
        
          var html = template(data);
          // Render the posts into the page
          placeHolder.append(html);
        });
      }); 
});

// logic for trivia questions
$(document).delegate(".modal-trivia-button", "click", function(event){
    var button = $(this).text().trim();
    var answer = $('.answer').html().trim();
    // alert(button);
    // alert(answer);
    if (button == answer) {
      $(this).addClass('correct-answer');
      alert('good job! correct answer!')
      $('.modal-trivia-next-button').show();
    } else {
      $(this).addClass('disabled');
      alert('close - try again!');
    }   
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