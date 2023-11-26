const state ={
    view:{
        squares: document.querySelectorAll(".square"),
        enemy: document.querySelector(".enemy"),
        timeLeft: document.querySelector("#time-left"),
        score:document.querySelector("#score"),
    },
    values:{

        gameVelocity: 1000,
        hitPosition:0,
        result: 0,
        curretTime:60,
    },
    actions:{
        timerId:setInterval(randomSquare, 1000), 
        countDownTimerId: setInterval(countDown, 1000),
    }
};
function countDown(){
    state.values.curretTime--;
    state.view.timeLeft.textContent = state.values.curretTime;
    if(state.values.curretTime<=0){
        clearInterval(state.actions.timerId);
        clearInterval(state.actions.countDownTimerId);
        alert("Game Over! O seu resultado foi: "+state.values.result);
    }
}

function playSound(audioName){
    let audio = new Audio(`./src/audios/${audioName}.m4a`);
    audio.volume=0.2;
    audio.play();
}

// Limpar o número de inimigos 
function randomSquare(){

    state.view.squares.forEach((square) => {
        square.classList.remove("enemy");
    });
// sorteia um numero aleatorio de 1 a 9 
    let randomNumber = Math.floor(Math.random()*9);
    // pega quadrado da mesma posição do sorteio 
    let randomSquare = state.view.squares[randomNumber]
    // adiciona a classe 
    randomSquare.classList.add("enemy");
    state.values.hitPosition = randomSquare.id;
}

// function moveEnemy(){
//     state.values.timerId = setInterval(randomSquare,state.values.gameVelocity);
// }

function addListenerHitBox(){
    state.view.squares.forEach((square) => {
       square.addEventListener("mousedown", ()=> {
        if(square.id === state.values.hitPosition){
            state.values.result++
            state.view.score.textContent= state.values.result;
            state.values.hitPosition = null;
            playSound("hit");
        }
       })
    } )
}

function initialize(){
// moveEnemy();
addListenerHitBox();
}
initialize();