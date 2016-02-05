 $(document).ready(function(event) {
    
    //homepage
    introModal();
    checkForActiveButtons();
    tallyScore();
    completionModal();
    gameRestart();

    //activity 1: crossword
    crosswordModal();
    crosswordLogic();
    showCrosswordAnswer();

    //activity 2: drag-and-drop
    watercycle();

    //activity 3: no js

    //activity 4: video
    waterwheel();

    //activity 5: click to reveal
    pollution();

    // get JSON for activity 2
    getCrosswordTrivia();

}); 

 
// hompepage intro modal show only once
function introModal() {
   if(localStorage.getItem('modal_content_intro') != 'show'){
        $('#myModal').modal('show');
        localStorage.setItem('modal_content_intro','show');
    }
}


// homepage: if all activities are complete, completion modal displays
  function completionModal(){  
    if (!$('.game-btn').not('.game-btn-complete').length) {
      $('#myModal').modal('show');
        $('.modal-content-intro').hide();
        $('.modal-content-completion').removeClass('hidden');
        event.preventDefault(); 
    }
  }


//homepage 
function checkForActiveButtons() {
  if( localStorage.getItem('btn_1') == 'complete') {
    $('.btn-1').removeClass('game-btn-waiting');
    $('.btn-1').addClass('game-btn-complete');
    $('.btn-1').append('<img class="homepage-complete-icon" src="img/icons/icon-activity-complete.svg" alt="">');

  }

  if( localStorage.getItem('btn_2') == 'complete') {
    $('.btn-2').removeClass('game-btn-waiting');
    $('.btn-2').addClass('game-btn-complete');
    $('.btn-2').append('<img class="homepage-complete-icon" src="img/icons/icon-activity-complete.svg" alt="">');

  }

  if( localStorage.getItem('btn_3') == 'complete') {
    $('.btn-3').removeClass('game-btn-waiting');
    $('.btn-3').addClass('game-btn-complete');
    $('.btn-3').append('<img class="homepage-complete-icon" src="img/icons/icon-activity-complete.svg" alt="">');

  }

  if( localStorage.getItem('btn_4') == 'complete') {
    $('.btn-4').removeClass('game-btn-waiting');
    $('.btn-4').addClass('game-btn-complete');
    $('.btn-4').append('<img class="homepage-complete-icon" src="img/icons/icon-activity-complete.svg" alt="">');

  }

  if( localStorage.getItem('btn_5') == 'complete') {
    $('.btn-5').removeClass('game-btn-waiting');
    $('.btn-5').addClass('game-btn-complete');
    $('.btn-5').append('<img class="homepage-complete-icon" src="img/icons/icon-activity-complete.svg" alt="">');
  }
};

// homepage: click events for each button
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

$('.continue-btn-game-5').click(function() {
  localStorage.setItem('btn_5', 'complete');
})


// hompeage: progress meter
function tallyScore() {
  var score = $('.game-btn-complete').length;
  $('.progress-meter').attr('data-score', score);
};


function gameRestart() {
  // invisibile page reload on desktop
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

  //invisible page reload on touch 
  $('.magic-button').bind('touchstart', function(e) {
      clearTimeout(this.downTimer);
      this.downTimer = setTimeout(function() {
          // alert('mousedown > 3 sec');
          location.reload();
          localStorage.clear('.modal-content-intro');   
      }, 3000);
  }).bind('touchend', function(e) {
      clearTimeout(this.downTimer);
  });
}

function crosswordModal() {
  $('[data-toggle=tooltip]').tooltip({trigger: 'click', html: true}).tooltip('show');

  //crossword modal shows when user clicks on tooltip
    $('[role=tooltip]').click(function(event) {
        var clue = $(this)[0].textContent;
        $('.modal-content').html($('.clue-' + clue).html());
        $(this).attr('data-toggle', 'modal').attr('data-target', '#crosswordModal');
        $(this).addClass('disabled');
    });
}

function showCrosswordAnswer() {
  $('#crosswordModal').on('hidden.bs.modal', function() {
        var $crosswordAnswer = $('.crossword-answer');
        var $modalClueClassName = $('.clueNumber:first').text();
        var $modalClueName = $modalClueClassName.substr(1);
        var $crosswordClueClass = ".crossword-clue-" + $modalClueName;
        

        $($crosswordClueClass).find('>:first-child').removeClass('crossword-clue-hidden');
        $($crosswordClueClass).siblings('.tooltip').children('.tooltip-inner').addClass('tooltip-correct');
        $($crosswordClueClass).siblings('.top').children('.tooltip-arrow').addClass('tooltip-top-arrow-correct');
        $($crosswordClueClass).siblings('.right').children('.tooltip-arrow').addClass('tooltip-right-arrow-correct');
        $($crosswordClueClass).siblings('.left').children('.tooltip-arrow').addClass('tooltip-left-arrow-correct');

        $($crosswordClueClass).tooltip('show')
          .attr('data-original-title', '<img src="img/icons/icon-correct2.svg">')
          .tooltip('fixTitle')
          .tooltip('show')
    });   
}

//handlebars 
function getCrosswordTrivia() {
      var raw_template = $('#trivia-template').html();   
      var template = Handlebars.compile(raw_template);
      var placeHolder = $(".modal-data");

      $.get("./data/crossword.json",function(data,status,xhr){
            $.each(data,function(index,element){
                console.log(data);
            
              var html = template(data);
              // Render the posts into the page
              placeHolder.append(html);
            });
      }); 
} 


function crosswordLogic() {
   // crossword: logic for trivia questions
    $(document).delegate(".modal-trivia-button", "click", function(event){
        var button = $(this).text().trim();
        var answer = $('.answer').html().trim();
        if (button == answer) {
          $(this).addClass('correct-answer');
          $(this).append('<img class="trivia-icon icon-correct" src="../img/icons/icon-correct-green.svg" alt="correct icon">');
          $(this).parents('.options').siblings('.modal-trivia-next-button').attr('disabled', false);
        } else {
          $(this).addClass('disabled');
          $(this).append('<img class="trivia-icon icon-incorrect" src="../img/icons/icon-incorrect-red.svg" alt="incorrect icon">');
        }   
     });
}


// watercycle - drag and drop
function watercycle() {
   /*** Handle jQuery plugin naming conflict between jQuery UI and Bootstrap ***/
    $.widget.bridge('uibutton', $.ui.button);
    $.widget.bridge('uitooltip', $.ui.tooltip);

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

          }
        }
      }
  });
}

function waterwheel() {
  // waterwheel on desktop
  $('.waterwheel-button').click(function() {
      $(this).addClass('hidden');
      $('#myVideo').get(0).play();
      $('.waterwheel-header').addClass('hidden');
      $('.continue-btn-game-4').removeClass('hidden');
  });

  // waterwheel on touch devices
  $('.waterwheel-button').bind('touchstart', function(e) {
      $(this).addClass('hidden');
      $('#myVideo').get(0).play();
      $('.waterwheel-header').addClass('hidden');
      $('.continue-btn-game-4').removeClass('hidden');
  });
}

function pollution() {
  $('.pollution-element').click(function() {
    var pollutionNumber = Number($(this).data('element'));
    $(this).addClass('hidden');
    $('.pollution-container').find('.clean-element[data-element="' + pollutionNumber + '"]' ).removeClass('hidden');
  });
}
