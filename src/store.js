
import create from 'zustand';

const initialData = {
  categories: [
    { id: 'cspm', name: 'CSPM Executive dashboard', widgets: ['w1','w2','w3','w4'] }
  ],
  widgets: {
    w1: { id:'w1', name:'Assets Summary', text:'Assets across regions' },
    w2: { id:'w2', name:'Compliance Score', text:'Compliance across benchmarks' },
    w3: { id:'w3', name:'Alerts Feed', text:'Latest security alerts and counts' },
    w4: { id:'w4', name:'Risk Trend', text:'Risk score trend' },
  }
};

export const useStore = create((set, get) => ({
  ...initialData,
  addWidgetGlobal: (widget) => {
    const widgets = {...get().widgets};
    widgets[widget.id] = widget;
    set({ widgets });
  },
  addWidgetToCategory: (categoryId, widgetId) => {
    const categories = get().categories.map(c => c.id === categoryId ? {...c, widgets: [...c.widgets, widgetId]} : c);
    set({ categories });
  },
  removeWidgetFromCategory: (categoryId, widgetId) => {
    const categories = get().categories.map(c => c.id === categoryId ? {...c, widgets: c.widgets.filter(w=>w!==widgetId)} : c);
    set({ categories });
  },
  addCategory: (cat) => {
    set(state => ({ categories: [...state.categories, cat] }));
  },
  toggleWidgetMembership: (categoryId, widgetId, include) => {
    if(include) get().addWidgetToCategory(categoryId, widgetId);
    else get().removeWidgetFromCategory(categoryId, widgetId);
  },
  removeWidgetCompletely: (widgetId) => {
    const widgets = {...get().widgets};
    delete widgets[widgetId];
    const categories = get().categories.map(c => ({...c, widgets: c.widgets.filter(w=>w!==widgetId)}));
    set({ widgets, categories });
  }
}));
