function start() {
  $("#inicio").hide();

  $("#fundoGame").append("<div id='jogador' class='anima1'></div>");
  $("#fundoGame").append("<div id='inimigo1' class='anima2'></div>");
  $("#fundoGame").append("<div id='inimigo2'></div>");
  $("#fundoGame").append("<div id='amigo' class='anima3'></div>");


  // Principais variáveis do jogo
  var jogo = {};
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
  } // Fim da função loop

  function moveFundo() {
    let esquerda = parseInt( $("#fundoGame").css("background-position") );
    $("#fundoGame").css("background-position", esquerda-1);
  } // Fim da função moveFundo

  function moveJogador() {
    if(jogo.pressionou[TECLA.W]) {
      var topo = parseInt( $("#jogador").css("top") );
      $("#jogador").css("top", topo-10);
    }

    if(jogo.pressionou[TECLA.S]) {
      var topo = parseInt( $("#jogador").css("top") );
      $("#jogador").css("top", topo+10);
    }
  } // Fim da função moveJogador

}
