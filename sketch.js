// é uma referencia 
var dino, dino_correndo
var chaoinvisivel,chao
var nuvem 
var cacto
var pontuacao=0
var PLAY=1
var sapateado
var pontinho
// respeito (morreu)
var f
// gameover 
var TRISTE=0
var modoJogo= PLAY
// pre recarregamento
function preload(){
dino_correndo
=loadAnimation("trex1.png","trex3.png","trex4.png");   
chao3=loadImage('ground2.png')
nuvemImg=loadImage ('cloud.png')
cacto1=loadImage ('obstacle1.png')
cacto2=loadImage ('obstacle2.png')
cacto3=loadImage ('obstacle3.png')
cacto4=loadImage ('obstacle4.png')
cacto5=loadImage ('obstacle5.png')
cacto6=loadImage ('obstacle6.png')
triste=loadImage ('gameOver.png')
dino2=loadImage ('trex_collided.png')
restart=loadImage('restart.png')
sapateado=loadSound('jump.mp3')
f=loadSound('die.mp3')
pontinho=loadSound('checkPoint.mp3')
}


function setup(){
  
  createCanvas(600,200);
  chaoinvisivel = createSprite(50,200,50,10);
  dino = createSprite(50,160,20,50);
  chao = createSprite(50,190,600,10);
  gameover = createSprite(250,100,20,20)
  bolotaa = createSprite(250,130,10,10)
  chao.addImage('chao2',chao3)
  dino.addAnimation("running", dino_correndo);
  dino.addAnimation('death',dino2)
  bolotaa.addImage(restart)
  dino.scale=0.5;
  grupodecacto = new Group()
  grupodenuvem = new Group()
  

} 
  
function draw(){
  background("white");
  if (pontuacao>0 && pontuacao%500===0) {
   pontinho.play ()
 } 
  if(modoJogo===PLAY){
  //o dino pula na posicao certa ;-;
  if (keyDown('space')&& dino.y>=75){
  dino.velocityY=-8
  sapateado.play();
  }
  gerarcacto();
  gerarnuvem(); 
  // e a gravidade uau incrivel  
  dino.velocityY=dino.velocityY+0.5
  chao.velocityX =-10
    if (chao.x < 0) {
    chao.x=chao.width/2
  }
  pontuacao=pontuacao+Math.round(frameCount/100) 
  if (grupodecacto.isTouching(dino)){
    modoJogo=TRISTE
    f.play()
  }
    gameover.visible = false
    bolotaa.visible = false
  }
  
  if (modoJogo===TRISTE) {
    grupodecacto.setVelocityXEach(0)
    grupodenuvem.setVelocityXEach(0)
    chao.velocityX=0
    dino.changeAnimation('death',dino2)
    grupodecacto.setLifetimeEach(-1)
    grupodenuvem.setLifetimeEach(-1)
    gameover.addImage(triste)  
    gameover.visible=true
    bolotaa.visible=true
    dino.velocityY=0
    if (mousePressedOver(bolotaa)){
   resetar()
    }
  }
  // chao infinito ;-;
  dino.collide(chaoinvisivel)
  chaoinvisivel.visible= false;   
  
  text('pontuacao:'+pontuacao,0,60)
 
  createEdgeSprites;
  drawSprites();

}
function gerarnuvem(){
  if (frameCount%60===0){
  nuvem = createSprite(600,30,20,20); 
  grupodenuvem.add(nuvem)
  nuvem.lifetime=150;
  nuvem.y=Math.round (random(10,60))
  nuvem.velocityX =-4
  nuvem.addImage('nuvemImg',nuvemImg);
  nuvem.scale=0.5
 // ajustando o negocio ai aprofundidade
    nuvem.depth=dino.depth
    dino.depth=dino.depth +1
  }
  }
  function gerarcacto (){
  if (frameCount%60===0){
    cacto = createSprite (600,170,20,20)
    grupodecacto.add(cacto)
    cacto.lifetime=85
    cacto.velocityX= -(7+pontuacao/100)
    cacto.scale=0.6
    cacto.depth=dino.depth
    dino.depth=dino.depth +1
    var cleber = Math.round(random(1,6));
  switch (cleber){
    case 1 :cacto.addImage(cacto1);
    break;
    case 2 :cacto.addImage(cacto2);
    break;
    case 3 :cacto.addImage(cacto3);
    break;
    case 4 :cacto.addImage(cacto4);
    break ;
    case 5 :cacto.addImage(cacto5);
    break;
    case 6 :cacto.addImage(cacto6);
    break;
  }
  }
  }
function resetar (){
 pontuacao = 0
 modoJogo=PLAY  
 grupodecacto.destroyEach();
 grupodenuvem.destroyEach();
  dino.changeAnimation('running',dino_correndo)
}



  







