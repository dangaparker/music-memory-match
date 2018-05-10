$(document).ready(initializeMe);

function initializeMe(){
  $('.card').on('click', card_clicked)
}



var first_card_clicked = null;
var second_card_clicked = null;
var total_possible_matches = 2;
var match_counter = 0;
var attempts = 0;
var accuracy = 0;
var accuracyTrunkated = 0

function card_clicked(){
    if (second_card_clicked !== null) {
        return;
    }
    //console.log($(this).children('.back'));

    if(first_card_clicked === null){
        $(this).find('.front').addClass('reveal');
        first_card_clicked = this;
        //console.log(first_card_clicked)
    }
    else {
        $(this).find('.front').addClass('reveal');
        second_card_clicked = this;
        var firstImgSrc = $(first_card_clicked).find(".back > img").attr("src");
        var secondImgSrc = $(second_card_clicked).find(".back > img").attr("src");
        if (firstImgSrc === secondImgSrc) {
            match_counter = match_counter + 1;
            $('.match_value').text(match_counter);

            attempts = attempts + 1;
            $('.attemptValue').text(attempts);

            accuracy = match_counter / attempts;
            accuracyTrunkated = accuracy.toFixed(2);
            $('.accuracyValue').text(accuracyTrunkated + ' %');


            first_card_clicked = null;
            second_card_clicked = null;


            if (match_counter === total_possible_matches) {
                console.log('You win!')

            }
            else {
                return;
            }
        }

        else {
            attempts = attempts + 1;
            $('.attemptValue').text(attempts);

            accuracy = match_counter / attempts;
            accuracyTrunkated = accuracy.toFixed(2);

            $('.accuracyValue').text(accuracyTrunkated + ' %');

            setTimeout(remove, 2000);
        }
    }
}

function remove() {
    $(first_card_clicked).find('.front').removeClass('reveal');
    $(second_card_clicked).find('.front').removeClass('reveal');
    first_card_clicked = null;
    second_card_clicked = null;
}

/*
$(document).ready(initializeApp);

function initializeApp(){

    addButtonToList();
    addButtonToList();
   // $('.list-group button').on('click', addDot);

    $('#add-btn').on('click', addButtonToList)
    $('.list-group').on('click', 'button', addDot)
    $('#clear-btn').on('click', function(){
        $('.dot-container').text('')
    })
}




// ==== Place all code for prototype ABOVE this line ==== //
// ==== The below functions are just for you to use and will not need to be altered ==== //
function addDot(){
    $(this).next().append('<div class="dot"></div>');
}

function addButtonToList(){
    var number = $('.list-group-item').length + 1;
    var newListItem = $('<li class="list-group-item"><button class="btn btn-outline-info">Button #' + number + '</button><div class="dot-container"></div></li>');
    $('.list-group').append(newListItem);
}


 */