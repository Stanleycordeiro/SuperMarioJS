const mario = document.getElementById("mario");
const tubo = document.getElementById("tubo");
const cloud = document.getElementById('cloud');
//Pulo mario adiciionando e removendo a classe
function mario_jump(){
  mario.classList.add("jump");

 setTimeout(() => {
    mario.classList.remove("jump");
 }, 500);
};

//adicionando evento de colisão entre "mario" e "tubo"
const loop = setInterval(() => {
    const tuboPosition = tubo.offsetLeft;
    const marioPosition = +window.getComputedStyle(mario).bottom.replace('px','');

    

    if(tuboPosition <= 140 && tuboPosition > 0 && marioPosition < 110){
        tubo.style.animation = 'none';
        tubo.style.left = `${tuboPosition}px`; 

        cloud.style.animation = 'none';
        cloud.style.left = `${tuboPosition}px`; 

        mario.style.animation = 'none';
        mario.style.bottom = `${marioPosition}px`;

        mario.src ="./assets/marioGifs/marioDeath.png";
        mario.style.width = '150px';
        mario.style.marginLeft = '5px';

        cloud.src ="./assets/marioGifs/gameOver.png"
        cloud.style.margin = '0 auto';
        cloud.style.height = '400px'; 
       cloud.style.left = "25%"
        

        clearInterval(loop);
    }
}, 10);

document.addEventListener("keydown", mario_jump);
