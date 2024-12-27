"use client";

import { useState } from "react";

interface Transaction {
    id: string;
    date: string;
    type: string;
    category: string;
    description: string;
    amount: number;
    status: string;
}

interface TransactionListProps {
    transactions: Transaction[];
}

const TransactionList = ({ transactions }: TransactionListProps) => {
    const [filterByDate, setFilterByDate] = useState("all");

    return (
        <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-lg font-semibold mb-4">Transaction List</h2>
            <div className="space-y-4">
                {transactions.map((transaction, index) => (
                    <div key={index} className="bg-gray-50 p-4 rounded-lg ">
                        <p className="font-medium text-gray-600">
                            {transaction.date}
                        </p>
                        <p className="font-medium text-indigo-600">
                            {transaction.amount.toLocaleString()}
                        </p>
                        <p className="font-medium text-gray-600">
                            {transaction.category}
                        </p>
                        <p className="font-medium text-gray-600">
                            {transaction.type}
                        </p>
                        <p className="font-medium text-gray-600">
                            {transaction.description}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TransactionList;
