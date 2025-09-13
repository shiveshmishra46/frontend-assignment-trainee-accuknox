import React, {useState, useEffect} from 'react';
function gen(n, last){
  let a = [];
  let v = last || 50;
  for(let i=0;i<n;i++){ v = Math.max(5, Math.min(100, v + Math.round((Math.random()-0.5)*12))); a.push(v); }
  return a;
}
export default function LineChart({title}) {
  const [data, setData] = useState(gen(20,60));
  useEffect(()=>{
    const t = setInterval(()=> setData(d => { const nv = Math.max(5, Math.min(100, d[d.length-1] + Math.round((Math.random()-0.5)*12))); return [...d.slice(1), nv]; }), 1500);
    return ()=>clearInterval(t);
  },[]);
  const w = 760, h = 240, p = 20;
  const max = Math.max(...data), min = Math.min(...data);
  const points = data.map((v,i)=>{ const x = p + (i/(data.length-1))*(w-p*2); const y = p + (1 - (v-min)/(max-min||1))*(h-p*2); return `${x},${y}`; }).join(' ');
  return (
    <div>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}><strong>{title}</strong><div className="small">Live</div></div>
      <svg viewBox={`0 0 ${w} ${h}`} width="100%" preserveAspectRatio="xMidYMid meet" style={{marginTop:8}}>
        <defs>
          <linearGradient id="lg" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stopColor="#06b6d4" stopOpacity="0.6" /><stop offset="1" stopColor="#06b6d4" stopOpacity="0.03" /></linearGradient>
        </defs>
        <polyline fill="url(#lg)" stroke="none" points={points + ` ${w-p},${h-p} ${p},${h-p}`} />
        <polyline fill="none" stroke="#06b6d4" strokeWidth="2" points={points} strokeLinejoin="round" strokeLinecap="round" />
      </svg>
    </div>
  );
}
