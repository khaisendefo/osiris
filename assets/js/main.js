const depositValue = document.getElementById('depositValue');
const holdingValue = document.getElementById('holdingValue');
const futureBalance = document.getElementById('futureBalance');
const generatedAmount = document.getElementById('generatedAmount');
const depositSlider = document.getElementById('depositSlider'); 
const holdingSlider = document.getElementById('holdingSlider'); 

function saveToLocalStorage() {
  localStorage.setItem('deposit', depositSlider.value);
  localStorage.setItem('holding', holdingSlider.value);
}

function loadFromLocalStorage() {
  const savedDeposit = localStorage.getItem('deposit');
  const savedHolding = localStorage.getItem('holding');

  if (savedDeposit !== null) depositSlider.value = savedDeposit;
  if (savedHolding !== null) holdingSlider.value = savedHolding;
}

function updateCalculator() {
  const deposit = parseFloat(depositSlider.value);
  const holding = parseInt(holdingSlider.value, 10);

  depositValue.textContent = deposit;
  holdingValue.textContent = holding;

  const futureBalanceValue = deposit * Math.pow(1.0067, holding);
  const generatedAmountValue = futureBalanceValue - deposit;

  futureBalance.textContent = Math.round(futureBalanceValue);
  generatedAmount.textContent = Math.round(generatedAmountValue); 

  saveToLocalStorage();
  updateSliderProgress(); // Обновляем прогресс слайдера
}

function updateSliderProgress() {
  const sliderWidth = depositSlider.offsetWidth; // Получаем ширину слайдера
  const value = depositSlider.value;
  const percentage = (value / depositSlider.max) * 100;  // Рассчитываем процентное значение слайдера
  depositSlider.style.setProperty('--slider-progress', `${percentage}%`); // Устанавливаем ширину для псевдо-элемента
}

loadFromLocalStorage();

depositSlider.addEventListener('input', updateCalculator);
holdingSlider.addEventListener('input', updateCalculator);

updateCalculator(); // Инициализация значений при загрузке страницы


/// CONNECT SmoothScroll
// SmoothScroll({ 
//   animationTime: 800, stepSize: 75, accelerationDelta: 30, accelerationMax: 2, keyboardSupport: true,
//   arrowScroll: 50, pulseAlgorithm: true, pulseScale: 4, pulseNormalize: 1, touchpadSupport: true,
// });

// gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

// ScrollSmoother.create({
//     wrapper: '.wrapper',
//     content: '.content',
//     smooth: 1.5,  // Плавность скроллинга
//     effects: true
// });

const tl = gsap.timeline();
tl.fromTo('.wrapper-inner', {x: '0%', y: '0%'}, {y: '-100%'});

const main = document.querySelector('.main');

// Используем offsetHeight для правильного завершения анимации по высоте
ScrollTrigger.create({
    animation: tl,
    trigger: '.wrapper',
    start: 'top top',
    // end: () => main.offsetHeight, // Используем offsetHeight, чтобы завершить анимацию по высоте
    scrub: true,
    pin: true
});
