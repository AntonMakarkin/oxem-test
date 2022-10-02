import { percentage, inputBlockBg, activeInputBlockBg } from "./constants";
import { monthlyPaymentCount, contractAmount } from "./mathFunctions";
import { numberInputFocus, numberInputFocusOut, rangeInputInput } from "./eventHandlers";

const calc = () => {
    const costInput = document.querySelector('#costvalue');
    const contributionInput = document.querySelector('#contribution');
    const contributionOutput = document.querySelector('.parameter-input-block-contribution-percentage');
    const monthInput = document.getElementById('months');
    const monthRangeInput = document.querySelector('#month-input-range');
    const costRangeInput = document.querySelector('#cost-input-range');
    const contributionRangeInput = document.querySelector('#contribution-range-input');

    const contractAmountOutput = document.querySelector('#totalammount-text');
    const monthlyPaymentOutput = document.querySelector('#monthpay-text');

    const numberInputs = [costInput, contributionInput, monthInput];
    const rangeInputs = [{rangeInput: costRangeInput, _type: 'cost'}, 
                         {rangeInput: contributionRangeInput, _type: 'contribution'}, 
                         {rangeInput: monthRangeInput, _type: 'month'}];

    let monthPay = monthlyPaymentCount(+costInput.value, +contributionInput.value, +monthInput.value, percentage);
    let contributionValue = +contributionRangeInput.value * (+costInput.value / 100);
    let contractAmountPay = contractAmount(contributionValue, +monthInput.value, monthPay);
    contributionInput.value = contributionValue;

    monthlyPaymentOutput.textContent = `${monthPay}`;
    contractAmountOutput.textContent = `${contractAmountPay}`;

    numberInputs.forEach(input => {
        input.addEventListener('focus', (e) => {
            numberInputFocus(e, inputBlockBg, activeInputBlockBg);
        });

        input.addEventListener('focusout', (e) => {
            numberInputFocusOut(e);
        });
    });

    rangeInputs.forEach((elem, i) => {
        elem.rangeInput.addEventListener('input', (e) => {
            rangeInputInput(e, monthPay, contractAmountPay, numberInputs[i], costInput, contributionInput, monthInput, 
                percentage, monthlyPaymentOutput, contractAmountOutput, elem._type);
        })
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
            contributionInput.value = Math.round((+minCost / 100) * +contributionRangeInput.value);

            monthPay = monthlyPaymentCount(+minCost, +contributionInput.value, +monthInput.value, percentage);
            contractAmountPay = contractAmount(+contributionInput.value, +monthInput.value, monthPay);

            monthlyPaymentOutput.textContent = `${monthPay}`;
            contractAmountOutput.textContent = `${contractAmountPay}`;
        } else if (value > maxCost) {
            target.value = maxCost;
            costRangeInput.style.backgroundSize = '100% 100%';
            costRangeInput.value = maxCost;
            contributionInput.value = Math.round((+maxCost / 100) * +contributionRangeInput.value);

            monthPay = monthlyPaymentCount(+maxCost, +contributionInput.value, +monthInput.value, percentage);
            contractAmountPay = contractAmount(+contributionInput.value, +monthInput.value, monthPay);

            monthlyPaymentOutput.textContent = `${monthPay}`;
            contractAmountOutput.textContent = `${contractAmountPay}`;
        } else {
            costRangeInput.value = value;
            let costValue = +costInput.value;
            contributionInput.value = Math.round((costValue / 100) * +contributionRangeInput.value);
            
            monthPay = monthlyPaymentCount(costValue, +contributionInput.value, +monthInput.value, percentage);
            contractAmountPay = contractAmount(+contributionInput.value, +monthInput.value, monthPay);

            monthlyPaymentOutput.textContent = `${monthPay}`;
            contractAmountOutput.textContent = `${contractAmountPay}`;

            costRangeInput.style.backgroundSize = (value - +minCost) * 100 / (maxCost - +minCost) + '% 100%';
        }
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

            monthPay = monthlyPaymentCount(+costInput.value, +contributionInput.value, +monthInput.value, percentage);
            contractAmountPay = contractAmount(+contributionInput.value, +monthInput.value, monthPay);

            monthlyPaymentOutput.textContent = `${monthPay}`;
            contractAmountOutput.textContent = `${contractAmountPay}`;
        } else if (value > maxMonth) {
            target.value = maxMonth;
            monthRangeInput.style.backgroundSize = '100% 100%';
            monthRangeInput.value = maxMonth;

            monthPay = monthlyPaymentCount(+costInput.value, +contributionInput.value, +monthInput.value, percentage);
            contractAmountPay = contractAmount(+contributionInput.value, +monthInput.value, monthPay);

            monthlyPaymentOutput.textContent = `${monthPay}`;
            contractAmountOutput.textContent = `${contractAmountPay}`;
        } else {
            monthRangeInput.value = value;
            monthRangeInput.style.backgroundSize = (value - minMonth) * 100 / (maxMonth - minMonth) + '% 100%';

            monthPay = monthlyPaymentCount(+costInput.value, +contributionInput.value, +monthInput.value, percentage);
            contractAmountPay = contractAmount(+contributionInput.value, +monthInput.value, monthPay);

            monthlyPaymentOutput.textContent = `${monthPay}`;
            contractAmountOutput.textContent = `${contractAmountPay}`;
        }
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

            monthPay = monthlyPaymentCount(+costInput.value, +contributionInput.value, +monthInput.value, percentage);
            contractAmountPay = contractAmount(+contributionInput.value, +monthInput.value, monthPay);

            monthlyPaymentOutput.textContent = `${monthPay}`;
            contractAmountOutput.textContent = `${contractAmountPay}`;
        } else if (value > maxContribution) {
            target.value = maxContribution;
            contributionRangeInput.style.backgroundSize = '100% 100%';
            contributionRangeInput.value = '60';
            contributionOutput.textContent = `60%`;

            monthPay = monthlyPaymentCount(+costInput.value, +contributionInput.value, +monthInput.value, percentage);
            contractAmountPay = contractAmount(+contributionInput.value, +monthInput.value, monthPay);

            monthlyPaymentOutput.textContent = `${monthPay}`;
            contractAmountOutput.textContent = `${contractAmountPay}`;
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