// =====================================================
// PÁGINA PRINCIPAL - Catálogo de Rúbricas
// Programa Didáctico 2026/2027
// =====================================================

import { useState } from 'react';
import { RubricCatalogFilters } from './rubricCatalogTypes';
import { generalRubrics, camaraActivityRubrics, bandaSectionRubrics, orquestaFamilyRubrics } from './rubricCatalogData';
import { traceabilityMatrix } from './traceabilityMatrix';
import { filterRubrics, filterChains, exportRubricsToCSV, exportChainsToCSV, getSubjectName, getLevelName, getLevelColor } from './rubricCatalogUtils';
import { Download, Printer, Search, Filter, X } from 'lucide-react';

type ViewMode = 'subject' | 'course' | 'unit' | 'criterion' | 'competence' | 'traceability' | 'print';

export default function RubricCatalogPage() {
  const [activeView, setActiveView] = useState<ViewMode>('subject');
  const [filters, setFilters] = useState<RubricCatalogFilters>({
    subject: 'All',
    course: 'All',
    criterion: 'All',
    competence: 'All',
    search: '',
  });

  const allRubrics = [...generalRubrics, ...camaraActivityRubrics, ...bandaSectionRubrics, ...orquestaFamilyRubrics];
  const filteredRubrics = filterRubrics(allRubrics, filters);
  const filteredChains = filterChains(traceabilityMatrix, filters);

  const tabs: { id: ViewMode; label: string }[] = [
    { id: 'subject', label: 'Por Materia' },
    { id: 'course', label: 'Por Curso' },
    { id: 'unit', label: 'Por Unidad' },
    { id: 'criterion', label: 'Por Criterio' },
    { id: 'competence', label: 'Por Competencia' },
    { id: 'traceability', label: 'Trazabilidad' },
    { id: 'print', label: 'Imprimir todo' },
  ];

  const handleExportCSV = () => {
    if (activeView === 'traceability') {
      exportChainsToCSV(filteredChains, 'Trazabilidad_Rubricas');
    } else {
      exportRubricsToCSV(filteredRubrics, 'Catalogo_Rubricas');
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Cabecera */}
      <div>
        <h1 className="text-2xl font-bold text-[var(--primary)]">Catálogo de Rúbricas</h1>
        <p className="text-sm text-[var(--text-light)]">
          Catálogo completo de rúbricas con trazabilidad completa
        </p>
      </div>

      {/* Pestañas */}
      <div className="flex gap-2 border-b border-[var(--border)] pb-2 overflow-x-auto">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveView(tab.id)}
            className={`px-4 py-2 rounded-t-lg text-sm font-medium whitespace-nowrap transition ${
              activeView === tab.id
                ? 'bg-[var(--primary)] text-white'
                : 'hover:bg-[var(--bg-alt)] text-[var(--text)]'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Filtros */}
      <div className="card">
        <div className="flex flex-wrap gap-3 items-center">
          <div className="flex items-center gap-2">
            <Filter size={16} className="text-[var(--text-light)]" />
            <select
              value={filters.subject}
              onChange={(e) => setFilters({ ...filters, subject: e.target.value as any })}
              className="form-select w-auto"
            >
              <option value="All">Todas las materias</option>
              <option value="Camara">Cámara</option>
              <option value="Banda">Banda</option>
              <option value="Orquesta">Orquesta</option>
            </select>
          </div>

          <select
            value={filters.course}
            onChange={(e) => setFilters({ ...filters, course: e.target.value as any })}
            className="form-select w-auto"
          >
            <option value="All">Todos los cursos</option>
            {[1, 2, 3, 4, 5, 6].map(c => (
              <option key={c} value={c}>{c}º curso</option>
            ))}
          </select>

          <select
            value={filters.criterion}
            onChange={(e) => setFilters({ ...filters, criterion: e.target.value })}
            className="form-select w-auto"
          >
            <option value="All">Todos los criterios</option>
            {Array.from({ length: 12 }, (_, i) => `CO-${String(i + 1).padStart(2, '0')}`).map(code => (
              <option key={code} value={code}>{code}</option>
            ))}
          </select>

          <div className="relative flex-1 min-w-[200px]">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar..."
              value={filters.search}
              onChange={(e) => setFilters({ ...filters, search: e.target.value })}
              className="w-full pl-9 pr-4 py-2 rounded-lg border border-[var(--border)] text-sm focus:outline-none focus:border-[var(--primary)] bg-[var(--bg)]"
            />
          </div>

          <button
            onClick={() => setFilters({ subject: 'All', course: 'All', criterion: 'All', competence: 'All', search: '' })}
            className="btn btn-outline"
          >
            <X size={16} /> Limpiar
          </button>

          <button onClick={handleExportCSV} className="btn btn-outline">
            <Download size={16} /> CSV
          </button>

          <button onClick={handlePrint} className="btn btn-primary">
            <Printer size={16} /> Imprimir
          </button>
        </div>
      </div>

      {/* Contenido según vista */}
      {activeView === 'subject' && (
        <div className="space-y-6">
          <h2 className="text-xl font-bold text-[var(--primary)]">Rúbricas por Materia</h2>
          
          {/* Cámara */}
          <div className="card">
            <h3 className="text-lg font-bold text-[var(--primary)] mb-4">Música de Cámara</h3>
            <div className="space-y-4">
              <h4 className="font-semibold text-sm">Rúbricas Generales</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredRubrics.filter(r => r.subject === 'All' || r.subject === 'Camara').slice(0, 6).map(rubric => (
                  <RubricCard key={rubric.id} rubric={rubric} />
                ))}
              </div>
              {camaraActivityRubrics.length > 0 && (
                <>
                  <h4 className="font-semibold text-sm mt-6">Rúbricas Específicas de Cámara</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {camaraActivityRubrics.map(rubric => (
                      <RubricCard key={rubric.id} rubric={rubric} />
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Banda */}
          <div className="card">
            <h3 className="text-lg font-bold text-[var(--primary)] mb-4">Banda</h3>
            <div className="space-y-4">
              <h4 className="font-semibold text-sm">Rúbricas Generales</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredRubrics.filter(r => r.subject === 'All' || r.subject === 'Banda').slice(0, 6).map(rubric => (
                  <RubricCard key={rubric.id} rubric={rubric} />
                ))}
              </div>
              {bandaSectionRubrics.length > 0 && (
                <>
                  <h4 className="font-semibold text-sm mt-6">Rúbricas por Sección</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {bandaSectionRubrics.map(rubric => (
                      <RubricCard key={rubric.id} rubric={rubric} />
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Orquesta */}
          <div className="card">
            <h3 className="text-lg font-bold text-[var(--primary)] mb-4">Orquesta</h3>
            <div className="space-y-4">
              <h4 className="font-semibold text-sm">Rúbricas Generales</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredRubrics.filter(r => r.subject === 'All' || r.subject === 'Orquesta').slice(0, 6).map(rubric => (
                  <RubricCard key={rubric.id} rubric={rubric} />
                ))}
              </div>
              {orquestaFamilyRubrics.length > 0 && (
                <>
                  <h4 className="font-semibold text-sm mt-6">Rúbricas por Familia</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {orquestaFamilyRubrics.map(rubric => (
                      <RubricCard key={rubric.id} rubric={rubric} />
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {activeView === 'traceability' && (
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-[var(--primary)]">Matriz de Trazabilidad</h2>
          <p className="text-sm text-[var(--text-light)]">
            {filteredChains.length} cadenas de trazabilidad encontradas
          </p>
          <div className="table-container overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr>
                  <th>Contenido</th>
                  <th>Criterio</th>
                  <th>Competencia</th>
                  <th>Actividad</th>
                  <th>Unidad</th>
                  <th>Curso</th>
                  <th>Materia</th>
                </tr>
              </thead>
              <tbody>
                {filteredChains.slice(0, 50).map(chain => (
                  <tr key={chain.id}>
                    <td className="text-xs">{chain.contentTitle}</td>
                    <td><span className="badge badge-primary">{chain.criterionCode}</span></td>
                    <td><span className="badge badge-info">{chain.competenceCode}</span></td>
                    <td className="text-xs">{chain.activityTitle}</td>
                    <td className="font-mono text-xs">{chain.unitCode}</td>
                    <td>{chain.course}º</td>
                    <td><span className="badge badge-success">{getSubjectName(chain.subject)}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {filteredChains.length > 50 && (
            <p className="text-xs text-center text-[var(--text-muted)]">
              Mostrando 50 de {filteredChains.length} cadenas
            </p>
          )}
        </div>
      )}

      {(activeView === 'course' || activeView === 'unit' || activeView === 'criterion' || activeView === 'competence') && (
        <div className="card text-center py-12">
          <p className="text-[var(--text-muted)]">Vista "{tabs.find(t => t.id === activeView)?.label}" en desarrollo</p>
          <p className="text-sm text-[var(--text-light)] mt-2">
            Esta vista mostrará las rúbricas organizadas por {tabs.find(t => t.id === activeView)?.label.toLowerCase()}
          </p>
        </div>
      )}

      {activeView === 'print' && (
        <div className="card text-center py-12">
          <p className="text-lg font-semibold text-[var(--primary)] mb-4">Vista de Impresión</p>
          <p className="text-sm text-[var(--text-light)] mb-6">
            Esta vista generará un documento PDF completo con todas las rúbricas del catálogo
          </p>
          <button onClick={handlePrint} className="btn btn-primary btn-lg">
            <Printer size={20} /> Generar PDF Completo
          </button>
        </div>
      )}
    </div>
  );
}

// Componente tarjeta de rúbrica
function RubricCard({ rubric }: { rubric: any }) {
  return (
    <div className="border border-[var(--border)] rounded-lg p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <div>
          <span className="badge badge-primary mr-2">{rubric.code}</span>
          <h4 className="font-semibold text-sm inline">{rubric.title}</h4>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2 mb-3">
        <div className={`p-2 rounded border ${getLevelColor(1)}`}>
          <p className="text-xs font-semibold mb-1">Inicial (1)</p>
          <p className="text-xs">{rubric.levels.initial}</p>
        </div>
        <div className={`p-2 rounded border ${getLevelColor(2)}`}>
          <p className="text-xs font-semibold mb-1">En Desarrollo (2)</p>
          <p className="text-xs">{rubric.levels.developing}</p>
        </div>
        <div className={`p-2 rounded border ${getLevelColor(3)}`}>
          <p className="text-xs font-semibold mb-1">Adecuado (3)</p>
          <p className="text-xs">{rubric.levels.adequate}</p>
        </div>
        <div className={`p-2 rounded border ${getLevelColor(4)}`}>
          <p className="text-xs font-semibold mb-1">Consolidado (4)</p>
          <p className="text-xs">{rubric.levels.consolidated}</p>
        </div>
      </div>
      <div className="text-xs text-[var(--text-muted)]">
        <p>Criterios: {rubric.criterionCodes.join(', ')}</p>
        <p>Competencias: {rubric.competenceCodes.join(', ')}</p>
      </div>
    </div>
  );
}
