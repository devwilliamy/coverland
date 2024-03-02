export default class Stopwatch {
  private startTime: number;
  private endTime: number;

  constructor() {
    this.startTime = 0;
    this.endTime = 0;
  }

  start(): void {
    this.startTime = performance.now();
  }

  stop(): void {
    this.endTime = performance.now();
  }

  getDuration(): number {
    return this.endTime - this.startTime;
  }

  logDuration(message: string): void {
    console.log(`${message}: ${this.getDuration()} ms`);
  }
}
