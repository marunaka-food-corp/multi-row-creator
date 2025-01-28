import React, { useState, useCallback } from 'react';
import * as XLSX from 'xlsx';
import './App.css';

function App() {
  const defaultSheetName = '朝食シール確定';
  const [selectedSheetName, setSelectedSheetName] = useState(defaultSheetName);
  const [data, setData] = useState(null);

  const onDrop = useCallback((e) => {
    e.preventDefault();

    const files = e.dataTransfer.files;
    if (files && files.length === 1) {
      const file = files[0];
      if (!file.name.endsWith('.xlsx')) return;

      const reader = new FileReader();
      reader.onload = (event) => {
        const arrayBuffer = event.target.result;
        const workbook = XLSX.read(arrayBuffer, { type: 'array' });
        const worksheet = workbook.Sheets[selectedSheetName];
        if (!worksheet) {
          alert(`「${selectedSheetName}」シートが見つかりません。`);
          return;
        }
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
        setData(jsonData);
      };
      reader.readAsArrayBuffer(file);
    }
  }, [selectedSheetName]);

  const onDragOver = useCallback((e) => {
    e.preventDefault();
  }, []);

  const download = () => {
    const mrData = [];
    mrData.push(data[0]);

    for (let i = 1; i < data.length; i++) {
      const row = data[i];
      const lastCell = row[row.length - 1];
      const count = typeof lastCell === 'number'
        ? lastCell
        : parseInt(lastCell, 10);
      for (let j = 0; j < count; j++) {
        mrData.push(row);
      }
    }

    const worksheet = XLSX.utils.aoa_to_sheet(mrData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, selectedSheetName);
    XLSX.writeFile(workbook, `${selectedSheetName}.xlsx`);
  };

  return (
    <div>
      <h1 style={{ marginLeft: '20px', marginBottom: '0px' }}>multi-row-creator</h1>
      <div style={{ marginLeft: '20px' }}>
        <ul>
          <li>aaaa</li>
          <li>aaaa</li>
          <li>aaaa</li>
          <li>aaaa</li>
        </ul>

        <label htmlFor="target">対象シート</label>
        <select
          id="target"
          value={selectedSheetName}
          onChange={(e) => setSelectedSheetName(e.target.value)}
        >
          <option value="朝食シール確定">朝食シール確定</option>
          <option value="昼食シール確定">昼食シール確定</option>
          <option value="夕食シール確定">夕食シール確定</option>
        </select>

      </div>
      <div
        style={{
          border: '2px dashed #ccc',
          borderRadius: '4px',
          padding: '20px',
          textAlign: 'center',
          margin: '20px auto',
          width: '80%',
          maxWidth: '800px'
        }}
        onDrop={onDrop}
        onDragOver={onDragOver}
      >
        <p>xlsxファイルをここにドラッグ&ドロップして下さい。</p>
      </div>
      {data && (
        <div style={{ overflowX: 'auto', margin: '20px' }}>
          <h3 style={{ marginTop: '0px', marginBottom: '10px' }}>{selectedSheetName}</h3>
          <div style={{ marginBottom: '30px' }}>
            <button onClick={download}>ダウンロード</button>
          </div>
          <table border="1" cellPadding="5" style={{ borderCollapse: 'collapse', width: '100%' }}>
            <tbody>
              {data.map((row, rowIndex) => (
                <tr key={`row-${rowIndex}`}>
                  {row.map((cell, cellIndex) => (
                    <td key={`cell-${rowIndex}-${cellIndex}`}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default App;
