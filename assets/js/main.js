gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

ScrollSmoother.create({
    wrapper: '.wrapper',
    content: '.content',
    smooth: 1.5,  
    effects: true
});

let panels = gsap.utils.toArray(".panel");  

let tops = panels.map(panel => ScrollTrigger.create({trigger: panel, start: "top top"}));

panels.forEach((panel, i) => {
  ScrollTrigger.create({
    trigger: panel,
    start: () => panel.offsetHeight < window.innerHeight ? "top top" : "bottom bottom", 
    pin: true, 
    pinSpacing: false 
  });
});


const depositValue = document.getElementById('depositValue');
const holdingValue = document.getElementById('holdingValue');
const futureBalance = document.getElementById('futureBalance');
const generatedAmount = document.getElementById('generatedAmount');
const depositSlider = document.getElementById('depositSlider');
const holdingSlider = document.getElementById('holdingSlider');

function updateCalculator() {
    const deposit = parseFloat(depositSlider.value);
    const holding = parseInt(holdingSlider.value, 10);

    depositValue.textContent = deposit;
    holdingValue.textContent = holding;

    const futureBalanceValue = deposit * Math.pow(1.0067, holding);
    const generatedAmountValue = futureBalanceValue - deposit;

    futureBalance.textContent = Math.round(futureBalanceValue);
    generatedAmount.textContent = Math.round(generatedAmountValue);

    updateSliderProgress(depositSlider); // Обновляем прогресс слайдера депозита
    updateSliderProgress(holdingSlider); // Обновляем прогресс слайдера holding
}

function updateSliderProgress(slider) {
    const sliderWidth = slider.offsetWidth; // Получаем ширину слайдера
    const value = slider.value;
    const percentage = (value / slider.max) * 100; // Рассчитываем процентное значение слайдера
    slider.style.setProperty('--slider-progress', `${percentage}%`); // Устанавливаем ширину для псевдо-элемента
}

depositSlider.addEventListener('input', updateCalculator);
holdingSlider.addEventListener('input', updateCalculator);

// Устанавливаем слайдеры на ноль при первом заходе
depositSlider.value = 0;
holdingSlider.value = 0;
depositValue.textContent = 0;
holdingValue.textContent = 0;
futureBalance.textContent = 0;
generatedAmount.textContent = 0;

updateCalculator(); // Инициализация значений при загрузке страницы











