const inputEl = document.querySelector("#inputEl");
const balanceEl = document.querySelector("#balanceEl");
const historyTable = document.querySelector("#historyTable");

const topupBtn = document.querySelector("#topupBtn");
const payBtn = document.querySelector("#payBtn");
const showBtn = document.querySelector("#updateBtn");

const bankApp = {
    balance: 0,
    date: new Date(),
    history: [],
    topUp: function (m) {
        if(!m) {
            alert('Please enter a valid amount')
            return
        }
        this.balance += m;

        const report = {
            type: "Top Up",
            amount: m,
            date: this.date.toLocaleDateString(),
        };
        this.history.push(report);
    },
    pay: function (m) {
        if (this.balance < m || !m) {
            if(this.balance < m) {
                alert('Amount entered exceeds your balance')
            } else { alert('Please enter a valid amount') }
            return;
        }
        this.balance -= m;

        const report = {
            type: "Expense",
            amount: m,
            cashback: this.calcCashback(m, 0.05).toFixed(2),
            date: this.date.toLocaleString(),
        };
        this.history.push(report);
    },
    calcCashback: function (m, r) {
        return m * r;
    },
};

topupBtn.addEventListener("click", () => {
    const amount = +inputEl.value;
    bankApp.topUp(amount);
    balanceEl.innerHTML = bankApp.balance;
    inputEl.value = "";
    inputEl.focus()
});

payBtn.addEventListener("click", () => {
    const amount = +inputEl.value;
    bankApp.pay(amount);
    balanceEl.innerHTML = bankApp.balance;
    inputEl.value = "";
    inputEl.focus()
});

updateBtn.addEventListener("click", function () {
    if (bankApp.history.length === 0){
        alert("You don't have any transactions for now")
    } 
    const historyData = bankApp.history.map((el, i) => `
    <tr>
        <td class="fw-bold" scope="row">${i + 1}</td>
        <td class="">${el.type}</td>
        <td class="${el.type == 'Expense' ? 'txt-red' : 'txt-green'}">${el.type == 'Expense' ? '-' : '+'}${el.amount} ₼</td>
        <td>${el.cashback ? el.cashback + ' ₼' : ''} </td>
        <td>${el.date}</td>
    </tr>
    `
    ).join('');
    
    historyTable.innerHTML = historyData;
    inputEl.focus();
});

