import "./imperial.js";
import { inputFoot, inputInch, inputStone, inputLibra } from "./imperial.js";

const radioImperial = document.querySelector("#imperial");
const radioMetric = document.querySelector("#metric");
const calcMetric = document.querySelector(".calculator-metric");
const calcImperial = document.querySelector(".calculator-imperial");
const inputHeight = document.querySelector("#height");
const inputWeight = document.querySelector("#weight");
const welcome = document.querySelector(".welcome-calculate");
const result = document.querySelector(".calculate");
const resultText = document.querySelector(".bmi strong");
const healthy = document.querySelector(".bmi-snippet p strong");

radioMetric.addEventListener("click", () => {
  if (radioMetric.checked) {
    calcMetric.classList.remove("hide");
    calcImperial.classList.add("hide");
    clearInputValues();
    showWelcome();
  }
});

radioImperial.addEventListener("click", () => {
  if (radioImperial.checked) {
    calcMetric.classList.add("hide");
    calcImperial.classList.remove("hide");
    clearInputValues();
    showWelcome();
  }
});

inputHeight.addEventListener("input", () => {
  showResult();
});

inputWeight.addEventListener("input", () => {
  showResult();
});

function showWelcome() {
  welcome.classList.remove("hide");
  result.classList.add("hide");
}

function clearInputValues() {
  inputFoot.value = "";
  inputInch.value = "";
  inputStone.value = "";
  inputLibra.value = "";
  inputHeight.value = "";
  inputWeight.value = "";
}

function calculateBMI(height, weight) {
  return weight / (height / 100) ** 2;
}

function showResult() {
  const height = inputHeight.value;
  const weight = inputWeight.value;

  if (height && weight) {
    welcome.classList.add("hide");
    result.classList.remove("hide");

    const calc = calculateBMI(height, weight);

    resultText.innerText = calc > 999 ? "..." : calc.toFixed(2);
    healthy.innerText = calculateIdealWeight(height);
  } else {
    showWelcome();
  }
}

function calculateIdealWeight(height) {
  const imcMin = 18.5;
  const imcMax = 24.9;

  let weightMin = imcMin * (height / 100) ** 2;
  let weightMax = imcMax * (height / 100) ** 2;

  return `${weightMin.toFixed(2)}kgs - ${weightMax.toFixed(2)}kgs.`;
}
