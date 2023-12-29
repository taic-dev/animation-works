import { gsap } from "gsap";

export class Main {
  [x: string]: any;
  obj: any;
  canvas: HTMLCanvasElement;
  ctx: any;

  constructor() {
    const loading = "L o d i n g . . .";
    let text = "";
    loading.split("").forEach((v) => {
      text += `<span>${v}</span>`;
    });
    const loadingText = document.querySelector(".loading-text");
    if (loadingText) {
      loadingText.innerHTML = text;
    }

    gsap.set("span", {
      opacity: 0,
      y: 50,
    });

    this.obj = document.querySelector(".loading");
    this.canvas = document.createElement("canvas");
    this.ctx = this.canvas.getContext("2d");
    this.canvasSize = {
      width: window.innerWidth,
      height: window.innerHeight,
    };
    this.canvas.width =
      this.canvasSize.width * Math.min(2, window.devicePixelRatio);
    this.canvas.height =
      this.canvasSize.height * Math.min(2, window.devicePixelRatio);

    this.canvas.style.width = `${this.canvasSize.width}px`;
    this.canvas.style.height = `${this.canvasSize.height}px`;
    this.obj.appendChild(this.canvas);

    this.point = {
      currentY: this.canvas.height,
      curveY: this.canvas.height,
    };

    this.init();
  }

  init() {
    gsap.registerEffect({
      name: "curve",
      defaults: {
        flag: true,
      },

      effect: (target: any, config: any) => {
        const tl = gsap
          .timeline({
            onUpdate: () => {
              this.curveUpdate(config.flag);
            },
          })
          .to(target, {
            duration: 0.8,
            curveY: 0,
            ease: "power4.out",
          })
          .to(
            target,
            {
              currentY: 0,
              duration: 0.8,
            },
            "<"
          );
        return tl;
      },
    });
    
    gsap.timeline({ delay: 1 })
    .add(gsap.effects.curve(this.point))
    .add(this.textAnimation.bind(this))
    .set(this.point, { 
      curretY: this.canvas.height,
      curveY: this.canvas.height,
    })
    .add(gsap.effects.curve(this.point, { flag: false }), '+=2')
    .from('.fv', {
      autoAlpha: 0,
      y: 15,
      duration: 1,
    }, '-=0.5')
    .to('.loading', { opacity: 0, visibility: 'hidden' }, '<')
  }

  textAnimation() {
    const tl = gsap.timeline()
    .to('span', {
      oppacity: 1,
      y: 0,
      duration: 1,
      ease: 'back.out(3)',
      stagger: {
        each: 0.02,
      }
    })
    .to('span', {
      opacity: 0,
      y: -100,
      duration: 0.6,
      ease: 'back.in(2)',
      stagger: {
        each: 0.01,
        ease: 'power2'
      }
    },)
  }

  curveUpdate(flag: any) {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.fillStyle = "#DC143C";

    if (flag) {
      console.log(flag)
      this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
      this.ctx.fillStyle = "#fff";
    }

    this.ctx.beginPath();
    this.ctx.moveTo(0, 0);
    this.ctx.lineTo(0, this.point.currentY);
    this.ctx.quadraticCurveTo(
      this.canvas.width / 2,
      this.point.curveY,
      this.canvas.width,
      this.point.currentY
    );
    this.ctx.lineTo(this.canvas.width, 0)
    this.ctx.closePath()
    this.ctx.fill()
  }
}
