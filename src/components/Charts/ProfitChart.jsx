import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { Card } from '../UI/Card';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export const ProfitChart = ({ results }) => {
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: false,
            },
        },
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    };

    const labels = results.map(r => r.name);

    const data = {
        labels,
        datasets: [
            {
                label: '経常利益',
                data: results.map(r => r.ordinaryProfit),
                backgroundColor: 'rgba(79, 70, 229, 0.8)', // Indigo 600
                borderColor: 'rgba(79, 70, 229, 1)',
                borderWidth: 1,
            },
            {
                label: '営業利益',
                data: results.map(r => r.operatingProfit),
                backgroundColor: 'rgba(16, 185, 129, 0.8)', // Emerald 500
                borderColor: 'rgba(16, 185, 129, 1)',
                borderWidth: 1,
                hidden: true, // Hidden by default
            },
        ],
    };

    return (
        <Card title="利益シミュレーション比較" className="mb-4">
            <Bar options={options} data={data} />
        </Card>
    );
};
