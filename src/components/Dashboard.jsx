import React from 'react';
import { useStore } from '../store';
import KPIs from './KPIs';
import LineChart from './LineChart';
import BarChart from './BarChart';
import DonutChart from './DonutChart';
import WidgetsPanel from './WidgetsPanel';

export default function Dashboard(){
  const categories = useStore(s=>s.categories);
  return (
    <div className="grid">
      <div className="card big">
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
          <strong>Overview</strong>
          <div className="small">Realtime</div>
        </div>

        <KPIs />

        <div className="charts">
          <div style={{height:260}}>
            <LineChart title="Risk Trend (Last 20 intervals)" />
          </div>

          <div className="chart-row">
            <div style={{flex:1}}>
              <BarChart title="Top 5 Compliance Categories" />
            </div>
            <div style={{width:220}}>
              <DonutChart title="Compliance Score" />
            </div>
          </div>
        </div>
      </div>

      <div className="card side">
        <strong>Widgets</strong>
        <div className="small">Manage widgets added to categories</div>
        <WidgetsPanel />
      </div>
    </div>
  );
}
