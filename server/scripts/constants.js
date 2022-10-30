const monthlyMockedTransactionsData = [
    {
        "name": "Food and beverages",
        "amount": 132.40,
        "date": "2022-01-03",
        "type": "Expense"
    },
    {
        "name": "Salary",
        "amount": 4910.14,
        "date": "2022-01-04",
        "type": "Income",
    },
    {
        "name": "Electricity",
        "amount": 87.34,
        "date": "2022-01-04",
        "type": "Expense"
    },
    {
        "name": "Water and Sewage",
        "amount": 60.56,
        "date": "2022-01-09",
        "type": "Expense"
    },
    {
        "name": "Fitness Card",
        "amount": 40.00,
        "date": "2022-01-15",
        "type": "Expense"
    },
    {
        "name": "Bank payment",
        "amount": 1287.43,
        "date": "2022-01-16",
        "type": "Expense"
    },
    {
        "name": "Restaurant",
        "amount": 145.00,
        "date": "2022-01-19",
        "type": "Expense"
    },
    {
        "name": "Food and beverages",
        "amount": 197.42,
        "date": "2022-01-21",
        "type": "Expense"
    },
    {
        "name": "Restaurant",
        "amount": 120.00,
        "date": "2022-01-22",
        "type": "Expense"
    },
    {
        "name": "Food and beverages",
        "amount": 155.42,
        "date": "2022-01-23",
        "type": "Expense"
    },
    {
        "name": "Theatre tickets",
        "amount": 125.00,
        "date": "2022-01-27",
        "type": "Expense"
    },
];

const notRandomizableTransactions = ['Salary', 'Bank payment', 'Fitness Card']


module.exports = {
    monthlyMockedTransactionsData,
    notRandomizableTransactions,
}
