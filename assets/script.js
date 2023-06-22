const mario = document.getElementById("mario");
const tubo = document.getElementById("tubo");
const cloud = document.getElementById("cloud");
var gameOver = document.getElementById("gameOver");
var gameScreen = document.getElementById("gameScreen");
const menu = document.getElementById("menuGame");
const btnReset = document.getElementById("resetBtn");

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
  }, 400);
}

//função para recarregar jogo
function reload() {
  setTimeout(() => {
    location.reload();
  }, 300);
}

//adicionando evento de colisão entre "mario" e "tubo"
const loop = setInterval(() => {
  const tuboPosition = tubo.offsetLeft;
  const marioPosition = +window
    .getComputedStyle(mario)
    .bottom.replace("px", "");
  const cloudPosition = +window.getComputedStyle(cloud).left.replace("px", "");

  if (tuboPosition <= 140 && tuboPosition > 0 && marioPosition < 110) {
    addGameOver();
    addReset();

    tubo.style.animation = "none";
    tubo.style.left = `${tuboPosition}px`;

    cloud.style.animation = "none";
    cloud.style.left = `${cloudPosition}px`;

    mario.style.animation = "none";
    mario.style.bottom = `${marioPosition}px`;

    mario.src = "./assets/marioGifs/marioDeath.png";
    mario.style.width = "150px";
    mario.style.marginLeft = "5px";

    clearInterval(loop);
  }
}, 10);

document.addEventListener("keydown", mario_jump);
