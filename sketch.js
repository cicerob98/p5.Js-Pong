//Sons do Jogo
let trilha;
let raquetada;
let ponto;
//

function preload () {
  trilha = loadSound('trilha.mp3');
  raquetada = loadSound("raquetada.mp3");
  ponto = loadSound('ponto.mp3');
}

function setup() {
  createCanvas(600, 400);
  trilha.loop();
}

function draw() {
  background(0);
  
  bolinha();
  moveBolinha();
  raquete(xRaquete1, yRaquete1);
  raquete(xRaquete2, yRaquete2);
  moveRaquete();
  //moveRaquete2();
  moveBot();
  resetBolinha();
  colisaoBolinha();
  colisaoRaquete(xRaquete1, yRaquete1);
  colisaoRaquete(xRaquete2, yRaquete2);
  placar();
  marcaPontos();
}

//Variáveis da bolinha.
let xBolinha = 300;
let yBolinha = 200;
let diametro = 25;
let raio = diametro / 2;
//Velocidade da bolinha.
let velocidadeXBolinha = 6;
let velocidadeYBolinha = 6;
//

function bolinha () {
    circle(xBolinha, yBolinha, diametro);
}

function moveBolinha () {
  xBolinha += velocidadeXBolinha;
  yBolinha += velocidadeYBolinha;
}

//Variáveis das Raquetes
let xRaquete1 = 5;
let yRaquete1 = 150;
let comprimentoRaquete = 10;
let raqueteAltura = 75;
let raqueteFormato = 100;
let colidiu = false;
//Raquete Oponente.
let xRaquete2 = 585;
let yRaquete2 = 150;
let velocidadeYOponente = 1;
let chanceDeErro = 0;
//

function raquete (x, y) {
  rect(x, y, comprimentoRaquete, raqueteAltura, raqueteFormato);
}

function moveRaquete () {
  if (keyIsDown(UP_ARROW)) {
      yRaquete1 -= 9;
      }
  if (keyIsDown(DOWN_ARROW)) {
      yRaquete1 += 9;
  }
}

function moveRaquete2 () {
  if (keyIsDown(87)) {
      yRaquete2 -= 9;
      }
  if (keyIsDown(83)) {
      yRaquete2 += 9;
  }
}

function moveBot () {
  velocidadeYOponente = yBolinha - yRaquete2 - comprimentoRaquete / 2 - 30;
  yRaquete2 += velocidadeYOponente + chanceDeErro;
  calculaChanceDeErro();
//  Minha maneira.
//    if (yBolinha > yRaquete2) {
//    yRaquete2 += velocidadeYOponente;
//  }
//  else (yRaquete2 -= velocidadeYOponente);
//
}

function calculaChanceDeErro() {
  if (pontosDoOponente >= meusPontos) {
    chanceDeErro += 1;
    if (chanceDeErro >= 39){
    chanceDeErro = 40;
    }
  } else {
    chanceDeErro -= 1;
    if (chanceDeErro <= 35){
    chanceDeErro = 35;
    }
  }
}

function resetBolinha() {
  if (xBolinha - raio <= 0 || xBolinha - raio >= 600){
    xBolinha *= -2;
  }
}

function colisaoBolinha() {
  
  if (xBolinha + raio > width || xBolinha - raio < 0){
      velocidadeXBolinha *= -1;
      }
  if (yBolinha + raio > height || yBolinha - raio < 0){
      velocidadeYBolinha *= -1;
      }
  
}

function colisaoRaquete (x, y) {
  colidiu = collideRectCircle(x, y, comprimentoRaquete, raqueteAltura, xBolinha, yBolinha, raio);
  if (colidiu) {
    velocidadeXBolinha *= -1;
    raquetada.play();
  }
}

//Marcador de Pontuação.
let meusPontos = 0;
let pontosDoOponente = 0;
//

function placar () {
  stroke(255);
  textSize(45);
  textAlign(CENTER);
  fill(color('#FF8C00'));
  rect(150, 8, 50, 37, 10);
  rect(350, 8, 50, 37, 10);
  fill(255);
  text(meusPontos, 175, 42);
  text(pontosDoOponente, 375, 42);
}

function marcaPontos () {
  if (xBolinha > 585) {
      meusPontos += 1;
    ponto.play();
      }
  if (xBolinha - raio < 5) {
    pontosDoOponente += 1;
    ponto.play();
  }
}