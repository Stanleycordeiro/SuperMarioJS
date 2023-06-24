//Elementos
const mario = document.getElementById("mario");
const tubo = document.getElementById("tubo");
const cloud = document.getElementById("cloud");
const gameOver = document.getElementById("gameOver");
const gameScreen = document.getElementById("gameScreen");
const menu = document.getElementById("menuGame");
const btnReset = document.getElementById("resetBtn");
const points = document.getElementById("cont");
const win = document.getElementById("win");
const btnWin = document.getElementById("winBtn");
const card = document.getElementById("card");
const medal = document.getElementById("medal");
const dancing = document.getElementById("dancing");
const mesage = document.getElementById('mesage');

var audio = new Audio("./assets/music/songBros.mp3");

//variaveis gerais
let pontuacao = 0;
let verificarColisaoAtivo = false;

//musica mario menu
window.addEventListener("DOMContentLoaded", (event) => {
  audio.play();
});

//Pulo mario adiciionando e removendo a classe
function mario_jump() {
  mario.classList.add("jump");

  setTimeout(() => {
    mario.classList.remove("jump");
  }, 500);
}

//função adicionar imagem game over
function addGameOver() {
  gameOver.style.display = "block";
}

//adicionando btn reset
function addReset() {
  setTimeout(() => {
    btnReset.style.display = "block";
  }, 800);
}

function winGame() {
  win.style.display = "block flex";
  gameScreen.style.display = "none";
  mesage.style.display = "block";
  setTimeout(() => {
    medal.style.display = "block";
    dancing.style.display = "block";
    card.style.display = "block";
    btnWin.style.display = "block";
   
  }, 8000);
}

//função remover tela menu
function removeMenu() {
  setTimeout(() => {
    menu.style.display = "none";
    gameScreen.style.display = "block";
    verificarColisaoAtivo = true;
  }, 400);
}

//função para recarregar jogo
function reload() {
  setTimeout(() => {
    location.reload();
  }, 300);
}

//jlogica jogo
function verificarColisao() {
  const cloudPosition = +window.getComputedStyle(cloud).left.replace("px", "");
  const tuboPosition = tubo.offsetLeft;
  const marioPosition = +window
    .getComputedStyle(mario)
    .bottom.replace("px", "");

  //incremento de pontuação;
  if (tuboPosition <= 0 && verificarColisaoAtivo) {
    incrementPont();
    verificarColisaoAtivo = false;
    setTimeout(() => {
      verificarColisaoAtivo = true;
    }, 180);
  }

  //   dificuldade

  //adiciona a bandeira
  if (pontuacao >= 10 && tuboPosition <= -60) {
    tubo.src = "./assets/marioGifs/bandeira.png";
    tubo.style.width = "190px";
  }

  //adicona a tela winner ao chegar na bandeira

  if (pontuacao >= 10 && tuboPosition > 250 && tuboPosition <= 270) {
    winGame();
  }
  //verificação de colisão entre elementos
  if (
    pontuacao < 10 &&
    tuboPosition <= 270 &&
    tuboPosition > 120 &&
    marioPosition < 110
  ) {
    addGameOver();
    addReset();

    tubo.style.animation = "none";
    tubo.style.left = `${tuboPosition}px`;

    cloud.style.animation = "none";
    cloud.style.left = `${cloudPosition}px`;

    mario.style.animation = "none";
    mario.style.bottom = `${marioPosition}px`;

    mario.src = "./assets/marioGifs/marioDeath.png";
    mario.style.width = "120px";
    mario.style.marginLeft = "25px";
    mario.style.marginBottom = "15px";
  }

  if (tuboPosition <= 270 && tuboPosition > 120 && pontuacao >= 10) {
    tubo.style.animation = "none";
    tubo.style.left = `${tuboPosition}px`;
  }

  setTimeout(verificarColisao, 10);
}

//função para acrescentar pontos
function incrementPont() {
  pontuacao += 1;
  points.innerHTML = pontuacao;
}

verificarColisao();

document.addEventListener("keydown", mario_jump);
