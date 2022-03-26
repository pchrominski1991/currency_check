const currencyCodeRef = document.querySelector('#currencyCode');
const btnRef = document.querySelector('form button[type="submit"]');
const responseRef = document.querySelector('#response');


btnRef.addEventListener('click', (evt) => {
    evt.preventDefault();

    const response = fetch(`https://api.nbp.pl/api/exchangerates/rates/a/${currencyCodeRef.value}/?format=json`);
    response.then((data) => data.json()).then(data => {
        const msg = `Currency: ${data.currency}, date: ${data.rates[0].effectiveDate}, rate: ${data.rates[0].mid} PLN`
        responseRef.innerText = msg
    });
})