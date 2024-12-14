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
    updateSliderProgress(); 
}

function updateSliderProgress() {
    const sliderWidth = depositSlider.offsetWidth; 
    const value = depositSlider.value;
    const percentage = (value / depositSlider.max) * 100; 
    depositSlider.style.setProperty('--slider-progress', `${percentage}%`); 
}

loadFromLocalStorage();

depositSlider.addEventListener('input', updateCalculator);
holdingSlider.addEventListener('input', updateCalculator);

updateCalculator(); 
