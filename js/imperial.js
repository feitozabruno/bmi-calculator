const inputFoot = document.querySelector("#foot");
const inputInch = document.querySelector("#inch");
const inputStone = document.querySelector("#stone");
const inputLibra = document.querySelector("#libra");

const weightConversionFactor = {
  stoneToKg: 6.35029,
  libraToKg: 0.453592,
};

export { inputFoot, inputInch, inputStone, inputLibra };

const welcome = document.querySelector(".welcome-calculate");
const result = document.querySelector(".calculate");
const resultText = document.querySelector(".bmi strong");
const healthy = document.querySelector(".bmi-snippet p strong");

inputFoot.addEventListener("input", showResult);
inputInch.addEventListener("input", showResult);
inputStone.addEventListener("input", showResult);
inputLibra.addEventListener("input", showResult);

function showResult() {
  const { value: foot } = inputFoot;
  const { value: inch } = inputInch;
  const { value: stone } = inputStone;
  const { value: libra } = inputLibra;

  if (foot && inch && stone && libra) {
    welcome.classList.add("hide");
    result.classList.remove("hide");

    const bmi = calculateIMCImperial(foot, inch, stone, libra);

    resultText.innerText = bmi > 999 ? "..." : bmi.toFixed(2);
    healthy.innerText = calculateIdealWeightImperial(foot, inch);
  } else {
    welcome.classList.remove("hide");
    result.classList.add("hide");
  }
}

function calculateIMCImperial(foot, inch, stone, libra) {
  const heightM = (foot * 30.48 + inch * 2.54) / 100;
  const weightKg =
    stone * weightConversionFactor.stoneToKg +
    libra * weightConversionFactor.libraToKg;
  const imc = weightKg / heightM ** 2;
  return imc;
}

function calculateIdealWeightImperial(foot, inch) {
  const heightM = (foot * 30.48 + inch * 2.54) / 100;

  const weightMinKg = 18.5 * heightM ** 2;
  const weightMaxKg = 24.9 * heightM ** 2;

  const weightMinStones = Math.floor(
    weightMinKg / weightConversionFactor.stoneToKg
  );
  const weightMinLibras = Math.round(
    (weightMinKg % weightConversionFactor.stoneToKg) /
      weightConversionFactor.libraToKg
  );

  const weightMaxStones = Math.floor(
    weightMaxKg / weightConversionFactor.stoneToKg
  );
  const weightMaxLibras = Math.round(
    (weightMaxKg % weightConversionFactor.stoneToKg) /
      weightConversionFactor.libraToKg
  );

  return `${weightMinStones}st ${weightMinLibras}lbs - ${weightMaxStones}st ${weightMaxLibras}lbs.`;
}
