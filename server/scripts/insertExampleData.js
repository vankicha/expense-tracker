const moment = require('moment');
const db = require('../src/data/db');
const transactionService = require('../src/services/transactionService');
const { monthlyMockedTransactionsData, notRandomizableTransactions } = require('./constants');

const userId = '1';
const DATE_MONTH_YEAR_SLASH_FORMAT = 'DD/MM/YYYY';
const YEAR_MONTH_DATE_DASH_FORMAT = 'YYYY-MM-DD';

const getRandomArithmeticOperation = () => {
    const arithmeticOperations = ['+', '-'];

    const randomIndex = Math.floor(Math.random() * arithmeticOperations.length);
    const randomAritmethicOperation = arithmeticOperations[randomIndex];

    return randomAritmethicOperation;
};

const getRandomAmount = () => {
    const min = 20;
    const max = 50;
    const precision = 100;

    const randomAmount =
        Math.floor(Math.random() * (max * precision - min * precision) + min * precision) / (1 * precision);

    return randomAmount;
};

const getRandomDateInMonth = (month) => {
    const min = 1;
    const max = moment(month, 'MM').daysInMonth();
    const year = moment().year();

    const randomDay = Math.floor(Math.random() * (max - min) + min);
    const randomDate = moment(`${randomDay}/${month}/${year}`, DATE_MONTH_YEAR_SLASH_FORMAT).format(
        YEAR_MONTH_DATE_DASH_FORMAT
    );

    return randomDate;
};

const randomizeDataEntry = (dataEntry, month) => {
    const randomArithmeticOperation = getRandomArithmeticOperation();
    const randomAmount = getRandomAmount();

    const randomDate = getRandomDateInMonth(month);

    if (!notRandomizableTransactions.includes(dataEntry.name)) {
        dataEntry.amount = eval(dataEntry.amount + randomArithmeticOperation + randomAmount);
        dataEntry.date = randomDate;
    } else {
        dataEntry.date = moment(dataEntry.date, YEAR_MONTH_DATE_DASH_FORMAT)
            .set('month', month - 1)
            .format(YEAR_MONTH_DATE_DASH_FORMAT);
    }
};

const insertExampleTransactions = async () => {
    for (let month = 1; month <= 12; month++) {
        console.log('---begin month---');

        for (const dataEntry of monthlyMockedTransactionsData) {
            const newDataEntry = { ...dataEntry };
            randomizeDataEntry(newDataEntry, month);
            await transactionService.createTransaction(userId, newDataEntry);
            console.log(newDataEntry);
        }

        console.log('---end month---');
    }
};

db.sync().then(insertExampleTransactions).catch(console.log);
