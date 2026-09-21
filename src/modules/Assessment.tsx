// =====================================================
// MÓDULO EVALUACIÓN
// Por criterios, tribunal, ensayos, incidencias, actuaciones
// =====================================================

import { useState } from 'react';
import { AppState, RubricLevel, TribunalLevel } from '../types';
import { criteria, tribunalCriteria } from '../data/programmeData';
import { calculateTribunalGrade, generateId, getTodayString, formatDate } from '../utils/helpers';
import { ClipboardCheck, Plus, X } from 'lucide-react';

interface Props { state: AppState; updateState: (u: Partial<AppState>) => void; showToast: (m: string, t?: string) => void; }

export default function Assessment({ state, updateState, showToast }: Props) {
  const [activeTab, setActiveTab] = useState<'criteria' | 'tribunal' | 'rehearsal' | 'incident' | 'performance'>('criteria');
  const [showForm, setShowForm] = useState(false);
  const [formType, setFormType] = useState('');

  // Estado para formulario de criterios
  const [criteriaForm, setCriteriaForm] = useState({ studentId: '', ensembleId: '', term: 1, observations: '' });
  const [criteriaLevels, setCriteriaLevels] = useState<Record<string, RubricLevel>>({});

  // Estado para formulario de tribunal
  const [tribunalForm, setTribunalForm] = useState({ studentId: '', ensembleId: '', tribunal: [] as string[] });
  const [tribunalLevels, setTribunalLevels] = useState<Record<string, TribunalLevel>>({
    dynamics: 3, rhythm: 3, articulation: 3, phrasing: 3, coordination: 3, intonation: 3
  });

  // Estado para registro de ensayo
  const [rehearsalForm, setRehearsalForm] = useState({
    course: 1, subject: 'Banda', type: 'ensemble_rehearsal' as const,
    work: '', objective: '', difficulty: 3, adjustment: '', result: '', pending: '', observations: ''
  });

  const openCriteriaForm = () => { setFormType('criteria'); setCriteriaLevels({}); setShowForm(true); };
  const openTribunalForm = () => { setFormType('tribunal'); setTribunalLevels({ dynamics: 3, rhythm: 3, articulation: 3, phrasing: 3, coordination: 3, intonation: 3 }); setShowForm(true); };
  const openRehearsalForm = () => { setFormType('rehearsal'); setShowForm(true); };

  const saveCriteriaAssessment = () => {
    if (!criteriaForm.studentId || !criteriaForm.ensembleId) { showToast('Selecciona alumno y agrupación', 'error'); return; }
    const grade = Math.round((Object.values(criteriaLevels).reduce((sum, level) => {
      const val = level === 'Initial' ? 1 : level === 'Developing' ? 2 : level === 'Adequate' ? 3 : 4;
      return sum + val;
    }, 0) * 10) / (Object.keys(criteriaLevels).length * 4 * 10) * 10);
    
    const finalGrade = Math.min(10, Math.max(1, Math.round(
      Object.values(criteriaLevels).reduce((sum, level) => {
        const val = level === 'Initial' ? 1 : level === 'Developing' ? 2 : level === 'Adequate' ? 3 : 4;
        return sum + val;
      }, 0) * 10 / (Object.keys(criteriaLevels).filter(k => criteriaLevels[k]).length * 4)
    )));

    updateState({
      assessments: [...state.assessments, {
        id: generateId(), studentId: criteriaForm.studentId, ensembleId: criteriaForm.ensembleId,
        term: criteriaForm.term, date: getTodayString(), criteria: { ...criteriaLevels },
        finalGrade, observations: criteriaForm.observations, assessor: 'Profesor'
      }]
    });
    showToast('Evaluación registrada');
    setShowForm(false);
  };

  const saveTribunalAssessment = () => {
    if (!tribunalForm.studentId) { showToast('Selecciona alumno', 'error'); return; }
    const finalGrade = calculateTribunalGrade(tribunalLevels);
    updateState({
      tribunals: [...state.tribunals, {
        id: generateId(), studentId: tribunalForm.studentId, ensembleId: tribunalForm.ensembleId,
        date: getTodayString(), tribunal: tribunalForm.tribunal, criteria: { ...tribunalLevels } as any,
        finalGrade, tribunalAverage: finalGrade
      }]
    });
    showToast('Evaluación de tribunal registrada');
    setShowForm(false);
  };

  const saveRehearsalLog = () => {
    updateState({
      rehearsalLogs: [...state.rehearsalLogs, {
        id: generateId(), date: getTodayString(), ...rehearsalForm,
        criteria: [], pending: rehearsalForm.pending
      }]
    });
    showToast('Registro de ensayo guardado');
    setShowForm(false);
  };

  const tabs = [
    { id: 'criteria', label: 'Por Criterios' },
    { id: 'tribunal', label: 'Por Tribunal' },
    { id: 'rehearsal', label: 'Registro de Ensayos' },
    { id: 'incident', label: 'Incidencias' },
    { id: 'performance', label: 'Actuaciones' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[var(--primary)]">Evaluación</h1>
          <p className="text-sm text-[var(--text-light)]">Registro y gestión de evaluaciones</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 border-b border-[var(--border)] pb-2 overflow-x-auto">
        {tabs.map(tab => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id as typeof activeTab)}
            className={`px-3 py-2 rounded-t-lg text-sm font-medium whitespace-nowrap transition ${
              activeTab === tab.id ? 'bg-[var(--primary)] text-white' : 'hover:bg-[var(--bg-alt)] text-[var(--text)]'
            }`}>{tab.label}</button>
        ))}
      </div>

      {/* Contenido por pestaña */}
      {activeTab === 'criteria' && (
        <div className="space-y-4">
          <div className="flex justify-end">
            <button onClick={openCriteriaForm} className="btn btn-primary"><Plus size={16} /> Nueva evaluación</button>
          </div>
          <div className="table-container">
            <table>
              <thead>
                <tr><th>Fecha</th><th>Alumno</th><th>Agrupación</th><th>Trimestre</th><th>Nota</th><th>Observaciones</th></tr>
              </thead>
              <tbody>
                {state.assessments.map(a => {
                  const student = state.students.find(s => s.id === a.studentId);
                  const ensemble = state.ensembles.find(e => e.id === a.ensembleId);
                  return (
                    <tr key={a.id}>
                      <td>{formatDate(a.date)}</td>
                      <td>{student ? `${student.firstName} ${student.lastName}` : '-'}</td>
                      <td>{ensemble?.name || '-'}</td>
                      <td>{a.term}º</td>
                      <td><span className={`font-bold ${a.finalGrade >= 5 ? 'text-green-600' : 'text-red-600'}`}>{a.finalGrade}</span></td>
                      <td className="text-xs max-w-[200px] truncate">{a.observations}</td>
                    </tr>
                  );
                })}
                {state.assessments.length === 0 && (
                  <tr><td colSpan={6} className="text-center py-8 text-[var(--text-muted)]">No hay evaluaciones registradas</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'tribunal' && (
        <div className="space-y-4">
          <div className="flex justify-end">
            <button onClick={openTribunalForm} className="btn btn-primary"><Plus size={16} /> Nueva evaluación tribunal</button>
          </div>
          <div className="table-container">
            <table>
              <thead>
                <tr><th>Fecha</th><th>Alumno</th><th>Dinámica</th><th>Ritmo</th><th>Articulación</th><th>Fraseo</th><th>Coordinación</th><th>Afinación</th><th>Nota</th></tr>
              </thead>
              <tbody>
                {state.tribunals.map(t => {
                  const student = state.students.find(s => s.id === t.studentId);
                  return (
                    <tr key={t.id}>
                      <td>{formatDate(t.date)}</td>
                      <td>{student ? `${student.firstName} ${student.lastName}` : '-'}</td>
                      <td className="font-mono">{t.criteria.dynamics}</td>
                      <td className="font-mono">{t.criteria.rhythm}</td>
                      <td className="font-mono">{t.criteria.articulation}</td>
                      <td className="font-mono">{t.criteria.phrasing}</td>
                      <td className="font-mono">{t.criteria.coordination}</td>
                      <td className="font-mono">{t.criteria.intonation}</td>
                      <td><span className={`font-bold ${t.finalGrade >= 5 ? 'text-green-600' : 'text-red-600'}`}>{t.finalGrade}</span></td>
                    </tr>
                  );
                })}
                {state.tribunals.length === 0 && (
                  <tr><td colSpan={9} className="text-center py-8 text-[var(--text-muted)]">No hay evaluaciones de tribunal</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'rehearsal' && (
        <div className="space-y-4">
          <div className="flex justify-end">
            <button onClick={openRehearsalForm} className="btn btn-primary"><Plus size={16} /> Nuevo registro</button>
          </div>
          {state.rehearsalLogs.map(log => (
            <div key={log.id} className="card">
              <div className="flex items-center justify-between mb-2">
                <span className="badge badge-info">{formatDate(log.date)}</span>
                <span className="text-sm text-[var(--text-muted)]">{log.subject} · {log.course}º</span>
              </div>
              <h4 className="font-semibold text-sm">{log.work}</h4>
              <p className="text-xs text-[var(--text-light)] mt-1">Objetivo: {log.objective}</p>
              <p className="text-xs text-[var(--text-light)]">Resultado: {log.result}</p>
            </div>
          ))}
          {state.rehearsalLogs.length === 0 && (
            <div className="empty-state"><ClipboardCheck size={48} className="mx-auto mb-3 opacity-30" /><p>No hay registros de ensayo</p></div>
          )}
        </div>
      )}

      {activeTab === 'incident' && (
        <div className="empty-state"><p>Registro de incidencias</p><p className="text-xs text-[var(--text-muted)]">Aquí se registrarán las incidencias del aula.</p></div>
      )}

      {activeTab === 'performance' && (
        <div className="empty-state"><p>Registro de actuaciones</p><p className="text-xs text-[var(--text-muted)]">Aquí se registrarán las actuaciones públicas.</p></div>
      )}

      {/* Modal formulario */}
      {showForm && (
        <div className="modal-overlay" onClick={() => setShowForm(false)}>
          <div className="modal-content p-6 max-w-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-[var(--primary)]">
                {formType === 'criteria' ? 'Evaluación por Criterios' : formType === 'tribunal' ? 'Evaluación por Tribunal' : 'Registro de Ensayo'}
              </h2>
              <button onClick={() => setShowForm(false)} className="p-1 hover:bg-gray-100 rounded"><X size={20} /></button>
            </div>

            {formType === 'criteria' && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div className="form-group">
                    <label className="form-label">Alumno</label>
                    <select className="form-select" value={criteriaForm.studentId} onChange={(e) => setCriteriaForm({...criteriaForm, studentId: e.target.value})}>
                      <option value="">Seleccionar...</option>
                      {state.students.filter(s => s.active).map(s => <option key={s.id} value={s.id}>{s.firstName} {s.lastName}</option>)}
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Agrupación</label>
                    <select className="form-select" value={criteriaForm.ensembleId} onChange={(e) => setCriteriaForm({...criteriaForm, ensembleId: e.target.value})}>
                      <option value="">Seleccionar...</option>
                      {state.ensembles.map(e => <option key={e.id} value={e.id}>{e.name}</option>)}
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Trimestre</label>
                    <select className="form-select" value={criteriaForm.term} onChange={(e) => setCriteriaForm({...criteriaForm, term: Number(e.target.value)})}>
                      <option value={1}>1º Trimestre</option>
                      <option value={2}>2º Trimestre</option>
                      <option value={3}>3º Trimestre</option>
                    </select>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-sm mb-2">Niveles por criterio</h4>
                  <div className="space-y-2 max-h-64 overflow-y-auto">
                    {criteria.map(c => (
                      <div key={c.code} className="flex items-center gap-3 p-2 rounded bg-[var(--bg-alt)]">
                        <span className="badge badge-primary text-xs w-16">{c.code}</span>
                        <span className="text-xs flex-1 truncate">{c.description.substring(0, 60)}...</span>
                        <select
                          className="form-select w-auto text-xs"
                          value={criteriaLevels[c.code] || ''}
                          onChange={(e) => setCriteriaLevels({...criteriaLevels, [c.code]: e.target.value as RubricLevel})}
                        >
                          <option value="">--</option>
                          <option value="Initial">Inicial (1)</option>
                          <option value="Developing">En desarrollo (2)</option>
                          <option value="Adequate">Adecuado (3)</option>
                          <option value="Consolidated">Consolidado (4)</option>
                        </select>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">Observaciones</label>
                  <textarea className="form-textarea" value={criteriaForm.observations} onChange={(e) => setCriteriaForm({...criteriaForm, observations: e.target.value})} />
                </div>
              </div>
            )}

            {formType === 'tribunal' && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="form-group">
                    <label className="form-label">Alumno</label>
                    <select className="form-select" value={tribunalForm.studentId} onChange={(e) => setTribunalForm({...tribunalForm, studentId: e.target.value})}>
                      <option value="">Seleccionar...</option>
                      {state.students.filter(s => s.active).map(s => <option key={s.id} value={s.id}>{s.firstName} {s.lastName}</option>)}
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Agrupación</label>
                    <select className="form-select" value={tribunalForm.ensembleId} onChange={(e) => setTribunalForm({...tribunalForm, ensembleId: e.target.value})}>
                      <option value="">Seleccionar...</option>
                      {state.ensembles.map(e => <option key={e.id} value={e.id}>{e.name}</option>)}
                    </select>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-sm mb-2">Criterios del tribunal (1-4)</h4>
                  <div className="space-y-2">
                    {tribunalCriteria.map(tc => (
                      <div key={tc.code} className="flex items-center gap-3 p-2 rounded bg-[var(--bg-alt)]">
                        <span className="text-xs font-medium w-32">{tc.name}</span>
                        <div className="flex gap-1">
                          {[1,2,3,4].map(level => (
                            <button
                              key={level}
                              onClick={() => setTribunalLevels({...tribunalLevels, [tc.code === 'T-01' ? 'dynamics' : tc.code === 'T-02' ? 'rhythm' : tc.code === 'T-03' ? 'articulation' : tc.code === 'T-04' ? 'phrasing' : tc.code === 'T-05' ? 'coordination' : 'intonation']: level as TribunalLevel})}
                              className={`w-8 h-8 rounded text-xs font-bold ${
                                tribunalLevels[tc.code === 'T-01' ? 'dynamics' : tc.code === 'T-02' ? 'rhythm' : tc.code === 'T-03' ? 'articulation' : tc.code === 'T-04' ? 'phrasing' : tc.code === 'T-05' ? 'coordination' : 'intonation'] === level
                                  ? 'bg-[var(--primary)] text-white' : 'bg-white border border-[var(--border)] hover:border-[var(--primary)]'
                              }`}
                            >
                              {level}
                            </button>
                          ))}
                        </div>
                        <span className="text-xs text-[var(--text-muted)]">×{tribunalLevels[tc.code === 'T-01' ? 'dynamics' : tc.code === 'T-02' ? 'rhythm' : tc.code === 'T-03' ? 'articulation' : tc.code === 'T-04' ? 'phrasing' : tc.code === 'T-05' ? 'coordination' : 'intonation']}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-3 p-3 rounded-lg bg-[var(--bg-alt)]">
                    <p className="text-sm">Nota calculada: <strong className="text-lg">
                      {calculateTribunalGrade(tribunalLevels)}
                    </strong> / 10</p>
                    <p className="text-xs text-[var(--text-muted)]">Fórmula: (suma × 10) / 24</p>
                  </div>
                </div>
              </div>
            )}

            {formType === 'rehearsal' && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div className="form-group">
                    <label className="form-label">Curso</label>
                    <select className="form-select" value={rehearsalForm.course} onChange={(e) => setRehearsalForm({...rehearsalForm, course: Number(e.target.value)})}>
                      {[1,2,3,4].map(c => <option key={c} value={c}>{c}º</option>)}
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Asignatura</label>
                    <select className="form-select" value={rehearsalForm.subject} onChange={(e) => setRehearsalForm({...rehearsalForm, subject: e.target.value})}>
                      <option value="Banda">Banda</option>
                      <option value="Orquesta">Orquesta</option>
                      <option value="Cámara">Cámara</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Tipo</label>
                    <select className="form-select" value={rehearsalForm.type} onChange={(e) => setRehearsalForm({...rehearsalForm, type: e.target.value as any})}>
                      <option value="section_rehearsal">Ensayo de sección</option>
                      <option value="ensemble_rehearsal">Ensayo general</option>
                      <option value="public_performance">Actuación pública</option>
                    </select>
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">Obras trabajadas</label>
                  <input className="form-input" value={rehearsalForm.work} onChange={(e) => setRehearsalForm({...rehearsalForm, work: e.target.value})} />
                </div>
                <div className="form-group">
                  <label className="form-label">Objetivo</label>
                  <input className="form-input" value={rehearsalForm.objective} onChange={(e) => setRehearsalForm({...rehearsalForm, objective: e.target.value})} />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="form-group">
                    <label className="form-label">Dificultad (1-5)</label>
                    <input type="range" min="1" max="5" value={rehearsalForm.difficulty} onChange={(e) => setRehearsalForm({...rehearsalForm, difficulty: Number(e.target.value)})} className="w-full" />
                    <span className="text-xs">{rehearsalForm.difficulty}/5</span>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Resultado</label>
                    <input className="form-input" value={rehearsalForm.result} onChange={(e) => setRehearsalForm({...rehearsalForm, result: e.target.value})} />
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">Observaciones</label>
                  <textarea className="form-textarea" value={rehearsalForm.observations} onChange={(e) => setRehearsalForm({...rehearsalForm, observations: e.target.value})} />
                </div>
              </div>
            )}

            <div className="flex justify-end gap-2 mt-4">
              <button onClick={() => setShowForm(false)} className="btn btn-outline">Cancelar</button>
              <button onClick={() => {
                if (formType === 'criteria') saveCriteriaAssessment();
                else if (formType === 'tribunal') saveTribunalAssessment();
                else if (formType === 'rehearsal') saveRehearsalLog();
              }} className="btn btn-primary">Guardar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
