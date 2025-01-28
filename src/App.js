import React, { useState, useCallback } from 'react';
import './App.css';

function App() {
  const onDrop = useCallback((e) => {
    e.preventDefault();
  }, []);

  const onDragOver = useCallback((e) => {
    e.preventDefault();
  }, []);

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
