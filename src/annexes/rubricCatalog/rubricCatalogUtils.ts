// =====================================================
// UTILIDADES - Catálogo de Rúbricas
// =====================================================

import { Rubric, RubricCatalogFilters, TraceabilityChain } from './rubricCatalogTypes';

// Filtrar rúbricas según criterios
export const filterRubrics = (rubrics: Rubric[], filters: RubricCatalogFilters): Rubric[] => {
  return rubrics.filter(rubric => {
    if (filters.subject !== 'All' && rubric.subject !== 'All' && rubric.subject !== filters.subject) return false;
    if (filters.course !== 'All' && rubric.course !== 'All' && rubric.course !== filters.course) return false;
    if (filters.criterion !== 'All' && !rubric.criterionCodes.includes(filters.criterion)) return false;
    if (filters.competence !== 'All' && !rubric.competenceCodes.includes(filters.competence)) return false;
    if (filters.search) {
      const search = filters.search.toLowerCase();
      const searchable = `${rubric.code} ${rubric.title} ${rubric.levels.initial} ${rubric.levels.developing} ${rubric.levels.adequate} ${rubric.levels.consolidated}`.toLowerCase();
      if (!searchable.includes(search)) return false;
    }
    return true;
  });
};

// Filtrar cadenas de trazabilidad
export const filterChains = (chains: TraceabilityChain[], filters: RubricCatalogFilters): TraceabilityChain[] => {
  return chains.filter(chain => {
    if (filters.subject !== 'All' && chain.subject !== filters.subject) return false;
    if (filters.course !== 'All' && chain.course !== filters.course) return false;
    if (filters.criterion !== 'All' && chain.criterionCode !== filters.criterion) return false;
    if (filters.competence !== 'All' && chain.competenceCode !== filters.competence) return false;
    if (filters.search) {
      const search = filters.search.toLowerCase();
      const searchable = `${chain.contentTitle} ${chain.objectiveTitle} ${chain.criterionTitle} ${chain.competenceTitle} ${chain.activityTitle} ${chain.unitCode}`.toLowerCase();
      if (!searchable.includes(search)) return false;
    }
    return true;
  });
};

// Exportar rúbricas a CSV
export const exportRubricsToCSV = (rubrics: Rubric[], filename: string): void => {
  const headers = ['Código', 'Título', 'Materia', 'Curso', 'Criterios', 'Competencias', 'Inicial', 'En Desarrollo', 'Adecuado', 'Consolidado', 'Evidencias', 'Instrumentos'];
  const rows = rubrics.map(r => [
    r.code,
    r.title,
    r.subject || 'Todas',
    r.course?.toString() || 'Todos',
    r.criterionCodes.join(', '),
    r.competenceCodes.join(', '),
    r.levels.initial,
    r.levels.developing,
    r.levels.adequate,
    r.levels.consolidated,
    r.evidence.join(', '),
    r.instruments.join(', '),
  ]);

  const csv = [headers, ...rows].map(row => row.map(cell => `"${cell}"`).join(';')).join('\n');
  const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${filename}_${new Date().toISOString().split('T')[0]}.csv`;
  a.click();
  URL.revokeObjectURL(url);
};

// Exportar cadenas de trazabilidad a CSV
export const exportChainsToCSV = (chains: TraceabilityChain[], filename: string): void => {
  const headers = ['ID', 'Contenido', 'Objetivo', 'Criterio', 'Competencia', 'Actividad', 'Evidencia', 'Instrumento', 'Nivel', 'Unidad', 'Curso', 'Materia'];
  const rows = chains.map(c => [
    c.id,
    c.contentTitle,
    c.objectiveTitle,
    c.criterionTitle,
    c.competenceTitle,
    c.activityTitle,
    c.evidenceTitle,
    c.instrumentTitle,
    c.achievementLevel.toString(),
    c.unitCode,
    c.course.toString(),
    c.subject,
  ]);

  const csv = [headers, ...rows].map(row => row.map(cell => `"${cell}"`).join(';')).join('\n');
  const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${filename}_${new Date().toISOString().split('T')[0]}.csv`;
  a.click();
  URL.revokeObjectURL(url);
};

// Exportar a JSON
export const exportToJSON = (data: unknown, filename: string): void => {
  const json = JSON.stringify(data, null, 2);
  const blob = new Blob([json], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${filename}_${new Date().toISOString().split('T')[0]}.json`;
  a.click();
  URL.revokeObjectURL(url);
};

// Obtener nombre de materia
export const getSubjectName = (subject: string): string => {
  const names: Record<string, string> = {
    'Camara': 'Música de Cámara',
    'Banda': 'Banda',
    'Orquesta': 'Orquesta',
    'All': 'Todas',
  };
  return names[subject] || subject;
};

// Obtener nombre de nivel
export const getLevelName = (level: number): string => {
  const names: Record<number, string> = {
    1: 'Inicial',
    2: 'En Desarrollo',
    3: 'Adecuado',
    4: 'Consolidado',
  };
  return names[level] || level.toString();
};

// Obtener color de nivel
export const getLevelColor = (level: number): string => {
  const colors: Record<number, string> = {
    1: 'bg-red-100 text-red-700 border-red-200',
    2: 'bg-orange-100 text-orange-700 border-orange-200',
    3: 'bg-blue-100 text-blue-700 border-blue-200',
    4: 'bg-green-100 text-green-700 border-green-200',
  };
  return colors[level] || 'bg-gray-100 text-gray-700 border-gray-200';
};
