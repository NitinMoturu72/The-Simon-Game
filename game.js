var buttonColors = ["green", "red", "yellow", "blue"];
var gamePattern = [];
var userChosenPattern = [];
var level = 0;
var started = false;

$(".start-button").click(function(){
    if (!started){
        $(".start-button").addClass("hide");
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
});

$(".btn").click(function(){
    var userChosenColor = $(this).attr("id");
    // alert("Button has been clicked");
    playSound(userChosenColor);
    animatePress(userChosenColor);
    userChosenPattern.push(userChosenColor);
    // console.log(userChosenPattern);
    checkAnswer(userChosenPattern.length-1);
    });

function checkAnswer(curLevel){
    if(gamePattern[curLevel] === userChosenPattern[curLevel]){
        //console.log("success");
        if(gamePattern.length === userChosenPattern.length){
            setTimeout(function(){
                nextSequence();
            }, 1000);
        }
    }
    else{
        //console.log("worng");
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 200);
        $("h1").text("Game Over, Press Button to Restart");
        $(".start-button").removeClass("hide");
        $(".start-button").text("Restart");;
        startOver();

    }
    // console.log(userChosenPattern);
}

function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
}

function nextSequence(){
    userChosenPattern = [];
    level ++;
    $("#level-title").text("Level "+level);
    var randNum = Math.floor(Math.random()*4);
    var latestColor = buttonColors[randNum];
    gamePattern.push(latestColor);

    $("#"+latestColor).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(latestColor);
    
}

function playSound(color){
    var sound = new Audio("./sounds/"+color+".mp3");
    sound.play();
}

function animatePress(color){
    $("#"+color).addClass("pressed");
    setTimeout(function(){
        $("#"+color).removeClass("pressed");}, 100);
}

// console.log(gamePattern);
// console.log(userChosenColor);
// console.log(userChosenPattern);
