
var data = {"trivia":[{"clueNumber":1,"question":"The cutting down of too many trees in the Schuykill River Watershed led to the  1869 _ _ _ _.","options":["war","flood","draught","storm"],"answer":"flood"},{"clueNumber":2,"question":"The Schuykill River Watershed is part of this larger River Basin.","options":["Mississippi","Missouri","Delaware","Nile"],"answer":"Delaware"},{"clueNumber":3,"question":"Twice a day the river levels are high and low because of these.","options":["boats","tides","wells","fossil fuels"],"answer":"tides"},{"clueNumber":4,"question":"In 1876, these held water where the Philadelphia Museum of Art stands today.","options":["reservoirs","storehouses","catchments","watertowers"],"answer":"reservoirs"},{"clueNumber":5,"question":"This park helps protect the city's water supply.","options":["Rittenhouse","Clark","Franklin","Fairmount"],"answer":"Fairmount"},{"clueNumber":6,"question":"The _ _ _ _ of a stream is all the land that sheds water to that stream when it rains.","options":["habitat","watershed","environment","tributary"],"answer":"watershed"},{"clueNumber":7,"question":"Where the river meets the sea.","options":["lagoon","estuary","marsh","harbor"],"answer":"estuary"},{"clueNumber":8,"question":"Three thousand miles of these underground pipes carry waste.","options":["sewer","drain","gas","organ"],"answer":"sewer"},{"clueNumber":9,"question":"Rain that goes down the storm drain can end up in the _ _ _ _.","options":["ocean","sewer","floodplain","river"],"answer":"river"},{"clueNumber":10,"question":"A healthy Delaware Estuary provides a unique _ _ _ _ for wildlife, such as horseshoe crab and migratory birds.","options":["home","watershed","habitat","climate"],"answer":"habitat"},{"clueNumber":11,"question":"Today's underground sewers used to be natural _ _ _ _.","options":["streams","tunnels","springs","caves"],"answer":"streams"}]};
     
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

    //activity 3: free input

    //activity 4: video
    waterwheel();

    //activity 5: click to reveal
    pollution();

    // get JSON for activity 2 - putting this with the other homepage functions breaks things
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
  saveCSV();
  console.log('drinkingWaterData1');
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
        

        $($crosswordClueClass).find('>:first-child').removeClass('crossword-clue-hidden').addClass('animated fadeIn');
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

      // $.get("crossword.json",function(data,status,xhr){
            $.each(data,function(index,element){
                console.log(data);
            
              var html = template(data);
              // Render the posts into the page
              placeHolder.append(html);
            });
      // }); 
} 


function crosswordLogic() {
   // crossword: logic for trivia questions
    $(document).delegate(".modal-trivia-button", "click", function(event){
        var button = $(this).text().trim();
        var answer = $('.answer').html().trim();
        if (button == answer) {
          $(this).addClass('correct-answer animated flash');
          $(this).append('<img class="trivia-icon icon-correct" src="img/icons/icon-correct-green.svg" alt="correct icon">');
          $(this).parents('.options').siblings('.modal-trivia-next-button').attr('disabled', false);
        } else {
          $(this).addClass('disabled animated shake');
          $(this).append('<img class="trivia-icon icon-incorrect" src="img/icons/icon-incorrect-red.svg" alt="incorrect icon">');
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
    snapMode: 'interior',
    cursor: 'move',
    snapTolerance: 20,
    cursorAt: {top: 10, left: 100}
    });

  $('.droppable-widget').droppable({
    drop: function( event, ui ) {
        var droppableNumber = $(this).data('vocab');
        if(ui.draggable.is('[data-vocab="' + droppableNumber + '"]')) {
          ui.draggable.append('<img class="watercycle-icon icon-correct" src="img/icons/icon-correct-green.svg" alt="correct icon">');
          ui.draggable.children(":nth-child(2)").addClass('hidden');
          ui.draggable.find('.icon-incorrect').remove();
          ui.draggable.position({
              my: "center",
              at: "center",
              of: $(this),
              using: function(pos) {
                $(this).animate(pos, 200, "linear");
             }
          });
          ui.draggable.draggable('option', 'disabled', true);

        } else {
          if (ui.draggable.find('img.icon-incorrect').length !=0) {
            // do nothing
          } else {
          ui.draggable.append('<img class="watercycle-icon icon-incorrect" src="img/icons/icon-incorrect-red.svg" alt="incorrect icon">')
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
    $('.pollution-container').find('.clean-element[data-element="' + pollutionNumber + '"]' ).removeClass('hidden').addClass('animated fadeIn');
  });
}


var filenameID;
function getFilenameID() {
    window.kp_requestKioskId("kp_requestKioskId_callback"); 
}
function kp_requestKioskId_callback(kioskId) {
  filenameID = kioskId.split(" ").join("");
}

saveCSV();

function saveCSV() {
  $('.continue-btn-game-3').click(function() {
    var wasteWater1 = document.getElementsByName('wasteWater_1')[0].value;
    var wasteWater2 = document.getElementsByName('wasteWater_2')[0].value;
    var wasteWater3 = document.getElementsByName('wasteWater_3')[0].value;
    var cleanWater1 = document.getElementsByName('cleanWater_1')[0].value;
    var cleanWater2 = document.getElementsByName('cleanWater_2')[0].value;
    var cleanWater3 = document.getElementsByName('cleanWater_3')[0].value;
    var drinkingWater1 = document.getElementsByName('drinkingWater_1')[0].value;
    var drinkingWater2 = document.getElementsByName('drinkingWater_2')[0].value;
    var drinkingWater3 = document.getElementsByName('drinkingWater_3')[0].value;

    getFilenameID();

    writeToFile(filenameID + '.csv', new Date() + ',' + wasteWater1 + ',' + wasteWater2 + ',' + wasteWater3 + ',' + cleanWater1 + ',' + cleanWater2 + ',' + cleanWater3 + ',' + drinkingWater1 + ',' + drinkingWater2 + ',' + drinkingWater3, "_writeToFile_Callback");


  }); 
}


function _writeToFile_Callback(success) {
  if (success) {
    alert('The data was successfully added!');  
  } else {
    alert('Error adding the data');
  }
}