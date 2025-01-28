import './App.css';

function App() {
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
      >
        <p>xlsxファイルをここにドラッグ&ドロップして下さい。</p>
      </div>
    </div>
  );
}

export default App;
