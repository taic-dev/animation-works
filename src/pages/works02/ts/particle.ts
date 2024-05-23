import { PARTICLE_NUMBER, WINDOW } from "./constants";
import type {
  CanvasContextType,
  ParticleType,
  canvasType,
  ctxType,
} from "./type";

export class Particle {
  particles: CreateParticle[];
  particleInfo: ParticleType[];
  ctx: ctxType | undefined;

  constructor() {
    this.particles = [];
    this.particleInfo = [];

    window.requestAnimationFrame =
      window.requestAnimationFrame ||
      (window as any).mozRequestAnimationFrame ||
      (window as any).weblitRequestAnimationFrame ||
      (window as any).msRequestAnimationFrame ||
      function (cb) {
        setTimeout(cb, 17);
      };
  }

  init(): CanvasContextType {
    const canvas: canvasType = document.querySelector(".canvas");
    this.ctx = canvas?.getContext("2d");
    if (!canvas) return { canvas, ctx: this.ctx };

    canvas.width = WINDOW.W;
    canvas.height = WINDOW.H;
    return { canvas, ctx: this.ctx };
  }

  set() {
    for (let i = 0; i < PARTICLE_NUMBER; i++) {
      const x = Math.floor(Math.random() * WINDOW.W);
      const y = Math.random() * WINDOW.H;
      const radius = Math.floor(Math.random() * 8);
      const directionX = Math.random() * 2 - 1;
      const directionY = Math.random() * 0.5;
      const particleInfo: ParticleType = {
        x,
        y,
        radius,
        directionX,
        directionY,
      };
      const particle: CreateParticle = new CreateParticle({
        x,
        y,
        radius,
        directionX,
        directionY,
      });
      this.particles.push(particle);
      this.particleInfo.push(particleInfo);
    }
  }

  render({ canvas, ctx }: CanvasContextType, speed: number) {
    if (!canvas || !this.ctx) return;

    this.ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < this.particles.length; i++) {
      this.particles[i].update(ctx, this.particleInfo[i], speed);
    }
    requestAnimationFrame(() => this.render({ canvas, ctx }, speed));
  }
}

export class CreateParticle {
  canvas: HTMLCanvasElement | null;
  x: number;
  y: number;
  radius: number;
  directionX: number;
  directionY: number;
  color: string;
  alpha: number;

  constructor(arg: ParticleType) {
    this.canvas = document.querySelector("canvas");

    this.x = arg.x;
    this.y = arg.y;
    this.radius = arg.radius;
    this.directionX = arg.directionX;
    this.directionY = arg.directionY;
    this.color = "rgb(51,51,51)";
    this.alpha = 0.5;
  }

  render(ctx: ctxType, { x, y, radius }: ParticleType) {
    if (!ctx) return;
    ctx.fillStyle = this.color;
    ctx.globalAlpha = this.alpha;
    ctx.strokeStyle = this.color;
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fill();

    // ctx.fillText(String.fromCodePoint(0x1f44d), 100, 100, 100);
  }

  update(
    ctx: ctxType,
    { x, y, radius, directionX, directionY }: ParticleType,
    speed: number
  ) {
    if (!this.canvas) return;

    this.y -= this.directionY * speed;
    if (this.y < 0 - this.radius) this.y = WINDOW.H + this.radius;

    this.render(ctx, { x, y: this.y, radius, directionX, directionY });
  }
}
