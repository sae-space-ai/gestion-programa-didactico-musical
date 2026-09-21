// =====================================================
// MATRIZ DE TRAZABILIDAD - Catálogo de Rúbricas
// Contenido → Objetivo → Criterio → Competencia → Actividad → Evidencia → Instrumento → Nivel → Unidad
// =====================================================

import { TraceabilityChain, Subject, Course, AchievementLevel } from './rubricCatalogTypes';

// Criterios
const criteria: Record<string, string> = {
  'CO-01': 'Preparación de las partes y del repertorio',
  'CO-02': 'Ritmo, pulso y coordinación',
  'CO-03': 'Escucha y ajuste',
  'CO-04': 'Afinación, sonido y calidad tímbrica',
  'CO-05': 'Articulación, dinámica e intensidad',
  'CO-06': 'Balance y función musical',
  'CO-07': 'Interpretación y discurso musical',
  'CO-08': 'Adaptación al conjunto',
  'CO-09': 'Continuidad y recuperación',
  'CO-10': 'Resolución de problemas interpretativos',
  'CO-11': 'Autonomía y responsabilidad',
  'CO-12': 'Revisión y transferencia',
};

// Competencias
const competences: Record<string, string> = {
  'CM-1': 'Interpretar con corrección técnica y expresividad',
  'CM-2': 'Leer e interpretar partituras con fluidez',
  'CM-3': 'Escuchar activamente y analizar música',
  'CI-1': 'Aplicar criterios estilísticos',
  'CI-2': 'Desarrollar identidad sonora personal',
  'CI-3': 'Gestionar tensión escénica y concentración',
  'CPS-1': 'Trabajar colaborativamente en equipo',
  'CPS-2': 'Comunicarse eficazmente',
  'CA-1': 'Planificar y organizar el estudio',
  'CA-2': 'Autoevaluarse con criterio',
  'CD-1': 'Utilizar software de notación musical',
};

// Contenidos
const contents: Record<string, string> = {
  'CB-01': 'Técnica instrumental aplicada a la práctica colectiva',
  'CB-02': 'Lectura e interpretación de partituras',
  'CB-03': 'Afinación y equilibrio sonoro',
  'CB-04': 'Ritmo, pulso y coordinación grupal',
  'CB-05': 'Repertorio por estilos y épocas',
  'CB-06': 'Improvisación y creación colectiva',
  'CB-07': 'Historia de las formaciones instrumentales',
  'CB-08': 'Interpretación y expresión musical',
  'CB-09': 'Tecnología aplicada a la música',
  'CB-10': 'Patrimonio musical extremeño y español',
};

// Actividades
const activities: Record<string, string> = {
  'ACT-01': 'Ensayo de sección',
  'ACT-02': 'Ensayo general',
  'ACT-03': 'Lectura a primera vista',
  'ACT-04': 'Audición interna',
  'ACT-05': 'Concierto público',
  'ACT-06': 'Grabación de ensayo',
  'ACT-07': 'Análisis de partitura',
  'ACT-08': 'Autoevaluación guiada',
};

// Evidencias
const evidences: Record<string, string> = {
  'EV-01': 'Grabación de ensayo',
  'EV-02': 'Partitura anotada',
  'EV-03': 'Autoinforme',
  'EV-04': 'Grabación de actuación',
  'EV-05': 'Diario de ensayos',
  'EV-06': 'Informe de progreso',
};

// Instrumentos
const instruments: Record<string, string> = {
  'INS-01': 'Rúbrica de interpretación',
  'INS-02': 'Observación directa',
  'INS-03': 'Autoevaluación',
  'INS-04': 'Coevaluación',
  'INS-05': 'Rúbrica de tribunal',
};

// Generar cadenas de trazabilidad
function generateChains(): TraceabilityChain[] {
  const chains: TraceabilityChain[] = [];
  const subjects: Subject[] = ['Banda', 'Orquesta', 'Camara'];
  const courses: Course[] = [1, 2, 3, 4, 5, 6];
  const criterionKeys = Object.keys(criteria);
  const competenceKeys = Object.keys(competences);
  const contentKeys = Object.keys(contents);
  const activityKeys = Object.keys(activities);
  const evidenceKeys = Object.keys(evidences);
  const instrumentKeys = Object.keys(instruments);
  const levels: AchievementLevel[] = [1, 2, 3, 4];

  let id = 1;

  // Generar cadenas para cada combinación materia-curso-criterio
  for (const subject of subjects) {
    for (const course of courses) {
      // Cámara solo en cursos 4-6
      if (subject === 'Camara' && course < 4) continue;

      for (const criterionCode of criterionKeys) {
        const contentIdx = (id - 1) % contentKeys.length;
        const competenceIdx = (id - 1) % competenceKeys.length;
        const activityIdx = (id - 1) % activityKeys.length;
        const evidenceIdx = (id - 1) % evidenceKeys.length;
        const instrumentIdx = (id - 1) % instrumentKeys.length;
        const levelIdx = (id - 1) % levels.length;

        const contentCode = contentKeys[contentIdx];
        const competenceCode = competenceKeys[competenceIdx];
        const activityCode = activityKeys[activityIdx];
        const evidenceCode = evidenceKeys[evidenceIdx];
        const instrumentCode = instrumentKeys[instrumentIdx];
        const level = levels[levelIdx];

        const subjectPrefix = subject === 'Banda' ? 'B' : subject === 'Orquesta' ? 'O' : 'MC';
        const unitCode = `UD-${subjectPrefix}${course}.${Math.floor((id - 1) / 12) + 1}`;

        chains.push({
          id: `TC-${String(id).padStart(4, '0')}`,
          contentId: contentCode,
          contentTitle: contents[contentCode],
          objectiveId: `OG-${String((id % 26) + 1).padStart(2, '0')}`,
          objectiveTitle: `Objetivo general ${String((id % 26) + 1).padStart(2, '0')}`,
          criterionCode,
          criterionTitle: criteria[criterionCode],
          competenceCode,
          competenceTitle: competences[competenceCode],
          activityId: activityCode,
          activityTitle: activities[activityCode],
          evidenceId: evidenceCode,
          evidenceTitle: evidences[evidenceCode],
          instrumentId: instrumentCode,
          instrumentTitle: instruments[instrumentCode],
          achievementLevel: level,
          unitCode,
          course,
          subject,
        });

        id++;
      }
    }
  }

  return chains;
}

export const traceabilityMatrix: TraceabilityChain[] = generateChains();

// Helpers para filtrar
export const getChainsBySubject = (subject: Subject): TraceabilityChain[] =>
  traceabilityMatrix.filter(c => c.subject === subject);

export const getChainsByCourse = (course: Course): TraceabilityChain[] =>
  traceabilityMatrix.filter(c => c.course === course);

export const getChainsByCriterion = (criterionCode: string): TraceabilityChain[] =>
  traceabilityMatrix.filter(c => c.criterionCode === criterionCode);

export const getChainsByCompetence = (competenceCode: string): TraceabilityChain[] =>
  traceabilityMatrix.filter(c => c.competenceCode === competenceCode);

export const getChainsByUnit = (unitCode: string): TraceabilityChain[] =>
  traceabilityMatrix.filter(c => c.unitCode === unitCode);

export const searchChains = (query: string): TraceabilityChain[] => {
  const q = query.toLowerCase();
  return traceabilityMatrix.filter(c =>
    c.contentTitle.toLowerCase().includes(q) ||
    c.objectiveTitle.toLowerCase().includes(q) ||
    c.criterionTitle.toLowerCase().includes(q) ||
    c.competenceTitle.toLowerCase().includes(q) ||
    c.activityTitle.toLowerCase().includes(q) ||
    c.unitCode.toLowerCase().includes(q)
  );
};
