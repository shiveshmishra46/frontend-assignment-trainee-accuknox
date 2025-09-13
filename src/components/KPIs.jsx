import React, {useEffect, useState} from 'react';
function rand(min,max){return Math.floor(Math.random()*(max-min+1))+min;}
export default function KPIs(){
  const [state,setState] = useState({assets:1240,compliance:86,alerts:12});
  useEffect(()=>{
    const t = setInterval(()=> setState(s => ({ assets: Math.max(100, s.assets + rand(-5,10)), compliance: Math.max(30, Math.min(99, s.compliance + rand(-1,1))), alerts: Math.max(0, s.alerts + rand(-2,3)) })), 2000);
    return ()=>clearInterval(t);
  },[]);
  return (
    <div className="kpis">
      <div className="kpi"><div className="num">{state.assets}</div><div className="label">Total Assets</div></div>
      <div className="kpi"><div className="num">{state.compliance}%</div><div className="label">Compliance Score</div></div>
      <div className="kpi"><div className="num">{state.alerts}</div><div className="label">Active Alerts</div></div>
    </div>
  );
}
