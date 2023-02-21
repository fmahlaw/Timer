class Timer {
    private startTime: number = 0;
    private duration: number;
    private intervalId: number = 0;
    public alerts: {
      callback(): void; time: number; message: string 
}[] = [];
  
    constructor(
      public title: string,
      durationInMinutes: number,
      public color: string
    ) {
      this.duration = durationInMinutes * 60;
    }
  
    get remainingTime(): number {
      return this.duration - (Date.now() - this.startTime) / 1000;
    }
  
    get isRunning(): boolean {
      return this.intervalId !== 0;
    }
  
    formatDuration(): string {
      const minutes = Math.floor(this.remainingTime / 60)
        .toString()
        .padStart(2, "0");
      const seconds = Math.floor(this.remainingTime % 60)
        .toString()
        .padStart(2, "0");
      return `${minutes}:${seconds}`;
    }
  
    start(): void {
      if (!this.isRunning) {
        this.startTime = Date.now();
        this.intervalId = window.setInterval(() => {
          if (this.remainingTime <= 0) {
            this.stop();
            this.alerts.forEach((alert) => alert.callback());
            return;
          }
          const durationElement = document.getElementById(
            `timer-${this.title}-duration`
          ) as HTMLElement;
          durationElement.textContent = this.formatDuration();
        }, 1000);
      }
    }
  
    stop(): void {
      if (this.isRunning) {
        window.clearInterval(this.intervalId);
        this.intervalId = 0;
      }
    }
  
    addAlert(time: number, message: string, callback: () => void): void {
      this.alerts.push({ time, message, callback });
    }
  }
  
  export default Timer;
  