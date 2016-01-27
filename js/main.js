/*** Handle jQuery plugin naming conflict between jQuery UI and Bootstrap ***/
$.widget.bridge('uibutton', $.ui.button);
$.widget.bridge('uitooltip', $.ui.tooltip);


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

  watercycle();
  tallyScore();
});

function checkForActiveButtons() {
  if( localStorage.getItem('btn_1') == 'complete') {
    console.log('ytfd');
    $('.btn-1').removeClass('game-btn-waiting');
    $('.btn-1').addClass('game-btn-complete');
  }

  if( localStorage.getItem('btn_2') == 'complete') {
    $('.btn-2').removeClass('game-btn-waiting');
    $('.btn-2').addClass('game-btn-complete');
  }

  if( localStorage.getItem('btn_3') == 'complete') {
    $('.btn-3').removeClass('game-btn-waiting');
    $('.btn-3').addClass('game-btn-complete');
  }

  if( localStorage.getItem('btn_4') == 'complete') {
    $('.btn-4').removeClass('game-btn-waiting');
    $('.btn-4').addClass('game-btn-complete');
  }

  if( localStorage.getItem('btn_5') == 'complete') {
    $('.btn-5').addClass('disabled');
  }
};

// click events for each button

$('.continue-btn-game-1').click(function() {
  localStorage.setItem('btn_1', 'complete');
})

$('.continue-btn-game-2').click(function() {
  localStorage.setItem('btn_2', 'complete');
})

$('.continue-btn-game-3').click(function() {
  localStorage.setItem('btn_3', 'complete');
})

$('.continue-btn-game-4').click(function() {
  localStorage.setItem('btn_4', 'complete');
})




// if all buttons are green, completion modal displays
$(function(){
		if (!$('.game-btn').not('.game-btn-complete').length) {
			$('#myModal').modal('show');
    		$('.modal-content-intro').hide();
    		$('.modal-content-completion').show();
        event.preventDefault();	
		}
	});

//

function tallyScore() {
  var score = $('.game-btn-complete').length;
  $('.progress-meter').attr('data-score', score);
};


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
    if (button == answer) {
      $(this).addClass('correct-answer');
      alert('good job! correct answer!')
      $('.modal-trivia-next-button').show();
    } else {
      $(this).addClass('disabled');
      alert('close - try again!');
    }   
 });


// watercycle - drag and drop

function watercycle() {

  $('.draggable-widget').draggable({ 
    snap: '.droppable-widget', 
    snapMode: 'both',
    cursor: 'move',
    cursorAt: {top: 10, left: 100}
    });

  $('.droppable-widget').droppable({
    drop: function( event, ui ) {
        var droppableNumber = $(this).data('vocab');
        if(ui.draggable.is('[data-vocab="' + droppableNumber + '"]')) {
          ui.draggable.append('<img class="watercycle-icon icon-correct" src="../img/icons/icon-correct-green.svg" alt="correct icon">');
          ui.draggable.children(":nth-child(2)").addClass('hidden');
          ui.draggable.find('.icon-incorrect').remove();
          ui.draggable.draggable('option', 'disabled', true);
        } else {
          if (ui.draggable.find('img.icon-incorrect').length !=0) {
            // do nothing
          } else {
          ui.draggable.append('<img class="watercycle-icon icon-incorrect" src="../img/icons/icon-incorrect-red.svg" alt="incorrect icon">')
          ui.draggable.children(":nth-child(2)").addClass('hidden');
            // ui.draggable.draggable('option', 'revert', true);
            // ui.draggable.children(":nth-child(2)").removeClass('hidden');
            // ui.draggable.find('.icon-incorrect').remove();
          }
        }
      }
  });
};

$('.waterwheel-button').click(function() {
    alert('your function is working!');
    $(this).addClass('hidden');
    $('#myVideo').get(0).play();
    $('.waterwheel-header').addClass('hidden');
    $('.continue-btn-game-4').removeClass('hidden');
});

