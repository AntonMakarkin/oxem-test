import { percentage } from "./constants";
import { monthlyPaymentCount, contractAmount } from "./functions";

const calc = () => {
    const rangeInputs = document.querySelectorAll('input[type="range"]');
    const costInput = document.querySelector('#costvalue');
    const contributionInput = document.querySelector('#contribution');
    const contributionOutput = document.querySelector('.parameter-input-block-contribution-percentage');
    const monthInput = document.getElementById('months');
    const monthRangeInput = document.querySelector('#month-input-range');
    const costRangeInput = document.querySelector('#cost-input-range');
    const contributionRangeInput = document.querySelector('#contribution-range-input');

    const contractAmountOutput = document.querySelector('#totalammount-text');
    const monthlyPaymentOutput = document.querySelector('#monthpay-text');

    let monthPay = monthlyPaymentCount(+costInput.value, +contributionInput.value, +monthInput.value, percentage);
    let contributionValue = +contributionRangeInput.value * (+costInput.value / 100);
    let contractAmountPay = contractAmount(contributionValue, +monthInput.value, monthPay);
    contributionInput.value = contributionValue;

    monthlyPaymentOutput.textContent = `${monthPay}`;
    contractAmountOutput.textContent = `${contractAmountPay}`;

    costRangeInput.addEventListener('input', (e) => {
        let target = e.target;
        let value = target.value;
        const min = target.min;
        const max = target.max;
        target.style.backgroundSize = (value - min) * 100 / (max - min) + '% 100%';
        costInput.value = value;
        let costValue = +costInput.value;
        contributionInput.value = Math.round((costValue / 100) * contributionRangeInput.value);

        monthPay = monthlyPaymentCount(+costInput.value, +contributionInput.value, +monthInput.value, percentage);
        contractAmountPay = contractAmount(+contributionInput.value, +monthInput.value, monthPay);

        monthlyPaymentOutput.textContent = `${monthPay}`;
        contractAmountOutput.textContent = `${contractAmountPay}`;
    });

    costInput.addEventListener('change', (e) => {
        let target = e.target;
        let value = +target.value;
        let minCost = costRangeInput.getAttribute('min');
        let maxCost = costRangeInput.getAttribute('max');

        if (value < minCost) {
            target.value = minCost;
            costRangeInput.style.backgroundSize = '0% 0%';
            costRangeInput.value = minCost;
            contributionInput.value = Math.round((minCost / 100) * +contributionRangeInput.value);
        } else if (value > maxCost) {
            target.value = maxCost;
            costRangeInput.style.backgroundSize = '100% 100%';
            costRangeInput.value = maxCost;
            contributionInput.value = Math.round((maxCost / 100) * +contributionRangeInput.value);
        } else {
            costRangeInput.value = value;
            let costValue = +costInput.value;
            contributionInput.value = Math.round((costValue / 100) * +contributionRangeInput.value);
            
            monthPay = monthlyPaymentCount(costValue, +contributionInput.value, +monthInput.value, percentage);
            contractAmountPay = contractAmount(+contributionInput.value, +monthInput.value, monthPay);

            monthlyPaymentOutput.textContent = `${monthPay}`;
            contractAmountOutput.textContent = `${contractAmountPay}`;

            costRangeInput.style.backgroundSize = (value - minCost) * 100 / (maxCost - minCost) + '% 100%';
        }
    });

    monthRangeInput.addEventListener('input', (e) => {
        let target = e.target;
        let value = target.value;
        const min = target.min;
        const max = target.max;
        target.style.backgroundSize = (value - min) * 100 / (max - min) + '% 100%';
        monthInput.value = value;

        monthPay = monthlyPaymentCount(+costInput.value, +contributionInput.value, +monthInput.value, percentage);
        contractAmountPay = contractAmount(+contributionInput.value, +monthInput.value, monthPay);

        monthlyPaymentOutput.textContent = `${monthPay}`;
        contractAmountOutput.textContent = `${contractAmountPay}`;
    });

    monthInput.addEventListener('change', (e) => {
        let target = e.target;
        let value = +target.value;
        let minMonth = monthRangeInput.getAttribute('min');
        let maxMonth = monthRangeInput.getAttribute('max');

        if (value < minMonth) {
            target.value = minMonth;
            monthRangeInput.style.backgroundSize = '0% 0%';
            monthRangeInput.value = minMonth;
        } else if (value > maxMonth) {
            target.value = maxMonth;
            monthRangeInput.style.backgroundSize = '100% 100%';
            monthRangeInput.value = maxMonth;
        } else {
            monthRangeInput.value = value;
            monthRangeInput.style.backgroundSize = (value - minMonth) * 100 / (maxMonth - minMonth) + '% 100%';

            monthPay = monthlyPaymentCount(+costInput.value, +contributionInput.value, +monthInput.value, percentage);
            contractAmountPay = contractAmount(+contributionInput.value, +monthInput.value, monthPay);

            monthlyPaymentOutput.textContent = `${monthPay}`;
            contractAmountOutput.textContent = `${contractAmountPay}`;
        }
    });

    contributionRangeInput.addEventListener('input', (e) => {
        let target = e.target;
        let value = target.value;
        const min = target.min;
        const max = target.max;
        target.style.backgroundSize = (value - min) * 100 / (max - min) + '% 100%';
        target.value = value;
        contributionInput.value = Math.round(+contributionRangeInput.value * (+costInput.value / 100));
        contributionOutput.textContent = `${value}%`;

        monthPay = monthlyPaymentCount(+costInput.value, +contributionInput.value, +monthInput.value, percentage);
        contractAmountPay = contractAmount(+contributionInput.value, +monthInput.value, monthPay);

        monthlyPaymentOutput.textContent = `${monthPay}`;
        contractAmountOutput.textContent = `${contractAmountPay}`;
    });

    contributionInput.addEventListener('change', (e) => {
        let target = e.target;
        let value = +target.value;
        let minContribution = (+costInput.value / 100) * 10;
        let maxContribution = (+costInput.value / 100) * 60;

        if (value < minContribution) {
            target.value = minContribution;
            contributionRangeInput.style.backgroundSize = '0% 0%';
            contributionRangeInput.value = '1';
            contributionOutput.textContent = `10%`;
        } else if (value > maxContribution) {
            target.value = maxContribution;
            contributionRangeInput.style.backgroundSize = '100% 100%';
            contributionRangeInput.value = '60';
            contributionOutput.textContent = `60%`;
        } else {
            contributionRangeInput.value = value;
            contributionRangeInput.style.backgroundSize = (value - minContribution) * 100 / (maxContribution - minContribution) + '% 100%';

            monthPay = monthlyPaymentCount(+costInput.value, +contributionInput.value, +monthInput.value, percentage);
            contractAmountPay = contractAmount(+contributionInput.value, +monthInput.value, monthPay);

            monthlyPaymentOutput.textContent = `${monthPay}`;
            contractAmountOutput.textContent = `${contractAmountPay}`;
        }
    });
}

export default calc;