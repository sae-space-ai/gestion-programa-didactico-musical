// =====================================================
// MÓDULO CONFIGURACIÓN
// Datos institucionales, ponderaciones, backup, tema
// =====================================================

import { useState, useRef } from 'react';
import { AppState } from '../types';
import { holdElements } from '../data/programmeData';
import { Settings as SettingsIcon, Download, Upload, RotateCcw, AlertTriangle, Check } from 'lucide-react';

interface Props {
  state: AppState;
  updateState: (u: Partial<AppState>) => void;
  showToast: (m: string, t?: string) => void;
  onExport: () => void;
  onImport: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onReset: () => void;
}

export default function SettingsModule({ state, updateState, showToast, onExport, onImport, onReset }: Props) {
  const [settings, setSettings] = useState(state.settings);
  const [holds, setHolds] = useState(state.holds);
  const [activeTab, setActiveTab] = useState<'institutional' | 'weightings' | 'backup' | 'holds'>('institutional');
  const fileRef = useRef<HTMLInputElement>(null);

  const saveSettings = () => {
    updateState({ settings });
    showToast('Configuración guardada');
  };

  const addStaff = () => {
    const name = prompt('Nombre del profesor:');
    if (name) {
      setSettings({ ...settings, staff: [...settings.staff, name] });
    }
  };

  const removeStaff = (index: number) => {
    setSettings({ ...settings, staff: settings.staff.filter((_, i) => i !== index) });
  };

  const resolveHold = (id: string) => {
    const justification = prompt('Justificación de la resolución:');
    if (justification) {
      const updatedHolds = holds.map(h => h.id === id ? { ...h, resolved: true, justification } : h);
      setHolds(updatedHolds);
      updateState({ holds: updatedHolds });
      showToast('HOLD resuelto');
    }
  };

  const initHolds = () => {
    const newHolds = holdElements.map(h => ({
      id: h.id,
      type: h.category,
      description: h.description,
      date: new Date().toISOString().split('T')[0],
      resolved: false,
      justification: '',
    }));
    setHolds(newHolds);
    updateState({ holds: newHolds });
    showToast('38 elementos HOLD inicializados');
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[var(--primary)]">Configuración</h1>
        <p className="text-sm text-[var(--text-light)]">Datos institucionales, sistema de ponderaciones y gestión de datos</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-[var(--border)] pb-2">
        {[
          { id: 'institutional', label: 'Datos Institucionales' },
          { id: 'weightings', label: 'Ponderaciones' },
          { id: 'backup', label: 'Backup / Restaurar' },
          { id: 'holds', label: `HOLD (${holds.filter(h => !h.resolved).length})` },
        ].map(tab => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id as typeof activeTab)}
            className={`px-4 py-2 rounded-t-lg text-sm font-medium transition ${
              activeTab === tab.id ? 'bg-[var(--primary)] text-white' : 'hover:bg-[var(--bg-alt)]'
            }`}>{tab.label}</button>
        ))}
      </div>

      {/* Datos institucionales */}
      {activeTab === 'institutional' && (
        <div className="card space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="form-group">
              <label className="form-label">Centro educativo</label>
              <input className="form-input" value={settings.school} onChange={(e) => setSettings({...settings, school: e.target.value})} />
            </div>
            <div className="form-group">
              <label className="form-label">Localidad</label>
              <input className="form-input" value={settings.locality} onChange={(e) => setSettings({...settings, locality: e.target.value})} />
            </div>
            <div className="form-group">
              <label className="form-label">Provincia</label>
              <input className="form-input" value={settings.province} onChange={(e) => setSettings({...settings, province: e.target.value})} />
            </div>
            <div className="form-group">
              <label className="form-label">Departamento</label>
              <input className="form-input" value={settings.department} onChange={(e) => setSettings({...settings, department: e.target.value})} />
            </div>
            <div className="form-group">
              <label className="form-label">Curso académico</label>
              <input className="form-input" value={settings.academicYear} onChange={(e) => setSettings({...settings, academicYear: e.target.value})} />
            </div>
          </div>
          <div className="form-group">
            <label className="form-label">Profesorado del departamento</label>
            <div className="space-y-1 mb-2">
              {settings.staff.map((member, i) => (
                <div key={i} className="flex items-center gap-2 p-2 rounded bg-[var(--bg-alt)]">
                  <span className="text-sm flex-1">{member}</span>
                  <button onClick={() => removeStaff(i)} className="text-red-500 text-xs">Eliminar</button>
                </div>
              ))}
            </div>
            <button onClick={addStaff} className="btn btn-sm btn-outline">+ Añadir profesor</button>
          </div>
          <button onClick={saveSettings} className="btn btn-primary">Guardar configuración</button>
        </div>
      )}

      {/* Ponderaciones */}
      {activeTab === 'weightings' && (
        <div className="card space-y-4">
          <div className="form-group">
            <label className="form-label">Sistema de ponderación</label>
            <select className="form-select" value={settings.weightings.type} onChange={(e) => setSettings({...settings, weightings: {...settings.weightings, type: e.target.value as 'A' | 'B'}})}>
              <option value="A">A: Ponderación por criterios</option>
              <option value="B">B: Distribución por evidencias</option>
            </select>
          </div>

          {settings.weightings.type === 'A' && (
            <div>
              <h4 className="font-semibold text-sm mb-2">Peso de cada criterio (1-4)</h4>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {Object.entries(settings.weightings.criteriaWeights).map(([code, weight]) => (
                  <div key={code} className="flex items-center gap-2 p-2 rounded bg-[var(--bg-alt)]">
                    <span className="badge badge-primary text-xs">{code}</span>
                    <input
                      type="number" min="1" max="4" value={weight}
                      onChange={(e) => setSettings({
                        ...settings,
                        weightings: { ...settings.weightings, criteriaWeights: { ...settings.weightings.criteriaWeights, [code]: Number(e.target.value) } }
                      })}
                      className="w-16 text-center border rounded px-1 py-0.5 text-sm"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {settings.weightings.type === 'B' && (
            <div>
              <h4 className="font-semibold text-sm mb-2">Distribución porcentual por tipo de evidencia</h4>
              <div className="space-y-2">
                {Object.entries(settings.weightings.evidenceDistribution).map(([type, pct]) => (
                  <div key={type} className="flex items-center gap-3">
                    <span className="text-sm w-32 capitalize">{type === 'rehearsal' ? 'Ensayos' : type === 'performance' ? 'Actuaciones' : type === 'self_peer' ? 'Auto/Coev.' : 'Contínua'}</span>
                    <input
                      type="number" min="0" max="100" value={pct}
                      onChange={(e) => setSettings({
                        ...settings,
                        weightings: { ...settings.weightings, evidenceDistribution: { ...settings.weightings.evidenceDistribution, [type]: Number(e.target.value) } }
                      })}
                      className="w-20 text-center border rounded px-2 py-1 text-sm"
                    />
                    <span className="text-sm text-[var(--text-muted)]">%</span>
                  </div>
                ))}
                <p className="text-xs text-[var(--text-muted)]">
                  Total: {Object.values(settings.weightings.evidenceDistribution).reduce((a, b) => a + b, 0)}%
                  {Object.values(settings.weightings.evidenceDistribution).reduce((a, b) => a + b, 0) !== 100 && ' ⚠️ Debe sumar 100%'}
                </p>
              </div>
            </div>
          )}

          <div className="p-3 rounded-lg bg-[var(--bg-alt)]">
            <h4 className="font-semibold text-sm mb-1">Fórmula de cálculo</h4>
            <p className="text-xs font-mono">Tribunal: Nota = (Suma niveles × 10) / 24</p>
            <p className="text-xs font-mono">Criterios: Nota = (Suma ponderada × 10) / (Peso máximo)</p>
            <p className="text-xs text-[var(--text-muted)] mt-1">Escala 1-10 · Aprobado ≥ 5 · Sin decimales</p>
          </div>

          <button onClick={saveSettings} className="btn btn-primary">Guardar ponderaciones</button>
        </div>
      )}

      {/* Backup */}
      {activeTab === 'backup' && (
        <div className="card space-y-4">
          <div className="p-4 rounded-lg border border-[var(--border)]">
            <h3 className="font-bold text-sm mb-2 flex items-center gap-2"><Download size={16} /> Exportar datos</h3>
            <p className="text-sm text-[var(--text-light)] mb-3">Descarga una copia de seguridad en formato JSON con todos los datos de la aplicación.</p>
            <button onClick={onExport} className="btn btn-primary">
              <Download size={16} /> Exportar backup JSON
            </button>
          </div>

          <div className="p-4 rounded-lg border border-[var(--border)]">
            <h3 className="font-bold text-sm mb-2 flex items-center gap-2"><Upload size={16} /> Importar datos</h3>
            <p className="text-sm text-[var(--text-light)] mb-3">Restaura los datos desde un archivo JSON de backup previo.</p>
            <label className="btn btn-outline cursor-pointer">
              <Upload size={16} /> Seleccionar archivo JSON
              <input ref={fileRef} type="file" accept=".json" onChange={onImport} className="hidden" />
            </label>
          </div>

          <div className="p-4 rounded-lg border border-red-200 bg-red-50">
            <h3 className="font-bold text-sm mb-2 text-red-700 flex items-center gap-2"><RotateCcw size={16} /> Resetear datos</h3>
            <p className="text-sm text-red-600 mb-3">Elimina todos los datos y restaura el estado inicial. Esta acción no se puede deshacer.</p>
            <button onClick={onReset} className="btn btn-danger">
              <RotateCcw size={16} /> Resetear todo
            </button>
          </div>
        </div>
      )}

      {/* HOLD */}
      {activeTab === 'holds' && (
        <div className="space-y-4">
          {holds.length === 0 ? (
            <div className="card text-center">
              <AlertTriangle size={48} className="mx-auto mb-3 text-amber-500 opacity-50" />
              <p className="text-[var(--text-light)] mb-3">No hay elementos HOLD inicializados.</p>
              <button onClick={initHolds} className="btn btn-primary">Inicializar 38 elementos HOLD</button>
            </div>
          ) : (
            <>
              <div className="card">
                <div className="flex items-center justify-between">
                  <p className="text-sm">
                    <strong>{holds.filter(h => !h.resolved).length}</strong> pendientes · <strong>{holds.filter(h => h.resolved).length}</strong> resueltos
                  </p>
                  <button onClick={initHolds} className="btn btn-sm btn-outline">Reiniciar HOLD</button>
                </div>
              </div>
              <div className="space-y-2">
                {holds.map(h => (
                  <div key={h.id} className={`card flex items-center justify-between ${h.resolved ? 'opacity-60' : ''}`}>
                    <div className="flex items-center gap-3">
                      {h.resolved ? <Check size={18} className="text-green-500" /> : <AlertTriangle size={18} className="text-amber-500" />}
                      <div>
                        <span className="badge badge-primary mr-2">{h.id}</span>
                        <span className="badge badge-info mr-2">{h.type}</span>
                        <span className="text-sm">{h.description}</span>
                      </div>
                    </div>
                    {!h.resolved && (
                      <button onClick={() => resolveHold(h.id)} className="btn btn-sm btn-success">Resolver</button>
                    )}
                    {h.resolved && (
                      <span className="text-xs text-green-600 italic">{h.justification}</span>
                    )}
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
