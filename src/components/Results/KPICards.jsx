import React from 'react';
import { Card } from '../UI/Card';

export const KPICards = ({ kpi }) => {
    const formatCurrency = (value) => {
        return new Intl.NumberFormat('ja-JP', { style: 'currency', currency: 'JPY', maximumFractionDigits: 0 }).format(value);
    };

    return (
        <Card title="一人当たり指標" className="mb-4">
            <div className="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>指標</th>
                            {kpi.map(k => (
                                <th key={k.name} className="text-right">{k.name}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>一人当たり売上高</td>
                            {kpi.map(k => (
                                <td key={k.name}>{formatCurrency(k.salesPerEmployee)}</td>
                            ))}
                        </tr>
                        <tr>
                            <td>一人当たり加工高</td>
                            {kpi.map(k => (
                                <td key={k.name}>{formatCurrency(k.marginalProfitPerEmployee)}</td>
                            ))}
                        </tr>
                        <tr>
                            <td>一人当たり経常利益</td>
                            {kpi.map(k => (
                                <td key={k.name} className="font-bold text-indigo-600">{formatCurrency(k.ordinaryProfitPerEmployee)}</td>
                            ))}
                        </tr>
                        <tr>
                            <td>労働分配率</td>
                            {kpi.map(k => (
                                <td key={k.name}>{k.laborShare.toFixed(1)}%</td>
                            ))}
                        </tr>
                    </tbody>
                </table>
            </div>
        </Card>
    );
};
