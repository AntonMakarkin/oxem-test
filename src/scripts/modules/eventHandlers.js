import { monthlyPaymentCount, contractAmount } from "./mathFunctions";

export const numberInputFocus = (e, inputBlockBg, activeInputBlockBg) => {
    e.target.parentElement.style.border = `2px solid ${inputBlockBg}`;
    e.target.parentElement.style.backgroundColor = `${activeInputBlockBg}`;
};

export const numberInputFocusOut = (e) => {
    e.target.parentElement.removeAttribute('style');
};

export const rangeInputInput = (e, monthPay, contractAmountPay, numberInput, costInput, contributionInput, monthInput, percentage, monthlyPaymentOutput, contractAmountOutput, _type = 'month') => {
    const target = e.target;
    const value = +target.value;
    let costValue;

    const min = target.min;
    const max = target.max;

    target.style.backgroundSize = (value - min) * 100 / (max - min) + '% 100%';
    numberInput.value = value;

    if (_type = 'cost') {
        const contributionRangeInput = document.querySelector('#contribution-range-input');
        costValue = +costInput.value;
        contributionInput.value = Math.round((costValue / 100) * +contributionRangeInput.value);
    }

    if (_type ='contribution') {
        const contributionRangeInput = document.querySelector('#contribution-range-input');
        const contributionOutput = document.querySelector('.parameter-input-block-contribution-percentage');
        costValue = +costInput.value;
        contributionInput.value = Math.round(+contributionRangeInput.value * (+costInput.value / 100));
        contributionOutput.textContent = `${contributionRangeInput.value}%`;
    }

    monthPay = monthlyPaymentCount(+costInput.value, +contributionInput.value, +monthInput.value, percentage);
    contractAmountPay = contractAmount(+contributionInput.value, +monthInput.value, monthPay);

    monthlyPaymentOutput.textContent = `${monthPay}`;
    contractAmountOutput.textContent = `${contractAmountPay}`;
};

export const numberInputChange = (e) => {

}