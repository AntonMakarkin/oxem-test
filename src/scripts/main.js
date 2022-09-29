
window.addEventListener('DOMContentLoaded', () => {
    const rangeInputs = document.querySelectorAll('input[type="range"]');
    console.log(rangeInputs);
    
    function handleInputChange(e) {
        let target = e.target
        if (e.target.type !== 'range') {
          target = document.getElementById('range')
        } 
        const min = target.min
        const max = target.max
        const val = target.value
        
        target.style.backgroundSize = (val - min) * 100 / (max - min) + '% 100%'
        console.log(val);
    }
    
    rangeInputs.forEach(input => {
        input.addEventListener('input', handleInputChange)
    })
})