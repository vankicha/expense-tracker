export interface IUser {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    createdAt: string;
    updatedAt: string;
    token: string;
}

export interface IUserInformation {
    income: number;
    outcome: number;
}

export interface IUserStatisticsInformation {
    yearlyBalance: { month: string; balance: number }[];
    yearlyIncomeOutcome: { month: string; income: number; outcome: number; balance: number }[];
}

export interface IGenericResponse {
    status: string;
    message: string;
}

export interface IRegisterInput {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
}

export interface ILoginInput {
    email: string;
    password: string;
}

export interface ITransactionInput {
    name: string;
    amount: number;
    date: string;
    type: TransactionType;
}

export type TransactionType = 'Income' | 'Expense';

export type Transaction = {
    id: string;
    name: string;
    amount: number;
    date: string;
    type: TransactionType;
    createdAt: string;
    updatedAt: string;
    userId: string;
};

export type TransactionTableRow = {
    name: string;
    amount: JSX.Element;
    date: string;
    actions: JSX.Element;
};
