// =====================================================
// INICIALIZACIÓN DE BASE DE DATOS INDEXEDDB
// Carga datos semilla en el primer arranque
// Programa Didáctico 2026/2027
// =====================================================

import { seedInitialState } from '../data/seed';
import { AppState } from '../types';

const DB_NAME = 'programa_didactico_2026_2027';
const DB_VERSION = 1;
const STORE_NAME = 'app_state';
const STATE_KEY = 'main_state';
const INIT_FLAG_KEY = 'initialized';

// =====================================================
// ABRIR CONEXIÓN A INDEXEDDB
// =====================================================
export const openDB = (): Promise<IDBDatabase> => {
  return new Promise((resolve, reject) => {
    if (typeof indexedDB === 'undefined') {
      reject(new Error('IndexedDB no está disponible en este navegador'));
      return;
    }

    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = () => {
      console.error('Error abriendo IndexedDB:', request.error);
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
// VERIFICAR SI LA BASE DE DATOS YA ESTÁ INICIALIZADA
// =====================================================
export const isDatabaseInitialized = async (): Promise<boolean> => {
  try {
    const db = await openDB();
    return new Promise((resolve) => {
      const transaction = db.transaction(STORE_NAME, 'readonly');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.get(INIT_FLAG_KEY);

      request.onsuccess = () => {
        db.close();
        resolve(!!request.result);
      };

      request.onerror = () => {
        db.close();
        resolve(false);
      };
    });
  } catch {
    return false;
  }
};

// =====================================================
// CARGAR DATOS SEMILLA EN INDEXEDDB
// Se ejecuta solo en el primer arranque
// =====================================================
export const seedDatabase = async (): Promise<AppState> => {
  try {
    // Verificar si ya está inicializada
    const initialized = await isDatabaseInitialized();
    if (initialized) {
      console.log('Base de datos ya inicializada. Cargando datos existentes.');
      return await loadFromDB();
    }

    console.log('Primera ejecución: cargando datos semilla en IndexedDB...');
    const db = await openDB();

    return new Promise((resolve, reject) => {
      const transaction = db.transaction(STORE_NAME, 'readwrite');
      const store = transaction.objectStore(STORE_NAME);

      // Guardar estado inicial
      const stateRequest = store.put({
        id: STATE_KEY,
        data: seedInitialState,
        timestamp: Date.now(),
      });

      // Guardar flag de inicialización
      const initRequest = store.put({
        id: INIT_FLAG_KEY,
        initialized: true,
        timestamp: Date.now(),
      });

      stateRequest.onsuccess = () => {
        initRequest.onsuccess = () => {
          db.close();
          console.log('✅ Datos semilla cargados correctamente en IndexedDB');
          console.log(`   - ${seedInitialState.students.length} alumnos`);
          console.log(`   - ${seedInitialState.ensembles.length} agrupaciones`);
          console.log(`   - ${seedInitialState.units.length} unidades didácticas`);
          console.log(`   - ${seedInitialState.holds.length} elementos HOLD`);
          resolve(seedInitialState as AppState);
        };
      };

      stateRequest.onerror = () => {
        db.close();
        console.error('Error guardando datos semilla:', stateRequest.error);
        reject(stateRequest.error);
      };
    });
  } catch (error) {
    console.error('Error en seedDatabase:', error);
    // Fallback: devolver estado inicial sin persistir
    return seedInitialState as AppState;
  }
};

// =====================================================
// CARGAR ESTADO DESDE INDEXEDDB
// =====================================================
export const loadFromDB = async (): Promise<AppState> => {
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
          // Si no hay datos, cargar semilla
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
    console.error('Error en loadFromDB:', error);
    return seedInitialState as AppState;
  }
};

// =====================================================
// GUARDAR ESTADO EN INDEXEDDB
// =====================================================
export const saveToDB = async (state: AppState): Promise<void> => {
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(STORE_NAME, 'readwrite');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.put({
        id: STATE_KEY,
        data: state,
        timestamp: Date.now(),
      });

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
    console.error('Error en saveToDB:', error);
  }
};

// =====================================================
// LIMPIAR BASE DE DATOS COMPLETAMENTE
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
        console.log('Base de datos limpiada correctamente');
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
// RESETEAR A DATOS SEMILLA
// =====================================================
export const resetToSeed = async (): Promise<AppState> => {
  await clearDatabase();
  return await seedDatabase();
};

// =====================================================
// OBTENER INFORMACIÓN DE ALMACENAMIENTO
// =====================================================
export const getStorageInfo = async (): Promise<{
  initialized: boolean;
  used: number;
  timestamp: number | null;
  studentsCount: number;
  ensemblesCount: number;
  unitsCount: number;
}> => {
  try {
    const db = await openDB();
    return new Promise((resolve) => {
      const transaction = db.transaction(STORE_NAME, 'readonly');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.get(STATE_KEY);

      request.onsuccess = () => {
        db.close();
        if (request.result && request.result.data) {
          const data = request.result.data as AppState;
          const serialized = JSON.stringify(request.result.data);
          resolve({
            initialized: true,
            used: new Blob([serialized]).size,
            timestamp: request.result.timestamp || null,
            studentsCount: data.students.length,
            ensemblesCount: data.ensembles.length,
            unitsCount: data.units.length,
          });
        } else {
          resolve({
            initialized: false,
            used: 0,
            timestamp: null,
            studentsCount: 0,
            ensemblesCount: 0,
            unitsCount: 0,
          });
        }
      };

      request.onerror = () => {
        db.close();
        resolve({
          initialized: false,
          used: 0,
          timestamp: null,
          studentsCount: 0,
          ensemblesCount: 0,
          unitsCount: 0,
        });
      };
    });
  } catch {
    return {
      initialized: false,
      used: 0,
      timestamp: null,
      studentsCount: 0,
      ensemblesCount: 0,
      unitsCount: 0,
    };
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
