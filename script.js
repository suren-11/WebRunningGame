var runStart = 0;
function keyCheck(event){

    if(event.which==13){
        if(runWorkerId==0){            
            createBlockId = setInterval(createBlock,100);
            moveBlockId = setInterval(moveBlock,100);
            runWorkerId = setInterval(run,100);
            runStart = 1;
            runSound.play();
            backgroundWorkerId = setInterval(moveBackground,100);
            scoreWorkerId = setInterval(updateScore,100);
            start();
        }   
    }

    if(event.which==32){
        if(runStart==1){
                if(jumpWorkerId==0){
                clearInterval(runWorkerId);
                runSound.pause();
                jumpWorkerId = setInterval(jump,100);
                jumpSound.play();
            }
        }        
    }
}

//create Block
var blockMarginLeft=600;
var blockId=1;
var createBlockId = 0;

function createBlock(){
    var block = document.createElement("div");
    block.className = "block";
    block.id = "block" + blockId;
    blockId++;

    var gap = Math.random() * (1000 - 400) + 400;
    blockMarginLeft = blockMarginLeft + gap;

    block.style.marginLeft = blockMarginLeft + "px";
    
    document.getElementById("background").appendChild(block);
}


//move block

var moveBlockId = 0;

function moveBlock(){
    for(var i = 1; i <= blockId; i++){
        var currentBlock = document.getElementById("block"+i);
        var currentMarginLeft = currentBlock.style.marginLeft;
        var newMarginLeft = parseInt(currentMarginLeft)-20;
        currentBlock.style.marginLeft = newMarginLeft + "px";
        if(newMarginLeft<=140){
            if(newMarginLeft>=30){
                if(boyMarginTop<=600){
                    if(boyMarginTop>=550){
                        clearInterval(runWorkerId);
                        runSound.pause();
                        clearInterval(jumpWorkerId);
                        jumpWorkerId = -1;
                        clearInterval(backgroundWorkerId);
                        clearInterval(scoreWorkerId);
                        clearInterval(moveBlockId);
                        clearInterval(createBlockId);
                        deadWorkerId = setInterval(dead,100); 
                        deadSound.play();     
                    }
                }
            }
        }    
    }
}

//run Boy
var boy = document.getElementById("boy");
var runImageNumber = 1;
var runWorkerId=0;

//run Sound
var runSound = new Audio("run.mp3");
runSound.loop = true;

function run(){
    runImageNumber++;

    if(runImageNumber ==9){
        runImageNumber = 1;
    }

    boy.src = "Run ("+runImageNumber+").png";
}

//jump sound

var jumpSound = new Audio("jump.mp3");
//jump function
var jumpImageNumber = 1;
var jumpWorkerId= 0;
var boyMarginTop = 600;

function jump(){
    jumpImageNumber++;

    if(jumpImageNumber<=7){
        boyMarginTop = boyMarginTop - 30;
        boy.style.marginTop = boyMarginTop + "px";
    }

    if(jumpImageNumber>=8){
        boyMarginTop = boyMarginTop + 30;
        boy.style.marginTop = boyMarginTop + "px";
    }

    if(jumpImageNumber==13){
        jumpImageNumber = 1;
        clearInterval(jumpWorkerId);
        jumpWorkerId = 0;
        runWorkerId = setInterval(run,100);
        runSound.play();
    }

    boy.src = "Jump ("+jumpImageNumber+").png";
}

//move background

var background = document.getElementById("background");
var backgroundX = 0;
var backgroundWorkerId = 0;
function moveBackground(){
    backgroundX = backgroundX - 20;
    background.style.backgroundPositionX = backgroundX + "px";
}

//score update

var score = document.getElementById("score");
var newScore = 0;
var scoreWorkerId = 0;

function updateScore(){
    newScore++;
    score.innerHTML = newScore;
    win();
}

var deadSound = new Audio("dead.mp3");
//dead
var deadImageNumber = 1;
var deadWorkerId = 0;

function dead(){
    deadImageNumber++;

    if(deadImageNumber==11){
        deadImageNumber = 10;
        boy.style.marginTop = "600px";

        document.getElementById("gameOver").style.visibility = "visible";
        document.getElementById("endScore").innerHTML = newScore;
    }
    boy.src = "Dead ("+deadImageNumber+").png";
}

function re(){
    location.reload();
}

function win(){
    if(newScore==1000){
        clearInterval(runWorkerId);
        clearInterval(backgroundWorkerId);
        clearInterval(createBlockId);
        clearInterval(moveBlockId);
        clearInterval(jumpWorkerId);
        clearInterval(scoreWorkerId);
        scoreWorkerId = -1;
        jumpWorkerId = -1;
        runWorkerId = -1;
        document.getElementById("gameWin").style.visibility = "visible";
    }
}

function start(){
    document.getElementById("gameStart").style.visibility = "hidden";
}