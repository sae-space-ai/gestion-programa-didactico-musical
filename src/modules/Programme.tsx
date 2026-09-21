// =====================================================
// MÓDULO PROGRAMACIÓN DIDÁCTICA
// Visor de bloques, búsqueda, filtros y exportación
// =====================================================

import { useState } from 'react';
import { AppState } from '../types';
import { generalObjectives, chamberObjectives, bandObjectives, orchestraObjectives, contentBlocks } from '../data/programmeData';
import { Search, Filter, Download, ChevronRight, BookOpen } from 'lucide-react';
import { highlightText } from '../utils/helpers';

interface Props {
  state: AppState;
  updateState: (updates: Partial<AppState>) => void;
  showToast: (msg: string, type?: string) => void;
}

export default function Programme({ showToast }: Props) {
  const [search, setSearch] = useState('');
  const [activeBlock, setActiveBlock] = useState<string>('objetivos');
  const [filterType, setFilterType] = useState<string>('all');

  const blocks = [
    { id: 'objetivos', title: 'Bloque 0: Objetivos', icon: BookOpen },
    { id: 'contenidos', title: 'Bloque I: Contenidos', icon: BookOpen },
    { id: 'competencias', title: 'Bloque II: Competencias', icon: BookOpen },
    { id: 'metodologia', title: 'Bloque III: Metodología', icon: BookOpen },
    { id: 'evaluacion', title: 'Bloque IV: Evaluación', icon: BookOpen },
    { id: 'repertorio', title: 'Bloque V: Repertorio', icon: BookOpen },
    { id: 'actividades', title: 'Bloque VI: Actividades', icon: BookOpen },
    { id: 'recursos', title: 'Bloque VII: Recursos', icon: BookOpen },
    { id: 'atencion', title: 'Bloque VIII: Atención a la diversidad', icon: BookOpen },
    { id: 'temporalizacion', title: 'Bloque IX: Temporalización', icon: BookOpen },
    { id: 'transversales', title: 'Bloque X: Elementos transversales', icon: BookOpen },
    { id: 'normativa', title: 'Bloque XI: Normativa', icon: BookOpen },
    { id: 'evaluacion_final', title: 'Bloque XII: Evaluación final', icon: BookOpen },
  ];

  const filteredObjectives = () => {
    let objs = [...generalObjectives];
    if (filterType === 'chamber' || filterType === 'all') objs = [...objs, ...chamberObjectives];
    if (filterType === 'band' || filterType === 'all') objs = [...objs, ...bandObjectives];
    if (filterType === 'orchestra' || filterType === 'all') objs = [...objs, ...orchestraObjectives];
    if (search) {
      objs = objs.filter(o => o.description.toLowerCase().includes(search.toLowerCase()) || o.code.toLowerCase().includes(search.toLowerCase()));
    }
    return objs;
  };

  const handlePrint = () => {
    window.print();
    showToast('Preparando impresión...');
  };

  return (
    <div className="space-y-6">
      {/* Cabecera */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[var(--primary)]">Programación Didáctica</h1>
          <p className="text-sm text-[var(--text-light)]">
            Programa Didáctico de Música de Cámara, Banda y Orquesta · {new Date().getFullYear()}/{new Date().getFullYear() + 1}
          </p>
        </div>
        <button onClick={handlePrint} className="btn btn-primary">
          <Download size={16} /> Exportar PDF
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Índice lateral */}
        <div className="lg:w-64 shrink-0">
          <div className="card sticky top-20">
            <h3 className="font-semibold text-sm mb-3 text-[var(--primary)]">Índice de bloques</h3>
            <nav className="space-y-1">
              {blocks.map(block => (
                <button
                  key={block.id}
                  onClick={() => setActiveBlock(block.id)}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm flex items-center gap-2 transition ${
                    activeBlock === block.id
                      ? 'bg-[var(--primary)] text-white'
                      : 'hover:bg-[var(--bg-alt)] text-[var(--text)]'
                  }`}
                >
                  <ChevronRight size={14} />
                  <span className="truncate">{block.title}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Contenido principal */}
        <div className="flex-1 min-w-0">
          {/* Barra de búsqueda y filtros */}
          <div className="card mb-4">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Buscar en la programación..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 rounded-lg border border-[var(--border)] text-sm focus:outline-none focus:border-[var(--primary)] bg-[var(--bg)]"
                />
              </div>
              <div className="flex items-center gap-2">
                <Filter size={16} className="text-[var(--text-light)]" />
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="form-select w-auto"
                >
                  <option value="all">Todas las asignaturas</option>
                  <option value="chamber">Cámara</option>
                  <option value="band">Banda</option>
                  <option value="orchestra">Orquesta</option>
                </select>
              </div>
            </div>
          </div>

          {/* Contenido del bloque activo */}
          <div className="card">
            {activeBlock === 'objetivos' && (
              <div>
                <h2 className="text-xl font-bold text-[var(--primary)] mb-4">Objetivos</h2>
                
                <h3 className="font-semibold text-[var(--primary)] mb-2 mt-4">Objetivos Generales ({generalObjectives.length})</h3>
                <div className="space-y-2 mb-6">
                  {filteredObjectives().filter(o => o.type === 'general').map(obj => (
                    <div key={obj.code} className="p-3 rounded-lg bg-[var(--bg-alt)] border border-[var(--border)]">
                      <span className="badge badge-primary mr-2">{obj.code}</span>
                      <span className="text-sm" dangerouslySetInnerHTML={{ __html: highlightText(obj.description, search) }} />
                    </div>
                  ))}
                </div>

                <h3 className="font-semibold text-[var(--primary)] mb-2">Objetivos Específicos - Cámara ({chamberObjectives.length})</h3>
                <div className="space-y-2 mb-6">
                  {filteredObjectives().filter(o => o.type === 'chamber').map(obj => (
                    <div key={obj.code} className="p-3 rounded-lg bg-[var(--bg-alt)] border border-[var(--border)]">
                      <span className="badge badge-info mr-2">{obj.code}</span>
                      <span className="text-sm" dangerouslySetInnerHTML={{ __html: highlightText(obj.description, search) }} />
                    </div>
                  ))}
                </div>

                <h3 className="font-semibold text-[var(--primary)] mb-2">Objetivos Específicos - Banda ({bandObjectives.length})</h3>
                <div className="space-y-2 mb-6">
                  {filteredObjectives().filter(o => o.type === 'band').map(obj => (
                    <div key={obj.code} className="p-3 rounded-lg bg-[var(--bg-alt)] border border-[var(--border)]">
                      <span className="badge badge-success mr-2">{obj.code}</span>
                      <span className="text-sm" dangerouslySetInnerHTML={{ __html: highlightText(obj.description, search) }} />
                    </div>
                  ))}
                </div>

                <h3 className="font-semibold text-[var(--primary)] mb-2">Objetivos Específicos - Orquesta ({orchestraObjectives.length})</h3>
                <div className="space-y-2">
                  {filteredObjectives().filter(o => o.type === 'orchestra').map(obj => (
                    <div key={obj.code} className="p-3 rounded-lg bg-[var(--bg-alt)] border border-[var(--border)]">
                      <span className="badge badge-warning mr-2">{obj.code}</span>
                      <span className="text-sm" dangerouslySetInnerHTML={{ __html: highlightText(obj.description, search) }} />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeBlock === 'contenidos' && (
              <div>
                <h2 className="text-xl font-bold text-[var(--primary)] mb-4">Contenidos</h2>
                <p className="text-sm text-[var(--text-light)] mb-4">10 bloques de contenido general organizados por áreas.</p>
                <div className="space-y-3">
                  {contentBlocks.map(block => (
                    <div key={block.code} className="p-4 rounded-lg border border-[var(--border)]">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="badge badge-primary">{block.code}</span>
                        <h4 className="font-semibold text-sm">{block.title}</h4>
                      </div>
                      <p className="text-sm text-[var(--text-light)]">{block.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeBlock === 'competencias' && (
              <div>
                <h2 className="text-xl font-bold text-[var(--primary)] mb-4">Competencias</h2>
                <p className="text-sm text-[var(--text-light)] mb-4">Competencias específicas, transversales y de ámbito.</p>
                <div className="space-y-4">
                  {[
                    { title: 'Competencias Musicales (CM)', items: ['CM-1: Interpretar con corrección técnica y expresividad', 'CM-2: Leer e interpretar partituras', 'CM-3: Escuchar activamente y analizar', 'CM-4: Crear y componer', 'CM-5: Improvisar', 'CM-6: Transcribir y arreglar', 'CM-7: Conocer el patrimonio musical'] },
                    { title: 'Competencias Interpretativas (CI)', items: ['CI-1: Criterios estilísticos', 'CI-2: Identidad sonora personal', 'CI-3: Gestión del estrés escénico', 'CI-4: Comunicación al público', 'CI-5: Adaptación acústica', 'CI-6: Integración técnica-expresiva'] },
                    { title: 'Competencias Personales/Sociales (CPS)', items: ['CPS-1: Trabajo colaborativo', 'CPS-2: Comunicación eficaz', 'CPS-3: Gestión emocional', 'CPS-4: Empatía y respeto', 'CPS-5: Responsabilidad', 'CPS-6: Valoración de la diversidad'] },
                    { title: 'Competencias de Autonomía (CA)', items: ['CA-1: Planificación del estudio', 'CA-2: Autoevaluación', 'CA-3: Toma de decisiones', 'CA-4: Búsqueda de recursos', 'CA-5: Establecer objetivos'] },
                    { title: 'Competencias Digitales (CD)', items: ['CD-1: Software de notación', 'CD-2: Grabación y edición', 'CD-3: Apps musicales', 'CD-4: Recursos en internet', 'CD-5: Contenido digital'] },
                  ].map((section, i) => (
                    <div key={i}>
                      <h3 className="font-semibold text-[var(--primary)] mb-2">{section.title}</h3>
                      <ul className="space-y-1">
                        {section.items.map((item, j) => (
                          <li key={j} className="text-sm p-2 rounded bg-[var(--bg-alt)]">{item}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeBlock === 'metodologia' && (
              <div>
                <h2 className="text-xl font-bold text-[var(--primary)] mb-4">Metodología</h2>
                <div className="prose prose-sm max-w-none">
                  <p className="text-sm mb-3">La metodología se basa en los siguientes principios:</p>
                  <ul className="space-y-2 text-sm">
                    <li className="p-2 bg-[var(--bg-alt)] rounded">• <strong>Aprendizaje cooperativo:</strong> El trabajo en grupo es el eje vertebrador de la asignatura.</li>
                    <li className="p-2 bg-[var(--bg-alt)] rounded">• <strong>Ensayo deliberado:</strong> Práctica consciente con objetivos claros en cada sesión.</li>
                    <li className="p-2 bg-[var(--bg-alt)] rounded">• <strong>Modelado:</strong> El profesor como guía y referente interpretativo.</li>
                    <li className="p-2 bg-[var(--bg-alt)] rounded">• <strong>Grabación y análisis:</strong> Uso de tecnología para la autoevaluación.</li>
                    <li className="p-2 bg-[var(--bg-alt)] rounded">• <strong>Aprendizaje por proyectos:</strong> Cada trimestre culmina con una actuación pública.</li>
                    <li className="p-2 bg-[var(--bg-alt)] rounded">• <strong>Tutoría entre pares:</strong> Alumnos avanzados apoyan a compañeros.</li>
                    <li className="p-2 bg-[var(--bg-alt)] rounded">• <strong>Interdisciplinariedad:</strong> Conexión con lenguaje musical, historia, análisis.</li>
                  </ul>
                </div>
              </div>
            )}

            {activeBlock === 'evaluacion' && (
              <div>
                <h2 className="text-xl font-bold text-[var(--primary)] mb-4">Sistema de Evaluación</h2>
                <div className="space-y-4 text-sm">
                  <div className="p-4 rounded-lg border border-[var(--border)]">
                    <h4 className="font-semibold mb-2">Evaluación por Criterios</h4>
                    <p>12 criterios de evaluación (CO-01 a CO-12) con rúbricas de 4 niveles.</p>
                    <p className="mt-1"><strong>Fórmula:</strong> Nota = (suma ponderada × 10) / (peso máximo posible)</p>
                  </div>
                  <div className="p-4 rounded-lg border border-[var(--border)]">
                    <h4 className="font-semibold mb-2">Evaluación por Tribunal</h4>
                    <p>6 criterios específicos con niveles 1-4.</p>
                    <p className="mt-1"><strong>Fórmula:</strong> Nota = (suma × 10) / 24</p>
                  </div>
                  <div className="p-4 rounded-lg border border-[var(--border)]">
                    <h4 className="font-semibold mb-2">Escala de Calificación</h4>
                    <div className="grid grid-cols-2 gap-2 mt-2">
                      <span className="badge badge-danger">Insuficiente: 1-4</span>
                      <span className="badge badge-warning">Suficiente: 4-5</span>
                      <span className="badge badge-info">Bien: 5-7</span>
                      <span className="badge badge-success">Notable: 7-9</span>
                      <span className="badge badge-primary">Sobresaliente: 9-10</span>
                      <span className="text-xs text-[var(--text-muted)]">Aprobado ≥ 5</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {!['objetivos', 'contenidos', 'competencias', 'metodologia', 'evaluacion'].includes(activeBlock) && (
              <div>
                <h2 className="text-xl font-bold text-[var(--primary)] mb-4">
                  {blocks.find(b => b.id === activeBlock)?.title}
                </h2>
                <div className="p-8 text-center text-[var(--text-muted)]">
                  <BookOpen size={48} className="mx-auto mb-4 opacity-30" />
                  <p className="text-sm">Contenido del bloque en desarrollo.</p>
                  <p className="text-xs mt-2">Esta sección incluye información detallada sobre {blocks.find(b => b.id === activeBlock)?.title.replace('Bloque X: ', '').replace('Bloque XI: ', '').replace('Bloque XII: ', '').toLowerCase()}.</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
