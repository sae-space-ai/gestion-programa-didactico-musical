// =====================================================
// GESTIÓN DE ESTADO - Persistencia con localStorage
// Programa Didáctico 2026/2027
// =====================================================

import { AppState } from './types';
import { getInitialState } from './data/sampleData';

const STORAGE_KEY = 'programa_didactico_2026_2027';

// Cargar estado desde localStorage
export const loadState = (): AppState => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      return JSON.parse(saved) as AppState;
    }
  } catch (e) {
    console.error('Error cargando estado:', e);
  }
  return getInitialState();
};

// Guardar estado en localStorage
export const saveState = (state: AppState): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (e) {
    console.error('Error guardando estado:', e);
  }
};

// Exportar estado como JSON
export const exportJSON = (state: AppState): void => {
  const blob = new Blob([JSON.stringify(state, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `backup_programa_didactico_${new Date().toISOString().split('T')[0]}.json`;
  a.click();
  URL.revokeObjectURL(url);
};

// Importar estado desde JSON
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

// Resetear estado
export const resetState = (): AppState => {
  const initial = getInitialState();
  saveState(initial);
  return initial;
};
