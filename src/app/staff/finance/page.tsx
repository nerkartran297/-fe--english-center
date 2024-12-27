"use client";

import React, { useState } from "react";
import OverviewCards from "@/components/OverviewCards";
import RevenueChart from "@/components/RevenueChart";
import TransactionList from "@/components/TransactionList";
import ExpenseBreakdown from "@/components/ExpenseBreakdown";
import StaffPayments from "@/components/StaffPayments";

interface OverviewCardProps {
    totalRevenue: number;
    totalExpenses: number;
    netProfit: number;
    pendingPayments: number;
    monthlyGrowth: number;
    studentEnrollments: number;
}

interface RevenueChartProps {
    data: {
        month: string;
        revenue: number;
        expenses: number;
    }[];
}

interface Transaction {
    id: string;
    date: string;
    type: string;
    category: string;
    description: string;
    amount: number;
    status: string;
}

interface ExpenseCategory {
    category: string;
    amount: number;
}

interface Staff {
    id: string;
    name: string;
    role: string;
    baseSalary: number;
    courseBonus: number;
    totalPaid: number;
    lastPaidDate: string;
}

const mockFinancialData = {
    overview: {
        totalRevenue: 125000,
        totalExpenses: 75000,
        netProfit: 50000,
        pendingPayments: 15000,
        monthlyGrowth: 12.5,
        studentEnrollments: 150,
    },
    monthlyRevenue: [
        { month: "Jan", revenue: 12000, expenses: 8000 },
        { month: "Feb", revenue: 15000, expenses: 9000 },
        { month: "Mar", revenue: 18000, expenses: 10000 },
        //... more months
    ],
    transactions: [
        {
            id: "TRX001",
            date: "2024-01-25",
            type: "income",
            category: "Course Payment",
            description: "React Development Course - John Doe",
            amount: 499.99,
            status: "completed",
        },
        //... more transactions
    ],
    expenses: [
        {
            category: "Staff Salaries",
            amount: 45000,
            percentage: 60,
        },
        {
            category: "Marketing",
            amount: 15000,
            percentage: 20,
        },
        {
            category: "Infrastructure",
            amount: 10000,
            percentage: 13.33,
        },
        {
            category: "Others",
            amount: 5000,
            percentage: 6.67,
        },
    ],
    staffPayments: [
        {
            id: "PAY001",
            staffId: "TCH001",
            name: "Dr. Sarah Johnson",
            role: "teacher",
            baseSalary: 3000,
            courseBonus: 500,
            totalPaid: 3500,
            lastPaidDate: "2024-01-01",
        },
        //... more staff payments
    ],
};

export default function FinanceDashboard() {
    const [dateRange, setDateRange] = useState("monthly"); // monthly, quarterly, yearly
    const [activeTab, setActiveTab] = useState("overview");

    return (
        <div className="max-w-7xl mx-auto p-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Financial Dashboard</h2>
                <div className="flex gap-4">
                    <select
                        value={dateRange}
                        onChange={(e) => setDateRange(e.target.value)}
                        className="border rounded-lg px-3 py-2"
                    >
                        <option value="monthly">Monthly</option>
                        <option value="quarterly">Quarterly</option>
                        <option value="yearly">Yearly</option>
                    </select>
                    <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg">
                        Download Report
                    </button>
                </div>
            </div>

            <div className="space-y-6">
                {/* Tabs for different sections */}
                <div className="border-b">
                    <nav className="-mb-px flex space-x-8">
                        {["overview", "transactions", "expenses", "staff"].map(
                            (tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`py-4 px-1 border-b-2 font-medium text-sm
                                    ${
                                        activeTab === tab
                                            ? "border-indigo-500 text-indigo-600"
                                            : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                                    }`}
                                >
                                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                                </button>
                            )
                        )}
                    </nav>
                </div>

                {activeTab === "transactions" && (
                    <TransactionList
                        transactions={mockFinancialData.transactions}
                    />
                )}
                {activeTab === "expenses" && (
                    <div className="bg-white rounded-lg shadow-lg p-6">
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <h3 className="font-medium mb-2">
                                Expense Breakdown
                            </h3>
                            <div className="space-y-4">
                                <p className="font-medium text-gray-600">
                                    Staff Salaries:{" "}
                                    {mockFinancialData.expenses[0].amount.toLocaleString()}
                                </p>
                                <p className="font-medium text-indigo-600">
                                    Marketing:{" "}
                                    {mockFinancialData.expenses[1].amount.toLocaleString()}
                                </p>
                                <p className="font-medium text-gray-600">
                                    Infrastructure:{" "}
                                    {mockFinancialData.expenses[2].amount.toLocaleString()}
                                </p>
                                <p className="font-medium text-gray-600">
                                    Others:{" "}
                                    {mockFinancialData.expenses[3].amount.toLocaleString()}
                                </p>
                            </div>
                        </div>
                    </div>
                )}
                {activeTab === "staff" && (
                    <div className="bg-white rounded-lg shadow-lg p-6">
                        <h2 className="text-lg font-semibold mb-4">
                            Staff Payments
                        </h2>
                        <div className="space-y-4">
                            <p className="font-medium text-gray-600">
                                Dr. Sarah Johnson:{" "}
                                {mockFinancialData.staffPayments[0].name}
                            </p>
                            <p className="font-medium text-indigo-600">
                                Total Paid:{" "}
                                {mockFinancialData.staffPayments[0].totalPaid.toLocaleString()}
                            </p>
                        </div>
                    </div>
                )}
                {activeTab === "overview" && (
                    <div className="bg-white rounded-lg shadow-lg p-6">
                        <h2 className="text-lg font-semibold mb-4">Overview</h2>
                        <div className="space-y-4">
                            <p className="font-medium text-gray-600">
                                Total Revenue:{" "}
                                {mockFinancialData.overview.totalRevenue.toLocaleString()}
                            </p>
                            <p className="font-medium text-indigo-600">
                                Total Expenses:{" "}
                                {mockFinancialData.overview.totalExpenses.toLocaleString()}
                            </p>
                            <p className="font-medium text-gray-600">
                                Net Profit:{" "}
                                {mockFinancialData.overview.netProfit.toLocaleString()}
                            </p>
                            <p className="font-medium text-indigo-600">
                                Pending Payments:{" "}
                                {mockFinancialData.overview.pendingPayments.toLocaleString()}
                            </p>
                            <p className="font-medium text-gray-600">
                                Monthly Growth:{" "}
                                {mockFinancialData.overview.monthlyGrowth.toFixed(
                                    2
                                )}
                                %
                            </p>
                            <p className="font-medium text-gray-600">
                                Student Enrollments:{" "}
                                {mockFinancialData.overview.studentEnrollments}
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
