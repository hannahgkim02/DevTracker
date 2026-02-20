import { useState, useEffect } from "react";

// ── Theme ─────────────────────────────────────────────────────────────────────
const ACCENT  = "#C8A96E";   // gold
const ACCENT2 = "#4A90C4";   // lighter navy accent
const BG      = "#0A0F1E";   // deep navy
const SURFACE = "#0F1A2E";   // navy surface
const SURFACE2= "#162338";   // slightly lighter
const BORDER  = "#1E3050";   // navy border
const TEXT    = "#E8EAF0";
const MUTED   = "#5A7A9A";

const style = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400&family=DM+Mono:wght@400;500&family=DM+Sans:wght@300;400;500&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { background: ${BG}; color: ${TEXT}; font-family: 'DM Sans', sans-serif; min-height: 100vh; }
  ::-webkit-scrollbar { width: 4px; }
  ::-webkit-scrollbar-track { background: ${SURFACE}; }
  ::-webkit-scrollbar-thumb { background: ${BORDER}; border-radius: 2px; }

  .app { display: grid; grid-template-columns: 220px 1fr; min-height: 100vh; }

  .sidebar {
    background: ${SURFACE};
    border-right: 1px solid ${BORDER};
    padding: 32px 0;
    position: sticky; top: 0; height: 100vh;
    display: flex; flex-direction: column;
  }

  .logo { padding: 0 24px 28px; border-bottom: 1px solid ${BORDER}; margin-bottom: 24px; }
  .logo-name { font-family: 'Cormorant Garamond', serif; font-size: 20px; font-weight: 600; color: ${ACCENT}; line-height: 1.2; }
  .logo-sub  { font-size: 11px; color: ${MUTED}; letter-spacing: 0.08em; text-transform: uppercase; margin-top: 3px; font-family: 'DM Mono', monospace; }

  .nav-section { padding: 0 24px 8px; font-family: 'DM Mono', monospace; font-size: 9px; color: ${MUTED}; letter-spacing: 0.12em; text-transform: uppercase; margin-top: 8px; }

  .nav-item {
    display: flex; align-items: center; gap: 12px;
    padding: 11px 24px; cursor: pointer; transition: all 0.15s;
    font-size: 13.5px; color: ${MUTED};
    border-left: 2px solid transparent;
  }
  .nav-item:hover { color: ${TEXT}; background: ${SURFACE2}; }
  .nav-item.active { color: ${ACCENT}; border-left-color: ${ACCENT}; background: rgba(200,169,110,0.07); }
  .nav-icon { font-size: 15px; width: 20px; text-align: center; }

  .nav-sub {
    display: flex; align-items: center; gap: 12px;
    padding: 8px 24px 8px 44px; cursor: pointer; transition: all 0.15s;
    font-size: 12.5px; color: ${MUTED};
    border-left: 2px solid transparent;
  }
  .nav-sub:hover { color: ${TEXT}; background: ${SURFACE2}; }
  .nav-sub.active { color: ${ACCENT2}; border-left-color: ${ACCENT2}; }

  .main { padding: 40px 48px; overflow-y: auto; }

  .page-header { margin-bottom: 32px; padding-bottom: 20px; border-bottom: 1px solid ${BORDER}; }
  .page-title  { font-family: 'Cormorant Garamond', serif; font-size: 34px; font-weight: 600; color: ${TEXT}; line-height: 1; }
  .page-sub    { font-size: 13px; color: ${MUTED}; margin-top: 8px; font-weight: 300; }

  .card { background: ${SURFACE}; border: 1px solid ${BORDER}; border-radius: 12px; padding: 22px; margin-bottom: 14px; transition: border-color 0.2s; }
  .card:hover { border-color: #2A4060; }

  .badge { font-family: 'DM Mono', monospace; font-size: 10px; padding: 3px 9px; border-radius: 20px; letter-spacing: 0.04em; }
  .badge-gold  { background: rgba(200,169,110,0.15); color: ${ACCENT};  border: 1px solid rgba(200,169,110,0.3); }
  .badge-blue  { background: rgba(74,144,196,0.15);  color: ${ACCENT2}; border: 1px solid rgba(74,144,196,0.3); }
  .badge-muted { background: ${SURFACE2}; color: ${MUTED}; border: 1px solid ${BORDER}; }
  .badge-red   { background: rgba(224,112,112,0.15); color: #E07070; border: 1px solid rgba(224,112,112,0.3); }

  .btn { padding: 9px 18px; border-radius: 8px; font-size: 13px; font-family: 'DM Sans', sans-serif; cursor: pointer; transition: all 0.15s; border: none; font-weight: 500; }
  .btn-primary { background: ${ACCENT}; color: ${BG}; }
  .btn-primary:hover { background: #D4B47A; }
  .btn-ghost { background: transparent; color: ${MUTED}; border: 1px solid ${BORDER}; }
  .btn-ghost:hover { color: ${TEXT}; border-color: #2A4060; }
  .btn-sm { padding: 6px 12px; font-size: 12px; }

  .input, .textarea, .select {
    width: 100%; background: ${SURFACE2}; border: 1px solid ${BORDER};
    border-radius: 8px; padding: 10px 14px; color: ${TEXT};
    font-family: 'DM Sans', sans-serif; font-size: 13.5px;
    transition: border-color 0.15s; outline: none; resize: vertical;
  }
  .input:focus, .textarea:focus, .select:focus { border-color: ${ACCENT}; }
  .select option { background: ${SURFACE2}; }
  .input::placeholder, .textarea::placeholder { color: ${MUTED}; }

  .form-row { margin-bottom: 14px; }
  .form-label { display: block; font-size: 11px; color: ${MUTED}; letter-spacing: 0.08em; text-transform: uppercase; font-family: 'DM Mono', monospace; margin-bottom: 6px; }

  .grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
  .grid-3 { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 16px; }

  .stat-card { background: ${SURFACE}; border: 1px solid ${BORDER}; border-radius: 12px; padding: 20px 24px; }
  .stat-num   { font-family: 'Cormorant Garamond', serif; font-size: 40px; font-weight: 600; color: ${ACCENT}; line-height: 1; }
  .stat-label { font-size: 12px; color: ${MUTED}; margin-top: 6px; letter-spacing: 0.04em; }

  .journal-entry { background: ${SURFACE}; border: 1px solid ${BORDER}; border-radius: 12px; padding: 20px 24px; margin-bottom: 12px; }
  .journal-date  { font-family: 'DM Mono', monospace; font-size: 11px; color: ${ACCENT}; margin-bottom: 8px; }
  .journal-text  { font-size: 14px; line-height: 1.7; color: #A0AEC0; white-space: pre-wrap; }
  .journal-tag   { display: inline-block; font-size: 11px; font-family: 'DM Mono', monospace; color: ${ACCENT2}; background: rgba(74,144,196,0.1); border: 1px solid rgba(74,144,196,0.2); padding: 2px 8px; border-radius: 20px; margin-right: 6px; margin-top: 10px; }

  .reminder-check-item { display: flex; align-items: center; gap: 12px; padding: 10px 0; border-bottom: 1px solid ${BORDER}; font-size: 13.5px; }
  .reminder-check-item:last-child { border-bottom: none; }

  .check { width: 17px; height: 17px; border: 1.5px solid ${BORDER}; border-radius: 4px; cursor: pointer; display: flex; align-items: center; justify-content: center; flex-shrink: 0; transition: all 0.15s; background: transparent; }
  .check.done { background: ${ACCENT}; border-color: ${ACCENT}; }
  .check.done::after { content: '✓'; font-size: 10px; color: ${BG}; font-weight: 700; }
  .check.overdue { border-color: #E07070; }

  .item-text { flex: 1; }
  .item-text.done { color: ${MUTED}; text-decoration: line-through; }
  .item-text.overdue { color: #E07070; }

  .reminder-dot { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; }
  .dot-gold { background: ${ACCENT}; box-shadow: 0 0 8px rgba(200,169,110,0.4); }
  .dot-blue { background: ${ACCENT2}; box-shadow: 0 0 8px rgba(74,144,196,0.4); }
  .dot-red  { background: #E07070; box-shadow: 0 0 8px rgba(224,112,112,0.4); }

  .modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.75); backdrop-filter: blur(4px); display: flex; align-items: center; justify-content: center; z-index: 100; padding: 24px; }
  .modal { background: ${SURFACE}; border: 1px solid ${BORDER}; border-radius: 16px; padding: 32px; width: 100%; max-width: 560px; max-height: 85vh; overflow-y: auto; }
  .modal-title { font-family: 'Cormorant Garamond', serif; font-size: 26px; font-weight: 600; margin-bottom: 24px; }

  .divider { height: 1px; background: ${BORDER}; margin: 20px 0; }

  .empty-state { text-align: center; padding: 48px 24px; color: ${MUTED}; }
  .empty-state .icon { font-size: 32px; margin-bottom: 12px; }
  .empty-state p { font-size: 13px; line-height: 1.6; }

  .section-title { font-family: 'DM Mono', monospace; font-size: 11px; letter-spacing: 0.1em; text-transform: uppercase; color: ${MUTED}; margin-bottom: 14px; }

  .flex { display: flex; }
  .gap-8 { gap: 8px; }
  .gap-12 { gap: 12px; }
  .items-center { align-items: center; }
  .items-start { align-items: flex-start; }
  .justify-between { justify-content: space-between; }
  .flex-wrap { flex-wrap: wrap; }
  .mt-8 { margin-top: 8px; }
  .mt-16 { margin-top: 16px; }
  .mb-16 { margin-bottom: 16px; }
  .mb-24 { margin-bottom: 24px; }
  .flex-1 { flex: 1; }

  .delete-btn { background: transparent; border: none; color: ${MUTED}; cursor: pointer; font-size: 14px; padding: 4px; transition: color 0.15s; }
  .delete-btn:hover { color: #E07070; }

  .focus-item { padding: 6px 0; font-size: 13px; color: #A0AEC0; display: flex; align-items: center; gap-8px; }
  .focus-bullet { color: ${ACCENT}; margin-right: 8px; font-size: 10px; }

  .audit-prompt { background: ${SURFACE2}; border: 1px solid ${BORDER}; border-radius: 8px; padding: 14px; margin-bottom: 14px; font-size: 13px; color: ${MUTED}; line-height: 1.7; }
  .audit-prompt strong { color: ${ACCENT}; font-weight: 500; display: block; margin-bottom: 4px; font-family: 'DM Mono', monospace; font-size: 11px; letter-spacing: 0.06em; text-transform: uppercase; }

  .sort-btn { padding: 5px 12px; border-radius: 6px; font-size: 12px; font-family: 'DM Mono', monospace; cursor: pointer; transition: all 0.15s; border: 1px solid ${BORDER}; background: transparent; color: ${MUTED}; letter-spacing: 0.04em; }
  .sort-btn.active { background: rgba(200,169,110,0.12); color: ${ACCENT}; border-color: rgba(200,169,110,0.3); }

  .recur-badge { font-family: 'DM Mono', monospace; font-size: 10px; color: ${ACCENT2}; background: rgba(74,144,196,0.1); border: 1px solid rgba(74,144,196,0.2); padding: 2px 8px; border-radius: 20px; }
`;

// ── Helpers ───────────────────────────────────────────────────────────────────
function useLocalStorage(key, initial) {
  const [val, setVal] = useState(() => {
    try { const s = localStorage.getItem(key); return s ? JSON.parse(s) : initial; } catch { return initial; }
  });
  const save = (v) => { setVal(v); try { localStorage.setItem(key, JSON.stringify(v)); } catch {} };
  return [val, save];
}

const BASE_CATS = ["Career", "Financial", "Learning", "Personal"];
const RECUR_OPTIONS = ["None", "Weekly", "Monthly", "Quarterly", "Yearly"];
const JOURNAL_TAGS = ["Reflection", "Post-Project", "Post-Event", "Personal Audit"];

const AUDIT_PROMPTS = [
  { label: "Likes & Dislikes", q: "What have I learned about what I like and don't like?" },
  { label: "Skills Built",     q: "What skills have I built?" },
  { label: "Relationships",    q: "What relationships have I made?" },
  { label: "Next Rotation",    q: "What do I want more or less of in my next rotation?" },
];

function getDiff(dateStr) {
  const d = new Date(dateStr); d.setHours(0,0,0,0);
  const t = new Date(); t.setHours(0,0,0,0);
  return Math.round((d - t) / 86400000);
}

function nextRecurDate(dateStr, recur) {
  const d = new Date(dateStr);
  const now = new Date(); now.setHours(0,0,0,0);
  while (d < now) {
    if (recur === "Weekly")    d.setDate(d.getDate() + 7);
    else if (recur === "Monthly")   d.setMonth(d.getMonth() + 1);
    else if (recur === "Quarterly") d.setMonth(d.getMonth() + 3);
    else if (recur === "Yearly")    d.setFullYear(d.getFullYear() + 1);
    else break;
  }
  return d.toISOString().split("T")[0];
}

// ── Category selector with custom option ──────────────────────────────────────
function CategorySelect({ value, onChange, categories }) {
  const [custom, setCustom] = useState(false);
  const allCats = [...new Set([...BASE_CATS, ...categories])];
  if (custom) {
    return (
      <div className="flex gap-8">
        <input className="input" placeholder="New category..." autoFocus
          onBlur={e => { if (e.target.value.trim()) onChange(e.target.value.trim()); setCustom(false); }}
          onKeyDown={e => { if (e.key === 'Enter' && e.target.value.trim()) { onChange(e.target.value.trim()); setCustom(false); }}}
        />
        <button className="btn btn-ghost btn-sm" onClick={() => setCustom(false)}>✕</button>
      </div>
    );
  }
  return (
    <select className="select" value={value} onChange={e => { if (e.target.value === '__custom__') setCustom(true); else onChange(e.target.value); }}>
      {allCats.map(c => <option key={c}>{c}</option>)}
      <option value="__custom__">+ Add category</option>
    </select>
  );
}

// ── Dashboard ─────────────────────────────────────────────────────────────────
function Dashboard({ goals, journals, reminders, setReminders }) {
  const upcoming = reminders
    .map(r => ({ ...r, _eff: r.recur !== "None" ? nextRecurDate(r.date, r.recur) : r.date }))
    .filter(r => getDiff(r._eff) >= 0)
    .sort((a, b) => new Date(a._eff) - new Date(b._eff));

  const toggleReminder = (id) => {
    setReminders(reminders.map(r => {
      if (r.id !== id) return r;
      if (r.recur !== "None") {
        // advance to next occurrence
        const next = nextRecurDate(r.date, r.recur);
        const after = (() => {
          const d = new Date(next);
          if (r.recur === "Weekly")    d.setDate(d.getDate() + 7);
          if (r.recur === "Monthly")   d.setMonth(d.getMonth() + 1);
          if (r.recur === "Quarterly") d.setMonth(d.getMonth() + 3);
          if (r.recur === "Yearly")    d.setFullYear(d.getFullYear() + 1);
          return d.toISOString().split("T")[0];
        })();
        return { ...r, date: after };
      }
      return { ...r, _checked: true };
    }).filter(r => !r._checked));
  };

  return (
    <div>
      <div className="page-header">
        <div className="page-title">Good to see you, Hannah.</div>
        <div className="page-sub">Stay focused. Stay accountable. Build the life you want.</div>
      </div>

      <div className="grid-2 mb-24">
        <div className="stat-card">
          <div className="stat-num">{goals.length}</div>
          <div className="stat-label">Active Goals</div>
        </div>
        <div className="stat-card">
          <div className="stat-num">{journals.length}</div>
          <div className="stat-label">Journal Entries</div>
        </div>
      </div>

      <div className="grid-2">
        {/* Goals overview */}
        <div>
          <div className="section-title">Long-Term Goals</div>
          {goals.length === 0 && <div className="empty-state"><div className="icon">🎯</div><p>No goals yet.</p></div>}
          {goals.map(g => (
            <div className="card" key={g.id} style={{padding:"16px 20px"}}>
              <div className="flex items-center justify-between mb-16" style={{marginBottom:10}}>
                <span style={{fontSize:15, fontWeight:500, fontFamily:"'Cormorant Garamond', serif"}}>{g.title}</span>
                <span className={`badge badge-${g.priority==='High'?'gold':g.priority==='Medium'?'blue':'muted'}`}>{g.priority}</span>
              </div>
              {g.focusAreas && g.focusAreas.length > 0 && (
                <div>
                  {g.focusAreas.map((f, i) => (
                    <div className="focus-item" key={i}>
                      <span className="focus-bullet">◆</span>{f}
                    </div>
                  ))}
                </div>
              )}
              {g.target && <div style={{fontFamily:"'DM Mono', monospace", fontSize:11, color:ACCENT, marginTop:8}}>Target: {g.target}</div>}
            </div>
          ))}
        </div>

        {/* Reminders checklist */}
        <div>
          <div className="section-title">Upcoming Reminders</div>
          {upcoming.length === 0 && <div className="empty-state"><div className="icon">🔔</div><p>No upcoming reminders.</p></div>}
          <div className="card">
            {upcoming.map(r => {
              const diff = getDiff(r._eff);
              const overdue = diff < 0;
              return (
                <div className="reminder-check-item" key={r.id}>
                  <div className={`check ${overdue ? 'overdue' : ''}`} onClick={() => toggleReminder(r.id)} />
                  <div className="flex-1">
                    <div className={`item-text ${overdue ? 'overdue' : ''}`}>{r.title}</div>
                    <div className="flex gap-8 mt-8 items-center" style={{marginTop:4}}>
                      {r.recur !== "None" && <span className="recur-badge">{r.recur}</span>}
                      <span style={{fontFamily:"'DM Mono', monospace", fontSize:10, color: overdue ? '#E07070' : diff <= 3 ? ACCENT : MUTED}}>
                        {overdue ? `${Math.abs(diff)}d overdue` : diff === 0 ? 'Today' : diff === 1 ? 'Tomorrow' : `In ${diff}d`}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="divider" />
          <div className="section-title">Recent Journal</div>
          {journals.length === 0 && <div className="empty-state"><div className="icon">📓</div><p>No journal entries yet.</p></div>}
          {journals.slice(0, 2).map(j => (
            <div className="journal-entry" key={j.id} style={{padding:"14px 18px"}}>
              <div className="journal-date">{new Date(j.date).toLocaleDateString('en-US', {month:'short', day:'numeric', year:'numeric'})}</div>
              <div className="journal-text" style={{fontSize:13, WebkitLineClamp:3, overflow:'hidden', display:'-webkit-box', WebkitBoxOrient:'vertical'}}>{j.text}</div>
              <span className="journal-tag">{j.tag}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Goals ─────────────────────────────────────────────────────────────────────
function Goals({ goals, setGoals }) {
  const [modal, setModal] = useState(false);
  const [expanded, setExpanded] = useState(null);
  const [form, setForm] = useState({ title:'', description:'', category:'Career', priority:'High', target:'', focusAreas:[''] });
  const [customCats, setCustomCats] = useState([]);

  const allCats = [...new Set([...BASE_CATS, ...customCats])];

  const saveGoal = () => {
    if (!form.title.trim()) return;
    const areas = form.focusAreas.filter(f => f.trim());
    if (!allCats.includes(form.category)) setCustomCats([...customCats, form.category]);
    setGoals([...goals, { ...form, focusAreas: areas, id: Date.now() }]);
    setForm({ title:'', description:'', category:'Career', priority:'High', target:'', focusAreas:[''] });
    setModal(false);
  };

  const updateFocus = (idx, val) => {
    const arr = [...form.focusAreas];
    arr[idx] = val;
    setForm({ ...form, focusAreas: arr });
  };

  const addFocusRow = () => setForm({ ...form, focusAreas: [...form.focusAreas, ''] });
  const removeFocusRow = (idx) => setForm({ ...form, focusAreas: form.focusAreas.filter((_, i) => i !== idx) });

  return (
    <div>
      <div className="page-header">
        <div className="flex items-center justify-between">
          <div>
            <div className="page-title">Goals</div>
            <div className="page-sub">Long-term intentions and areas of focus.</div>
          </div>
          <button className="btn btn-primary" onClick={() => setModal(true)}>+ New Goal</button>
        </div>
      </div>

      {goals.length === 0 && <div className="empty-state"><div className="icon">🎯</div><p>No goals yet. Add your first long-term goal.</p></div>}

      {goals.map(g => (
        <div className="card" key={g.id}>
          <div className="flex items-start justify-between">
            <div style={{flex:1}}>
              <div className="flex items-center gap-12" style={{marginBottom:8, flexWrap:'wrap', gap:8}}>
                <span style={{fontFamily:"'Cormorant Garamond', serif", fontSize:22, fontWeight:600}}>{g.title}</span>
                <span className={`badge badge-${g.priority==='High'?'gold':g.priority==='Medium'?'blue':'muted'}`}>{g.priority}</span>
                <span className="badge badge-muted">{g.category}</span>
              </div>
              {g.description && <div style={{fontSize:13, color:MUTED, marginBottom:10}}>{g.description}</div>}
              {g.target && <div style={{fontFamily:"'DM Mono', monospace", fontSize:11, color:ACCENT, marginBottom:12}}>Target: {g.target}</div>}

              {g.focusAreas && g.focusAreas.length > 0 && (
                <>
                  <div style={{fontFamily:"'DM Mono', monospace", fontSize:10, color:MUTED, letterSpacing:'0.08em', textTransform:'uppercase', marginBottom:8}}>Areas of Focus</div>
                  {g.focusAreas.map((f, i) => (
                    <div className="focus-item" key={i}><span className="focus-bullet">◆</span>{f}</div>
                  ))}
                </>
              )}
            </div>
            <button className="delete-btn" onClick={() => setGoals(goals.filter(x => x.id !== g.id))}>✕</button>
          </div>
        </div>
      ))}

      {modal && (
        <div className="modal-overlay" onClick={e => e.target === e.currentTarget && setModal(false)}>
          <div className="modal">
            <div className="modal-title">New Goal</div>
            <div className="form-row">
              <label className="form-label">Goal Title</label>
              <input className="input" placeholder="e.g. Transition into a PM-facing role" value={form.title} onChange={e => setForm({...form, title:e.target.value})} />
            </div>
            <div className="form-row">
              <label className="form-label">Description</label>
              <textarea className="textarea" rows={2} placeholder="What does this goal mean to you?" value={form.description} onChange={e => setForm({...form, description:e.target.value})} />
            </div>
            <div className="grid-2">
              <div className="form-row">
                <label className="form-label">Category</label>
                <CategorySelect value={form.category} onChange={v => setForm({...form, category:v})} categories={customCats} />
              </div>
              <div className="form-row">
                <label className="form-label">Priority</label>
                <select className="select" value={form.priority} onChange={e => setForm({...form, priority:e.target.value})}>
                  {["High","Medium","Low"].map(p => <option key={p}>{p}</option>)}
                </select>
              </div>
            </div>
            <div className="form-row">
              <label className="form-label">Target / Timeline</label>
              <input className="input" placeholder="e.g. End of rotation program, Age 30" value={form.target} onChange={e => setForm({...form, target:e.target.value})} />
            </div>
            <div className="form-row">
              <label className="form-label">Areas of Focus <span style={{color:MUTED, fontWeight:400}}>(things to work on as you pursue this goal)</span></label>
              {form.focusAreas.map((f, i) => (
                <div className="flex gap-8" style={{marginBottom:8}} key={i}>
                  <input className="input" placeholder={`Focus area ${i+1}`} value={f} onChange={e => updateFocus(i, e.target.value)} />
                  {form.focusAreas.length > 1 && <button className="delete-btn" onClick={() => removeFocusRow(i)}>✕</button>}
                </div>
              ))}
              <button className="btn btn-ghost btn-sm" onClick={addFocusRow} style={{marginTop:4}}>+ Add focus area</button>
            </div>
            <div className="flex gap-8" style={{marginTop:24, justifyContent:'flex-end'}}>
              <button className="btn btn-ghost" onClick={() => setModal(false)}>Cancel</button>
              <button className="btn btn-primary" onClick={saveGoal}>Save Goal</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ── Reminders ─────────────────────────────────────────────────────────────────
function Reminders({ reminders, setReminders }) {
  const [modal, setModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ title:'', date:'', category:'Career', notes:'', recur:'None' });
  const [customCats, setCustomCats] = useState([]);

  const openNew = () => { setEditing(null); setForm({ title:'', date:'', category:'Career', notes:'', recur:'None' }); setModal(true); };
  const openEdit = (r) => { setEditing(r.id); setForm({title:r.title, date:r.date, category:r.category, notes:r.notes||'', recur:r.recur||'None'}); setModal(true); };

  const save = () => {
    if (!form.title.trim() || !form.date) return;
    if (!BASE_CATS.includes(form.category)) setCustomCats([...customCats, form.category]);
    if (editing) {
      setReminders(reminders.map(r => r.id === editing ? { ...r, ...form } : r));
    } else {
      setReminders([...reminders, { ...form, id: Date.now() }]);
    }
    setModal(false);
  };

  const sorted = [...reminders].map(r => ({
    ...r,
    _eff: r.recur && r.recur !== "None" ? nextRecurDate(r.date, r.recur) : r.date
  })).sort((a,b) => new Date(a._eff) - new Date(b._eff));

  return (
    <div>
      <div className="page-header">
        <div className="flex items-center justify-between">
          <div>
            <div className="page-title">Reminders</div>
            <div className="page-sub">Stay ahead. Never drop the ball.</div>
          </div>
          <button className="btn btn-primary" onClick={openNew}>+ New Reminder</button>
        </div>
      </div>

      {sorted.length === 0 && <div className="empty-state"><div className="icon">🔔</div><p>No reminders yet.</p></div>}

      {sorted.map(r => {
        const diff = getDiff(r._eff);
        const overdue = diff < 0;
        return (
          <div className="card" key={r.id}>
            <div className="flex items-start gap-12">
              <div className={`reminder-dot ${overdue ? 'dot-red' : diff <= 1 ? 'dot-gold' : diff <= 7 ? 'dot-gold' : 'dot-blue'}`} style={{marginTop:6}} />
              <div style={{flex:1}}>
                <div className="flex items-center justify-between">
                  <div style={{fontSize:15, fontWeight:500}}>{r.title}</div>
                  <div className="flex gap-8">
                    <button className="btn btn-ghost btn-sm" onClick={() => openEdit(r)}>Edit</button>
                    <button className="delete-btn" onClick={() => setReminders(reminders.filter(x => x.id !== r.id))}>✕</button>
                  </div>
                </div>
                <div className="flex gap-8 mt-8 items-center flex-wrap" style={{marginTop:8, flexWrap:'wrap'}}>
                  <span className="badge badge-muted">{r.category}</span>
                  {r.recur && r.recur !== "None" && <span className="recur-badge">{r.recur}</span>}
                  <span style={{fontFamily:"'DM Mono', monospace", fontSize:11, color: overdue ? '#E07070' : ACCENT}}>
                    {overdue ? `${Math.abs(diff)}d overdue` : diff === 0 ? 'Today' : diff === 1 ? 'Tomorrow' : `In ${diff} days`}
                  </span>
                  <span style={{fontFamily:"'DM Mono', monospace", fontSize:11, color:MUTED}}>
                    {new Date(r._eff).toLocaleDateString('en-US', {month:'short', day:'numeric', year:'numeric'})}
                  </span>
                </div>
                {r.notes && <div style={{fontSize:13, color:MUTED, marginTop:8}}>{r.notes}</div>}
              </div>
            </div>
          </div>
        );
      })}

      {modal && (
        <div className="modal-overlay" onClick={e => e.target === e.currentTarget && setModal(false)}>
          <div className="modal">
            <div className="modal-title">{editing ? 'Edit Reminder' : 'New Reminder'}</div>
            <div className="form-row">
              <label className="form-label">Title</label>
              <input className="input" placeholder="e.g. Coffee chat with Sarah" value={form.title} onChange={e => setForm({...form, title:e.target.value})} />
            </div>
            <div className="grid-2">
              <div className="form-row">
                <label className="form-label">Date</label>
                <input className="input" type="date" value={form.date} onChange={e => setForm({...form, date:e.target.value})} />
              </div>
              <div className="form-row">
                <label className="form-label">Recurring</label>
                <select className="select" value={form.recur} onChange={e => setForm({...form, recur:e.target.value})}>
                  {RECUR_OPTIONS.map(o => <option key={o}>{o}</option>)}
                </select>
              </div>
            </div>
            <div className="form-row">
              <label className="form-label">Category</label>
              <CategorySelect value={form.category} onChange={v => setForm({...form, category:v})} categories={customCats} />
            </div>
            <div className="form-row">
              <label className="form-label">Notes</label>
              <textarea className="textarea" rows={3} placeholder="Any context..." value={form.notes} onChange={e => setForm({...form, notes:e.target.value})} />
            </div>
            <div className="flex gap-8" style={{marginTop:24, justifyContent:'flex-end'}}>
              <button className="btn btn-ghost" onClick={() => setModal(false)}>Cancel</button>
              <button className="btn btn-primary" onClick={save}>Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ── Journal ───────────────────────────────────────────────────────────────────
function Journal({ journals, setJournals }) {
  const [subTab, setSubTab] = useState('write');
  const [text, setText] = useState('');
  const [tag, setTag] = useState('Reflection');
  const [sortBy, setSortBy] = useState('date');
  const [filterTag, setFilterTag] = useState('All');

  // Pre-populate audit template
  useEffect(() => {
    if (tag === 'Personal Audit') {
      setText(AUDIT_PROMPTS.map(p => `${p.q}\n\n`).join('\n'));
    } else {
      setText('');
    }
  }, [tag]);

  const save = () => {
    if (!text.trim()) return;
    setJournals([{ id: Date.now(), date: new Date().toISOString(), text: text.trim(), tag }, ...journals]);
    setText(''); setTag('Reflection');
  };

  const filtered = [...journals]
    .filter(j => filterTag === 'All' || j.tag === filterTag)
    .sort((a, b) => sortBy === 'date'
      ? new Date(b.date) - new Date(a.date)
      : a.tag.localeCompare(b.tag)
    );

  return (
    <div>
      <div className="page-header">
        <div className="flex items-center justify-between">
          <div>
            <div className="page-title">Journal</div>
            <div className="page-sub">Document your thinking. Track your journey.</div>
          </div>
          <div className="flex gap-8">
            <button className={`sort-btn ${subTab==='write'?'active':''}`} onClick={() => setSubTab('write')}>New Entry</button>
            <button className={`sort-btn ${subTab==='past'?'active':''}`} onClick={() => setSubTab('past')}>Past Entries</button>
          </div>
        </div>
      </div>

      {subTab === 'write' && (
        <>
          {/* Tag selector */}
          <div className="flex gap-8 mb-16" style={{marginBottom:16, flexWrap:'wrap'}}>
            {JOURNAL_TAGS.map(t => (
              <button key={t} onClick={() => setTag(t)} className="sort-btn" style={{
                background: tag===t ? 'rgba(200,169,110,0.12)' : 'transparent',
                color: tag===t ? ACCENT : MUTED,
                borderColor: tag===t ? 'rgba(200,169,110,0.3)' : BORDER,
              }}>{t}</button>
            ))}
          </div>

          {tag === 'Personal Audit' && (
            <div className="audit-prompt">
              {AUDIT_PROMPTS.map((p, i) => (
                <div key={i} style={{marginBottom: i < AUDIT_PROMPTS.length-1 ? 12 : 0}}>
                  <strong>{p.label}</strong>{p.q}
                </div>
              ))}
              <div style={{marginTop:12, fontSize:12, color:MUTED}}>These prompts are pre-filled in your entry below — answer each one.</div>
            </div>
          )}

          <div className="card">
            <div className="form-row">
              <label className="form-label">{tag === 'Personal Audit' ? 'Your Audit Responses' : 'Entry'}</label>
              <textarea
                className="textarea"
                rows={tag === 'Personal Audit' ? 12 : 7}
                placeholder={tag === 'Personal Audit' ? '' : "What's on your mind today?"}
                value={text}
                onChange={e => setText(e.target.value)}
              />
            </div>
            <div className="flex justify-between items-center">
              <span style={{fontFamily:"'DM Mono', monospace", fontSize:11, color:MUTED}}>{new Date().toLocaleDateString('en-US', {weekday:'long', month:'long', day:'numeric'})}</span>
              <button className="btn btn-primary" onClick={save}>Save Entry</button>
            </div>
          </div>
        </>
      )}

      {subTab === 'past' && (
        <>
          <div className="flex gap-8 mb-16 items-center" style={{marginBottom:20, flexWrap:'wrap'}}>
            <span style={{fontSize:12, color:MUTED, fontFamily:"'DM Mono', monospace"}}>Sort:</span>
            <button className={`sort-btn ${sortBy==='date'?'active':''}`} onClick={() => setSortBy('date')}>Date</button>
            <button className={`sort-btn ${sortBy==='category'?'active':''}`} onClick={() => setSortBy('category')}>Category</button>
            <span style={{fontSize:12, color:MUTED, fontFamily:"'DM Mono', monospace", marginLeft:8}}>Filter:</span>
            {['All', ...JOURNAL_TAGS].map(t => (
              <button key={t} className={`sort-btn ${filterTag===t?'active':''}`} onClick={() => setFilterTag(t)}>{t}</button>
            ))}
          </div>

          {filtered.length === 0 && <div className="empty-state"><div className="icon">📓</div><p>No entries yet.</p></div>}

          {filtered.map(j => (
            <div className="journal-entry" key={j.id}>
              <div className="flex items-center justify-between">
                <div className="journal-date">{new Date(j.date).toLocaleDateString('en-US', {weekday:'long', month:'long', day:'numeric', year:'numeric'})}</div>
                <button className="delete-btn" onClick={() => setJournals(journals.filter(x => x.id !== j.id))}>✕</button>
              </div>
              <div className="journal-text">{j.text}</div>
              <span className="journal-tag">{j.tag}</span>
            </div>
          ))}
        </>
      )}
    </div>
  );
}

// ── App Shell ─────────────────────────────────────────────────────────────────
const NAV = [
  { id:'dashboard', label:'Dashboard', icon:'⌂' },
  { id:'goals',     label:'Goals',     icon:'◎' },
  { id:'reminders', label:'Reminders', icon:'◷' },
  { id:'journal',   label:'Journal',   icon:'◈' },
];

export default function App() {
  const [page, setPage] = useState('dashboard');
  const [goals,     setGoals]     = useLocalStorage('hk-goals-v1',     []);
  const [reminders, setReminders] = useLocalStorage('hk-reminders-v1', []);
  const [journals,  setJournals]  = useLocalStorage('hk-journals-v1',  []);

  return (
    <>
      <style>{style}</style>
      <div className="app">
        <div className="sidebar">
          <div className="logo">
            <div className="logo-name">Hannah Kim</div>
            <div className="logo-sub">Development Tracker</div>
          </div>

          {NAV.map(n => (
            <div key={n.id} className={`nav-item ${page===n.id?'active':''}`} onClick={() => setPage(n.id)}>
              <span className="nav-icon">{n.icon}</span>{n.label}
            </div>
          ))}

          <div style={{marginTop:'auto', padding:'20px 24px', borderTop:`1px solid ${BORDER}`}}>
            <div style={{fontFamily:"'DM Mono', monospace", fontSize:10, color:MUTED, lineHeight:2}}>
              {/* Edit the text below to update your North Star */}
              <div style={{color:ACCENT, marginBottom:4, letterSpacing:'0.08em'}}>NORTH STAR</div>
              Grow in your work.<br/>Build wealth.<br/>Stay accountable.
            </div>
          </div>
        </div>

        <div className="main">
          {page==='dashboard' && <Dashboard goals={goals} journals={journals} reminders={reminders} setReminders={setReminders} />}
          {page==='goals'     && <Goals     goals={goals} setGoals={setGoals} />}
          {page==='reminders' && <Reminders reminders={reminders} setReminders={setReminders} />}
          {page==='journal'   && <Journal   journals={journals} setJournals={setJournals} />}
        </div>
      </div>
    </>
  );
}
