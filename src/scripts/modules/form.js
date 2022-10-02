import { _API } from "./constants";
import { postData } from "../services/request";

const form = () => {
    const form = document.querySelector('form');
    const inputs = document.querySelectorAll('input');
    const submitButton = document.querySelector('button[type="submit"]');
    const costInput = document.querySelector('#costvalue');
    const contributionInput = document.querySelector('#contribution');
    const monthInput = document.getElementById('months');
    const contractAmountOutput = document.querySelector('#totalammount-text');
    const monthlyPaymentOutput = document.querySelector('#monthpay-text');

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        submitButton.disabled = true;
        submitButton.style.opacity = '0.4';

        inputs.forEach(input => {
            input.disabled = true;
            input.parentElement.style.opacity = '0.4';
        });

        const data = {
            cost: +costInput.value,
            contribution: +contributionInput.value,
            months: +monthInput.value,
            contractAmount: +contractAmountOutput.textContent,
            monthlyPayment: +monthlyPaymentOutput.textContent
        }

        const body = JSON.stringify(data);

        postData(_API, body)
            .then(res => {
                console.log(res);
            })
            .catch(res => {
                alert(res);
            })
            .finally(() => {
                inputs.forEach(input => {
                    input.disabled = false;
                    input.parentElement.removeAttribute('style');
                });
                submitButton.disabled = false;
                submitButton.removeAttribute('style');
            })
    })
};

export default form;