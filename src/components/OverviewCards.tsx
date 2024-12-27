"use client";

import { useState } from "react";

interface OverviewCardProps {
    totalRevenue: number;
    totalExpenses: number;
    netProfit: number;
    pendingPayments: number;
    monthlyGrowth: number;
    studentEnrollments: number;
}

const OverviewCards = ({ data }: { data: OverviewCardProps }) => {
    const {
        totalRevenue,
        totalExpenses,
        netProfit,
        pendingPayments,
        monthlyGrowth,
        studentEnrollments,
    } = data;

    return (
        <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-lg font-semibold mb-4">Overview</h2>
            <div className="space-y-2">
                <div>
                    <p className="font-medium text-gray-600">
                        Total Revenue: ${totalRevenue.toLocaleString()}
                    </p>
                </div>
                <div>
                    <p className="font-medium text-gray-600">
                        Total Expenses: ${totalExpenses.toLocaleString()}
                    </p>
                </div>
                <div>
                    <p className="font-medium text-gray-500">Net Profit</p>
                    <p className="font-medium text-indigo-600">
                        {netProfit.toLocaleString()}
                    </p>
                </div>
                <div>
                    <p className="font-medium text-gray-600">
                        Pending Payments
                    </p>
                    <p className="font-medium text-indigo-600">
                        {pendingPayments.toLocaleString()}
                    </p>
                </div>
                <div>
                    <p className="font-medium text-gray-600">Monthly Growth</p>
                    <p className="font-medium text-indigo-600">
                        {monthlyGrowth.toString()}%
                    </p>
                </div>
                <div>
                    <p className="font-medium text-gray-600">
                        Student Enrollments
                    </p>
                    <p className="font-medium text-gray-600">
                        {studentEnrollments}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default OverviewCards;
