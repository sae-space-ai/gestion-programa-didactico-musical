// Página principal del módulo Bloques de Contenido

import { useState } from 'react';
import { BloquesFilters } from './bloquesTypes';
import { todosLosObjetivos } from './data/bloque00Objetivos';
import { contenidos, competencias, principiosMetodologicos, principiosEvaluacion, instrumentosEvaluacion, repertorio, actividades, recursos, diversidad, temporalizacion, transversales, normativa, evaluacionFinal } from './data/bloquesIaXII';
import { filterBloques, exportBloquesToCSV } from './bloquesUtils';
import { Search, Download, Printer, X } from 'lucide-react';

type BloqueId = 'objetivos' | 'contenidos' | 'competencias' | 'metodologia' | 'evaluacion' | 'repertorio' | 'actividades' | 'recursos' | 'diversidad' | 'temporalizacion' | 'transversales' | 'normativa' | 'evaluacionFinal';

export default function BloquesPage() {
  const [activeBloque, setActiveBloque] = useState<BloqueId>('objetivos');
  const [filters, setFilters] = useState<BloquesFilters>({
    subject: 'All',
    course: 'All',
    search: '',
  });

  const bloques = [
    { id: 'objetivos' as BloqueId, label: 'Bloque 0: Objetivos' },
    { id: 'contenidos' as BloqueId, label: 'Bloque I: Contenidos' },
    { id: 'competencias' as BloqueId, label: 'Bloque II: Competencias' },
    { id: 'metodologia' as BloqueId, label: 'Bloque III: Metodología' },
    { id: 'evaluacion' as BloqueId, label: 'Bloque IV: Evaluación' },
    { id: 'repertorio' as BloqueId, label: 'Bloque V: Repertorio' },
    { id: 'actividades' as BloqueId, label: 'Bloque VI: Actividades' },
    { id: 'recursos' as BloqueId, label: 'Bloque VII: Recursos' },
    { id: 'diversidad' as BloqueId, label: 'Bloque VIII: Diversidad' },
    { id: 'temporalizacion' as BloqueId, label: 'Bloque IX: Temporalización' },
    { id: 'transversales' as BloqueId, label: 'Bloque X: Transversales' },
    { id: 'normativa' as BloqueId, label: 'Bloque XI: Normativa' },
    { id: 'evaluacionFinal' as BloqueId, label: 'Bloque XII: Evaluación Final' },
  ];

  const handleExportCSV = () => {
    let data: any[] = [];
    switch (activeBloque) {
      case 'objetivos': data = todosLosObjetivos; break;
      case 'contenidos': data = contenidos; break;
      case 'competencias': data = competencias; break;
      case 'metodologia': data = principiosMetodologicos; break;
      case 'evaluacion': data = [...principiosEvaluacion, ...instrumentosEvaluacion]; break;
      case 'repertorio': data = repertorio; break;
      case 'actividades': data = actividades; break;
      case 'recursos': data = recursos; break;
      case 'diversidad': data = diversidad; break;
      case 'transversales': data = transversales; break;
      case 'normativa': data = normativa; break;
      case 'evaluacionFinal': data = evaluacionFinal; break;
    }
    exportBloquesToCSV(data, `Bloque_${activeBloque}`);
  };

  const handlePrint = () => {
    window.print();
  };

  const renderContent = () => {
    switch (activeBloque) {
      case 'objetivos':
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-[var(--primary)]">Objetivos</h2>
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Objetivos Generales ({todosLosObjetivos.filter(o => o.type === 'general').length})</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filterBloques(todosLosObjetivos.filter(o => o.type === 'general'), filters).map(obj => (
                  <div key={obj.id} className="card">
                    <div className="flex items-start gap-3">
                      <span className="badge badge-primary">{obj.code}</span>
                      <div className="flex-1">
                        <h4 className="font-semibold text-sm mb-1">{obj.title}</h4>
                        <p className="text-sm text-[var(--text-light)]">{obj.description}</p>
                        {obj.relatedCriteria && (
                          <div className="flex gap-1 mt-2">
                            {obj.relatedCriteria.map(c => <span key={c} className="badge badge-info text-xs">{c}</span>)}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <h3 className="text-lg font-semibold mt-6">Objetivos Específicos - Cámara ({todosLosObjetivos.filter(o => o.type === 'camara').length})</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filterBloques(todosLosObjetivos.filter(o => o.type === 'camara'), filters).map(obj => (
                  <div key={obj.id} className="card">
                    <div className="flex items-start gap-3">
                      <span className="badge badge-info">{obj.code}</span>
                      <div className="flex-1">
                        <h4 className="font-semibold text-sm mb-1">{obj.title}</h4>
                        <p className="text-sm text-[var(--text-light)]">{obj.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <h3 className="text-lg font-semibold mt-6">Objetivos Específicos - Banda ({todosLosObjetivos.filter(o => o.type === 'banda').length})</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filterBloques(todosLosObjetivos.filter(o => o.type === 'banda'), filters).map(obj => (
                  <div key={obj.id} className="card">
                    <div className="flex items-start gap-3">
                      <span className="badge badge-success">{obj.code}</span>
                      <div className="flex-1">
                        <h4 className="font-semibold text-sm mb-1">{obj.title}</h4>
                        <p className="text-sm text-[var(--text-light)]">{obj.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <h3 className="text-lg font-semibold mt-6">Objetivos Específicos - Orquesta ({todosLosObjetivos.filter(o => o.type === 'orquesta').length})</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filterBloques(todosLosObjetivos.filter(o => o.type === 'orquesta'), filters).map(obj => (
                  <div key={obj.id} className="card">
                    <div className="flex items-start gap-3">
                      <span className="badge badge-warning">{obj.code}</span>
                      <div className="flex-1">
                        <h4 className="font-semibold text-sm mb-1">{obj.title}</h4>
                        <p className="text-sm text-[var(--text-light)]">{obj.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      case 'contenidos':
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-[var(--primary)]">Contenidos</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filterBloques(contenidos, filters).map(cont => (
                <div key={cont.id} className="card">
                  <span className="badge badge-primary mb-2">{cont.code}</span>
                  <h3 className="font-semibold mb-2">{cont.title}</h3>
                  <p className="text-sm text-[var(--text-light)] mb-3">{cont.description}</p>
                  <div>
                    <p className="text-xs font-semibold mb-1">Subcontenidos:</p>
                    <ul className="text-xs space-y-1">
                      {cont.subcontents.map((sub, i) => <li key={i}>• {sub}</li>)}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case 'competencias':
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-[var(--primary)]">Competencias</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filterBloques(competencias, filters).map(comp => (
                <div key={comp.id} className="card">
                  <span className="badge badge-info mb-2">{comp.code}</span>
                  <h3 className="font-semibold mb-2">{comp.title}</h3>
                  <p className="text-sm text-[var(--text-light)] mb-3">{comp.description}</p>
                  <div>
                    <p className="text-xs font-semibold mb-1">Manifestaciones:</p>
                    <ul className="text-xs space-y-1">
                      {comp.manifestations.map((m, i) => <li key={i}>• {m}</li>)}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case 'metodologia':
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-[var(--primary)]">Metodología</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filterBloques(principiosMetodologicos, filters).map(princ => (
                <div key={princ.id} className="card">
                  <span className="badge badge-primary mb-2">{princ.code}</span>
                  <h3 className="font-semibold mb-2">{princ.title}</h3>
                  <p className="text-sm text-[var(--text-light)] mb-3">{princ.description}</p>
                  <div className="mb-3">
                    <p className="text-xs font-semibold mb-1">Secuencia:</p>
                    <div className="flex gap-1 flex-wrap">
                      {princ.sequence.map((s, i) => <span key={i} className="badge badge-info text-xs">{s}</span>)}
                    </div>
                  </div>
                  <div>
                    <p className="text-xs font-semibold mb-1">Estrategias:</p>
                    <ul className="text-xs space-y-1">
                      {princ.strategies.map((s, i) => <li key={i}>• {s}</li>)}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case 'evaluacion':
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-[var(--primary)]">Evaluación</h2>
            <h3 className="text-lg font-semibold">Principios de Evaluación</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filterBloques(principiosEvaluacion, filters).map(princ => (
                <div key={princ.id} className="card">
                  <span className="badge badge-primary mb-2">{princ.code}</span>
                  <h3 className="font-semibold mb-2">{princ.title}</h3>
                  <p className="text-sm text-[var(--text-light)]">{princ.description}</p>
                </div>
              ))}
            </div>
            <h3 className="text-lg font-semibold mt-6">Instrumentos de Evaluación</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filterBloques(instrumentosEvaluacion, filters).map(inst => (
                <div key={inst.id} className="card">
                  <span className="badge badge-success mb-2">{inst.code}</span>
                  <h3 className="font-semibold mb-2">{inst.title}</h3>
                  <p className="text-sm text-[var(--text-light)]">{inst.description}</p>
                </div>
              ))}
            </div>
          </div>
        );
      case 'repertorio':
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-[var(--primary)]">Repertorio</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filterBloques(repertorio, filters).map(rep => (
                <div key={rep.id} className="card">
                  <span className="badge badge-warning mb-2">{rep.code}</span>
                  <h3 className="font-semibold mb-2">{rep.title}</h3>
                  <p className="text-sm text-[var(--text-light)] mb-3">{rep.description}</p>
                  <div className="mb-2">
                    <p className="text-xs font-semibold">Compositores: {rep.composers.join(', ')}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold mb-1">Prioridades:</p>
                    <ul className="text-xs space-y-1">
                      {rep.priorities.map((p, i) => <li key={i}>• {p}</li>)}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case 'actividades':
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-[var(--primary)]">Actividades</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filterBloques(actividades, filters).map(act => (
                <div key={act.id} className="card">
                  <span className="badge badge-info mb-2">{act.code}</span>
                  <h3 className="font-semibold mb-2">{act.title}</h3>
                  <p className="text-sm text-[var(--text-light)] mb-3">{act.description}</p>
                  <div>
                    <p className="text-xs font-semibold mb-1">Objetivos:</p>
                    <ul className="text-xs space-y-1">
                      {act.objectives.map((o, i) => <li key={i}>• {o}</li>)}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case 'recursos':
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-[var(--primary)]">Recursos</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filterBloques(recursos, filters).map(rec => (
                <div key={rec.id} className="card">
                  <span className="badge badge-primary mb-2">{rec.code}</span>
                  <h3 className="font-semibold mb-2">{rec.title}</h3>
                  <p className="text-sm text-[var(--text-light)] mb-3">{rec.description}</p>
                  <div>
                    <p className="text-xs font-semibold mb-1">Tipos:</p>
                    <ul className="text-xs space-y-1">
                      {rec.types.map((t, i) => <li key={i}>• {t}</li>)}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case 'diversidad':
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-[var(--primary)]">Atención a la Diversidad</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filterBloques(diversidad, filters).map(div => (
                <div key={div.id} className="card">
                  <span className="badge badge-success mb-2">{div.code}</span>
                  <h3 className="font-semibold mb-2">{div.title}</h3>
                  <p className="text-sm text-[var(--text-light)] mb-3">{div.description}</p>
                  <div>
                    <p className="text-xs font-semibold mb-1">Estrategias:</p>
                    <ul className="text-xs space-y-1">
                      {div.strategies.map((s, i) => <li key={i}>• {s}</li>)}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case 'temporalizacion':
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-[var(--primary)]">Temporalización</h2>
            <div className="space-y-4">
              {temporalizacion.map(temp => (
                <div key={temp.term} className="card">
                  <h3 className="font-semibold mb-2">{temp.term}º Trimestre</h3>
                  <p className="text-sm text-[var(--text-light)] mb-3"><strong>Propósito:</strong> {temp.purpose}</p>
                  <div className="mb-3">
                    <p className="text-xs font-semibold mb-1">Secuencia de trabajo:</p>
                    <div className="flex gap-1 flex-wrap">
                      {temp.sequence.map((s, i) => <span key={i} className="badge badge-info text-xs">{s}</span>)}
                    </div>
                  </div>
                  <div>
                    <p className="text-xs font-semibold mb-1">Actividades clave:</p>
                    <ul className="text-xs space-y-1">
                      {temp.activities.map((a, i) => <li key={i}>• {a}</li>)}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case 'transversales':
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-[var(--primary)]">Elementos Transversales</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filterBloques(transversales, filters).map(trans => (
                <div key={trans.id} className="card">
                  <span className="badge badge-warning mb-2">{trans.code}</span>
                  <h3 className="font-semibold mb-2">{trans.title}</h3>
                  <p className="text-sm text-[var(--text-light)] mb-3">{trans.description}</p>
                  <div>
                    <p className="text-xs font-semibold mb-1">Actividades:</p>
                    <ul className="text-xs space-y-1">
                      {trans.activities.map((a, i) => <li key={i}>• {a}</li>)}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case 'normativa':
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-[var(--primary)]">Normativa</h2>
            <div className="space-y-4">
              {normativa.map(norm => (
                <div key={norm.code} className="card">
                  <span className="badge badge-primary mb-2">{norm.code}</span>
                  <h3 className="font-semibold mb-2">{norm.title}</h3>
                  <p className="text-sm text-[var(--text-light)] mb-3">{norm.description}</p>
                  <div className="text-xs space-y-1">
                    <p><strong>Rango:</strong> {norm.rank}</p>
                    <p><strong>Fecha:</strong> {norm.date}</p>
                    <p><strong>Ámbito:</strong> {norm.scope}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case 'evaluacionFinal':
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-[var(--primary)]">Evaluación Final</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filterBloques(evaluacionFinal, filters).map(ev => (
                <div key={ev.id} className="card">
                  <span className="badge badge-danger mb-2">{ev.code}</span>
                  <h3 className="font-semibold mb-2">{ev.title}</h3>
                  <p className="text-sm text-[var(--text-light)] mb-3">{ev.description}</p>
                  <div className="mb-2">
                    <p className="text-xs font-semibold">Temporalización: {ev.timing}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold mb-1">Procedimiento:</p>
                    <ul className="text-xs space-y-1">
                      {ev.procedure.map((p, i) => <li key={i}>• {p}</li>)}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[var(--primary)]">Bloques de Contenido</h1>
        <p className="text-sm text-[var(--text-light)]">13 bloques de contenido del programa didáctico</p>
      </div>

      {/* Pestañas */}
      <div className="flex gap-2 border-b border-[var(--border)] pb-2 overflow-x-auto">
        {bloques.map(bloque => (
          <button
            key={bloque.id}
            onClick={() => setActiveBloque(bloque.id)}
            className={`px-4 py-2 rounded-t-lg text-sm font-medium whitespace-nowrap transition ${
              activeBloque === bloque.id
                ? 'bg-[var(--primary)] text-white'
                : 'hover:bg-[var(--bg-alt)] text-[var(--text)]'
            }`}
          >
            {bloque.label}
          </button>
        ))}
      </div>

      {/* Filtros */}
      <div className="card">
        <div className="flex flex-wrap gap-3 items-center">
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

          <select
            value={filters.course}
            onChange={(e) => setFilters({ ...filters, course: e.target.value as any })}
            className="form-select w-auto"
          >
            <option value="All">Todos los cursos</option>
            {[1, 2, 3, 4, 5, 6].map(c => <option key={c} value={c}>{c}º curso</option>)}
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
            onClick={() => setFilters({ subject: 'All', course: 'All', search: '' })}
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

      {/* Contenido */}
      {renderContent()}
    </div>
  );
}
