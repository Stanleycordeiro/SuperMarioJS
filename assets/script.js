//Elementos
const mario = document.getElementById("mario");
const tubo = document.getElementById("tubo");
const cloud = document.getElementById("cloud");
const gameOver = document.getElementById("gameOver");
const gameScreen = document.getElementById("gameScreen");
const menu = document.getElementById("menuGame");
const btnReset = document.getElementById("resetBtn");
const points = document.getElementById("cont");

//variaveis gerais
let pontuacao = 0;
let verificarColisaoAtivo = false;

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

  if (tuboPosition < 20 && verificarColisaoAtivo) {
    incrementPont();
    verificarColisaoAtivo = false;
    setTimeout(() => {
      verificarColisaoAtivo = true;
    }, 200);
  }

  if (tuboPosition <= 270 && tuboPosition > 120 && marioPosition < 110) {
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

  setTimeout(verificarColisao, 10);
}

//função para acrescentar pontos
function incrementPont() {
  pontuacao += 1;
  points.innerHTML = pontuacao;
}

verificarColisao();

document.addEventListener("keydown", mario_jump);
