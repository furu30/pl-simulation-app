import React from 'react';
import { Card } from '../UI/Card';
import { Input } from '../UI/Input';

export const ParameterInput = ({ parameters, updateParameter }) => {
    return (
        <Card title="シミュレーションパラメータ" className="mb-4">
            <div className="flex flex-col gap-md">
                {parameters.map((param) => (
                    <div key={param.id} className="p-4 bg-white rounded-md border border-slate-200 shadow-sm">
                        <div className="flex items-center justify-between mb-2">
                            <h4 className="font-bold text-indigo-600">{param.name}</h4>
                        </div>
                        <div className="grid" style={{ gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
                            <Input
                                label="売上高増減率"
                                type="number"
                                value={param.salesGrowth}
                                onChange={(e) => updateParameter(param.id, 'salesGrowth', e.target.value)}
                                suffix="%"
                                step="0.1"
                            />
                            <Input
                                label="変動費増減率"
                                type="number"
                                value={param.variableCostGrowth}
                                onChange={(e) => updateParameter(param.id, 'variableCostGrowth', e.target.value)}
                                suffix="%"
                                step="0.1"
                            />
                            <Input
                                label="人件費増減率"
                                type="number"
                                value={param.personnelCostGrowth}
                                onChange={(e) => updateParameter(param.id, 'personnelCostGrowth', e.target.value)}
                                suffix="%"
                                step="0.1"
                            />
                            <Input
                                label="その他固定費増減率"
                                type="number"
                                value={param.otherFixedCostGrowth}
                                onChange={(e) => updateParameter(param.id, 'otherFixedCostGrowth', e.target.value)}
                                suffix="%"
                                step="0.1"
                            />
                        </div>
                    </div>
                ))}
            </div>
        </Card>
    );
};
