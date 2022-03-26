const currencyCodeRef = document.querySelector('#currencyCode');
const btnRef = document.querySelector('form button[type="submit"]');
const responseRef = document.querySelector('#response');
const historyRef = document.querySelector('#history');

const postData = (msg) => {
    fetch("http://localhost:3000/history", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            msg
        })
    })
}


const generateLi = (msg) => {
    const node = document.createElement('li');
    const nodeText = document.createTextNode(msg);
    node.appendChild(nodeText);

    return node;
}

const generateOption = (code, currencyName) => {
    const node = document.createElement('option');
    node.value = code;
    const nodeText = document.createTextNode(currencyName);
    node.appendChild(nodeText);

    return node;
}

const getISOCodes = () => {
    fetch('http://localhost:3000/isoCodes')
        .then((data) => data.json())
        .then((data) => {
            data.forEach((element) => {
                currencyCodeRef.appendChild(generateOption(element.code, element.name))
            })
        })
}

getISOCodes();


const getHistoryData = () => {
    fetch('http://localhost:3000/history')
        .then((data) => data.json())
        .then((data) => {
            if (data.length > 0){
                historyRef.children[0].remove()
            }

            new Set(data.map(e => e.msg))
                .forEach((element) => {
                const li = generateLi(element)
                historyRef.appendChild(li);
            })
        });
}

getHistoryData();


btnRef.addEventListener('click', (evt) => {
    evt.preventDefault();

    const response = fetch(`https://api.nbp.pl/api/exchangerates/rates/a/${currencyCodeRef.value}/?format=json`);
    response.then((data) => data.json()).then(data => {
        const msg = `Currency: ${data.currency}, date: ${data.rates[0].effectiveDate}, rate: ${data.rates[0].mid} PLN`
        responseRef.innerText = msg
        postData(msg);
    });
})