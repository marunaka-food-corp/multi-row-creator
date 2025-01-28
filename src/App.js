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
    </div>
  );
}

export default App;
