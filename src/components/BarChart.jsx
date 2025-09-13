import React,{useState,useEffect} from 'react';
export default function BarChart({title}) {
  const [data,setData] = useState([40,30,70,55,20]);
  useEffect(()=>{ const t = setInterval(()=> setData(d=> d.map(v=> Math.max(5, Math.min(100, v + Math.round((Math.random()-0.5)*20)) ))), 2000); return ()=>clearInterval(t); },[]);
  const w=420,h=160,p=12; const max = Math.max(...data);
  return (
    <div>
      <div style={{display:'flex',justifyContent:'space-between'}}><strong>{title}</strong><div className="small">Top categories</div></div>
      <svg viewBox={`0 0 ${w} ${h}`} width="100%" preserveAspectRatio="xMidYMid meet" style={{marginTop:8}}>
        {data.map((v,i)=>{ const bw=(w-p*2)/data.length; const barH = (v/max)*(h-p*2); const x = p + i*bw + 8; const y = h-p-barH; return <g key={i}><rect x={x} y={y} width={bw-16} height={barH} rx="6" fill="#7c3aed" /></g> })}
      </svg>
    </div>
  );
}
