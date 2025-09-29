(function patchPreviewRenderer(){
  const $ = (id)=>document.getElementById(id);
  const add = (p,t,c,txt)=>{ if(!p) return null; const n=document.createElement(t); if(c) n.className=c; if(txt!=null) n.textContent=txt; p.appendChild(n); return n; };
  
  function mapPreviewForClient(pv){
    if (!pv || typeof pv !== 'object') return pv;

    // insights shape fix (finding/why_it_matters/plan_change → label/why/change)
    if (Array.isArray(pv.insights) && pv.insights.length && !pv.insights[0].label) {
      pv.insights = pv.insights.map(x => ({
        label: x?.label ?? x?.finding ?? x?.insight ?? '',
        why:   x?.why ?? x?.why_it_matters ?? x?.reason ?? '',
        change:x?.change ?? x?.plan_change ?? ''
      }));
    }

    // weekly_plan → map.weeks
    if (!pv.map?.weeks && Array.isArray(pv.weekly_plan)) {
      pv.map = pv.map || {};
      pv.map.weeks = pv.weekly_plan.map((w, i)=>({
        week: Number(w?.week ?? (i+1)),
        focus: w?.focus || '',
        items: Array.isArray(w?.actions) ? w.actions : (Array.isArray(w?.items)? w.items : []),
        milestone: w?.milestone || ''
      }));
    }
    // benefits alias
    if (!pv.benefits && pv.quick_wins) pv.benefits = pv.quick_wins;

    return pv;
  }
  
  function normalize(pv){ 
    if(!pv||typeof pv!=='object') return null;
    if(!pv.map && Array.isArray(pv.weekly_plan)){ 
      pv.map={weeks:pv.weekly_plan.map(w=>({week:w.week,focus:w.focus,items:w.actions,milestone:w.milestone}))}; 
    }
    if((!pv.thisWeek||!pv.thisWeek.length)&&pv.map?.weeks?.[0]?.items){ 
      pv.thisWeek=pv.map.weeks[0].items.slice(0,4); 
    }
    if(!pv.rules && pv.daily_rhythm){ 
      pv.rules={
        daily:pv.daily_rhythm.rules||[],
        weekly:pv.daily_rhythm.schedule||[],
        non_negotiables:pv.daily_rhythm.non_negotiables||[]
      }; 
    }
    if(!pv.benefits && pv.quick_wins){ 
      pv.benefits={
        day7:pv.quick_wins.day7?[pv.quick_wins.day7]:[], 
        day30:pv.quick_wins.day30?[pv.quick_wins.day30]:[]
      }; 
    }
    return pv;
  }
  
  function fillInsights(cnt,list){ 
    if(!cnt||!Array.isArray(list)||!list.length){ 
      if(cnt) cnt.style.display='none'; 
      return; 
    }
    cnt.innerHTML=''; 
    Object.assign(cnt.style,{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(220px,1fr))',gap:'12px'});
    list.forEach(ins=>{ 
      const card=add(cnt,'div','insight-card'); 
      card.style.cssText='border:1px solid #eee;border-radius:12px;padding:12px;background:#fff;display:flex;gap:6px;flex-direction:column;';
      add(card,'div','insight-label',ins.finding||ins.label||''); 
      add(card,'div','insight-why',ins.why_it_matters||ins.why||'');
      const ch=ins.plan_change||ins.change; 
      if(ch) add(card,'div','insight-change','Plan: '+ch);
    });
  }
  
  function fillWeeks(cnt,map){ 
    if(!cnt||!map?.weeks?.length){ 
      if(cnt) cnt.style.display='none'; 
      return; 
    }
    cnt.innerHTML=''; 
    Object.assign(cnt.style,{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(280px,1fr))',gap:'12px'});
    map.weeks.forEach(w=>{ 
      const card=add(cnt,'div','week-card'); 
      card.style.cssText='border:1px solid #eee;border-radius:12px;padding:16px;background:#fff;';
      add(card,'div','week-title',`Week ${w.week}`); 
      add(card,'div','week-focus',w.focus||''); 
      const ol=add(card,'ol','week-items'); 
      (w.items||w.actions||[]).forEach(it=>add(ol,'li','',it));
      if(w.milestone) add(card,'div','week-milestone','Milestone: '+w.milestone);
    }); 
    const legacy=$('preview-week-list'); 
    if(legacy) legacy.style.display='none';
  }
  
  function fillChips(cnt,schedule){ 
    if(!cnt||!schedule||!Object.keys(schedule).length){ 
      if(cnt) cnt.style.display='none'; 
      return; 
    }
    cnt.innerHTML=''; 
    Object.keys(schedule).forEach(k=>{ 
      const chip=add(cnt,'span','chip',`${k}: ${schedule[k]}`); 
      chip.style.cssText='display:inline-block;border:1px solid #e5e7eb;border-radius:999px;padding:6px 10px;margin:4px;background:#f8fafc;'; 
    });
  }
  
  function fillList(id,arr){ 
    const n=$(id); 
    if(!n||!Array.isArray(arr)||!arr.length){ 
      if(n) n.style.display='none'; 
      return; 
    } 
    n.innerHTML=''; 
    arr.forEach(x=>add(n,'li','',x)); 
  }
  
  function fillQuickwins(cnt,benefits){ 
    if(!cnt||!benefits){ 
      if(cnt) cnt.style.display='none'; 
      return; 
    } 
    cnt.innerHTML=''; 
    const wrap=add(cnt,'div','qw-wrap'); 
    wrap.style.cssText='display:grid;grid-template-columns:1fr 1fr;gap:12px;';
    const c1=add(wrap,'div','qw-col'); 
    add(c1,'h4','', 'By Day 7'); 
    const l1=add(c1,'ul',''); 
    (benefits.day7||[]).forEach(t=>add(l1,'li','',t));
    const c2=add(wrap,'div','qw-col'); 
    add(c2,'h4','', 'By Day 30'); 
    const l2=add(c2,'ul',''); 
    (benefits.day30||[]).forEach(t=>add(l2,'li','',t));
  }
  
  window.renderPreview=function (){
    if(location.pathname.replace(/\/+$/,'')!=='/preview') return; 
    const base=(window.MM&&window.MM.preview)||null; 
    if(!base) return;
    
    // Apply light mapper first to handle different naming conventions
    const mappedData = mapPreviewForClient(structuredClone(base));
    const pv=normalize(mappedData); 
    if(!pv) return;
    
    const t=$('preview-title'), p=$('preview-purpose'), m=$('preview-mission'); 
    if(t) t.textContent=pv.title||'Your plan'; 
    if(p) p.textContent=pv.purpose||''; 
    if(m) m.textContent=pv.mission||'';
    
    fillInsights($('preview-insights'), pv.insights); 
    fillWeeks($('preview-map-weeks'), pv.map);
    fillChips($('preview-schedule'), pv.map?.schedule || pv.daily_rhythm?.schedule);
    fillList('preview-rules-daily', pv.rules?.daily); 
    fillList('preview-rules-weekly', pv.rules?.weekly); 
    fillList('preview-rules-nonneg', pv.rules?.non_negotiables);
    fillList('preview-constraints', pv.constraints || pv.constraints_safety); 
    fillList('preview-safety', pv.safety);
    fillQuickwins($('preview-quickwins'), pv.benefits);
    
    $('btn-start-tracker')?.addEventListener('click', ()=>{ 
      const items=(pv.map?.weeks?.[0]?.items || pv.thisWeek || []).slice(0,3);
      window.MM.week={weekNumber:1,items,progress:{}}; 
      localStorage.setItem(`MM.${window.MM.selectedPack}.${window.MM.selectedSubpack}.week`, JSON.stringify(window.MM.week)); 
      location.href='/tracker'; 
    });
    $('btn-back-to-quiz')?.addEventListener('click', ()=>history.back());
  };
  
  if(document.readyState!=='loading') window.renderPreview?.();
})();