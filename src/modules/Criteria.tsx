// =====================================================
// MÓDULO CRITERIOS Y RÚBRICAS
// Visualización de criterios, rúbricas y niveles
// =====================================================

import { useState } from 'react';
import { AppState } from '../types';
import { criteria, tribunalCriteria } from '../data/programmeData';
import { Target, ChevronDown, ChevronUp } from 'lucide-react';

interface Props { state: AppState; updateState: (u: Partial<AppState>) => void; showToast: (m: string, t?: string) => void; }

export default function Criteria({ state }: Props) {
  const [expandedCriterion, setExpandedCriterion] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'criteria' | 'rubrics' | 'tribunal'>('criteria');

  const levelColors: Record<string, string> = {
    'Initial': 'bg-red-100 text-red-700 border-red-200',
    'Developing': 'bg-orange-100 text-orange-700 border-orange-200',
    'Adequate': 'bg-blue-100 text-blue-700 border-blue-200',
    'Consolidated': 'bg-green-100 text-green-700 border-green-200',
  };
  const levelLabels: Record<string, string> = {
    'Initial': 'Inicial', 'Developing': 'En desarrollo', 'Adequate': 'Adecuado', 'Consolidated': 'Consolidado'
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[var(--primary)]">Criterios y Rúbricas</h1>
        <p className="text-sm text-[var(--text-light)]">12 criterios de evaluación con rúbricas de 4 niveles + criterios de tribunal</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-[var(--border)] pb-2">
        {[
          { id: 'criteria', label: 'Criterios CO-01 a CO-12' },
          { id: 'rubrics', label: 'Rúbricas generales' },
          { id: 'tribunal', label: 'Criterios de Tribunal' },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as typeof activeTab)}
            className={`px-4 py-2 rounded-t-lg text-sm font-medium transition ${
              activeTab === tab.id ? 'bg-[var(--primary)] text-white' : 'hover:bg-[var(--bg-alt)] text-[var(--text)]'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Pestaña Criterios */}
      {activeTab === 'criteria' && (
        <div className="space-y-3">
          {criteria.map(c => (
            <div key={c.code} className="card">
              <div
                className="flex items-center justify-between cursor-pointer"
                onClick={() => setExpandedCriterion(expandedCriterion === c.code ? null : c.code)}
              >
                <div className="flex items-center gap-3">
                  <span className="badge badge-primary font-mono">{c.code}</span>
                  <p className="text-sm font-medium">{c.description.substring(0, 100)}...</p>
                </div>
                {expandedCriterion === c.code ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
              </div>
              {expandedCriterion === c.code && (
                <div className="mt-4 pt-4 border-t border-[var(--border)] space-y-4">
                  <div>
                    <h4 className="text-sm font-semibold text-[var(--primary)] mb-2">Descripción completa</h4>
                    <p className="text-sm">{c.description}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-[var(--primary)] mb-2">Indicadores de logro</h4>
                    <ul className="space-y-1">
                      {c.indicators.map((ind, i) => (
                        <li key={i} className="text-sm flex items-start gap-2">
                          <Target size={14} className="text-[var(--accent)] mt-0.5 shrink-0" />
                          <span>{ind}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-[var(--primary)] mb-2">Rúbrica</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {Object.entries(c.rubric).map(([level, desc]) => (
                        <div key={level} className={`p-3 rounded-lg border ${levelColors[level]}`}>
                          <p className="font-semibold text-xs mb-1">{levelLabels[level]} ({level})</p>
                          <p className="text-xs">{desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Pestaña Rúbricas generales */}
      {activeTab === 'rubrics' && (
        <div className="card">
          <h2 className="text-lg font-bold text-[var(--primary)] mb-4">Rúbricas Generales</h2>
          <p className="text-sm text-[var(--text-light)] mb-4">Escala de 4 niveles aplicada a todos los criterios de evaluación.</p>
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Nivel</th>
                  <th>Valor</th>
                  <th>Descripción general</th>
                  <th>Equivalencia</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><span className="badge bg-red-100 text-red-700">Inicial</span></td>
                  <td className="font-mono">1</td>
                  <td className="text-sm">No alcanza los mínimos requeridos. Necesita intervención significativa.</td>
                  <td className="text-sm">Insuficiente (1-4)</td>
                </tr>
                <tr>
                  <td><span className="badge bg-orange-100 text-orange-700">En desarrollo</span></td>
                  <td className="font-mono">2</td>
                  <td className="text-sm">Alcanza parcialmente los objetivos. Progreso visible pero insuficiente.</td>
                  <td className="text-sm">Suficiente (4-5)</td>
                </tr>
                <tr>
                  <td><span className="badge bg-blue-100 text-blue-700">Adecuado</span></td>
                  <td className="font-mono">3</td>
                  <td className="text-sm">Alcanza los objetivos previstos con corrección.</td>
                  <td className="text-sm">Bien (5-7)</td>
                </tr>
                <tr>
                  <td><span className="badge bg-green-100 text-green-700">Consolidado</span></td>
                  <td className="font-mono">4</td>
                  <td className="text-sm">Supera los objetivos con excelencia y autonomía.</td>
                  <td className="text-sm">Notable/Sobresaliente (7-10)</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="mt-4 p-4 rounded-lg bg-[var(--bg-alt)]">
            <h4 className="font-semibold text-sm mb-2">Fórmula de cálculo (Tribunal)</h4>
            <p className="text-sm font-mono bg-white p-2 rounded border">Nota = (Suma de niveles × 10) / 24</p>
            <p className="text-xs text-[var(--text-muted)] mt-2">Máximo: 6 criterios × 4 = 24 puntos → Nota 10. Mínimo: 6 × 1 = 6 → Nota 2.5 ≈ 3</p>
          </div>
        </div>
      )}

      {/* Pestaña Tribunal */}
      {activeTab === 'tribunal' && (
        <div className="space-y-4">
          <div className="card">
            <h2 className="text-lg font-bold text-[var(--primary)] mb-4">Criterios de Evaluación por Tribunal</h2>
            <p className="text-sm text-[var(--text-light)] mb-4">6 criterios específicos evaluados por un tribunal de profesores.</p>
          </div>
          {tribunalCriteria.map(tc => (
            <div key={tc.code} className="card">
              <div className="flex items-center gap-3 mb-3">
                <span className="badge badge-primary font-mono">{tc.code}</span>
                <h3 className="font-bold">{tc.name}</h3>
              </div>
              <p className="text-sm text-[var(--text-light)] mb-3">{tc.description}</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {tc.levels.map((level, i) => (
                  <div key={i} className={`p-2 rounded text-center text-xs font-medium ${
                    i === 0 ? 'bg-red-100 text-red-700' :
                    i === 1 ? 'bg-orange-100 text-orange-700' :
                    i === 2 ? 'bg-blue-100 text-blue-700' :
                    'bg-green-100 text-green-700'
                  }`}>
                    <p className="font-bold">×{i + 1}</p>
                    <p>{level}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
