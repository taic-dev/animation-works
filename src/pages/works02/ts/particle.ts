import { PARTICLE_NUMBER } from "./constants";
import type {
  CanvasContextType,
  ParticleType,
  canvasType,
  ctxType,
} from "./type";
import { gsap } from "gsap/gsap-core";

export class Particle {
  canvas: canvasType;
  ctx: ctxType | undefined;
  timeLine: gsap.core.Timeline;
  particles: CreateParticle[];
  particleInfo: ParticleType[];
  alpha: number;

  constructor() {
    this.canvas = document.querySelector(".canvas");
    this.particles = [];
    this.particleInfo = [];
    this.timeLine = gsap.timeline();
    this.alpha = 0;
  }

  init(): CanvasContextType {
    this.ctx = this.canvas?.getContext("2d");

    if (!this.canvas) return { canvas: this.canvas, ctx: this.ctx };

    this.canvas.width = window.innerWidth * 2;
    this.canvas.height = window.innerHeight * 2;

    this.canvas.style.width = window.innerWidth + "px";
    this.canvas.style.height = window.innerHeight + "px";

    return { canvas: this.canvas, ctx: this.ctx };
  }

  set() {
    for (let i = 0; i < PARTICLE_NUMBER; i++) {
      const x = Math.floor(Math.random() * window.innerWidth) * 2;
      const y = Math.random() * window.innerHeight * 2;
      const radius = Math.floor(Math.random() * 8) * 2;
      const directionX = (Math.random() * 2 - 1) * 2;
      const directionY = Math.random() * 0.5 * 2;

      const particleInfo: ParticleType = {
        x,
        y,
        radius,
        directionX,
        directionY,
        alpha: this.alpha,
      };
      const particle: CreateParticle = new CreateParticle({
        x,
        y,
        radius,
        directionX,
        directionY,
        alpha: this.alpha,
      });
      this.particles.push(particle);
      this.particleInfo.push(particleInfo);
    }
  }

  render({ canvas, ctx }: CanvasContextType) {
    if (!canvas || !this.ctx) return;

    this.ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < this.particles.length; i++) {
      this.particles[i].update(ctx, this.particleInfo[i], this.alpha);
    }
    requestAnimationFrame(() => this.render({ canvas, ctx }));
  }

  resize() {
    const { canvas, ctx } = this.init();
    this.set();
    this.render({ canvas, ctx });
    this.alpha = 0.5;
  }
}

export class CreateParticle {
  canvas: canvasType;
  x: number;
  y: number;
  radius: number;
  directionX: number;
  directionY: number;
  color: string;

  constructor(arg: ParticleType) {
    this.canvas = document.querySelector("canvas");
    this.x = arg.x;
    this.y = arg.y;
    this.radius = arg.radius;
    this.directionX = arg.directionX;
    this.directionY = arg.directionY;
    this.color = "rgb(51,51,51)";
  }

  render(ctx: ctxType, { x, y, radius, alpha }: ParticleType) {
    if (!ctx) return;
    ctx.fillStyle = this.color;
    ctx.globalAlpha = alpha;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fill();
  }

  update(
    ctx: ctxType,
    { x, radius, directionX, directionY }: ParticleType,
    alpha: number
  ) {
    if (!this.canvas) return;

    this.y -= this.directionY;
    if (this.y < 0 - this.radius) this.y = window.innerHeight * 2 + this.radius;

    this.render(ctx, {
      x,
      y: this.y,
      radius,
      directionX,
      directionY,
      alpha,
    });
  }
}
