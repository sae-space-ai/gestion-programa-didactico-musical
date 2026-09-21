// =====================================================
// MÓDULO UNIDADES DIDÁCTICAS
// Visor de 90 unidades con filtros y gestión de estado
// =====================================================

import { useState } from 'react';
import { AppState, UnitStatus } from '../types';
import { GraduationCap, CheckCircle, Clock, Circle } from 'lucide-react';

interface Props { state: AppState; updateState: (u: Partial<AppState>) => void; showToast: (m: string, t?: string) => void; }

export default function Units({ state, updateState, showToast }: Props) {
  const [filterSubject, setFilterSubject] = useState('all');
  const [filterCourse, setFilterCourse] = useState(0);
  const [filterTerm, setFilterTerm] = useState(0);
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedUnit, setSelectedUnit] = useState<string | null>(null);

  const filtered = state.units.filter(u => {
    if (filterSubject !== 'all' && u.subject !== filterSubject) return false;
    if (filterCourse && u.course !== filterCourse) return false;
    if (filterTerm && u.term !== filterTerm) return false;
    if (filterStatus !== 'all' && u.status !== filterStatus) return false;
    return true;
  });

  const statusIcon = (status: UnitStatus) => {
    switch (status) {
      case 'taught': return <CheckCircle size={16} className="text-green-500" />;
      case 'inprogress': return <Clock size={16} className="text-amber-500" />;
      default: return <Circle size={16} className="text-gray-400" />;
    }
  };

  const statusLabel = (status: UnitStatus) => {
    switch (status) {
      case 'taught': return 'Impartida';
      case 'inprogress': return 'En progreso';
      default: return 'Pendiente';
    }
  };

  const updateUnitStatus = (unitId: string, status: UnitStatus) => {
    updateState({
      units: state.units.map(u => u.id === unitId ? { ...u, status } : u)
    });
    showToast('Estado actualizado');
  };

  const unit = selectedUnit ? state.units.find(u => u.id === selectedUnit) : null;

  const stats = {
    total: state.units.length,
    taught: state.units.filter(u => u.status === 'taught').length,
    inprogress: state.units.filter(u => u.status === 'inprogress').length,
    pending: state.units.filter(u => u.status === 'pending').length,
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[var(--primary)]">Unidades Didácticas</h1>
          <p className="text-sm text-[var(--text-light)]">90 unidades: 36 Banda + 36 Orquesta + 18 Cámara</p>
        </div>
        <div className="flex gap-3 text-center">
          <div className="card px-4 py-2"><p className="text-lg font-bold text-green-600">{stats.taught}</p><p className="text-xs text-[var(--text-muted)]">Impartidas</p></div>
          <div className="card px-4 py-2"><p className="text-lg font-bold text-amber-600">{stats.inprogress}</p><p className="text-xs text-[var(--text-muted)]">En progreso</p></div>
          <div className="card px-4 py-2"><p className="text-lg font-bold text-gray-500">{stats.pending}</p><p className="text-xs text-[var(--text-muted)]">Pendientes</p></div>
        </div>
      </div>

      {/* Filtros */}
      <div className="card">
        <div className="flex flex-wrap gap-3">
          <select value={filterSubject} onChange={(e) => setFilterSubject(e.target.value)} className="form-select w-auto">
            <option value="all">Todas las asignaturas</option>
            <option value="Banda">Banda</option>
            <option value="Orquesta">Orquesta</option>
            <option value="Cámara">Cámara</option>
          </select>
          <select value={filterCourse} onChange={(e) => setFilterCourse(Number(e.target.value))} className="form-select w-auto">
            <option value={0}>Todos los cursos</option>
            {[1,2,3,4,5,6].map(c => <option key={c} value={c}>{c}º</option>)}
          </select>
          <select value={filterTerm} onChange={(e) => setFilterTerm(Number(e.target.value))} className="form-select w-auto">
            <option value={0}>Todos los trimestres</option>
            <option value={1}>1º Trimestre</option>
            <option value={2}>2º Trimestre</option>
            <option value={3}>3º Trimestre</option>
          </select>
          <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="form-select w-auto">
            <option value="all">Todos los estados</option>
            <option value="pending">Pendiente</option>
            <option value="inprogress">En progreso</option>
            <option value="taught">Impartida</option>
          </select>
        </div>
        <p className="text-xs text-[var(--text-muted)] mt-2">{filtered.length} unidades encontradas</p>
      </div>

      {/* Lista de unidades */}
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Código</th>
              <th>Título</th>
              <th>Asignatura</th>
              <th>Curso</th>
              <th>Trim.</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filtered.slice(0, 50).map(u => (
              <tr key={u.id}>
                <td className="font-mono text-xs">{u.code}</td>
                <td className="font-medium text-sm">{u.title}</td>
                <td><span className={`badge ${u.subject === 'Banda' ? 'badge-success' : u.subject === 'Orquesta' ? 'badge-warning' : 'badge-info'}`}>{u.subject}</span></td>
                <td>{u.course}º</td>
                <td>{u.term}º</td>
                <td>
                  <div className="flex items-center gap-1">
                    {statusIcon(u.status)}
                    <span className="text-xs">{statusLabel(u.status)}</span>
                  </div>
                </td>
                <td>
                  <div className="flex gap-1">
                    <button onClick={() => setSelectedUnit(u.id)} className="btn btn-sm btn-outline">Ver</button>
                    <select
                      value={u.status}
                      onChange={(e) => updateUnitStatus(u.id, e.target.value as UnitStatus)}
                      className="text-xs border rounded px-1 py-0.5"
                    >
                      <option value="pending">Pendiente</option>
                      <option value="inprogress">En progreso</option>
                      <option value="taught">Impartida</option>
                    </select>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {filtered.length > 50 && <p className="text-xs text-center text-[var(--text-muted)]">Mostrando 50 de {filtered.length} unidades</p>}

      {/* Detalle de unidad */}
      {unit && (
        <div className="modal-overlay" onClick={() => setSelectedUnit(null)}>
          <div className="modal-content p-6 max-w-3xl max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center gap-3 mb-4">
              <GraduationCap size={24} className="text-[var(--primary)]" />
              <div>
                <h2 className="text-lg font-bold text-[var(--primary)]">{unit.code}: {unit.title}</h2>
                <p className="text-xs text-[var(--text-muted)]">{unit.subject} · {unit.course}º curso · {unit.term}º trimestre</p>
              </div>
            </div>
            <div className="space-y-3 text-sm">
              <div><span className="font-semibold">Temporalización:</span> {unit.timing}</div>
              <div><span className="font-semibold">Justificación:</span> {unit.justification}</div>
              <div><span className="font-semibold">Objetivos:</span> <div className="flex flex-wrap gap-1 mt-1">{unit.objectives.map(o => <span key={o} className="badge badge-primary">{o}</span>)}</div></div>
              <div><span className="font-semibold">Competencias:</span> <div className="flex flex-wrap gap-1 mt-1">{unit.competences.map(c => <span key={c} className="badge badge-info">{c}</span>)}</div></div>
              <div><span className="font-semibold">Criterios:</span> <div className="flex flex-wrap gap-1 mt-1">{unit.criteria.map(c => <span key={c} className="badge badge-success">{c}</span>)}</div></div>
              <div><span className="font-semibold">Actividades:</span> <ul className="list-disc ml-4 mt-1">{unit.activities.map((a, i) => <li key={i}>{a}</li>)}</ul></div>
              <div><span className="font-semibold">Metodología:</span> {unit.methodology}</div>
              <div><span className="font-semibold">Atención a la diversidad:</span> {unit.diversity}</div>
              <div><span className="font-semibold">Recursos:</span> {unit.resources.join(', ')}</div>
              <div><span className="font-semibold">Evidencias:</span> {unit.evidence.join(', ')}</div>
              <div><span className="font-semibold">Instrumentos:</span> {unit.instruments.join(', ')}</div>
              <div><span className="font-semibold">Producto interpretativo:</span> {unit.product}</div>
              <div><span className="font-semibold">Recuperación:</span> {unit.recovery}</div>
              <div>
                <span className="font-semibold">Observaciones:</span>
                <textarea
                  className="form-textarea mt-1"
                  value={unit.observations}
                  onChange={(e) => {
                    updateState({ units: state.units.map(u => u.id === unit.id ? { ...u, observations: e.target.value } : u) });
                  }}
                  placeholder="Añadir observaciones..."
                />
              </div>
            </div>
            <div className="flex justify-end mt-4">
              <button onClick={() => setSelectedUnit(null)} className="btn btn-outline">Cerrar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
