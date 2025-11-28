import { useState, useMemo, useEffect } from 'react';

const INITIAL_BASIC_INFO = {
    companyName: '株式会社サンプル',
    employeeCount: 10,
};

const INITIAL_FINANCIAL_DATA = {
    sales: 100000,
    variableCosts: {
        material: 20000,
        outsourcing: 10000,
        purchase: 5000,
        other: 5000,
    },
    fixedCosts: {
        personnel: 30000,
        expenses: 10000,
        depreciation: 5000,
    },
    nonOperatingPL: 0,
};

const INITIAL_PARAMETERS = [
    { id: 1, name: '現状維持', salesGrowth: 0, variableCostGrowth: 0, personnelCostGrowth: 0, otherFixedCostGrowth: 0 },
    { id: 2, name: '売上増', salesGrowth: 10, variableCostGrowth: 0, personnelCostGrowth: 0, otherFixedCostGrowth: 0 },
    { id: 3, name: '積極投資', salesGrowth: 20, variableCostGrowth: 0, personnelCostGrowth: 10, otherFixedCostGrowth: 10 },
];

export const useSimulation = () => {
    // Load initial state from localStorage or use defaults
    const [basicInfo, setBasicInfo] = useState(() => {
        const saved = localStorage.getItem('pl_basicInfo');
        return saved ? JSON.parse(saved) : INITIAL_BASIC_INFO;
    });
    const [financialData, setFinancialData] = useState(() => {
        const saved = localStorage.getItem('pl_financialData');
        return saved ? JSON.parse(saved) : INITIAL_FINANCIAL_DATA;
    });
    const [parameters, setParameters] = useState(() => {
        const saved = localStorage.getItem('pl_parameters');
        return saved ? JSON.parse(saved) : INITIAL_PARAMETERS;
    });

    // Save to localStorage whenever state changes
    useEffect(() => {
        localStorage.setItem('pl_basicInfo', JSON.stringify(basicInfo));
    }, [basicInfo]);

    useEffect(() => {
        localStorage.setItem('pl_financialData', JSON.stringify(financialData));
    }, [financialData]);

    useEffect(() => {
        localStorage.setItem('pl_parameters', JSON.stringify(parameters));
    }, [parameters]);

    const updateBasicInfo = (field, value) => {
        setBasicInfo(prev => ({ ...prev, [field]: value }));
    };

    const updateFinancialData = (category, field, value) => {
        if (category) {
            setFinancialData(prev => ({
                ...prev,
                [category]: { ...prev[category], [field]: Number(value) }
            }));
        } else {
            setFinancialData(prev => ({ ...prev, [field]: Number(value) }));
        }
    };

    const updateParameter = (id, field, value) => {
        setParameters(prev => prev.map(p =>
            p.id === id ? { ...p, [field]: Number(value) } : p
        ));
    };

    const results = useMemo(() => {
        // Helper to sum object values
        const sum = (obj) => Object.values(obj).reduce((a, b) => a + b, 0);

        // Calculate Actuals
        const actualVariableCostsTotal = sum(financialData.variableCosts);
        const actualFixedCostsTotal = sum(financialData.fixedCosts); // Note: This includes personnel
        const actualPersonnel = financialData.fixedCosts.personnel;
        const actualOtherFixed = financialData.fixedCosts.expenses + financialData.fixedCosts.depreciation;

        // Base object for actuals
        const actuals = {
            name: '前期実績',
            sales: financialData.sales,
            variableCosts: actualVariableCostsTotal,
            marginalProfit: financialData.sales - actualVariableCostsTotal,
            personnelCosts: actualPersonnel,
            otherFixedCosts: actualOtherFixed,
            fixedCosts: actualPersonnel + actualOtherFixed,
            operatingProfit: (financialData.sales - actualVariableCostsTotal) - (actualPersonnel + actualOtherFixed),
            ordinaryProfit: ((financialData.sales - actualVariableCostsTotal) - (actualPersonnel + actualOtherFixed)) + financialData.nonOperatingPL,
        };

        // Calculate Simulations
        const simulations = parameters.map(param => {
            const sales = financialData.sales * (1 + param.salesGrowth / 100);

            // Variable Cost Logic: Linked to Sales Growth AND Variable Cost Growth Parameter
            // Requirement: 変動費_試算 = 変動費_実績 × (1 + 売上高増減率/100) × (1 + 変動費増減率/100)
            const variableCosts = actualVariableCostsTotal * (1 + param.salesGrowth / 100) * (1 + param.variableCostGrowth / 100);

            const marginalProfit = sales - variableCosts;

            const personnelCosts = actualPersonnel * (1 + param.personnelCostGrowth / 100);

            // Other Fixed Costs Logic: (Expenses + Depreciation) * Growth
            const otherFixedCosts = actualOtherFixed * (1 + param.otherFixedCostGrowth / 100);

            const fixedCosts = personnelCosts + otherFixedCosts;

            const operatingProfit = marginalProfit - fixedCosts;
            const ordinaryProfit = operatingProfit + financialData.nonOperatingPL;

            return {
                id: param.id,
                name: param.name,
                sales,
                variableCosts,
                marginalProfit,
                personnelCosts,
                otherFixedCosts,
                fixedCosts,
                operatingProfit,
                ordinaryProfit,
            };
        });

        return [actuals, ...simulations];
    }, [financialData, parameters]);

    const kpi = useMemo(() => {
        return results.map(res => ({
            name: res.name,
            salesPerEmployee: basicInfo.employeeCount > 0 ? res.sales / basicInfo.employeeCount : 0,
            marginalProfitPerEmployee: basicInfo.employeeCount > 0 ? res.marginalProfit / basicInfo.employeeCount : 0,
            ordinaryProfitPerEmployee: basicInfo.employeeCount > 0 ? res.ordinaryProfit / basicInfo.employeeCount : 0,
            laborShare: res.marginalProfit > 0 ? (res.personnelCosts / res.marginalProfit) * 100 : 0,
        }));
    }, [results, basicInfo.employeeCount]);

    const exportData = () => {
        const data = {
            basicInfo,
            financialData,
            parameters,
            version: '1.0',
            timestamp: new Date().toISOString(),
        };
        return JSON.stringify(data, null, 2);
    };

    const importData = (jsonString) => {
        try {
            const data = JSON.parse(jsonString);
            if (data.basicInfo) setBasicInfo(data.basicInfo);
            if (data.financialData) setFinancialData(data.financialData);
            if (data.parameters) setParameters(data.parameters);
            return true;
        } catch (e) {
            console.error('Import failed:', e);
            return false;
        }
    };

    return {
        basicInfo,
        financialData,
        parameters,
        updateBasicInfo,
        updateFinancialData,
        updateParameter,
        results,
        kpi,
        exportData,
        importData,
    };
};
