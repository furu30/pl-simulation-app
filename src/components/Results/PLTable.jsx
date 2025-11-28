import React from 'react';
import { Card } from '../UI/Card';

export const PLTable = ({ results }) => {
    const formatCurrency = (value) => {
        return new Intl.NumberFormat('ja-JP', { style: 'currency', currency: 'JPY' }).format(value);
    };

    const formatPercent = (value, total) => {
        if (!total) return '0.0%';
        return ((value / total) * 100).toFixed(1) + '%';
    };

    return (
        <Card title="損益計算書 (P/L) シミュレーション" className="mb-4">
            <div className="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>項目</th>
                            {results.map(res => (
                                <th key={res.id || res.name} className="text-right min-w-[120px]">
                                    {res.name}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {[
                            { key: 'sales', label: '売上高' },
                            { key: 'variableCosts', label: '変動費' },
                            { key: 'marginalProfit', label: '限界利益 (加工高)', bold: true },
                            { key: 'personnelCosts', label: '人件費' },
                            { key: 'otherFixedCosts', label: 'その他固定費' },
                            { key: 'fixedCosts', label: '固定費計' },
                            { key: 'operatingProfit', label: '営業利益', bold: true },
                            { key: 'ordinaryProfit', label: '経常利益', bold: true, color: 'text-indigo-600' },
                        ].map((row) => (
                            <tr key={row.key}>
                                <td className={row.bold ? 'font-bold' : ''}>{row.label}</td>
                                {results.map(res => (
                                    <td key={res.id || res.name} className={row.color || ''}>
                                        <div className={row.bold ? 'font-bold' : ''}>
                                            {formatCurrency(res[row.key])}
                                        </div>
                                        {row.key !== 'sales' && (
                                            <div className="text-xs text-slate-400">
                                                {formatPercent(res[row.key], res.sales)}
                                            </div>
                                        )}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </Card>
    );
};
