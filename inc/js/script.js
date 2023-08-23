$(document).ready(function () {
    var gameOverSoundPlayed = false; 
    var hitrn = 0;
    var score = 0;
    var timer = 15;
    // Function to increase the score
    function increaseScore() {
        score += 10;
        $('#score').html(score);
    }
    // Function to generate a random number (for 'hitval')
    function generateHitVal() {
        hitrn = Math.floor(Math.random() * 10);
        $('#hitval').html(hitrn);
    }
    // Function to update the timer
    function runTimer() {
        setInterval(function () {
            if (timer > 0) {
                timer--;
                $('#timer').html(timer);
            } else {
                timer = 0;
                gameOver(); // Call the gameOver function when the timer reaches 0
            }
            if(timer<10){
                $('#timer').addClass("danger");
            }
        }, 1000);
    }

    // Function to create bubbles
    function makeBubbles() {
        var clutter = '';
        for (var i = 0; i <= 161; i++) {
            var rn = Math.floor(Math.random() * 10);
            clutter += `<div class="bubble">${rn}</div>`;
        }
        $('#bottom').html(clutter);
    }

    // Function to display "Game Over" message with fade-in effect
    function gameOver() {
        if (gameOverSoundPlayed==false) {
            // Play the game over sound
            $("#gameOverSound")[0].play();
            gameOverSoundPlayed = true;
        }
        var gameOverHtml = '<div class="centered-container"><h1 style="display:none;">Game Over</h1></div>';
        $('#bottom').html(gameOverHtml);
        $('#bottom h1').fadeIn();
    }
    // Initialize the game
    function initializeGame() {
     
        generateHitVal();
        makeBubbles();
        runTimer();
    }
    // Event handler for clicking on bubbles
    $('#bottom').on("click", ".bubble", function (e) {
        var clickedValue = Number($(this).html());
        if (clickedValue === hitrn) {
            increaseScore();
            makeBubbles();
            generateHitVal();
            $("#clickSound")[0].play();
        } else {
            generateHitVal();
            makeBubbles();
            $("#clickSound")[0].play();
            
        }
    });
    // Initialize the game when the document is ready
    initializeGame();
});
