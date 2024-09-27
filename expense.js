const ctx = document.getElementById('curve_chart').getContext('2d');
const chart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        datasets: [{
            label: 'Revenue',
            data: Array(12).fill(0),
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 2,
            fill: false
        }, {
            label: 'Expenses',
            data: Array(12).fill(0),
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 2,
            fill: false
        }]
    },
    options: {
        responsive: true,
        title: {
            display: true,
            text: 'Revenue and Expenses Over Time'
        },
        tooltips: {
            mode: 'index',
            intersect: false,
        },
        hover: {
            mode: 'nearest',
            intersect: true
        },
        scales: {
            xAxes: [{
                display: true,
                scaleLabel: {
                    display: true,
                    labelString: 'Month'
                }
            }],
            yAxes: [{
                display: true,
                scaleLabel: {
                    display: true,
                    labelString: 'Value (MAD)'
                },
                ticks: {
                    beginAtZero: true,
                    max: 1000000
                }
            }]
        }
    }
});

function updateChart() {
    chart.update();
}

let revenue = 0;
let expenses = 0;
let categoriesSet = new Set(); 

const revenueDisplay = document.getElementById("revenue").querySelector("p");
const expensesDisplay = document.getElementById("expenses").querySelector("p");
const categoriesDisplay = document.getElementById("categories").querySelector("p");
const historyList = document.getElementById("history-list");

document.getElementById("add-button").addEventListener("click", function() {
   
    const type = prompt("Enter type (revenue/expenses):");
    const amount = parseFloat(prompt("Enter amount:"));
    const month = parseInt(prompt("Enter month (1-12):"), 10) - 1; 
    const category = prompt("Enter category:");

    addTransaction(type, amount, month, category);
});

function addTransaction(type, amount, month, category) {
    if (type === 'revenue') {
        revenue += amount;
        revenueDisplay.textContent = `${revenue} MAD`;
        chart.data.datasets[0].data[month] += amount; 
    } else if (type === 'expenses') {
        expenses += amount;
        expensesDisplay.textContent = `${expenses} MAD`;
        chart.data.datasets[1].data[month] += amount; 
        categoriesSet.add(category); 
        categoriesDisplay.textContent = `${categoriesSet.size}`;
    }

    
    const listItem = document.createElement("li");
    listItem.textContent = `${type.charAt(0).toUpperCase() + type.slice(1)}: ${amount} MAD (${category}) in ${chart.data.labels[month]}`;
    listItem.style.color = type === 'revenue' ? 'green' : 'red'; 
    historyList.appendChild(listItem);

    
    updateChart();
}
