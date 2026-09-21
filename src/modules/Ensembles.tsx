// =====================================================
// MÓDULO AGRUPACIONES - Gestión de ensembles
// Cámara, Banda y Orquesta con distribución gráfica
// =====================================================

import { useState } from 'react';
import { AppState, Ensemble, EnsembleType } from '../types';
import { Plus, Edit2, Trash2, Users, Music, X } from 'lucide-react';
import { generateId } from '../utils/helpers';

interface Props {
  state: AppState;
  updateState: (updates: Partial<AppState>) => void;
  showToast: (msg: string, type?: string) => void;
}

export default function Ensembles({ state, updateState, showToast }: Props) {
  const [filterType, setFilterType] = useState<string>('all');
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Ensemble | null>(null);
  const [form, setForm] = useState<Partial<Ensemble>>({ type: 'Chamber', course: 1, members: [], repertoire: [] });

  const filtered = state.ensembles.filter(e => filterType === 'all' || e.type === filterType);
  const typeLabels: Record<EnsembleType, string> = { Chamber: 'Cámara', Band: 'Banda', Orchestra: 'Orquesta' };
  const typeColors: Record<EnsembleType, string> = { Chamber: 'badge-info', Band: 'badge-success', Orchestra: 'badge-warning' };

  const openNew = () => {
    setEditing(null);
    setForm({ name: '', type: 'Chamber', course: 1, members: [], repertoire: [], teacher: '', schedule: '', room: '', observations: '' });
    setShowForm(true);
  };

  const openEdit = (ens: Ensemble) => {
    setEditing(ens);
    setForm({ ...ens });
    setShowForm(true);
  };

  const handleSave = () => {
    if (!form.name) { showToast('El nombre es obligatorio', 'error'); return; }
    if (editing) {
      updateState({ ensembles: state.ensembles.map(e => e.id === editing.id ? { ...e, ...form } as Ensemble : e) });
      showToast('Agrupación actualizada');
    } else {
      const newEns: Ensemble = { id: generateId(), ...form } as Ensemble;
      updateState({ ensembles: [...state.ensembles, newEns] });
      showToast('Agrupación creada');
    }
    setShowForm(false);
  };

  const handleDelete = (id: string) => {
    if (confirm('¿Eliminar esta agrupación?')) {
      updateState({ ensembles: state.ensembles.filter(e => e.id !== id) });
      showToast('Agrupación eliminada');
    }
  };

  const toggleMember = (studentId: string) => {
    const members = form.members || [];
    setForm({
      ...form,
      members: members.includes(studentId) ? members.filter(m => m !== studentId) : [...members, studentId]
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[var(--primary)]">Agrupaciones</h1>
          <p className="text-sm text-[var(--text-light)]">{state.ensembles.length} agrupaciones registradas</p>
        </div>
        <div className="flex gap-2">
          <select value={filterType} onChange={(e) => setFilterType(e.target.value)} className="form-select w-auto">
            <option value="all">Todas</option>
            <option value="Chamber">Cámara</option>
            <option value="Band">Banda</option>
            <option value="Orchestra">Orquesta</option>
          </select>
          <button onClick={openNew} className="btn btn-primary"><Plus size={16} /> Nueva</button>
        </div>
      </div>

      {/* Tarjetas de agrupaciones */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map(ens => (
          <div key={ens.id} className="card">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="font-bold text-[var(--primary)]">{ens.name}</h3>
                <div className="flex items-center gap-2 mt-1">
                  <span className={`badge ${typeColors[ens.type]}`}>{typeLabels[ens.type]}</span>
                  <span className="text-xs text-[var(--text-muted)]">{ens.course}º curso</span>
                </div>
              </div>
              <div className="flex gap-1">
                <button onClick={() => openEdit(ens)} className="p-1.5 rounded hover:bg-gray-100"><Edit2 size={14} /></button>
                <button onClick={() => handleDelete(ens.id)} className="p-1.5 rounded hover:bg-red-50 text-red-500"><Trash2 size={14} /></button>
              </div>
            </div>

            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2 text-[var(--text-light)]">
                <Users size={14} />
                <span>{ens.members.length} miembros</span>
              </div>
              <div className="flex items-center gap-2 text-[var(--text-light)]">
                <Music size={14} />
                <span>{ens.repertoire.length} obras</span>
              </div>
              <div className="text-xs text-[var(--text-muted)]">
                <p>Profesor: {ens.teacher || '-'}</p>
                <p>{ens.schedule || '-'}</p>
                <p>Sala: {ens.room || '-'}</p>
              </div>
            </div>

            {/* Distribución gráfica de miembros */}
            <div className="mt-3 pt-3 border-t border-[var(--border)]">
              <p className="text-xs text-[var(--text-muted)] mb-1">Miembros:</p>
              <div className="flex flex-wrap gap-1">
                {ens.members.slice(0, 8).map(mId => {
                  const student = state.students.find(s => s.id === mId);
                  return student ? (
                    <span key={mId} className="text-xs px-2 py-0.5 rounded bg-[var(--bg-alt)] border border-[var(--border)]">
                      {student.firstName} {student.lastName.charAt(0)}.
                    </span>
                  ) : null;
                })}
                {ens.members.length > 8 && <span className="text-xs text-[var(--text-muted)]">+{ens.members.length - 8} más</span>}
              </div>
            </div>

            {/* Repertorio */}
            {ens.repertoire.length > 0 && (
              <div className="mt-2 pt-2 border-t border-[var(--border)]">
                <p className="text-xs text-[var(--text-muted)] mb-1">Repertorio:</p>
                <ul className="text-xs space-y-0.5">
                  {ens.repertoire.slice(0, 3).map((r, i) => (
                    <li key={i} className="text-[var(--text)]">• {r}</li>
                  ))}
                  {ens.repertoire.length > 3 && <li className="text-[var(--text-muted)]">+{ens.repertoire.length - 3} obras más</li>}
                </ul>
              </div>
            )}
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="col-span-full empty-state">
            <Music size={48} className="mx-auto mb-3 opacity-30" />
            <p>No hay agrupaciones registradas</p>
          </div>
        )}
      </div>

      {/* Modal formulario */}
      {showForm && (
        <div className="modal-overlay" onClick={() => setShowForm(false)}>
          <div className="modal-content p-6" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-[var(--primary)]">{editing ? 'Editar' : 'Nueva'} agrupación</h2>
              <button onClick={() => setShowForm(false)} className="p-1 hover:bg-gray-100 rounded"><X size={20} /></button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="form-group md:col-span-2">
                <label className="form-label">Nombre *</label>
                <input className="form-input" value={form.name || ''} onChange={(e) => setForm({...form, name: e.target.value})} />
              </div>
              <div className="form-group">
                <label className="form-label">Tipo</label>
                <select className="form-select" value={form.type || 'Chamber'} onChange={(e) => setForm({...form, type: e.target.value as EnsembleType})}>
                  <option value="Chamber">Cámara</option>
                  <option value="Band">Banda</option>
                  <option value="Orchestra">Orquesta</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Curso</label>
                <select className="form-select" value={form.course || 1} onChange={(e) => setForm({...form, course: Number(e.target.value)})}>
                  {[1,2,3,4,5,6].map(c => <option key={c} value={c}>{c}º</option>)}
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Profesor</label>
                <input className="form-input" value={form.teacher || ''} onChange={(e) => setForm({...form, teacher: e.target.value})} />
              </div>
              <div className="form-group">
                <label className="form-label">Horario</label>
                <input className="form-input" value={form.schedule || ''} onChange={(e) => setForm({...form, schedule: e.target.value})} />
              </div>
              <div className="form-group">
                <label className="form-label">Sala</label>
                <input className="form-input" value={form.room || ''} onChange={(e) => setForm({...form, room: e.target.value})} />
              </div>
              <div className="form-group">
                <label className="form-label">Repertorio (separado por comas)</label>
                <input className="form-input" value={(form.repertoire || []).join(', ')} onChange={(e) => setForm({...form, repertoire: e.target.value.split(',').map(s => s.trim()).filter(Boolean)})} />
              </div>
              <div className="form-group md:col-span-2">
                <label className="form-label">Miembros</label>
                <div className="max-h-40 overflow-y-auto border border-[var(--border)] rounded-lg p-2">
                  {state.students.filter(s => s.active).map(s => (
                    <label key={s.id} className="flex items-center gap-2 p-1 text-sm hover:bg-[var(--bg-alt)] rounded cursor-pointer">
                      <input type="checkbox" checked={(form.members || []).includes(s.id)} onChange={() => toggleMember(s.id)} />
                      <span>{s.firstName} {s.lastName} ({s.instrument})</span>
                    </label>
                  ))}
                </div>
              </div>
              <div className="form-group md:col-span-2">
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
