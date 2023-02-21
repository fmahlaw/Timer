import TimerManager from "./timerManager";

const timerContainer = document.getElementById("timer-container");

if (timerContainer !== null) {
  let timerManager = new TimerManager(timerContainer);

  timerManager.addTimer("Workout", 60 * 30, "#1abc9c");
  timerManager.addTimer("Study", 60 * 60, "#f1c40f");
  timerManager.addTimer("Relaxation", 60 * 45, "#3498db");

  timerManager.render();
}
