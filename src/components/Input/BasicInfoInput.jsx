import React from 'react';
import { Card } from '../UI/Card';
import { Input } from '../UI/Input';

export const BasicInfoInput = ({ basicInfo, updateBasicInfo }) => {
    return (
        <Card title="基本情報" className="mb-4">
            <div className="grid" style={{ gridTemplateColumns: '1fr 1fr' }}>
                <Input
                    label="企業名"
                    value={basicInfo.companyName}
                    onChange={(e) => updateBasicInfo('companyName', e.target.value)}
                    placeholder="株式会社サンプル"
                />
                <Input
                    label="従業員数"
                    type="number"
                    value={basicInfo.employeeCount}
                    onChange={(e) => updateBasicInfo('employeeCount', e.target.value)}
                    min="1"
                    suffix="名"
                />
            </div>
        </Card>
    );
};
