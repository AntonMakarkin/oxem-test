const calc = () => {
    const rangeInputs = document.querySelectorAll('input[type="range"]');
    const costInput = document.querySelector('#costvalue');
    const monthInput = document.getElementById('months');
    const monthRangeInput = document.querySelector('#month-input-range');
    const costRangeInput = document.querySelector('#cost-input-range');
    
    monthRangeInput.addEventListener('input', (e) => {
        let target = e.target;
        let value = target.value;
        const min = target.min;
        const max = target.max;
        target.style.backgroundSize = (value - min) * 100 / (max - min) + '% 100%';
        monthInput.value = value;
    });

    costRangeInput.addEventListener('input', (e) => {
        let target = e.target;
        let value = target.value;
        const min = target.min;
        const max = target.max;
        target.style.backgroundSize = (value - min) * 100 / (max - min) + '% 100%';
        costInput.value = value;
    })

    costInput.addEventListener('change', (e) => {
        let target = e.target;
        let value = +target.value;
        let minCost = costRangeInput.getAttribute('min');
        let maxCost = costRangeInput.getAttribute('max');

        if (value < minCost) {
            target.value = minCost;
            costRangeInput.style.backgroundSize = '0% 0%';
            costRangeInput.value = minCost
        } else if (value > maxCost) {
            target.value = maxCost;
            costRangeInput.style.backgroundSize = '100% 100%';
            costRangeInput.value = maxCost;
        } else {
            costRangeInput.value = value;
            costRangeInput.style.backgroundSize = (value - minCost) * 100 / (maxCost - minCost) + '% 100%'
        }
    })

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
        }
    })

    monthRangeInput.addEventListener('input', (e) => {
        let target = e.target;
        let value = target.value;
        monthInput.value = value;
    });
    
    function handleInputChange(e) {
        let target = e.target;

        const min = target.min;
        const max = target.max;
        const val = target.value;
        
        target.style.backgroundSize = (val - min) * 100 / (max - min) + '% 100%';
        //console.log(val);
    }
    
    /*rangeInputs.forEach(input => {
        input.addEventListener('input', handleInputChange)
    })*/
}

export default calc;