import { useState, useEffect, useRef } from "react";

const ACCENT = "#C8A96E";
const ACCENT2 = "#7EB8A4";
const BG = "#0F1117";
const SURFACE = "#161B27";
const SURFACE2 = "#1E2535";
const BORDER = "#2A3347";
const TEXT = "#E8EAF0";
const MUTED = "#6B7A99";

const style = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400&family=DM+Mono:wght@400;500&family=DM+Sans:wght@300;400;500&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }

  body {
    background: ${BG};
    color: ${TEXT};
    font-family: 'DM Sans', sans-serif;
    min-height: 100vh;
  }

  ::-webkit-scrollbar { width: 4px; }
  ::-webkit-scrollbar-track { background: ${SURFACE}; }
  ::-webkit-scrollbar-thumb { background: ${BORDER}; border-radius: 2px; }

  .app {
    display: grid;
    grid-template-columns: 220px 1fr;
    min-height: 100vh;
  }

  .sidebar {
    background: ${SURFACE};
    border-right: 1px solid ${BORDER};
    padding: 32px 0;
    position: sticky;
    top: 0;
    height: 100vh;
    display: flex;
    flex-direction: column;
  }

  .logo {
    padding: 0 24px 32px;
    border-bottom: 1px solid ${BORDER};
    margin-bottom: 24px;
  }

  .logo h1 {
    font-family: 'Cormorant Garamond', serif;
    font-size: 22px;
    font-weight: 600;
    color: ${ACCENT};
    line-height: 1.2;
  }

  .logo p {
    font-size: 11px;
    color: ${MUTED};
    letter-spacing: 0.08em;
    text-transform: uppercase;
    margin-top: 4px;
    font-family: 'DM Mono', monospace;
  }

  .nav-item {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 12px 24px;
    cursor: pointer;
    transition: all 0.15s;
    font-size: 13.5px;
    font-weight: 400;
    color: ${MUTED};
    border-left: 2px solid transparent;
    letter-spacing: 0.01em;
  }

  .nav-item:hover { color: ${TEXT}; background: ${SURFACE2}; }
  .nav-item.active { color: ${ACCENT}; border-left-color: ${ACCENT}; background: rgba(200,169,110,0.06); }
  .nav-icon { font-size: 16px; width: 20px; text-align: center; }

  .main { padding: 40px 48px; overflow-y: auto; }

  .page-header {
    margin-bottom: 36px;
    padding-bottom: 24px;
    border-bottom: 1px solid ${BORDER};
  }

  .page-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: 36px;
    font-weight: 600;
    color: ${TEXT};
    line-height: 1;
  }

  .page-sub {
    font-size: 13px;
    color: ${MUTED};
    margin-top: 8px;
    font-weight: 300;
  }

  .card {
    background: ${SURFACE};
    border: 1px solid ${BORDER};
    border-radius: 12px;
    padding: 24px;
    margin-bottom: 16px;
    transition: border-color 0.2s;
  }

  .card:hover { border-color: #3A4560; }

  .card-header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    margin-bottom: 16px;
  }

  .card-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: 20px;
    font-weight: 600;
  }

  .badge {
    font-family: 'DM Mono', monospace;
    font-size: 11px;
    padding: 3px 10px;
    border-radius: 20px;
    letter-spacing: 0.04em;
  }

  .badge-gold { background: rgba(200,169,110,0.15); color: ${ACCENT}; border: 1px solid rgba(200,169,110,0.3); }
  .badge-teal { background: rgba(126,184,164,0.15); color: ${ACCENT2}; border: 1px solid rgba(126,184,164,0.3); }
  .badge-muted { background: ${SURFACE2}; color: ${MUTED}; border: 1px solid ${BORDER}; }

  .progress-bar {
    height: 4px;
    background: ${SURFACE2};
    border-radius: 2px;
    margin: 12px 0;
    overflow: hidden;
  }

  .progress-fill {
    height: 100%;
    border-radius: 2px;
    background: linear-gradient(90deg, ${ACCENT}, ${ACCENT2});
    transition: width 0.4s ease;
  }

  .progress-label {
    font-family: 'DM Mono', monospace;
    font-size: 11px;
    color: ${MUTED};
  }

  .checklist-item {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 10px 0;
    border-bottom: 1px solid ${BORDER};
    font-size: 13.5px;
  }

  .checklist-item:last-child { border-bottom: none; }

  .check {
    width: 18px;
    height: 18px;
    border: 1.5px solid ${BORDER};
    border-radius: 4px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    transition: all 0.15s;
    background: transparent;
  }

  .check.done { background: ${ACCENT}; border-color: ${ACCENT}; }
  .check.done::after { content: '✓'; font-size: 11px; color: ${BG}; font-weight: 700; }

  .item-text { flex: 1; transition: color 0.15s; }
  .item-text.done { color: ${MUTED}; text-decoration: line-through; }

  .btn {
    padding: 9px 18px;
    border-radius: 8px;
    font-size: 13px;
    font-family: 'DM Sans', sans-serif;
    cursor: pointer;
    transition: all 0.15s;
    border: none;
    font-weight: 500;
  }

  .btn-primary { background: ${ACCENT}; color: ${BG}; }
  .btn-primary:hover { background: #D4B47A; }
  .btn-ghost { background: transparent; color: ${MUTED}; border: 1px solid ${BORDER}; }
  .btn-ghost:hover { color: ${TEXT}; border-color: #3A4560; }
  .btn-sm { padding: 6px 12px; font-size: 12px; }

  .input, .textarea, .select {
    width: 100%;
    background: ${SURFACE2};
    border: 1px solid ${BORDER};
    border-radius: 8px;
    padding: 10px 14px;
    color: ${TEXT};
    font-family: 'DM Sans', sans-serif;
    font-size: 13.5px;
    transition: border-color 0.15s;
    outline: none;
    resize: vertical;
  }

  .input:focus, .textarea:focus, .select:focus { border-color: ${ACCENT}; }
  .select option { background: ${SURFACE2}; }
  .input::placeholder, .textarea::placeholder { color: ${MUTED}; }

  .form-row { margin-bottom: 14px; }
  .form-label {
    display: block;
    font-size: 11px;
    color: ${MUTED};
    letter-spacing: 0.08em;
    text-transform: uppercase;
    font-family: 'DM Mono', monospace;
    margin-bottom: 6px;
  }

  .grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
  .grid-3 { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 16px; }

  .stat-card {
    background: ${SURFACE};
    border: 1px solid ${BORDER};
    border-radius: 12px;
    padding: 20px 24px;
  }

  .stat-num {
    font-family: 'Cormorant Garamond', serif;
    font-size: 40px;
    font-weight: 600;
    color: ${ACCENT};
    line-height: 1;
  }

  .stat-label { font-size: 12px; color: ${MUTED}; margin-top: 6px; letter-spacing: 0.04em; }

  .journal-entry {
    background: ${SURFACE};
    border: 1px solid ${BORDER};
    border-radius: 12px;
    padding: 20px 24px;
    margin-bottom: 12px;
  }

  .journal-date {
    font-family: 'DM Mono', monospace;
    font-size: 11px;
    color: ${ACCENT};
    margin-bottom: 8px;
  }

  .journal-text {
    font-size: 14px;
    line-height: 1.7;
    color: #B0B8CC;
    white-space: pre-wrap;
  }

  .journal-tag {
    display: inline-block;
    font-size: 11px;
    font-family: 'DM Mono', monospace;
    color: ${ACCENT2};
    background: rgba(126,184,164,0.1);
    border: 1px solid rgba(126,184,164,0.2);
    padding: 2px 8px;
    border-radius: 20px;
    margin-right: 6px;
    margin-top: 10px;
  }

  .reminder-item {
    display: flex;
    align-items: center;
    gap: 16px;
    padding: 14px 0;
    border-bottom: 1px solid ${BORDER};
  }

  .reminder-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    flex-shrink: 0;
  }

  .dot-gold { background: ${ACCENT}; box-shadow: 0 0 8px rgba(200,169,110,0.5); }
  .dot-teal { background: ${ACCENT2}; box-shadow: 0 0 8px rgba(126,184,164,0.5); }
  .dot-red { background: #E07070; box-shadow: 0 0 8px rgba(224,112,112,0.5); }

  .modal-overlay {
    position: fixed;
    inset: 0;
    background: rgba(0,0,0,0.7);
    backdrop-filter: blur(4px);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 100;
    padding: 24px;
  }

  .modal {
    background: ${SURFACE};
    border: 1px solid ${BORDER};
    border-radius: 16px;
    padding: 32px;
    width: 100%;
    max-width: 560px;
    max-height: 85vh;
    overflow-y: auto;
  }

  .modal-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: 26px;
    font-weight: 600;
    margin-bottom: 24px;
  }

  .divider { height: 1px; background: ${BORDER}; margin: 24px 0; }

  .empty-state {
    text-align: center;
    padding: 48px 24px;
    color: ${MUTED};
  }

  .empty-state .icon { font-size: 32px; margin-bottom: 12px; }
  .empty-state p { font-size: 13px; line-height: 1.6; }

  .section-title {
    font-family: 'DM Mono', monospace;
    font-size: 11px;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: ${MUTED};
    margin-bottom: 16px;
  }

  .flex { display: flex; }
  .gap-8 { gap: 8px; }
  .gap-12 { gap: 12px; }
  .items-center { align-items: center; }
  .justify-between { justify-content: space-between; }
  .mt-16 { margin-top: 16px; }
  .mt-8 { margin-top: 8px; }
  .mb-24 { margin-bottom: 24px; }

  .delete-btn {
    background: transparent;
    border: none;
    color: ${MUTED};
    cursor: pointer;
    font-size: 14px;
    padding: 4px;
    transition: color 0.15s;
  }
  .delete-btn:hover { color: #E07070; }
`;

// ── localStorage persistence ──────────────────────────────────────────────────
// Data is saved to your browser's localStorage so it persists between visits.
// To change a default value, edit the second argument of useState below.
function useLocalStorage(key, initial) {
  const [val, setVal] = useState(() => {
    try {
      const stored = localStorage.getItem(key);
      return stored ? JSON.parse(stored) : initial;
    } catch {
      return initial;
    }
  });

  const save = (newVal) => {
    setVal(newVal);
    try { localStorage.setItem(key, JSON.stringify(newVal)); } catch {}
  };

  return [val, save];
}

// ── Default goals — edit these to change what loads on first visit ─────────────
const INITIAL_GOALS = [
  {
    id: 1, title: "Develop PM Skills", category: "Career",
    description: "Run all projects like a PM — charters, timelines, stakeholder updates.",
    target: "End of Rotation 1", priority: "High",
    tasks: [
      { id: 1, text: "Create a project charter for current project", done: false },
      { id: 2, text: "Send weekly stakeholder update email", done: false },
      { id: 3, text: "Build a Gantt timeline for active project", done: false },
      { id: 4, text: "Document decisions after every meeting", done: false },
    ]
  },
  {
    id: 2, title: "Build Internal Network", category: "Relationships",
    description: "1 coffee chat per week, every week of the rotation.",
    target: "6 months", priority: "High",
    tasks: [
      { id: 1, text: "Schedule first coffee chat with cross-functional peer", done: false },
      { id: 2, text: "Reach out to program alumni", done: false },
      { id: 3, text: "Identify a senior leader to invest in relationship", done: false },
      { id: 4, text: "Attend one site event outside my team", done: false },
    ]
  },
  {
    id: 3, title: "Save $15k Down Payment", category: "Financial",
    description: "Hit $15,000 saved for a property down payment by age 27.",
    target: "Age 27", priority: "Medium",
    tasks: [
      { id: 1, text: "Set monthly savings target", done: false },
      { id: 2, text: "Open dedicated HYSA for down payment", done: false },
      { id: 3, text: "Automate monthly transfer", done: false },
    ]
  }
];

const CATEGORIES = ["Career", "Financial", "Relationships", "Health", "Learning", "Personal"];
const PRIORITIES = ["High", "Medium", "Low"];
const JOURNAL_TAGS = ["Reflection", "Win", "Challenge", "Insight", "Goal Update"];

// ── Dashboard ─────────────────────────────────────────────────────────────────
function Dashboard({ goals, journals, reminders }) {
  const totalTasks = goals.reduce((a, g) => a + g.tasks.length, 0);
  const doneTasks = goals.reduce((a, g) => a + g.tasks.filter(t => t.done).length, 0);
  const dueReminders = reminders.filter(r => {
    const diff = (new Date(r.date) - new Date()) / (1000 * 60 * 60 * 24);
    return diff >= 0 && diff <= 7;
  });

  return (
    <div>
      <div className="page-header">
        <div className="page-title">Good to see you.</div>
        <div className="page-sub">Track your progress. Stay accountable. Build the life you want.</div>
      </div>

      <div className="grid-3 mb-24">
        <div className="stat-card">
          <div className="stat-num">{goals.length}</div>
          <div className="stat-label">Active Goals</div>
        </div>
        <div className="stat-card">
          <div className="stat-num">{totalTasks > 0 ? Math.round((doneTasks / totalTasks) * 100) : 0}%</div>
          <div className="stat-label">Tasks Complete</div>
        </div>
        <div className="stat-card">
          <div className="stat-num">{dueReminders.length}</div>
          <div className="stat-label">Due This Week</div>
        </div>
      </div>

      <div className="grid-2">
        <div>
          <div className="section-title">Goal Progress</div>
          {goals.length === 0 && <div className="empty-state"><div className="icon">🎯</div><p>No goals yet.</p></div>}
          {goals.slice(0, 4).map(g => {
            const pct = g.tasks.length ? Math.round((g.tasks.filter(t => t.done).length / g.tasks.length) * 100) : 0;
            return (
              <div className="card" key={g.id} style={{ padding: "16px 20px" }}>
                <div className="flex items-center justify-between" style={{ marginBottom: 8 }}>
                  <span style={{ fontSize: 14, fontWeight: 500 }}>{g.title}</span>
                  <span className={`badge badge-${g.priority === 'High' ? 'gold' : g.priority === 'Medium' ? 'teal' : 'muted'}`}>{g.priority}</span>
                </div>
                <div className="progress-bar"><div className="progress-fill" style={{ width: `${pct}%` }} /></div>
                <div className="progress-label">{pct}% — {g.tasks.filter(t => t.done).length}/{g.tasks.length} tasks</div>
              </div>
            );
          })}
        </div>

        <div>
          <div className="section-title">Upcoming Reminders</div>
          {dueReminders.length === 0 && <div className="empty-state"><div className="icon">🔔</div><p>No reminders due this week.</p></div>}
          {dueReminders.map(r => {
            const diff = Math.ceil((new Date(r.date) - new Date()) / (1000 * 60 * 60 * 24));
            return (
              <div className="reminder-item" key={r.id}>
                <div className={`reminder-dot ${diff <= 1 ? 'dot-red' : diff <= 3 ? 'dot-gold' : 'dot-teal'}`} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13.5, fontWeight: 500 }}>{r.title}</div>
                  <div style={{ fontSize: 11, color: MUTED, fontFamily: 'DM Mono, monospace', marginTop: 3 }}>
                    {diff === 0 ? 'Today' : diff === 1 ? 'Tomorrow' : `In ${diff} days`}
                  </div>
                </div>
              </div>
            );
          })}

          <div className="divider" />
          <div className="section-title">Recent Journal</div>
          {journals.length === 0 && <div className="empty-state"><div className="icon">📓</div><p>No journal entries yet.</p></div>}
          {journals.slice(0, 2).map(j => (
            <div className="journal-entry" key={j.id} style={{ padding: "16px 20px" }}>
              <div className="journal-date">{new Date(j.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</div>
              <div className="journal-text" style={{ fontSize: 13, WebkitLineClamp: 3, overflow: 'hidden', display: '-webkit-box', WebkitBoxOrient: 'vertical' }}>{j.text}</div>
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
  const [form, setForm] = useState({ title: '', description: '', category: 'Career', priority: 'High', target: '', tasks: [] });
  const [newTask, setNewTask] = useState('');

  const toggleTask = (gid, tid) => {
    setGoals(goals.map(g => g.id === gid
      ? { ...g, tasks: g.tasks.map(t => t.id === tid ? { ...t, done: !t.done } : t) }
      : g
    ));
  };

  const addTask = (gid) => {
    if (!newTask.trim()) return;
    setGoals(goals.map(g => g.id === gid
      ? { ...g, tasks: [...g.tasks, { id: Date.now(), text: newTask.trim(), done: false }] }
      : g
    ));
    setNewTask('');
  };

  const deleteTask = (gid, tid) => {
    setGoals(goals.map(g => g.id === gid
      ? { ...g, tasks: g.tasks.filter(t => t.id !== tid) }
      : g
    ));
  };

  const saveGoal = () => {
    if (!form.title.trim()) return;
    setGoals([...goals, { ...form, id: Date.now() }]);
    setForm({ title: '', description: '', category: 'Career', priority: 'High', target: '', tasks: [] });
    setModal(false);
  };

  return (
    <div>
      <div className="page-header">
        <div className="flex items-center justify-between">
          <div>
            <div className="page-title">Goals</div>
            <div className="page-sub">Set intentions. Track progress. Ship results.</div>
          </div>
          <button className="btn btn-primary" onClick={() => setModal(true)}>+ New Goal</button>
        </div>
      </div>

      {goals.length === 0 && <div className="empty-state"><div className="icon">🎯</div><p>No goals yet. Add your first one.</p></div>}

      {goals.map(g => {
        const pct = g.tasks.length ? Math.round((g.tasks.filter(t => t.done).length / g.tasks.length) * 100) : 0;
        const open = expanded === g.id;
        return (
          <div className="card" key={g.id}>
            <div className="card-header">
              <div style={{ flex: 1 }}>
                <div className="flex items-center gap-12" style={{ marginBottom: 8 }}>
                  <div className="card-title">{g.title}</div>
                  <span className={`badge badge-${g.priority === 'High' ? 'gold' : g.priority === 'Medium' ? 'teal' : 'muted'}`}>{g.priority}</span>
                  <span className="badge badge-muted">{g.category}</span>
                </div>
                {g.description && <div style={{ fontSize: 13, color: MUTED, marginBottom: 8 }}>{g.description}</div>}
                {g.target && <div style={{ fontFamily: 'DM Mono, monospace', fontSize: 11, color: ACCENT }}>Target: {g.target}</div>}
              </div>
              <div className="flex gap-8">
                <button className="btn btn-ghost btn-sm" onClick={() => setExpanded(open ? null : g.id)}>
                  {open ? 'Collapse' : 'View Tasks'}
                </button>
                <button className="delete-btn" onClick={() => setGoals(goals.filter(x => x.id !== g.id))}>✕</button>
              </div>
            </div>

            <div className="progress-bar"><div className="progress-fill" style={{ width: `${pct}%` }} /></div>
            <div className="progress-label">{pct}% complete — {g.tasks.filter(t => t.done).length}/{g.tasks.length} tasks</div>

            {open && (
              <div style={{ marginTop: 20 }}>
                <div className="divider" style={{ marginTop: 0 }} />
                {g.tasks.map(t => (
                  <div className="checklist-item" key={t.id}>
                    <div className={`check ${t.done ? 'done' : ''}`} onClick={() => toggleTask(g.id, t.id)} />
                    <span className={`item-text ${t.done ? 'done' : ''}`}>{t.text}</span>
                    <button className="delete-btn" style={{ fontSize: 12 }} onClick={() => deleteTask(g.id, t.id)}>✕</button>
                  </div>
                ))}
                <div className="flex gap-8 mt-16">
                  <input
                    className="input"
                    placeholder="Add a task..."
                    value={newTask}
                    onChange={e => setNewTask(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && addTask(g.id)}
                    style={{ flex: 1 }}
                  />
                  <button className="btn btn-primary btn-sm" onClick={() => addTask(g.id)}>Add</button>
                </div>
              </div>
            )}
          </div>
        );
      })}

      {modal && (
        <div className="modal-overlay" onClick={e => e.target === e.currentTarget && setModal(false)}>
          <div className="modal">
            <div className="modal-title">New Goal</div>
            <div className="form-row">
              <label className="form-label">Goal Title</label>
              <input className="input" placeholder="e.g. Develop PM Skills" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} />
            </div>
            <div className="form-row">
              <label className="form-label">Description</label>
              <textarea className="textarea" rows={3} placeholder="What does success look like?" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} />
            </div>
            <div className="grid-2">
              <div className="form-row">
                <label className="form-label">Category</label>
                <select className="select" value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}>
                  {CATEGORIES.map(c => <option key={c}>{c}</option>)}
                </select>
              </div>
              <div className="form-row">
                <label className="form-label">Priority</label>
                <select className="select" value={form.priority} onChange={e => setForm({ ...form, priority: e.target.value })}>
                  {PRIORITIES.map(p => <option key={p}>{p}</option>)}
                </select>
              </div>
            </div>
            <div className="form-row">
              <label className="form-label">Target / Deadline</label>
              <input className="input" placeholder="e.g. End of Rotation 1, Age 27" value={form.target} onChange={e => setForm({ ...form, target: e.target.value })} />
            </div>
            <div className="flex gap-8" style={{ marginTop: 24, justifyContent: 'flex-end' }}>
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
  const [form, setForm] = useState({ title: '', date: '', category: 'Career', notes: '' });

  const save = () => {
    if (!form.title.trim() || !form.date) return;
    setReminders([...reminders, { ...form, id: Date.now() }]);
    setForm({ title: '', date: '', category: 'Career', notes: '' });
    setModal(false);
  };

  const sorted = [...reminders].sort((a, b) => new Date(a.date) - new Date(b.date));

  const getDiffLabel = (dateStr) => {
    const d = new Date(dateStr); d.setHours(0, 0, 0, 0);
    const today = new Date(); today.setHours(0, 0, 0, 0);
    const diff = Math.round((d - today) / (1000 * 60 * 60 * 24));
    if (diff < 0) return { label: `${Math.abs(diff)}d overdue`, dot: 'dot-red' };
    if (diff === 0) return { label: 'Today', dot: 'dot-red' };
    if (diff === 1) return { label: 'Tomorrow', dot: 'dot-gold' };
    if (diff <= 7) return { label: `In ${diff} days`, dot: 'dot-gold' };
    return { label: `In ${diff} days`, dot: 'dot-teal' };
  };

  return (
    <div>
      <div className="page-header">
        <div className="flex items-center justify-between">
          <div>
            <div className="page-title">Reminders</div>
            <div className="page-sub">Stay ahead. Never drop the ball.</div>
          </div>
          <button className="btn btn-primary" onClick={() => setModal(true)}>+ New Reminder</button>
        </div>
      </div>

      {sorted.length === 0 && <div className="empty-state"><div className="icon">🔔</div><p>No reminders yet.</p></div>}

      {sorted.map(r => {
        const { label, dot } = getDiffLabel(r.date);
        return (
          <div className="card" key={r.id}>
            <div className="flex items-center gap-12">
              <div className={`reminder-dot ${dot}`} style={{ width: 10, height: 10 }} />
              <div style={{ flex: 1 }}>
                <div className="flex items-center justify-between">
                  <div style={{ fontSize: 15, fontWeight: 500 }}>{r.title}</div>
                  <button className="delete-btn" onClick={() => setReminders(reminders.filter(x => x.id !== r.id))}>✕</button>
                </div>
                <div className="flex gap-8 mt-8 items-center">
                  <span className="badge badge-muted">{r.category}</span>
                  <span style={{ fontFamily: 'DM Mono, monospace', fontSize: 11, color: ACCENT }}>{label}</span>
                  <span style={{ fontFamily: 'DM Mono, monospace', fontSize: 11, color: MUTED }}>
                    {new Date(r.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </span>
                </div>
                {r.notes && <div style={{ fontSize: 13, color: MUTED, marginTop: 8 }}>{r.notes}</div>}
              </div>
            </div>
          </div>
        );
      })}

      {modal && (
        <div className="modal-overlay" onClick={e => e.target === e.currentTarget && setModal(false)}>
          <div className="modal">
            <div className="modal-title">New Reminder</div>
            <div className="form-row">
              <label className="form-label">Title</label>
              <input className="input" placeholder="e.g. Coffee chat with Sarah" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} />
            </div>
            <div className="grid-2">
              <div className="form-row">
                <label className="form-label">Date</label>
                <input className="input" type="date" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} />
              </div>
              <div className="form-row">
                <label className="form-label">Category</label>
                <select className="select" value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}>
                  {CATEGORIES.map(c => <option key={c}>{c}</option>)}
                </select>
              </div>
            </div>
            <div className="form-row">
              <label className="form-label">Notes</label>
              <textarea className="textarea" rows={3} placeholder="Any context..." value={form.notes} onChange={e => setForm({ ...form, notes: e.target.value })} />
            </div>
            <div className="flex gap-8" style={{ marginTop: 24, justifyContent: 'flex-end' }}>
              <button className="btn btn-ghost" onClick={() => setModal(false)}>Cancel</button>
              <button className="btn btn-primary" onClick={save}>Save Reminder</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ── Journal ───────────────────────────────────────────────────────────────────
function Journal({ journals, setJournals }) {
  const [text, setText] = useState('');
  const [tag, setTag] = useState('Reflection');

  const save = () => {
    if (!text.trim()) return;
    setJournals([{ id: Date.now(), date: new Date().toISOString(), text: text.trim(), tag }, ...journals]);
    setText('');
  };

  return (
    <div>
      <div className="page-header">
        <div className="page-title">Journal</div>
        <div className="page-sub">Document your thinking. Track your journey.</div>
      </div>

      <div className="card">
        <div className="form-row">
          <label className="form-label">New Entry</label>
          <textarea
            className="textarea"
            rows={5}
            placeholder="What are you thinking about today? A win, a challenge, an insight..."
            value={text}
            onChange={e => setText(e.target.value)}
          />
        </div>
        <div className="flex items-center justify-between">
          <div className="flex gap-8">
            {JOURNAL_TAGS.map(t => (
              <button
                key={t}
                onClick={() => setTag(t)}
                style={{
                  padding: '4px 12px', borderRadius: 20, fontSize: 12, cursor: 'pointer',
                  fontFamily: 'DM Mono, monospace', border: '1px solid',
                  background: tag === t ? 'rgba(126,184,164,0.15)' : 'transparent',
                  color: tag === t ? ACCENT2 : MUTED,
                  borderColor: tag === t ? 'rgba(126,184,164,0.3)' : BORDER,
                  transition: 'all 0.15s'
                }}
              >{t}</button>
            ))}
          </div>
          <button className="btn btn-primary" onClick={save}>Save Entry</button>
        </div>
      </div>

      <div className="divider" />

      {journals.length === 0 && <div className="empty-state"><div className="icon">📓</div><p>No entries yet.<br />Write your first reflection.</p></div>}

      {journals.map(j => (
        <div className="journal-entry" key={j.id}>
          <div className="flex items-center justify-between">
            <div className="journal-date">
              {new Date(j.date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
            </div>
            <button className="delete-btn" onClick={() => setJournals(journals.filter(x => x.id !== j.id))}>✕</button>
          </div>
          <div className="journal-text">{j.text}</div>
          <span className="journal-tag">{j.tag}</span>
        </div>
      ))}
    </div>
  );
}

// ── App Shell ─────────────────────────────────────────────────────────────────
const PAGES = [
  { id: 'dashboard', label: 'Dashboard', icon: '⌂' },
  { id: 'goals', label: 'Goals', icon: '◎' },
  { id: 'reminders', label: 'Reminders', icon: '◷' },
  { id: 'journal', label: 'Journal', icon: '◈' },
];

export default function App() {
  const [page, setPage] = useState('dashboard');
  const [goals, setGoals] = useLocalStorage('meridian-goals-v1', INITIAL_GOALS);
  const [reminders, setReminders] = useLocalStorage('meridian-reminders-v1', []);
  const [journals, setJournals] = useLocalStorage('meridian-journals-v1', []);

  return (
    <>
      <style>{style}</style>
      <div className="app">
        <div className="sidebar">
          <div className="logo">
            <h1>Meridian</h1>
            <p>Personal Dev Tracker</p>
          </div>
          {PAGES.map(p => (
            <div key={p.id} className={`nav-item ${page === p.id ? 'active' : ''}`} onClick={() => setPage(p.id)}>
              <span className="nav-icon">{p.icon}</span>
              {p.label}
            </div>
          ))}
          <div style={{ marginTop: 'auto', padding: '24px', borderTop: `1px solid ${BORDER}` }}>
            <div style={{ fontFamily: 'DM Mono, monospace', fontSize: 10, color: MUTED, lineHeight: 1.8 }}>
              {/* ── NORTH STAR — edit the text below to change your mission statement ── */}
              <div style={{ color: ACCENT, marginBottom: 4 }}>NORTH STAR</div>
              Retire by 50.<br />Build wealth.<br />Do meaningful work.
            </div>
          </div>
        </div>
        <div className="main">
          {page === 'dashboard' && <Dashboard goals={goals} journals={journals} reminders={reminders} />}
          {page === 'goals' && <Goals goals={goals} setGoals={setGoals} />}
          {page === 'reminders' && <Reminders reminders={reminders} setReminders={setReminders} />}
          {page === 'journal' && <Journal journals={journals} setJournals={setJournals} />}
        </div>
      </div>
    </>
  );
}
