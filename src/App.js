import './App.css';

function App() {
  return (
    <div>
      <h1 style={{ marginLeft: '20px' }}>multi-row-creator</h1>
      <div
        style={{
          border: '2px dashed #ccc',
          borderRadius: '4px',
          padding: '20px',
          textAlign: 'center'
        }}
      >
        <p>xlsxファイルをここにドラッグ&ドロップして下さい。</p>
      </div>
    </div>
  );
}

export default App;
