// =====================================================
// GESTIÓN DE ESTADO - Persistencia con IndexedDB
// Offline-first: todos los datos se guardan localmente
// Programa Didáctico 2026/2027
// =====================================================

import { AppState } from './types';
import { seedInitialState } from './data/seed';

const DB_NAME = 'programa_didactico_2026_2027';
const DB_VERSION = 1;
const STORE_NAME = 'app_state';
const STATE_KEY = 'main_state';

// =====================================================
// INICIALIZACIÓN DE INDEXEDDB
// =====================================================
const openDB = (): Promise<IDBDatabase> => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = () => {
      console.error('Error abriendo IndexedDB');
      reject(request.error);
    };

    request.onsuccess = () => {
      resolve(request.result);
    };

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id' });
      }
    };
  });
};

// =====================================================
// CARGAR ESTADO DESDE INDEXEDDB
// =====================================================
export const loadState = async (): Promise<AppState> => {
  try {
    const db = await openDB();
    return new Promise((resolve) => {
      const transaction = db.transaction(STORE_NAME, 'readonly');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.get(STATE_KEY);

      request.onsuccess = () => {
        db.close();
        if (request.result && request.result.data) {
          resolve(request.result.data as AppState);
        } else {
          // Primera ejecución: cargar datos semilla
          resolve(seedInitialState as AppState);
        }
      };

      request.onerror = () => {
        db.close();
        console.error('Error cargando estado desde IndexedDB');
        resolve(seedInitialState as AppState);
      };
    });
  } catch (error) {
    console.error('Error en loadState:', error);
    return seedInitialState as AppState;
  }
};

// =====================================================
// GUARDAR ESTADO EN INDEXEDDB
// =====================================================
export const saveState = async (state: AppState): Promise<void> => {
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(STORE_NAME, 'readwrite');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.put({ id: STATE_KEY, data: state, timestamp: Date.now() });

      request.onsuccess = () => {
        db.close();
        resolve();
      };

      request.onerror = () => {
        db.close();
        console.error('Error guardando estado en IndexedDB');
        reject(request.error);
      };
    });
  } catch (error) {
    console.error('Error en saveState:', error);
  }
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
  const initial = seedInitialState as AppState;
  await saveState(initial);
  return initial;
};

// =====================================================
// LIMPIAR INDEXEDDB COMPLETAMENTE
// =====================================================
export const clearDatabase = async (): Promise<void> => {
  try {
    const db = await openDB();
    return new Promise((resolve) => {
      const transaction = db.transaction(STORE_NAME, 'readwrite');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.clear();

      request.onsuccess = () => {
        db.close();
        resolve();
      };

      request.onerror = () => {
        db.close();
        resolve();
      };
    });
  } catch (error) {
    console.error('Error limpiando IndexedDB:', error);
  }
};

// =====================================================
// VERIFICAR DISPONIBILIDAD DE INDEXEDDB
// =====================================================
export const isIndexedDBAvailable = (): boolean => {
  try {
    return typeof indexedDB !== 'undefined' && indexedDB !== null;
  } catch {
    return false;
  }
};

// =====================================================
// OBTENER INFORMACIÓN DE ALMACENAMIENTO
// =====================================================
export const getStorageInfo = async (): Promise<{ used: number; timestamp: number | null }> => {
  try {
    const db = await openDB();
    return new Promise((resolve) => {
      const transaction = db.transaction(STORE_NAME, 'readonly');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.get(STATE_KEY);

      request.onsuccess = () => {
        db.close();
        if (request.result) {
          const data = JSON.stringify(request.result.data);
          resolve({
            used: new Blob([data]).size,
            timestamp: request.result.timestamp || null,
          });
        } else {
          resolve({ used: 0, timestamp: null });
        }
      };

      request.onerror = () => {
        db.close();
        resolve({ used: 0, timestamp: null });
      };
    });
  } catch {
    return { used: 0, timestamp: null };
  }
};
