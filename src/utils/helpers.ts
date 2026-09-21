// =====================================================
// UTILIDADES - Cálculos de notas, exportaciones, etc.
// Programa Didáctico 2026/2027
// =====================================================

import { RubricLevel, TribunalLevel, Settings } from '../types';

// --- CÁLCULO DE NOTAS ---

// Convertir nivel de rúbrica a valor numérico (1-4)
export const rubricLevelToNumber = (level: RubricLevel): number => {
  switch (level) {
    case 'Initial': return 1;
    case 'Developing': return 2;
    case 'Adequate': return 3;
    case 'Consolidated': return 4;
  }
};

// Convertir valor numérico a nivel de rúbrica
export const numberToRubricLevel = (value: number): RubricLevel => {
  if (value <= 1.5) return 'Initial';
  if (value <= 2.5) return 'Developing';
  if (value <= 3.5) return 'Adequate';
  return 'Consolidated';
};

// Calcular nota por criterios: (suma ponderada × 10) / 24
export const calculateCriteriaGrade = (
  criteriaValues: Record<string, RubricLevel>,
  settings: Settings
): number => {
  let weightedSum = 0;
  let totalWeight = 0;
  
  Object.entries(criteriaValues).forEach(([code, level]) => {
    const weight = settings.weightings.criteriaWeights[code] || 2;
    weightedSum += rubricLevelToNumber(level) * weight;
    totalWeight += weight;
  });
  
  if (totalWeight === 0) return 0;
  
  // Fórmula: (suma ponderada × 10) / (total peso × 4) × (24/totalWeight)
  // Simplificado: nota = (weightedSum / totalWeight) × (10/4) × (24/6)
  // Usando la fórmula del tribunal: (suma × 10) / 24
  const maxPossible = totalWeight * 4; // máximo si todo fuera Consolidated
  const grade = (weightedSum * 10) / maxPossible * (24 / (totalWeight * 4)) * (totalWeight * 4 / 6);
  
  // Fórmula simplificada y correcta:
  // Cada criterio vale máximo 4 puntos. Suma máxima = totalWeight × 4
  // Nota = (weightedSum / (totalWeight × 4)) × 10
  const finalGrade = Math.round((weightedSum / (totalWeight * 4)) * 10);
  
  return Math.min(10, Math.max(1, finalGrade));
};

// Calcular nota de tribunal: (suma × 10) / 24
export const calculateTribunalGrade = (
  criteria: Record<string, TribunalLevel>
): number => {
  const sum = Object.values(criteria).reduce((acc, val) => acc + val, 0);
  const grade = Math.round((sum * 10) / 24);
  return Math.min(10, Math.max(1, grade));
};

// Calcular media del tribunal
export const calculateTribunalAverage = (grades: number[]): number => {
  if (grades.length === 0) return 0;
  const sum = grades.reduce((a, b) => a + b, 0);
  return Math.round((sum / grades.length) * 10) / 10;
};

// Determinar si está aprobado (≥5)
export const isPassing = (grade: number): boolean => grade >= 5;

// Obtener calificación cualitativa
export const getQualitativeGrade = (grade: number): string => {
  if (grade >= 9) return 'Sobresaliente';
  if (grade >= 7) return 'Notable';
  if (grade >= 5) return 'Bien';
  if (grade >= 4) return 'Suficiente';
  return 'Insuficiente';
};

// --- EXPORTACIÓN CSV ---
export const exportCSV = (data: Record<string, unknown>[], filename: string): void => {
  if (data.length === 0) return;
  
  const headers = Object.keys(data[0]);
  const csvContent = [
    headers.join(';'),
    ...data.map(row => headers.map(h => {
      const val = row[h];
      const str = typeof val === 'object' ? JSON.stringify(val) : String(val ?? '');
      return `"${str.replace(/"/g, '""')}"`;
    }).join(';'))
  ].join('\n');
  
  const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${filename}_${new Date().toISOString().split('T')[0]}.csv`;
  a.click();
  URL.revokeObjectURL(url);
};

// Importar CSV de estudiantes
export const parseCSVStudents = (csv: string): Array<{firstName: string; lastName: string; instrument: string; course: number}> => {
  const lines = csv.split('\n').filter(l => l.trim());
  if (lines.length < 2) return [];
  
  return lines.slice(1).map(line => {
    const parts = line.split(/[;,]/).map(p => p.trim().replace(/^"|"$/g, ''));
    return {
      firstName: parts[0] || '',
      lastName: parts[1] || '',
      instrument: parts[2] || '',
      course: parseInt(parts[3]) || 1,
    };
  }).filter(s => s.firstName && s.lastName);
};

// --- GENERACIÓN DE ID ---
export const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

// --- FECHAS ---
export const formatDate = (dateStr: string): string => {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  return date.toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' });
};

export const getTodayString = (): string => {
  return new Date().toISOString().split('T')[0];
};

// --- ESTADÍSTICAS ---
export const calculateAverage = (values: number[]): number => {
  if (values.length === 0) return 0;
  return Math.round((values.reduce((a, b) => a + b, 0) / values.length) * 10) / 10;
};

export const calculateDistribution = (grades: number[]): Record<string, number> => {
  const dist: Record<string, number> = {
    'Insuficiente (1-4)': 0,
    'Suficiente (4-5)': 0,
    'Bien (5-7)': 0,
    'Notable (7-9)': 0,
    'Sobresaliente (9-10)': 0,
  };
  
  grades.forEach(g => {
    if (g < 4) dist['Insuficiente (1-4)']++;
    else if (g < 5) dist['Suficiente (4-5)']++;
    else if (g < 7) dist['Bien (5-7)']++;
    else if (g < 9) dist['Notable (7-9)']++;
    else dist['Sobresaliente (9-10)']++;
  });
  
  return dist;
};

// --- BÚSQUEDA GLOBAL ---
export const searchInText = (text: string, query: string): boolean => {
  if (!query) return true;
  return text.toLowerCase().includes(query.toLowerCase());
};

// Resaltar coincidencias en texto
export const highlightText = (text: string, query: string): string => {
  if (!query) return text;
  const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
  return text.replace(regex, '<mark class="bg-yellow-200 px-0.5 rounded">$1</mark>');
};
