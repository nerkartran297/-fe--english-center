"use client";

import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";

interface Salary {
    id: string;
    description: string;
    type: "teacher" | "accountant" | "manager" | "admin";
    receiverID: string;
    value: number;
}

export default function SalaryDisplay() {
    const { user, isLoaded } = useUser();
    const [salaries, setSalaries] = useState<Salary[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!isLoaded) return;

        const fetchSalary = async () => {
            try {
                const response = await fetch(
                    `http://localhost:5000/api/salary?clerkUserID=${user.id}`
                );
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setSalaries(data);
                setLoading(false);
            } catch (error: any) {
                setError(error);
                setLoading(false);
            }
        };

        if (isLoaded && user) fetchSalary();
    }, [user, isLoaded]);

    if (loading) return <div>Loading...</div>;

    if (error) return <div>Error: {error.message}</div>;

    if (!isLoaded) return <div>[Loading...]</div>;

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-6">Salary History</h1>

            {salaries.length > 0 ? (
                <div className="space-y-4">
                    {salaries.map((salary) => (
                        <div
                            key={salary.id}
                            className="bg-white shadow rounded-lg p-6"
                        >
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <h2 className="font-semibold text-gray-600">
                                        Description
                                    </h2>
                                    <p>{salary.description}</p>
                                </div>
                                <div>
                                    <h2 className="font-semibold text-gray-600">
                                        Amount
                                    </h2>
                                    <p className="text-xl">
                                        ${salary.value.toLocaleString()}
                                    </p>
                                </div>
                                <div>
                                    <h2 className="font-semibold text-gray-600">
                                        Type
                                    </h2>
                                    <p className="capitalize">{salary.type}</p>
                                </div>
                                <div>
                                    <h2 className="font-semibold text-gray-600">
                                        ID
                                    </h2>
                                    <p className="text-sm text-gray-500">
                                        {salary.id}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}

                    <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                        <h2 className="font-semibold text-gray-600 mb-2">
                            Total Earnings
                        </h2>
                        <p className="text-2xl">
                            $
                            {salaries
                                .reduce((sum, salary) => sum + salary.value, 0)
                                .toLocaleString()}
                        </p>
                    </div>
                </div>
            ) : (
                <p>No salary records found</p>
            )}
        </div>
    );
}
