document.addEventListener("DOMContentLoaded", main);
const apiURL = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false";

async function fetchData() {
    let response = await fetch(apiURL);
    let data = await response.json();
    data = JSON.stringify(data);
    data = JSON.parse(data);
    return data;
}

async function main() {
    let data = await fetchData();
    display(data);
}

function display(data) {
    let table = document.getElementById("displayTable");
    data.forEach(element => {
        var tr = document.createElement('tr');
        let symbol = element.symbol.toUpperCase();
        let color = element.price_change_percentage_24h >= 0 ? "#14d25d" : "#d21414";
        tr.innerHTML = `
                <td style="width: 18%;">
                    <span style="display: flex;align-items:center">
                        <img src=${element.image}>&nbsp;&nbsp;
                        <p>${element.name}</p>
                    </span>
                </td>
                <td style="width: 10%;">
                    <p>${symbol}</p>
                </td>
                <td style="width: 13%;text-align: right;padding-right: 35px;">
                    <p>$${element.current_price}</p>
                </td>
                <td style="width: 20%;padding-left: 30px;">
                    <p>$${element.total_volume}</p>
                </td>
                <td style="width: 10%;color:${color}">
                    <p>${element.price_change_percentage_24h}%</p>
                </td>
                <td style="width: 17%;text-align:end;">
                    <p>Mkt Cap : $${element.market_cap}</p>
                </td>
        `
        table.appendChild(tr);
    });
}