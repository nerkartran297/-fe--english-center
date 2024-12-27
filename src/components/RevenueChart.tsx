"use client";

import { useState } from "react";

interface RevenueChartProps {
    data: {
        month: string;
        revenue: number;
        expenses: number;
    }[];
}

const RevenueChart = ({ data }: RevenueChartProps) => {
    const lines = data.map((item, index) => {
        return {
            x: index,
            y: item.revenue,
        };
    });

    return (
        <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-lg font-semibold mb-4">Revenue Overview</h2>
            {/* Line chart component here */}
        </div>
    );
};

export default RevenueChart;
