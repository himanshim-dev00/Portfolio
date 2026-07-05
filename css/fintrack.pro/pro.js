const filterButtons = document.querySelectorAll(".filter");
// Elements
const addBtn = document.getElementById("addBtn");
const desc = document.getElementById("desc");
const amount = document.getElementById("amount");
const type = document.getElementById("type");

const balance = document.getElementById("balance");
const income = document.getElementById("income");
const expense = document.getElementById("expense");

const transactionList = document.getElementById("transactionList");
const resetBtn = document.getElementById("resetBtn");
const userName = document.getElementById("userName");
const currency = document.getElementById("currency");
const saveProfileBtn = document.getElementById("saveProfileBtn");

// Array
let transactions = [];

// Add Transaction
addBtn.addEventListener("click", addTransaction);

function addTransaction() {

    if (desc.value.trim() === "" || amount.value.trim() === "") {
        alert("Please fill all fields");
        return;
    }

    const transaction = {
        id: Date.now(),
        description: desc.value,
        amount: Number(amount.value),
        type: type.value
    };

    transactions.push(transaction);

    displayTransactions();
    updateSummary();
    saveData();
    createChart();

    desc.value = "";
    amount.value = "";
}

// Display Transactions
function displayTransactions(filter = "all"){

    transactionList.innerHTML = "";
    let filteredTransactions = transactions;

if (filter !== "all") {
    filteredTransactions = transactions.filter(item => item.type === filter);
}
filteredTransactions.forEach((item) => {

        const li = document.createElement("li");

        li.innerHTML = `
    <span>${item.description}</span>

    <span>
        ${item.type === "income" ? "+" : "-"} ₹${item.amount}
    </span>

    <button onclick="deleteTransaction(${item.id})">
        ❌
    </button>
`;

        transactionList.appendChild(li);

    });

}

// Update Balance
function updateSummary() {

    let totalIncome = 0;
    let totalExpense = 0;

    transactions.forEach((item) => {

        if (item.type === "income") {
            totalIncome += item.amount;
        } else {
            totalExpense += item.amount;
        }

    });

    income.textContent = "₹" + totalIncome;
    expense.textContent = "₹" + totalExpense;
    balance.textContent = "₹" + (totalIncome - totalExpense);
    updateChart();

}
function updateChart() {

    const incomeData = transactions
        .filter(item => item.type === "income")
        .reduce((sum, item) => sum + item.amount, 0);

    const expenseData = transactions
        .filter(item => item.type === "expense")
        .reduce((sum, item) => sum + item.amount, 0);

    if (chart) {
        chart.destroy();
    }

    const ctx = document.getElementById("myChart").getContext("2d");

    chart = new Chart(ctx, {
        type: "pie",
        data: {
            labels: ["Income", "Expense"],
            datasets: [{
                data: [incomeData, expenseData],
                backgroundColor: [
                    "#22c55e",
                    "#ef4444"
                ]
            }]
        }
    });

}
// Delete Transaction
function deleteTransaction(id) {

    transactions = transactions.filter((item) => item.id !== id);

   displayTransactions();
   updateSummary();
    saveData();
    createChart();
}


// Save Data
function saveData() {

    localStorage.setItem(
        "transactions",
        JSON.stringify(transactions)
    );

}

// Load Data
function loadData() {

    const data = localStorage.getItem("transactions");

    if (data) {

        transactions = JSON.parse(data);

        displayTransactions();
        updateSummary();

    }

}
resetBtn.addEventListener("click", resetData);

function resetData() {

    const confirmReset = confirm("Are you sure you want to delete all transactions?");

    if (!confirmReset) {
        return;
    }

    transactions = [];

    localStorage.removeItem("transactions");

    displayTransactions();

    updateSummary();
    createChart();

}
saveProfileBtn.addEventListener("click", saveProfile);

function saveProfile() {

    const profile = {
        name: userName.value,
        currency: currency.value
    };

    localStorage.setItem("profile", JSON.stringify(profile));

    alert("Profile Saved Successfully!");
}
function loadProfile() {

    const profile = JSON.parse(localStorage.getItem("profile"));

    if (profile) {
        userName.value = profile.name;
        currency.value = profile.currency;
    }

}
let chart;
loadData();
loadProfile();
createChart();
function createChart() {

    const ctx = document.getElementById("myChart");

    const totalIncome = transactions
        .filter(item => item.type === "income")
        .reduce((sum, item) => sum + item.amount, 0);

    const totalExpense = transactions
        .filter(item => item.type === "expense")
        .reduce((sum, item) => sum + item.amount, 0);

    if (chart) {
        chart.destroy();
    }

    chart = new Chart(ctx, {
        type: "doughnut",

        data: {
            labels: ["Income", "Expense"],

            datasets: [{
                data: [totalIncome, totalExpense],
                backgroundColor: [
                    "#22c55e",
                    "#ef4444"
                ]
            }]
        }
    });

}
const themeBtn = document.getElementById("themeBtn");

// Previous Theme Load
if(localStorage.getItem("theme") === "dark"){
    document.body.classList.add("dark");
    themeBtn.textContent = "☀️ Light Mode";
}

// Toggle Theme
themeBtn.addEventListener("click", ()=>{

    document.body.classList.toggle("dark");

    if(document.body.classList.contains("dark")){
        localStorage.setItem("theme","dark");
        themeBtn.textContent = "☀️ Light Mode";
    }else{
        localStorage.setItem("theme","light");
        themeBtn.textContent = "🌙 Dark Mode";
    }

});
filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        filterButtons.forEach(btn => btn.classList.remove("active"));

        button.classList.add("active");

        displayTransactions(button.dataset.filter);

    });

});

