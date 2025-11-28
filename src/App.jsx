import React from 'react';
import { Layout } from './components/Layout/Layout';
import { BasicInfoInput } from './components/Input/BasicInfoInput';
import { FinancialInput } from './components/Input/FinancialInput';
import { ParameterInput } from './components/Input/ParameterInput';
import { DataManagement } from './components/Input/DataManagement';
import { PLTable } from './components/Results/PLTable';
import { KPICards } from './components/Results/KPICards';
import { ProfitChart } from './components/Charts/ProfitChart';
import { useSimulation } from './hooks/useSimulation';

function App() {
  const {
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
  } = useSimulation();

  return (
    <Layout>
      <div className="grid" style={{ gridTemplateColumns: '350px 1fr', gap: '2rem', alignItems: 'start' }}>
        {/* Left Column: Inputs */}
        <div className="flex flex-col gap-md">
          <BasicInfoInput
            basicInfo={basicInfo}
            updateBasicInfo={updateBasicInfo}
          />
          <FinancialInput
            financialData={financialData}
            updateFinancialData={updateFinancialData}
          />
          <ParameterInput
            parameters={parameters}
            updateParameter={updateParameter}
          />
          <DataManagement
            exportData={exportData}
            importData={importData}
          />
        </div>

        {/* Right Column: Results */}
        <div className="flex flex-col gap-md">
          <div className="grid" style={{ gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="col-span-2">
              {/* Summary Cards or Top Level Metrics could go here */}
            </div>
          </div>

          <ProfitChart results={results} />

          <PLTable results={results} />

          <KPICards kpi={kpi} />
        </div>
      </div>
    </Layout>
  );
}

export default App;
