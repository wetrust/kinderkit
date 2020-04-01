var Wheight = window.innerHeight - 3;
var AltoH = Wheight;
var AnchoW = Wheight * 1.78;

document.getElementsByTagName("canvas")[0].height = AltoH;
document.getElementsByTagName("canvas")[0].width = AnchoW;

var canvas = document.getElementsByTagName("canvas")[0];
var ctx = canvas.getContext('2d');
var central = document.getElementById('central');
var alfa = document.getElementById('alfa');
var alpha = 1.0;

        //anchoW 870 original del canvas
        //altoH  489 original del canvas
        //640 ancho original del video
        //288 alto original del video

        //483 posicion ancho original
        //7 posicion alto original

        //el ancho y alto está en relacion al tamaño del canvas
        //la posicion tambien
        const anchoW_video_central = 870 / 640;
        const altoH_video_central = 489 / 288;
        const anchoW_pos_central = 870 / 115;
        const altoH_pos_central = 489 / 7; 

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

central.addEventListener('play', function() {
    var $this = this; //cache
    (function loop() {

      if (!$this.paused && !$this.ended) {
        ctx.drawImage($this, 0, 0, 640, 288, AnchoW / anchoW_pos_central, AltoH / altoH_pos_central, AnchoW / anchoW_video_central , AltoH / altoH_video_central);
        setTimeout(loop, 1000 / 30); // drawing at 30fps
      }
      else if ($this.ended){
        alfa.play();
      }
    })();
}, 0);

alfa.addEventListener('play', function() {
    var $this = this; //cache
    (function loop() {

      if (!$this.paused && !$this.ended) {
        ctx.drawImage($this, 0, 0, 272, 316, AnchoW / anchoW_pos_alfa, AltoH / altoH_pos_alfa, AnchoW / anchoW_video_alfa , AltoH / altoH_video_alfa);
        setTimeout(loop, 1000 / 30); // drawing at 30fps
      }
      else if ($this.ended){
        ctx.clearRect(0,0, canvas.width, canvas.height);
        ctx.drawImage(central, 0, 0, 640, 288, AnchoW / anchoW_pos_central, AltoH / altoH_pos_central, AnchoW / anchoW_video_central , AltoH / altoH_video_central);
      }
    })();
}, 0);

function fadeOutCentral() {
        
    if (alpha <= 0) {
        return;
    }         
        
    requestAnimationFrame(fadeOutCentral);
    ctx.clearRect(0,0, canvas.width, canvas.height);
    ctx.globalAlpha = alpha;

    ctx.drawImage(central, 0, 0, 640, 288, AnchoW / anchoW_pos_central, AltoH / altoH_pos_central, AnchoW / anchoW_video_central , AltoH / altoH_video_central);

    alpha += -0.01;
}

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

central.src = "alfabeto/vi/alfa/venia.mp4";
central.load();
central.muted = true; 
central.play();
alfa.src = "alfabeto/vi/alfa/alfa_1.mp4";
alfa.load();
alfa.muted = true; 