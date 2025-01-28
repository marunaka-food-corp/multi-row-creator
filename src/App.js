import React, { useState, useCallback } from 'react';
import * as XLSX from 'xlsx';
import './App.css';

function App() {
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
        const sheetName = '朝食シール確定';
        const worksheet = workbook.Sheets[sheetName];
        if (!worksheet) {
          alert('Not found');
          return;
        }
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
        setData(jsonData);
      };
      reader.readAsArrayBuffer(file);
    }
  }, []);

  const onDragOver = useCallback((e) => {
    e.preventDefault();
  }, []);

  const download = () => {};

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
      </div>
      <div
        style={{
          border: '2px dashed #ccc',
          borderRadius: '4px',
          padding: '20px',
          textAlign: 'center',
          margin: '20px auto',
          width: '80%',
          maxWidth: '600px'
        }}
        onDrop={onDrop}
        onDragOver={onDragOver}
      >
        <p>xlsxファイルをここにドラッグ&ドロップして下さい。</p>
      </div>
      {data && (
        <div style={{ overflowX: 'auto', margin: '20px' }}>
          <h3>朝食シール確定</h3>
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
