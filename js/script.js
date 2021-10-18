function start() {
  $("#inicio").hide();

  $("#fundoGame").append("<div id='jogador' class='anima1'></div>");
  $("#fundoGame").append("<div id='inimigo1' class='anima2'></div>");
  $("#fundoGame").append("<div id='inimigo2'></div>");
  $("#fundoGame").append("<div id='amigo' class='anima3'></div>");


  // Principais variáveis do jogo
  var jogo = {};
  var velocidade = 5;
  var posicaoY = parseInt(Math.random() * 334);
  var podeAtirar = true;
  var TECLA = {
    W: 87,
    S: 83,
    D: 68
  };

  // Mecânica do jogo
  jogo.pressionou = [];

  // Identificando se o usuário pressionou alguma tecla
  $(document).keydown( function(e) {
    jogo.pressionou[e.which] = true;
  } );

  $(document).keyup( function(e) {
    jogo.pressionou[e.which] = false;
  });

  // Game loop
  jogo.timer = setInterval(loop, 30);

  function loop() {
    moveFundo();
    moveJogador();
    moveInimigo1();
    moveInimigo2();
    moveAmigo();
  } // Fim da função loop

  function moveFundo() {
    let esquerda = parseInt( $("#fundoGame").css("background-position") );
    $("#fundoGame").css("background-position", esquerda-1);
  } // Fim da função moveFundo

  function moveJogador() {
    if(jogo.pressionou[TECLA.W]) {
      var topo = parseInt( $("#jogador").css("top") );

      if(topo <= 0) {
        $("#jogador").css("top", topo+10);
      } else {
        $("#jogador").css("top", topo-10);
      }
    }

    if(jogo.pressionou[TECLA.S]) {
      var topo = parseInt( $("#jogador").css("top") );

      if(topo >= 434) {
        $("#jogador").css("top", topo-10);
      } else {
        $("#jogador").css("top", topo+10);
      }
    }

    if(jogo.pressionou[TECLA.D]) {
      // chama a função disparo
      disparo();
    }
  } // Fim da função moveJogador

  function moveInimigo1() {
    let posicaoX = parseInt( $("#inimigo1").css("left") );
    $("#inimigo1").css("left", posicaoX-velocidade);
    $("#inimigo1").css("top", posicaoY);

    if(posicaoX <= 0) {
      var posicaoY = parseInt( Math.random() * 334 );
      $("#inimigo1").css("left", 694);
      $("#inimigo1").css("top", posicaoY);

    }
  } // Fim da função moveInimigo1

  function moveInimigo2() {
    let posicaoX = parseInt( $("#inimigo2").css("left") );
    $("#inimigo2").css("left", posicaoX - 3);
    $("#inimigo2").css("top", posicaoY);

    if(posicaoX <= 0) {
      var posicaoY = parseInt( Math.random() * 334 );
      $("#inimigo2").css("left", 794);
    }
  } // Fim da função moveInimigo2

  function moveAmigo() {
    let posicaoX = parseInt( $("#amigo").css("left") );
    $("#amigo").css("left", posicaoX + 1);

    if(posicaoX >= 894) {
      $("#amigo").css("left", 10);
    }
  } // Fim da função moveAmigo

  function disparo() {
    if(podeAtirar == true) {
      podeAtirar = false;

      let topo = parseInt( $("#jogador").css("top") );
      let posicaoX = parseInt( $("#jogador").css("left") );
      let tiroX = posicaoX + 190;
      let tiroTopo = topo + 37;
      $("#fundoGame").append("<div id='disparo'></div>");
      $("#disparo").css("top", tiroTopo);
      $("#disparo").css("left", tiroX);

      var tempoDisparo = window.setInterval(executaDisparo, 30);
    } // Fim da condicional

    function executaDisparo() {
      let posicaoX = parseInt( $("#disparo").css("left") );
      $("#disparo").css("left", posicaoX + 15);

      if(posicaoX >= 900) {
        window.clearInterval(tempoDisparo);
        tempoDisparo = null;
        $("#disparo").remove();
        podeAtirar = true;
      }
    } // Fim da função executaDisparo

  } // Fim da função disparo

}
