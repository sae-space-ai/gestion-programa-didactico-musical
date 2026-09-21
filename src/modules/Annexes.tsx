// =====================================================
// MÓDULO ANEXOS Y PLANTILLAS
// Matrices, checklist, modelos de registro
// =====================================================

import { AppState } from '../types';
import { normativeMatrix, recordTemplates, actionProtocols, supportGuides } from '../data/programmeData';
import { FileText, Printer, Download } from 'lucide-react';

interface Props { state: AppState; updateState: (u: Partial<AppState>) => void; showToast: (m: string, t?: string) => void; }

export default function Annexes({ state }: Props) {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[var(--primary)]">Anexos y Plantillas</h1>
        <p className="text-sm text-[var(--text-light)]">Matrices normativas, plantillas de registro y protocolos</p>
      </div>

      {/* Matriz normativa */}
      <div className="card">
        <h2 className="font-bold text-[var(--primary)] mb-4 flex items-center gap-2"><FileText size={20} /> {normativeMatrix.title}</h2>
        <div className="table-container">
          <table>
            <thead>
              <tr><th>Norma</th><th>Referencia</th><th>Ámbito</th></tr>
            </thead>
            <tbody>
              {normativeMatrix.items.map((item, i) => (
                <tr key={i}>
                  <td className="font-medium">{item.norm}</td>
                  <td className="text-sm">{item.ref}</td>
                  <td className="text-sm text-[var(--text-light)]">{item.scope}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Matriz Objetivos-Contenidos-Criterios */}
      <div className="card">
        <h2 className="font-bold text-[var(--primary)] mb-4">Matriz Objetivos-Contenidos-Criterios</h2>
        <p className="text-sm text-[var(--text-light)] mb-3">Relación entre objetivos de aprendizaje, contenidos y criterios de evaluación.</p>
        <div className="overflow-x-auto">
          <table className="text-xs">
            <thead>
              <tr>
                <th>Objetivo</th>
                <th>Contenidos asociados</th>
                <th>Criterios</th>
              </tr>
            </thead>
            <tbody>
              {['OG-01', 'OG-02', 'OG-03', 'OG-04', 'OG-05'].map((obj, i) => (
                <tr key={obj}>
                  <td className="font-mono">{obj}</td>
                  <td>CB-{String((i % 10) + 1).padStart(2, '0')}</td>
                  <td>CO-{String((i % 12) + 1).padStart(2, '0')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Matriz Competencias-Actividades-Evaluación */}
      <div className="card">
        <h2 className="font-bold text-[var(--primary)] mb-4">Matriz Competencias-Actividades-Evaluación</h2>
        <p className="text-sm text-[var(--text-light)] mb-3">Vinculación entre competencias específicas, actividades de aprendizaje e instrumentos de evaluación.</p>
        <div className="overflow-x-auto">
          <table className="text-xs">
            <thead>
              <tr><th>Competencia</th><th>Actividades</th><th>Instrumentos</th></tr>
            </thead>
            <tbody>
              {[
                { comp: 'CM-1', act: 'Interpretación de obras', inst: 'Rúbrica, observación' },
                { comp: 'CM-2', act: 'Lectura a primera vista', inst: 'Registro de progreso' },
                { comp: 'CM-3', act: 'Audiciones comentadas', inst: 'Cuestionario, debate' },
                { comp: 'CI-1', act: 'Análisis estilístico', inst: 'Informe, rúbrica' },
                { comp: 'CPS-1', act: 'Ensayo cooperativo', inst: 'Coevaluación, observación' },
              ].map((row, i) => (
                <tr key={i}>
                  <td className="font-mono">{row.comp}</td>
                  <td>{row.act}</td>
                  <td>{row.inst}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modelos de registro */}
      <div className="card">
        <h2 className="font-bold text-[var(--primary)] mb-4">Modelos de Registro ({recordTemplates.length} plantillas)</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {recordTemplates.map(template => (
            <div key={template.id} className="p-3 rounded-lg border border-[var(--border)] hover:border-[var(--primary)] transition">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-semibold text-sm">{template.name}</h4>
                <button onClick={() => window.print()} className="p-1 hover:bg-gray-100 rounded" title="Imprimir">
                  <Printer size={14} />
                </button>
              </div>
              <div className="flex flex-wrap gap-1">
                {template.fields.map((f, i) => (
                  <span key={i} className="text-xs px-2 py-0.5 rounded bg-[var(--bg-alt)] border border-[var(--border)]">{f}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Protocolos de actuación */}
      <div className="card">
        <h2 className="font-bold text-[var(--primary)] mb-4">Protocolos de Actuación</h2>
        <div className="space-y-2">
          {actionProtocols.map(p => (
            <div key={p.id} className="p-3 rounded-lg bg-[var(--bg-alt)] flex items-center justify-between">
              <div>
                <span className="badge badge-primary mr-2">{p.id}</span>
                <span className="font-medium text-sm">{p.name}</span>
                <p className="text-xs text-[var(--text-muted)] mt-1">{p.description}</p>
              </div>
              <button onClick={() => window.print()} className="btn btn-sm btn-outline"><Download size={12} /></button>
            </div>
          ))}
        </div>
      </div>

      {/* Guías de apoyo */}
      <div className="card">
        <h2 className="font-bold text-[var(--primary)] mb-4">Guías de Apoyo</h2>
        <div className="space-y-2">
          {supportGuides.map(g => (
            <div key={g.id} className="p-3 rounded-lg bg-[var(--bg-alt)] flex items-center justify-between">
              <div>
                <span className="badge badge-info mr-2">{g.id}</span>
                <span className="font-medium text-sm">{g.name}</span>
                <p className="text-xs text-[var(--text-muted)] mt-1">{g.description}</p>
              </div>
              <button onClick={() => window.print()} className="btn btn-sm btn-outline"><Download size={12} /></button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
