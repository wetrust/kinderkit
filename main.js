//ABCDEFGHIJKLLM
//NÑOPQRSTUVWXYZ

var Wheight = window.innerHeight;
var AltoH = Wheight;
var AnchoW = Wheight * 1.78;

document.getElementsByTagName("canvas")[0].height = AltoH;
document.getElementsByTagName("canvas")[0].width = AnchoW;

var canvas = document.getElementsByTagName("canvas")[0];
var ctx = canvas.getContext('2d');
var beto = document.getElementById('beto');
var alpha = 1.0;

        //anchoW 870 original del canvas
        //altoH  489 original del canvas
        //416 ancho original del video
        //332 alto original del video
        //115 posicion ancho original
        //7 posicion alto original

        //el ancho y alto está en relacion al tamaño del canvas
        //la posicion tambien
        const anchoW_video_beto = 870 / 416;
        const altoH_video_beto = 489 / 332;
        const anchoW_pos_beto = 870 / 156;
        const altoH_pos_beto = 489 / 7; 

document.getElementsByTagName("body")[0].onresize = function(){
    Wheight = window.innerHeight - 20;
    AltoH = Wheight;
    AnchoW = Wheight * 1.78;

    document.getElementsByTagName("canvas")[0].height = AltoH;
    document.getElementsByTagName("canvas")[0].width = AnchoW; 
}

function fadeOutBeto() {
        
    if (alpha <= 0) {
        return;
    }         
        
    requestAnimationFrame(fadeOutBeto);
    ctx.clearRect(0,0, canvas.width, canvas.height);
    ctx.globalAlpha = alpha;

    ctx.drawImage(beto, 0, 0, 416, 332, AnchoW / anchoW_pos_beto, AltoH / altoH_pos_beto, AnchoW / anchoW_video_beto , AltoH / altoH_video_beto);

    alpha += -0.01;
}  


function beto_entrada_play() {
    var $this = this; //cache
    (function loop() {

      if (!$this.paused && !$this.ended) {
        ctx.drawImage($this, 0, 0, 416, 332, AnchoW / anchoW_pos_beto, AltoH / altoH_pos_beto, AnchoW / anchoW_video_beto , AltoH / altoH_video_beto);
        setTimeout(loop, 1000 / 30); // drawing at 30fps
      }
      else if ($this.ended){
        beto.removeEventListener('play', beto_entrada_play, true);
        beto_salida();
      }
    })();
};

function beto_entrada(){

    beto.addEventListener('play', beto_entrada_play, true);

    beto.src = "alfabeto/vi/beto/entra_1.mp4";
    beto.load();
    beto.muted = true; 
    beto.play();
}

function beto_salida(){

    beto.addEventListener('play', function() {
        var $this = this; //cache
        (function loop() {
    
          if (!$this.paused && !$this.ended) {
            ctx.drawImage($this, 0, 0, 416, 332, AnchoW / anchoW_pos_beto, AltoH / altoH_pos_beto, AnchoW / anchoW_video_beto , AltoH / altoH_video_beto);
            setTimeout(loop, 1000 / 30); // drawing at 30fps
          }
          else if ($this.ended){
            fadeOutBeto();
          }
        })();
    }, 0);

    beto.src = "alfabeto/vi/beto/sale_1.mp4";
    beto.load();
    beto.muted = true; 
    beto.play();
}

beto_entrada();
