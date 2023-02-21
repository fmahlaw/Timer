"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Timer {
    constructor(title, durationInMinutes, color) {
        this.title = title;
        this.color = color;
        this.startTime = 0;
        this.intervalId = 0;
        this.alerts = [];
        this.duration = durationInMinutes * 60;
    }
    get remainingTime() {
        return this.duration - (Date.now() - this.startTime) / 1000;
    }
    get isRunning() {
        return this.intervalId !== 0;
    }
    formatDuration() {
        const minutes = Math.floor(this.remainingTime / 60)
            .toString()
            .padStart(2, "0");
        const seconds = Math.floor(this.remainingTime % 60)
            .toString()
            .padStart(2, "0");
        return `${minutes}:${seconds}`;
    }
    start() {
        if (!this.isRunning) {
            this.startTime = Date.now();
            this.intervalId = window.setInterval(() => {
                if (this.remainingTime <= 0) {
                    this.stop();
                    this.alerts.forEach((alert) => alert.callback());
                    return;
                }
                const durationElement = document.getElementById(`timer-${this.title}-duration`);
                durationElement.textContent = this.formatDuration();
            }, 1000);
        }
    }
    stop() {
        if (this.isRunning) {
            window.clearInterval(this.intervalId);
            this.intervalId = 0;
        }
    }
    addAlert(time, message, callback) {
        this.alerts.push({ time, message, callback });
    }
}
exports.default = Timer;
