"use client";

import { useState } from "react";

interface StaffPayment {
    staffId: string;
    name: string;
    role: string;
    baseSalary: number;
    courseBonus: number;
    totalPaid: number;
    lastPaidDate: string;
}

interface StaffPaymentsProps {
    staffPayments: StaffPayment[];
}

const StaffPayments = ({ staffPayments }: StaffPaymentsProps) => {
    return (
        <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-lg font-semibold mb-4">Staff Payments</h2>
            <div className="space-y-4">
                {staffPayments.map((staffPayment, index) => (
                    <div key={index} className="bg-gray-50 p-4 rounded-lg">
                        <p className="font-medium text-gray-600">
                            {staffPayment.name}
                        </p>
                        <p className="font-medium text-indigo-600">
                            Total Paid
                        </p>
                        <p className="font-medium text-gray-600">Role</p>
                        <p className="font-medium text-gray-600">
                            {staffPayment.role}
                        </p>
                        <p className="font-medium text-gray-600">Base Salary</p>
                        <p className="font-medium text-indigo-600">
                            {staffPayment.baseSalary.toLocaleString()}
                        </p>
                        <p className="font-medium text-gray-600">
                            Course Bonus
                        </p>
                        <p className="font-medium text-indigo-600">
                            {staffPayment.courseBonus.toLocaleString()}
                        </p>
                        <p className="font-medium text-gray-600">Total Paid</p>
                        <p className="font-medium text-indigo-600">
                            {staffPayment.totalPaid.toLocaleString()}
                        </p>
                        <p className="font-medium text-gray-600">
                            Last Paid Date
                        </p>
                        <p className="font-medium text-gray-600">
                            {staffPayment.lastPaidDate}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default StaffPayments;
