import React,{useState,useEffect} from 'react';
function polarToCartesian(cx,cy,r,angle){ const a = (angle-90)*Math.PI/180; return {x:cx + r*Math.cos(a), y:cy + r*Math.sin(a)}; }
function describeArc(cx,cy,r,start,end){ const startP = polarToCartesian(cx,cy,r,end); const endP = polarToCartesian(cx,cy,r,start); const large = end-start <= 180 ? "0":"1"; return `M ${startP.x} ${startP.y} A ${r} ${r} 0 ${large} 0 ${endP.x} ${endP.y}`; }
export default function DonutChart({title}) {
  const [val,setVal] = useState(78);
  useEffect(()=>{ const t = setInterval(()=> setVal(v => Math.max(10, Math.min(98, v + Math.round((Math.random()-0.5)*6)) )), 2500); return ()=>clearInterval(t); },[]);
  const cx=60,cy=60,r=48; const ang = (val/100)*360;
  return (
    <div>
      <div style={{display:'flex',justifyContent:'space-between'}}><strong>{title}</strong><div className="small">Overview</div></div>
      <svg viewBox="0 0 120 120" width="100%" style={{marginTop:8}}>
        <circle cx={cx} cy={cy} r={r} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="12" />
        <path d={describeArc(cx,cy,r,0,ang)} stroke="#06b6d4" strokeWidth="12" fill="none" strokeLinecap="round" />
        <text x="60" y="64" fontSize="16" fontWeight="700" textAnchor="middle" fill="#eaf4ff">{val}%</text>
      </svg>
    </div>
  );
}
