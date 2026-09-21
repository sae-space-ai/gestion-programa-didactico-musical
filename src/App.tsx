// =====================================================
// APP PRINCIPAL - Programa Didáctico 2026/2027
// Estudios Profesionales de Música de Extremadura
// Persistencia: IndexedDB (offline-first)
// =====================================================

import { useState, useEffect, useCallback } from 'react';
import { AppState } from './types';
import { loadState, saveState, exportJSON, importJSON, resetState } from './store';
import { Loader2 } from 'lucide-react';
import Sidebar from './components/Sidebar';
import TopBar from './components/TopBar';
import Dashboard from './modules/Dashboard';
import Programme from './modules/Programme';
import Students from './modules/Students';
import Ensembles from './modules/Ensembles';
import Criteria from './modules/Criteria';
import Assessment from './modules/Assessment';
import CoAssessment from './modules/CoAssessment';
import Grades from './modules/Grades';
import Units from './modules/Units';
import Annexes from './modules/Annexes';
import Coordination from './modules/Coordination';
import SettingsModule from './modules/Settings';
import Help from './modules/Help';

function App() {
  // Estado de la aplicación (carga asíncrona desde IndexedDB)
  const [state, setState] = useState<AppState | null>(null);
  const [activeModule, setActiveModule] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [toast, setToast] = useState<{ message: string; type: string } | null>(null);
  const [isDark, setIsDark] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Cargar estado desde IndexedDB al montar (con datos semilla si es primera vez)
  useEffect(() => {
    const initApp = async () => {
      const loadedState = await loadState();
      setState(loadedState);
      setIsDark(loadedState.settings.theme === 'dark');
      setIsLoading(false);
    };
    initApp();
  }, []);

  // Persistir estado en IndexedDB cuando cambie
  useEffect(() => {
    if (state) {
      saveState(state);
    }
  }, [state]);

  // Aplicar tema oscuro al documento
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  // Mostrar notificación toast
  const showToast = useCallback((message: string, type: string = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  }, []);

  // Actualizar estado (merge parcial)
  const updateState = useCallback((updates: Partial<AppState>) => {
    setState((prev) => {
      if (!prev) return prev;
      return { ...prev, ...updates };
    });
  }, []);

  // Toggle tema claro/oscuro
  const toggleTheme = () => {
    const newTheme = !isDark ? 'dark' : 'light';
    setIsDark(!isDark);
    if (state) {
      updateState({ settings: { ...state.settings, theme: newTheme } });
    }
  };

  // Exportar backup JSON
  const handleExport = () => {
    if (state) {
      exportJSON(state);
      showToast('Backup exportado correctamente');
    }
  };

  // Importar backup JSON
  const handleImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const data = await importJSON(file);
      setState(data);
      showToast('Backup restaurado correctamente');
    } catch {
      showToast('Error al importar el backup', 'error');
    }
    e.target.value = '';
  };

  // Resetear datos a valores iniciales
  const handleReset = async () => {
    if (confirm('¿Estás seguro? Se perderán todos los datos actuales.')) {
      const initial = await resetState();
      setState(initial);
      showToast('Datos reseteados correctamente');
    }
  };

  // Pantalla de carga mientras se inicializa IndexedDB
  if (isLoading || !state) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--bg-alt)]">
        <div className="text-center">
          <Loader2 size={48} className="animate-spin mx-auto mb-4 text-[var(--primary)]" />
          <h2 className="text-xl font-bold text-[var(--primary)]">Cargando Programa Didáctico</h2>
          <p className="text-sm text-[var(--text-light)] mt-2">Inicializando base de datos...</p>
        </div>
      </div>
    );
  }

  // Renderizar módulo activo
  const renderModule = () => {
    const props = { state, updateState, showToast };
    switch (activeModule) {
      case 'dashboard':
        return <Dashboard {...props} />;
      case 'programme':
        return <Programme {...props} />;
      case 'students':
        return <Students {...props} />;
      case 'ensembles':
        return <Ensembles {...props} />;
      case 'criteria':
        return <Criteria {...props} />;
      case 'assessment':
        return <Assessment {...props} />;
      case 'coassessment':
        return <CoAssessment {...props} />;
      case 'grades':
        return <Grades {...props} />;
      case 'units':
        return <Units {...props} />;
      case 'annexes':
        return <Annexes {...props} />;
      case 'coordination':
        return <Coordination {...props} />;
      case 'settings':
        return (
          <SettingsModule
            {...props}
            onExport={handleExport}
            onImport={handleImport}
            onReset={handleReset}
          />
        );
      case 'help':
        return <Help />;
      default:
        return <Dashboard {...props} />;
    }
  };

  // Contar alertas HOLD pendientes
  const holdCount = state.holds.filter((h) => !h.resolved).length;

  return (
    <div className={`min-h-screen ${isDark ? 'dark' : ''}`}>
      {/* Sidebar */}
      <Sidebar
        activeModule={activeModule}
        setActiveModule={setActiveModule}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        holdCount={holdCount}
        onExport={handleExport}
      />

      {/* Contenido principal */}
      <div className={`main-content ${sidebarOpen ? '' : 'expanded lg:ml-[260px]'}`}>
        {/* TopBar */}
        <TopBar
          isDark={isDark}
          toggleTheme={toggleTheme}
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          holdCount={holdCount}
          onImport={handleImport}
        />

        {/* Contenido del módulo */}
        <main className="p-4 md:p-6 lg:p-8 fade-in">{renderModule()}</main>
      </div>

      {/* Toast de notificación */}
      {toast && <div className={`toast toast-${toast.type}`}>{toast.message}</div>}
    </div>
  );
}

export default App;
