var Wheight = window.innerHeight - 3;
var AltoH = Wheight;
var AnchoW = Wheight * 1.78;

document.getElementsByTagName("canvas")[0].height = AltoH;
document.getElementsByTagName("canvas")[0].width = AnchoW;

var canvas = document.getElementsByTagName("canvas")[0];
var ctx = canvas.getContext('2d');
var alfa = document.getElementById('alfa');
var beto = document.getElementById('beto');
var alpha = 1.0;

        //anchoW 870 original del canvas
        //altoH  489 original del canvas
        //272 ancho original del video
        //316 alto original del video
        //483 posicion ancho original
        //7 posicion alto original

        //el ancho y alto está en relacion al tamaño del canvas
        //la posicion tambien
        const anchoW_video_alfa = 870 / 272;
        const altoH_video_alfa = 489 / 316;
        const anchoW_pos_alfa = 870 / 483;
        const altoH_pos_alfa = 489 / 7; 

document.getElementsByTagName("body")[0].onresize = function(){
    Wheight = window.innerHeight - 20;
    AltoH = Wheight;
    AnchoW = Wheight * 1.78;

    document.getElementsByTagName("canvas")[0].height = AltoH;
    document.getElementsByTagName("canvas")[0].width = AnchoW; 
}

alfa.addEventListener('play', function() {
    var $this = this; //cache
    (function loop() {

      if (!$this.paused && !$this.ended) {
        ctx.drawImage($this, 0, 0, 272, 316, AnchoW / anchoW_pos_alfa, AltoH / altoH_pos_alfa, AnchoW / anchoW_video_alfa , AltoH / altoH_video_alfa);
        setTimeout(loop, 1000 / 30); // drawing at 30fps
      }
      else if ($this.ended){
        fadeOutAlfa()
      }
    })();
}, 0);

function fadeOutAlfa() {
        
    if (alpha <= 0) {
        return;
    }         
        
    requestAnimationFrame(fadeOutAlfa);
    ctx.clearRect(0,0, canvas.width, canvas.height);
    ctx.globalAlpha = alpha;

    ctx.drawImage(alfa, 0, 0, 272, 316, AnchoW / anchoW_pos_alfa, AltoH / altoH_pos_alfa, AnchoW / anchoW_video_alfa , AltoH / altoH_video_alfa);

    alpha += -0.01;
}  

alfa.src = "alfabeto/vi/alfa/alfa_1.mp4";
alfa.load();
alfa.muted = true; 
alfa.play();