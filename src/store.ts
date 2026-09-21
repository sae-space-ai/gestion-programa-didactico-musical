// =====================================================
// GESTIÓN DE ESTADO - Persistencia con IndexedDB
// Offline-first: todos los datos se guardan localmente
// Programa Didáctico 2026/2027
// =====================================================

import { AppState } from './types';
import {
  seedDatabase,
  loadFromDB,
  saveToDB,
  clearDatabase,
  resetToSeed,
  getStorageInfo,
  isIndexedDBAvailable,
} from './db/seed';

// Re-exportar funciones de db/seed para uso externo
export {
  seedDatabase,
  loadFromDB,
  saveToDB,
  clearDatabase,
  resetToSeed,
  getStorageInfo,
  isIndexedDBAvailable,
};

// =====================================================
// CARGAR ESTADO (usando seedDatabase si es primera vez)
// =====================================================
export const loadState = async (): Promise<AppState> => {
  return await seedDatabase();
};

// =====================================================
// GUARDAR ESTADO EN INDEXEDDB
// =====================================================
export const saveState = async (state: AppState): Promise<void> => {
  await saveToDB(state);
};

// =====================================================
// EXPORTAR ESTADO COMO JSON (backup)
// =====================================================
export const exportJSON = (state: AppState): void => {
  const blob = new Blob([JSON.stringify(state, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `backup_programa_didactico_${new Date().toISOString().split('T')[0]}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

// =====================================================
// IMPORTAR ESTADO DESDE JSON (restaurar backup)
// =====================================================
export const importJSON = (file: File): Promise<AppState> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target?.result as string) as AppState;
        resolve(data);
      } catch (err) {
        reject(new Error('Error al leer el archivo JSON'));
      }
    };
    reader.onerror = () => reject(new Error('Error al leer el archivo'));
    reader.readAsText(file);
  });
};

// =====================================================
// RESETEAR ESTADO A VALORES INICIALES
// =====================================================
export const resetState = async (): Promise<AppState> => {
  return await resetToSeed();
};

// =====================================================
// EXPORTAR CSV
// =====================================================
export const exportCSV = (data: Record<string, unknown>[], filename: string): void => {
  if (data.length === 0) return;

  const headers = Object.keys(data[0]);
  const csvContent = [
    headers.join(';'),
    ...data.map((row) =>
      headers
        .map((h) => {
          const val = row[h];
          const str = typeof val === 'object' ? JSON.stringify(val) : String(val ?? '');
          return `"${str.replace(/"/g, '""')}"`;
        })
        .join(';')
    ),
  ].join('\n');

  const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${filename}_${new Date().toISOString().split('T')[0]}.csv`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};
