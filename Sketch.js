// bolinha 
let xb = 300;//posição x da bolinha
let yb = 200;//posição y da bolinha 
let db = 15; // diâmetro da bolinha
let velocidadex = -8; // velocidade x da bolinha 
let velocidadey = -8; // velocidade y da bolinha
let raio = db /2;  // raio da bolinha

// raquete esquerda (player1)
let xr1 = 5;  // posição x da raquete "1" 
let yr1 =150; // posição y da raquete "1"
let wr1 = 10; // width (largura) da raquete "1"
let hr1  =70; // height (altura) da raquete "1"

// raquete direita (player2)
let xr2 = 573; // posição x da raquete "2" 
let yr2 =150;  // posição y da raquete "2"
let wr2 = 10;  // width  (largura) da raquete "2"
let hr2  =70;  // height (altura) da raquete  "2"

let bug2 = 0
let bug1 = 0 // variavel contadora anti bug, para resolver o bug da bolinha rebatendo atras da raquete

let player_1 =0 // contador de  pontos do jogador "1"
let player_2 =0 // contador de pontos do jogador "2"

// sounds

let trilha; // som da trilha sonora 
let ponto; //  som do ponto (quando a bolinha acerta nas paredes verticais)
let raquetada;//som da bolinha acertando  a raquete

function preload() 
// função para carregar os sons no jogo
 {  
    trilha =loadSound("trilha.mp3")
    ponto  =loadSound("ponto.mp3")
    raquetada= loadSound("raquetada.mp3")
    

}

function preloadTime()
// função para limitar o tempo do preload, para arrumar um bug, que quando o preloand se repete muitas vezes o sistema buga 
 {
    if  (bug2<2) 
    { preload()
    }
  
}

function placar ()
//placar para mostrar os pontos dos jogadores na tela
 {
  textAlign(CENTER);
  textSize(20);
  fill(color(255,140,0));
  rect(130,8,40,20,6);
  fill(225);
  text(player_1, 150, 26);
  fill(color(255,140,0));
  rect(430,8,40,20,6)
  fill(225);
  text(player_2 , 450 , 26);
  
}

function setup() 
// função nativa no p5 que define o tamanho da scream
 { 
  createCanvas(600, 400);
  trilha.loop()
}

function colisão()
 // function que  controla a colisão da bolinha nas 
 {
  if (bug1<1){
    if (xb + raio>=width )
  {
    velocidadex *= -1
    player_1 +=1
    bug1 +=1
    ponto.play()
}
  if (xb-raio < 0)
  {
    velocidadex *= -1
    player_2 += 1
    bug1 +=1
    ponto.play()
  }}
  
  if(yb + raio>height || yb-raio < 0)
  {
  velocidadey *= -1 
    
  }  
}


function bolinha() 
//Função para criar a bolinha
 {
  circle(xb, yb, db);
}

function velocidade()
//Função que define a velocidade da bolinha
 {
  xb += velocidadex; 
  yb += velocidadey;
  bug2 +=1
   //OBS- Para alterar a velocidade do jogo basta aumentar os valores das variaveis velocidadex e velocidadey
}

function resetbug()
/*Função para resetar o valor da variavel de contagem antibug
 quando a bolinha passa pelo meio da tela, retorna para o valor 0
 a bolinha só rebate na raquete ou na borda de o valor da variavel bug1 
for iqual a 0 */
 {
  if (xb == 300) {
    bug1 = 0
  }
  
}

function raquete1() 
//Criando a raquete da esquerda
 {
  rect(xr1,yr1,wr1,hr1,2)
}
function raquete2()
//Criando a raquete da esquerda
 {
  rect(xr2,yr2,wr2,hr2,2)
}

function movimentoraquete()
/* Função que define o movimento da raquete (cima ou baixo) de ambos os lados para o jogo multiplayer  
-OBS- Ela pode ser desativada para o jogo se tornar Singleplayer(ativando a função "movimentoraqueteXXX" ) */
{
  if (yr2 >-5) 
  {
    if(keyIsDown(UP_ARROW)) 
    { 
      yr2 -= 10;
    }
  }
  
  if (yr2 < 350) 
  {
    if (keyIsDown(DOWN_ARROW))
    {
      yr2 += 10;
    }
  }
  
  if (yr1>-5)
  {
    if(keyIsDown(87)) 
    { 
    yr1 -= 10;
    }
  }
  
  if (yr1 < 350)
  {
    if (keyIsDown(83))
    { 
      yr1 += 10;
    }
  }
  
}


function movimentoraqueteXXX()
/*Função que determina o movimento da raquete, sendo ambas controladas pelas setinhas, para modo singleplayer ( Não deve ser usada simultaneamente a função "movimentoraquete()")*/
 {
  if (yr2 >-5) 
  {
    if(keyIsDown(UP_ARROW)) 
    { 
      yr2 -= 10;
    }
  }
  
  if (yr2 < 350) 
  {
    if (keyIsDown(DOWN_ARROW))
    {
      yr2 += 10;
    }
  }
  if (yr1>-5)
  {
    if(keyIsDown(UP_ARROW)) 
    { 
    yr1 -= 10;
    }
  }
  
  if (yr1 < 350)
  {
      if (keyIsDown(DOWN_ARROW))
      { 
      yr1 += 10;
      }
    }
  
  
  
}

function colisaoraquete1()
/* Função para determinar as rebatidas da bolinha ao tocar na raquete da esquerda */
 {   
  if(bug1<1)
     {
       if(xb - raio < xr1+wr1 && yb +raio > yr1 && yb - raio < yr1 + hr1)   
          {
            
          bug1+=1
          velocidadex*=-1
          raquetada.play()
          }
     
     
     }
 
}

function colisaoraquete2()
/* Função para determinar as rebatidas da bolinha ao tocar na raquete da direita */
 {
    if (bug1 < 1)
    {
       if (xb + raio > xr2 && yb +raio > yr2 && yb -raio < yr2 + hr2) 
    {
     velocidadex *= -1
     bug1 +=1
      raquetada.play()
    }}
}

  


function draw() {

  background(0);
  colisão()
  bolinha()
  velocidade()
  raquete1()
  raquete2()
  resetbug()
  colisaoraquete1()
  colisaoraquete2()
  placar()
  movimentoraqueteXXX() // comment this line to play multiplayer
  movimentoraquete()    // comment this line to play single player
  preloadTime()
  }
