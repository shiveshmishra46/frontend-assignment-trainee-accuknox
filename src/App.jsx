import React from 'react';
import Dashboard from './components/Dashboard';
import './styles.css';
import AddWidget from './components/AddWidget';

export default function App() {
  const [showAdd,setShowAdd] = React.useState(false);

  return (
    <div className="app">
      <div className="header">
        <div>
          <div className="title">CSPM Executive dashboard</div>
          <div className="subtitle">Create a Dashboard Page similar to mentioned below image</div>
        </div>
        <div className="controls">
          <input className="search" placeholder="Search widgets..." />

          <button className="button" onClick={()=>setShowAdd(true)}>+ Add Widget</button>
        </div>
      </div>

      {showAdd && <AddWidget onClose={()=>setShowAdd(false)} />}
      <Dashboard />
    </div>
  );
}
