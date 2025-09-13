import React, { useState } from 'react';
import { useStore } from '../store';

function uid(prefix='w'){ return prefix + Math.random().toString(36).slice(2,9); }

export default function AddWidget({onClose}){
  const categories = useStore(s=>s.categories);
  const addGlobal = useStore(s=>s.addWidgetGlobal);
  const addToCat = useStore(s=>s.addWidgetToCategory);
  const [name,setName] = useState('');
  const [text,setText] = useState('');
  const [cat,setCat] = useState(categories[0]?.id||'');

  const handleAdd = () => {
    if(!name) return alert('Enter widget name');
    const id = uid();
    const widget = {id,name,text};
    addGlobal(widget);
    if(cat) addToCat(cat,id);
    setName('');setText('');
    onClose();
  };

  return (
    <div style={{position:'fixed',top:0,left:0,right:0,bottom:0,background:'rgba(0,0,0,0.5)',display:'flex',alignItems:'center',justifyContent:'center',zIndex:50}}>
      <div style={{background:'#0b1220',padding:20,borderRadius:8,minWidth:320}}>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
          <strong>Add Widget</strong>
          <button onClick={onClose} style={{background:'transparent',border:'none',color:'#fff',fontSize:18}}>×</button>
        </div>
        <div style={{marginTop:12,display:'flex',flexDirection:'column',gap:8}}>
          <input className="search" placeholder="Widget name" value={name} onChange={e=>setName(e.target.value)} />
          <input className="search" placeholder="Widget description" value={text} onChange={e=>setText(e.target.value)} />
          <select className="search" value={cat} onChange={e=>setCat(e.target.value)}>
            {categories.map(c=><option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
          <div style={{display:'flex',gap:8,marginTop:8}}>
            <button className="button" onClick={handleAdd}>Add</button>
            <button className="button" style={{background:'#7c3aed',color:'#fff'}} onClick={onClose}>Cancel</button>
          </div>
        </div>
      </div>
    </div>
  );
}