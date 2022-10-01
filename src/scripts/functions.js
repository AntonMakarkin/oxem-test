export const contractAmount = (contribution, months, monthlyPayment) => {
    let contractAmountCount = contribution + (months * monthlyPayment);
    return contractAmountCount;
}

export const monthlyPaymentCount = (cost, contribution, months, percent) => {
    const monthPay = Math.round((cost - contribution) * ((percent * Math.pow((1 + percent), months)) / (Math.pow((1 + percent), months) - 1))); //(cost - contribution) * ((percent * Math.pow((1 + percent), months)) / (Math.pow((1 + percent), months) - 1));
    return monthPay;
}