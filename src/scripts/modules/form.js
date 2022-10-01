import { _API } from "./constants";
import { postData } from "../services/request";

const form = () => {
    const form = document.querySelector('form');
    const costInput = document.querySelector('#costvalue');
    const contributionInput = document.querySelector('#contribution');
    const monthInput = document.getElementById('months');
    const contractAmountOutput = document.querySelector('#totalammount-text');
    const monthlyPaymentOutput = document.querySelector('#monthpay-text');
    

    const data = {
        cost: +costInput.value,
        contribution: +contributionInput.value,
        months: +monthInput.value,
        contractAmount: +contractAmountOutput.textContent,
        monthlyPayment: +monthlyPaymentOutput.textContent
    }

    const body = JSON.stringify(data);
    console.log(body);
};

export default form;