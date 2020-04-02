//ABCDEFGHIJKLLM
//NÑOPQRSTUVWXYZ

class circo{
  Wheight = window.innerHeight;
  AltoH = this.Wheight;
  AnchoW = this.Wheight * 1.78;
  canvas = document.getElementsByTagName("canvas")[0];
  ctx = this.canvas.getContext('2d');
  alpha = 1.0;

  run(){
    this.preparar();
    this.entrada();
  }

  preparar(){
    document.getElementsByTagName("canvas")[0].height = this.AltoH;
    document.getElementsByTagName("canvas")[0].width = this.AnchoW;

    document.getElementsByTagName("body")[0].onresize = this.canvasResize;
  }

  canvasResize(){
    this.Wheight = window.innerHeight - 20;
    this.AltoH = this.Wheight;
    this.AnchoW = this.Wheight * 1.78;

    document.getElementsByTagName("canvas")[0].height = AltoH;
    document.getElementsByTagName("canvas")[0].width = AnchoW; 
  }

  entrada(){

  }
  
}

class kinderkit{
  run(){
    document.getElementById("btn.bienvenida").onclick = this.bienvenida;
    document.getElementById("bienvenida").addEventListener('ended', this.end, true);
  }

  bienvenida(){
    let btn = document.getElementById("btn.bienvenida");
    btn.classList.add("d-none");
    let video = document.getElementById("bienvenida");
    video.classList.remove("d-none");
    video.muted = false;
    video.play();
  }

  end(){
    let app = new circo;

    let btn = document.getElementById("bienvenida.container");
    btn.classList.add("d-none");

    let canvas = document.getElementsByTagName("canvas")[0];
    canvas.classList.add("d-block","mx-auto");
    canvas.classList.remove("d-none");

    app.run();
  }
}

let app = new kinderkit;

app.run();