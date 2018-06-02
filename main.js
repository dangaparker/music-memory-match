var game;

$(document).ready(initializeMe);

function initializeMe(){
  $('.card').on('click', card_clicked);

    var cards = shuffleCards(album_cover_array);
    pullFromDeck(cards);
    $('.leftside').on('click', 'button', reset);

    var audio = document.querySelector('audio');
    //function()} = new buildTheGame()
//}

//class buildTheGame {
//constructor(){

  //  }
}

function shuffleCards(cards){
    var tempCards = [...cards];
    var shuffledCards = [];
    while (tempCards.length > 0) {
        var random_number = Math.floor(Math.random() * tempCards.length);
        var removedValue = tempCards[random_number];
        shuffledCards.push(removedValue);
        tempCards.splice(random_number, 1);

    }
    return shuffledCards;

}
function pullFromDeck(cards){
    for(var i = 0; i < cards.length; i++){
        var new_image = $('<img>').attr('src', cards[i]).addClass('album_covers');
        $('.back'+i).append(new_image);

    }
}

function reset(){
    attempts = 0;
    match_counter = 0;
    accuracyTrunkated = 0;
    $('.match_value').text(match_counter);
    $('.attemptValue').text(attempts);
    $('.accuracyValue').text(accuracyTrunkated + '.00%');
    $('.front').removeClass('reveal');
    $('.back').empty();
   pullFromDeck(shuffleCards(album_cover_array));
 

}



var album_cover_array = ['okcomputer.jpg', 'okcomputer.jpg', 'amnesiac.png', 'amnesiac.png', 'hail_to_the_thief.jpg', 'hail_to_the_thief.jpg', 'in_rainbows.jpg', 'in_rainbows.jpg', 'kingOfLimbs.jpg', 'kingOfLimbs.jpg', 'moonShapedPool.jpg', 'moonShapedPool.jpg', 'pablo_honey.jpg', 'pablo_honey.jpg', 'thebends.jpg', 'thebends.jpg', 'kida.jpg', 'kida.jpg'];



var first_card_clicked = null;
var second_card_clicked = null;
var total_possible_matches = 9;
var match_counter = 0;
var attempts = 0;
var accuracy = 0;
var games_played = 0;
var accuracyTrunkated = 0;




function card_clicked(){
    if (second_card_clicked !== null) {
        return;
    }
    if(first_card_clicked === this){
        return;
    }

    if(first_card_clicked === null){
        $(this).find('.front').addClass('reveal');
        first_card_clicked = this;

    
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
            $('.accuracyValue').text(accuracyTrunkated + '%');


            first_card_clicked = null;
            second_card_clicked = null;


            if (match_counter === total_possible_matches) {
                games_played = games_played + 1;
                $('.games_played_value').text(games_played);
                showModal();
                $('.modalShadow').on('click', modalClick);

                audio.play();


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

            $('.accuracyValue').text(accuracyTrunkated + '%');

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

function showModal() {
    $(".modalShadow").css("display", "block");
}

function modalClick(){
    if($(event.target).hasClass('modalShadow')){
        $(event.target).css('display','none')
    }
}


