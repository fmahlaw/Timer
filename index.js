"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const timerManager_1 = __importDefault(require("./timerManager"));
const timerContainer = document.getElementById("timer-container");
if (timerContainer !== null) {
    let timerManager = new timerManager_1.default(timerContainer);
    timerManager.addTimer("Workout", 60 * 30, "#1abc9c");
    timerManager.addTimer("Study", 60 * 60, "#f1c40f");
    timerManager.addTimer("Relaxation", 60 * 45, "#3498db");
    timerManager.render();
}
