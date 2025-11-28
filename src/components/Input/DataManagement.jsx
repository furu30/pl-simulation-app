import React, { useRef } from 'react';
import { Card } from '../UI/Card';
import { Button } from '../UI/Button';

export const DataManagement = ({ exportData, importData }) => {
    const fileInputRef = useRef(null);

    const handleExport = () => {
        const json = exportData();
        const blob = new Blob([json], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `pl_simulation_${new Date().toISOString().slice(0, 10)}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    const handleImportClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
            const success = importData(event.target.result);
            if (success) {
                alert('データを読み込みました');
            } else {
                alert('データの読み込みに失敗しました');
            }
            // Reset input
            e.target.value = '';
        };
        reader.readAsText(file);
    };

    return (
        <Card title="データ管理" className="mb-4">
            <div className="flex gap-md">
                <Button onClick={handleExport} variant="primary">
                    データを保存 (JSON)
                </Button>
                <Button onClick={handleImportClick} variant="secondary">
                    データを読込
                </Button>
                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept=".json"
                    style={{ display: 'none' }}
                />
            </div>
            <p className="text-sm text-muted mt-4">
                ※ 入力したデータをJSONファイルとしてダウンロードし、他のPCやブラウザで読み込むことができます。
            </p>
        </Card>
    );
};
