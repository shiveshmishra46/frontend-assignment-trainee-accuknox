import React from 'react';
import { useStore } from '../store';
export default function WidgetsPanel(){
  const widgets = useStore(s=>s.widgets);
  const categories = useStore(s=>s.categories);
  const removeAll = useStore(s=>s.removeWidgetCompletely);
  return (
    <div className="widget-list">
      {Object.values(widgets).map(w => (
        <div key={w.id} className="widget-item">
          <div>
            <strong>{w.name}</strong>
            <div className="small">{w.text}</div>
            <div className="small">In: {categories.filter(c=>c.widgets.includes(w.id)).map(c=>c.name).join(', ')}</div>
          </div>
          <div style={{display:'flex',flexDirection:'column',gap:8}}>
            <button className="button" onClick={()=>{ if(window.confirm('Delete widget from everywhere?')) removeAll(w.id); }}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
}
