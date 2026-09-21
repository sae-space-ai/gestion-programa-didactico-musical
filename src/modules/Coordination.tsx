// =====================================================
// MÓDULO COORDINACIÓN
// Reuniones, acuerdos, actividades complementarias
// =====================================================

import { useState } from 'react';
import { AppState, Meeting } from '../types';
import { Users2, Plus, X, Calendar } from 'lucide-react';
import { generateId, getTodayString, formatDate } from '../utils/helpers';

interface Props { state: AppState; updateState: (u: Partial<AppState>) => void; showToast: (m: string, t?: string) => void; }

export default function Coordination({ state, updateState, showToast }: Props) {
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState<Partial<Meeting>>({ type: 'Departamento', attendees: [], agenda: '', agreements: [], observations: '' });
  const [newAgreement, setNewAgreement] = useState('');

  const handleSave = () => {
    if (!form.date) { showToast('La fecha es obligatoria', 'error'); return; }
    const meeting: Meeting = {
      id: generateId(),
      date: form.date || getTodayString(),
      type: form.type || 'Departamento',
      attendees: form.attendees || [],
      agenda: form.agenda || '',
      agreements: form.agreements || [],
      observations: form.observations || '',
    };
    updateState({ meetings: [...state.meetings, meeting] });
    showToast('Reunión registrada');
    setShowForm(false);
    setForm({ type: 'Departamento', attendees: [], agenda: '', agreements: [], observations: '' });
  };

  const addAgreement = () => {
    if (!newAgreement.trim()) return;
    setForm({ ...form, agreements: [...(form.agreements || []), newAgreement.trim()] });
    setNewAgreement('');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[var(--primary)]">Coordinación</h1>
          <p className="text-sm text-[var(--text-light)]">Reuniones de departamento, acuerdos y actividades</p>
        </div>
        <button onClick={() => setShowForm(true)} className="btn btn-primary"><Plus size={16} /> Nueva reunión</button>
      </div>

      {/* Resumen */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="card text-center">
          <p className="text-2xl font-bold text-[var(--primary)]">{state.meetings.length}</p>
          <p className="text-xs text-[var(--text-muted)]">Reuniones registradas</p>
        </div>
        <div className="card text-center">
          <p className="text-2xl font-bold text-[var(--primary)]">{state.meetings.reduce((sum, m) => sum + m.agreements.length, 0)}</p>
          <p className="text-xs text-[var(--text-muted)]">Acuerdos totales</p>
        </div>
        <div className="card text-center">
          <p className="text-2xl font-bold text-[var(--primary)]">{state.settings.staff.length}</p>
          <p className="text-xs text-[var(--text-muted)]">Miembros del departamento</p>
        </div>
      </div>

      {/* Miembros del departamento */}
      <div className="card">
        <h2 className="font-bold text-[var(--primary)] mb-3 flex items-center gap-2"><Users2 size={20} /> Miembros del Departamento</h2>
        <div className="flex flex-wrap gap-2">
          {state.settings.staff.map((member, i) => (
            <span key={i} className="badge badge-primary">{member}</span>
          ))}
        </div>
      </div>

      {/* Lista de reuniones */}
      <div className="space-y-3">
        {state.meetings.map(meeting => (
          <div key={meeting.id} className="card">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <Calendar size={18} className="text-[var(--primary)]" />
                <div>
                  <h3 className="font-bold text-sm">{meeting.type}</h3>
                  <p className="text-xs text-[var(--text-muted)]">{formatDate(meeting.date)}</p>
                </div>
              </div>
              <span className="badge badge-info">{meeting.agreements.length} acuerdos</span>
            </div>
            {meeting.agenda && <p className="text-sm mb-2"><strong>Orden del día:</strong> {meeting.agenda}</p>}
            {meeting.agreements.length > 0 && (
              <div className="mt-2">
                <p className="text-xs font-semibold text-[var(--text-muted)] mb-1">Acuerdos:</p>
                <ul className="space-y-1">
                  {meeting.agreements.map((a, i) => (
                    <li key={i} className="text-sm flex items-start gap-2">
                      <span className="text-[var(--accent)]">•</span> {a}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {meeting.observations && <p className="text-xs text-[var(--text-muted)] mt-2">{meeting.observations}</p>}
          </div>
        ))}
        {state.meetings.length === 0 && (
          <div className="empty-state">
            <Users2 size={48} className="mx-auto mb-3 opacity-30" />
            <p>No hay reuniones registradas</p>
            <p className="text-xs text-[var(--text-muted)]">Registra las reuniones de departamento y sus acuerdos</p>
          </div>
        )}
      </div>

      {/* Actividades complementarias */}
      <div className="card">
        <h2 className="font-bold text-[var(--primary)] mb-3">Actividades Complementarias y Extraescolares</h2>
        <div className="space-y-2 text-sm">
          <div className="p-3 rounded-lg bg-[var(--bg-alt)] flex justify-between items-center">
            <div>
              <p className="font-medium">Audición de Cámara - 1º Trimestre</p>
              <p className="text-xs text-[var(--text-muted)]">Sala de actos del conservatorio</p>
            </div>
            <span className="badge badge-success">Programada</span>
          </div>
          <div className="p-3 rounded-lg bg-[var(--bg-alt)] flex justify-between items-center">
            <div>
              <p className="font-medium">Concierto de Navidad - Orquesta</p>
              <p className="text-xs text-[var(--text-muted)]">Iglesia de San Juan, Badajoz</p>
            </div>
            <span className="badge badge-warning">Pendiente</span>
          </div>
          <div className="p-3 rounded-lg bg-[var(--bg-alt)] flex justify-between items-center">
            <div>
              <p className="font-medium">Certamen de Bandas</p>
              <p className="text-xs text-[var(--text-muted)]">Auditorio de Badajoz</p>
            </div>
            <span className="badge badge-info">En preparación</span>
          </div>
        </div>
      </div>

      {/* Modal nueva reunión */}
      {showForm && (
        <div className="modal-overlay" onClick={() => setShowForm(false)}>
          <div className="modal-content p-6" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-[var(--primary)]">Nueva reunión</h2>
              <button onClick={() => setShowForm(false)} className="p-1 hover:bg-gray-100 rounded"><X size={20} /></button>
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="form-group">
                  <label className="form-label">Fecha *</label>
                  <input type="date" className="form-input" value={form.date || ''} onChange={(e) => setForm({...form, date: e.target.value})} />
                </div>
                <div className="form-group">
                  <label className="form-label">Tipo</label>
                  <select className="form-select" value={form.type || 'Departamento'} onChange={(e) => setForm({...form, type: e.target.value})}>
                    <option value="Departamento">Reunión de departamento</option>
                    <option value="Tutoría">Coordinación con tutoría</option>
                    <option value="Otros departamentos">Coordinación interdepartamental</option>
                    <option value="Equipo directivo">Coordinación con equipo directivo</option>
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Orden del día</label>
                <textarea className="form-textarea" value={form.agenda || ''} onChange={(e) => setForm({...form, agenda: e.target.value})} />
              </div>
              <div className="form-group">
                <label className="form-label">Acuerdos</label>
                <div className="flex gap-2 mb-2">
                  <input className="form-input flex-1" value={newAgreement} onChange={(e) => setNewAgreement(e.target.value)} placeholder="Nuevo acuerdo..." onKeyDown={(e) => e.key === 'Enter' && addAgreement()} />
                  <button onClick={addAgreement} className="btn btn-sm btn-primary">Añadir</button>
                </div>
                <ul className="space-y-1">
                  {(form.agreements || []).map((a, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm p-2 rounded bg-[var(--bg-alt)]">
                      <span>• {a}</span>
                      <button onClick={() => setForm({...form, agreements: (form.agreements || []).filter((_, j) => j !== i)})} className="text-red-500 ml-auto"><X size={14} /></button>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="form-group">
                <label className="form-label">Observaciones</label>
                <textarea className="form-textarea" value={form.observations || ''} onChange={(e) => setForm({...form, observations: e.target.value})} />
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-4">
              <button onClick={() => setShowForm(false)} className="btn btn-outline">Cancelar</button>
              <button onClick={handleSave} className="btn btn-primary">Guardar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
