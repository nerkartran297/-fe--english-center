"use client";

import { useState } from "react";

interface ExpenseBreakdownProps {
    expenses: {
        category: string;
        amount: number;
    }[];
}

const ExpenseBreakdown = ({ expenses }: ExpenseBreakdownProps) => {
    return (
        <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-lg font-semibold mb-4">Expense Breakdown</h2>
            <div className="space-y-4">
                {expenses.map((expense, index) => (
                    <div key={index} className="bg-gray-50 p-4 rounded-lg">
                        <p className="font-medium text-gray-600">
                            {expense.category}
                        </p>
                        <p className="font-medium text-indigo-600">
                            {expense.amount.toLocaleString()}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ExpenseBreakdown;
