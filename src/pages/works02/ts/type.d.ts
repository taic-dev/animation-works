export type canvasType = HTMLCanvasElement | null;
export type ctxType = CanvasRenderingContext2D | null | undefined;

export type CanvasContextType = { canvas: canvasType; ctx: ctxType };

export type ParticleType = {
  x: number;
  y: number;
  radius: number;
  directionX: number;
  directionY: number;
  alpha: number;
  color?: string;
};