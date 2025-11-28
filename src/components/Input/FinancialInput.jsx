import React from 'react';
import { Card } from '../UI/Card';
import { Input } from '../UI/Input';

export const FinancialInput = ({ financialData, updateFinancialData }) => {
    return (
        <Card title="前期実績データ" className="mb-4">
            <div className="grid gap-md">
                <Input
                    label="売上高"
                    type="number"
                    value={financialData.sales}
                    onChange={(e) => updateFinancialData(null, 'sales', e.target.value)}
                    suffix="円"
                />

                <div className="p-4 bg-slate-50 rounded-md border border-slate-200">
                    <h4 className="text-sm font-bold text-slate-700 mb-2">変動費</h4>
                    <div className="grid" style={{ gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                        <Input
                            label="材料費"
                            type="number"
                            value={financialData.variableCosts.material}
                            onChange={(e) => updateFinancialData('variableCosts', 'material', e.target.value)}
                            suffix="円"
                        />
                        <Input
                            label="外注費"
                            type="number"
                            value={financialData.variableCosts.outsourcing}
                            onChange={(e) => updateFinancialData('variableCosts', 'outsourcing', e.target.value)}
                            suffix="円"
                        />
                        <Input
                            label="商品仕入"
                            type="number"
                            value={financialData.variableCosts.purchase}
                            onChange={(e) => updateFinancialData('variableCosts', 'purchase', e.target.value)}
                            suffix="円"
                        />
                        <Input
                            label="その他"
                            type="number"
                            value={financialData.variableCosts.other}
                            onChange={(e) => updateFinancialData('variableCosts', 'other', e.target.value)}
                            suffix="円"
                        />
                    </div>
                </div>

                <div className="p-4 bg-slate-50 rounded-md border border-slate-200">
                    <h4 className="text-sm font-bold text-slate-700 mb-2">固定費</h4>
                    <div className="grid" style={{ gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                        <Input
                            label="人件費"
                            type="number"
                            value={financialData.fixedCosts.personnel}
                            onChange={(e) => updateFinancialData('fixedCosts', 'personnel', e.target.value)}
                            suffix="円"
                        />
                        <Input
                            label="経費"
                            type="number"
                            value={financialData.fixedCosts.expenses}
                            onChange={(e) => updateFinancialData('fixedCosts', 'expenses', e.target.value)}
                            suffix="円"
                        />
                        <Input
                            label="減価償却費"
                            type="number"
                            value={financialData.fixedCosts.depreciation}
                            onChange={(e) => updateFinancialData('fixedCosts', 'depreciation', e.target.value)}
                            suffix="円"
                        />
                    </div>
                </div>

                <Input
                    label="営業外損益"
                    type="number"
                    value={financialData.nonOperatingPL}
                    onChange={(e) => updateFinancialData(null, 'nonOperatingPL', e.target.value)}
                    suffix="円"
                />
            </div>
        </Card>
    );
};
