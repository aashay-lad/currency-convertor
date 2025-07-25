const convertorForm = document.getElementById('convertor-form');
const fromCurrency = document.getElementById('from-currency');
const toCurrency = document.getElementById('to-currency');
const amount = document.getElementById('amount');
const result = document.getElementById('result');


window.addEventListener('load',fetchCurrencies)

convertorForm.addEventListener('submit',convertCurrency)

async function fetchCurrencies(){

    const response = await fetch("https://api.exchangerate-api.com/v4/latest/INR")
    const data = await response.json()

    const currencyOptions = Object.keys(data.rates);

    currencyOptions.forEach(currency => {
        const option1 = document.createElement('option')
        option1.value = currency;
        option1.textContent = currency;
        fromCurrency.appendChild(option1)

        const option2 = document.createElement('option')
        option2.value = currency;
        option2.textContent = currency;
        toCurrency.appendChild(option2)
    })
}
async function convertCurrency(e){
    e.preventDefault();
    const amt = parseFloat(amount.value);
    const fromCurrencyValue = fromCurrency.value 
    const toCurrencyValue = toCurrency.value 

    if(amt < 0){
        alert('Please enter a valid amount.')
        return;
    }
    
    const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrencyValue}`)
    const data = await response.json()

    const rate = data.rates[toCurrencyValue]
    const convertedAmount = (amt * rate).toFixed(2)

    result.textContent = `${amt} ${fromCurrencyValue} = ${convertedAmount} ${toCurrencyValue}`;
}