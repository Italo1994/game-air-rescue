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
  var fimDeJogo = false;
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
    colisao();
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
    } // move para cima

    if(jogo.pressionou[TECLA.S]) {
      var topo = parseInt( $("#jogador").css("top") );

      if(topo >= 434) {
        $("#jogador").css("top", topo-10);
      } else {
        $("#jogador").css("top", topo+10);
      }
    } // move para baixo

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

  function colisao() {
    var colisao1 = ($("#jogador").collision($("#inimigo1")));
    var colisao2 = ( $("#jogador").collision($("#inimigo2")) );
    var colisao3 = ( $("#disparo").collision($("#inimigo1")) );
    var colisao4 = ( $("#disparo").collision($("#inimigo2")) );
    var colisao5 = ( $("#jogador").collision($("#amigo")) );
    var colisao6 = ( $("#inimigo2").collision($("#amigo")) );

    // jogador com o inimigo1
    if(colisao1.length > 0) {
      let inimigo1X = parseInt( $("#inimigo1").css("left") );
      let inimigo1Y = parseInt( $("#inimigo1").css("top") );
      explosao1(inimigo1X, inimigo1Y);

      posicaoY = parseInt(Math.random() * 334);
      $("#inimigo1").css("left", 694);
      $("#inimigo1").css("top", posicaoY);
    }

    // jogador com o inimigo2
    if(colisao2.length > 0) {
      inimigo2X = parseInt($("#inimigo2").css("left"));
      inimigo2Y = parseInt($("#inimigo2").css("top"));

      explosao2(inimigo2X, inimigo2Y);
      $("#inimigo2").remove();

      reposicionaInimigo2();
    }

    // disparo com o inimigo1
    if(colisao3.length > 0) {
      let inimigo1X = parseInt( $("#inimigo1").css("left") );
      let inimigo1Y = parseInt( $("#inimigo1").css("top") );

      explosao1(inimigo1X, inimigo1Y);
      $("#disparo").css("left", 950);

      posicaoY = parseInt(Math.random() * 334);
      $("#inimigo1").css("left", 694);
      $("#inimigo1").css("top", posicaoY);
    }

    // disparo com o inimigo2
    if(colisao4.length > 0) {
      let inimigo2X = parseInt( $("#inimigo1").css("left") );
      let inimigo1Y = parseInt( $("#inimigo1").css("top") );
      $("#inimigo2").remove();

      explosao2(inimigo2X, inimigo2Y);
      $("#disparo").css("left", 950);

      reposicionaInimigo2();
    }

    // jogador com o amigo
    if(colisao5.lenght > 0) {
      reposicionaAmigo();

      $("#amigo").remove();
    }

  } // Fim da função colisao()

  function explosao1(inimigo1X, inimigo1Y) {
    $("#fundoGame").append("<div id='explosao1'></div>");
    $("#explosao1").css("background-image", "url(imgs/explosao.png)");

    var div = $("#explosao1");
    div.css("top", inimigo1Y);
    div.css("left", inimigo1X);
    div.animate( {width: 200, opacity: 0}, "slow");

    var tempoExplosao = window.setInterval(removeExplosao, 1000);

    let posicaoY = parseInt( Math.random() * 334 );
    $("#inimigo1").css("left", 704);
    $("#inimigo1").css("top", posicaoY);

    function removeExplosao() {
      div.remove();
      window.clearInterval(tempoExplosao);
      tempoExplosao = null;

    } // Fim da função removeExplosao()

  } // Fim da função explosao1()

  function explosao2(inimigo2X, inimigo2Y) {
    $("#fundoGame").append("<div id='explosao2'></div>");
    $("#explosao2").css("background-image", "url(imgs/explosao.png)");

    var div = $("#explosao2");
    div.css("top", inimigo2Y);
    div.css("left", inimigo2X);
    div.animate( {width: 200, opacity: 0}, "slow");

    var tempoExplosao2 = window.setInterval(removeExplosao2, 1000);

    function removeExplosao2() {
      div2.remove();
      window.clearInterval(tempoExplosao2);
      tempoExplosao2 = null;

    } // Fim da função removeExplosao2()

  } // Fim da função explosao2()

  function reposicionaAmigo() {
    var tempoAmigo = window.setInterval(reposiciona7, 7000);

    function reposiciona7() {
      window.clearInterval(tempoAmigo);
      tempoAmigo = null;

      if(fimDeJogo == false) {
        $("#fundoGame").append("<div id='amigo' class='anima3'></div>");
      }
    }
  } // Fim da função reposicionaAmigo()

  function reposicionaInimigo2() {
    var tempoColisao4 = window.setInterval(reposiciona4, 5000);

      function reposiciona4() {
        window.clearInterval(tempoColisao4);
        tempoColisao4 = null;

        if(fimDeJogo == false) {
          $("#fundoGame").append("<div id='inimigo2'></div>");
        }
      }
  } // Fim da função reposicionaInimigo2()


} // Fim da função start
