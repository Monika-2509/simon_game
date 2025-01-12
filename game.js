var buttonColors=["red", "blue", "green", "yellow"];
var gamePattern=[];
var userClickedPattern=[];
var started =false;
var level = 0;

$(document).keypress((e)=>{
    if(!started){
        $("#level-title").text("Level "+level);
        nextSequence();
        started = true;
    }
})

function nextSequence(){
    userClickedPattern=[];
    level++;
    $("#level-title").text("Level "+level);
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColour = buttonColors[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour)
}
$(".btn").click(function(){
        var userChosenColour = $(this).attr("id");
        userClickedPattern.push(userChosenColour);
        // console.log(userChosenColour);
        animatePress(userChosenColour);
        playSound(userChosenColour);
        checkAnswer(userClickedPattern.length-1);
    })
    

function checkAnswer(index){
    if(gamePattern[index]===userClickedPattern[index]){
        if(gamePattern.length === userClickedPattern.length){
            setTimeout(()=>{
                nextSequence();
             },1000)
        }
    }
    else{
        playSound("wrong");
        $("body").addClass("game-over")
        $("#level-title").text("Game Over, Press Any Key to Restart");
        setTimeout(()=>{
            $("body").removeClass("game-over")
         },1000)
         startOver();
    }
}

function animatePress(currentColor){
      $("#"+currentColor).addClass("pressed");
      setTimeout(()=>{
        $("#"+currentColor).removeClass("pressed");
      },200)
}
function playSound(name){
    var audio = new Audio("sounds/"+name+".mp3")
    audio.play();
    // alert("played");
}
 
function startOver(){
    started = false;
    gamePattern=[];
    level=0;
}