"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const timer_1 = __importDefault(require("./timer"));
class TimerManager {
    constructor(container) {
        this.container = container;
        this.timers = [];
    }
    addTimer(title, durationInMinutes, color) {
        const timer = new timer_1.default(title, durationInMinutes, color);
        this.timers.push(timer);
    }
    render() {
        this.timers.forEach((timer) => {
            const timerElement = document.createElement("div");
            timerElement.classList.add("timer");
            timerElement.style.background = timer.color;
            const titleElement = document.createElement("h2");
            titleElement.classList.add("timer-title");
            titleElement.textContent = timer.title;
            timerElement.appendChild(titleElement);
            const durationElement = document.createElement("p");
            durationElement.classList.add("timer-duration");
            durationElement.textContent = timer.formatDuration();
            durationElement.setAttribute("id", `timer-${timer.title}-duration`);
            timerElement.appendChild(durationElement);
            const controlsElement = document.createElement("div");
            controlsElement.classList.add("timer-controls");
            const startButton = document.createElement("button");
            startButton.classList.add("timer-control");
            startButton.textContent = "Start";
            startButton.addEventListener("click", () => timer.start());
            controlsElement.appendChild(startButton);
            const stopButton = document.createElement("button");
            stopButton.classList.add("timer-control");
            stopButton.textContent = "Stop";
            stopButton.addEventListener("click", () => timer.stop());
            controlsElement.appendChild(stopButton);
            timerElement.appendChild(controlsElement);
            const alertsElement = document.createElement("ul");
            alertsElement.classList.add("timer-alerts");
            timer.alerts.forEach((alert) => {
                const alertElement = document.createElement("li");
                alertElement.textContent = "${alert.time} seconds";
            });
            timerElement.appendChild(alertsElement);
            const addAlertButton = document.createElement("button");
            addAlertButton.textContent = "Add Alert";
            addAlertButton.classList.add("timer-control");
            addAlertButton.addEventListener("click", () => {
                const alertTime = Number(prompt("Enter alert time (in seconds):"));
                if (!isNaN(alertTime)) {
                    const alertMessage = prompt("Enter alert message:");
                    if (alertMessage !== null) {
                        timer.addAlert(alertTime, alertMessage, () => {
                            alert(alertMessage);
                        });
                    }
                    const alertElement = document.createElement("li");
                    alertElement.textContent = `${alertTime} seconds: ${alertMessage}`;
                    alertsElement.appendChild(alertElement);
                }
            });
            controlsElement.appendChild(addAlertButton);
            this.container.appendChild(timerElement);
        });
    }
}
exports.default = TimerManager;
