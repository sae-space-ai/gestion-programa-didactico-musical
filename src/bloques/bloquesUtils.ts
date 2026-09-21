// Utilidades para el módulo Bloques de Contenido

import { BloquesFilters, Bloque } from './bloquesTypes';

export const filterBloques = <T extends Bloque>(items: T[], filters: BloquesFilters): T[] => {
  return items.filter(item => {
    if (filters.subject !== 'All' && item.subject && item.subject !== 'All' && item.subject !== filters.subject) return false;
    if (filters.course !== 'All' && item.course && item.course !== 'All' && item.course !== filters.course) return false;
    if (filters.search) {
      const search = filters.search.toLowerCase();
      const searchable = `${item.code} ${item.title} ${item.description}`.toLowerCase();
      if (!searchable.includes(search)) return false;
    }
    return true;
  });
};

export const exportBloquesToCSV = (items: Bloque[], filename: string): void => {
  const headers = ['Código', 'Título', 'Descripción', 'Materia', 'Curso', 'Objetivos Relacionados', 'Criterios Relacionados', 'Competencias Relacionadas'];
  const rows = items.map(item => [
    item.code,
    item.title,
    item.description,
    item.subject || 'Todas',
    item.course?.toString() || 'Todos',
    item.relatedObjectives?.join(', ') || '',
    item.relatedCriteria?.join(', ') || '',
    item.relatedCompetences?.join(', ') || '',
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

export const getSubjectName = (subject: string): string => {
  const names: Record<string, string> = {
    'Camara': 'Cámara',
    'Banda': 'Banda',
    'Orquesta': 'Orquesta',
    'All': 'Todas',
  };
  return names[subject] || subject;
};
