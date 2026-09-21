// =====================================================
// APP PRINCIPAL - Programa Didáctico 2026/2027
// Estudios Profesionales de Música de Extremadura
// =====================================================

import { useState, useEffect, useCallback } from 'react';
import { AppState } from './types';
import { loadState, saveState, exportJSON, importJSON, resetState } from './store';
import {
  Home, BookOpen, Users, Music, Target, ClipboardCheck,
  UserCheck, BarChart3, GraduationCap, FileText, Users2,
  Settings, HelpCircle, Menu, X, Sun, Moon, Search,
  Download, Upload, AlertTriangle
} from 'lucide-react';
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

// Módulos de navegación
const modules = [
  { id: 'dashboard', label: 'Inicio', icon: Home },
  { id: 'programme', label: 'Programación Didáctica', icon: BookOpen },
  { id: 'students', label: 'Alumnado', icon: Users },
  { id: 'ensembles', label: 'Agrupaciones', icon: Music },
  { id: 'criteria', label: 'Criterios y Rúbricas', icon: Target },
  { id: 'assessment', label: 'Evaluación', icon: ClipboardCheck },
  { id: 'coassessment', label: 'Auto/Co-evaluación', icon: UserCheck },
  { id: 'grades', label: 'Calificaciones', icon: BarChart3 },
  { id: 'units', label: 'Unidades Didácticas', icon: GraduationCap },
  { id: 'annexes', label: 'Anexos y Plantillas', icon: FileText },
  { id: 'coordination', label: 'Coordinación', icon: Users2 },
  { id: 'settings', label: 'Configuración', icon: Settings },
  { id: 'help', label: 'Ayuda', icon: HelpCircle },
];

function App() {
  // Estado de la aplicación
  const [state, setState] = useState<AppState>(loadState);
  const [activeModule, setActiveModule] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [toast, setToast] = useState<{ message: string; type: string } | null>(null);
  const [isDark, setIsDark] = useState(state.settings.theme === 'dark');

  // Persistir estado en localStorage
  useEffect(() => {
    saveState(state);
  }, [state]);

  // Aplicar tema oscuro
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

  // Actualizar estado
  const updateState = useCallback((updates: Partial<AppState>) => {
    setState(prev => ({ ...prev, ...updates }));
  }, []);

  // Toggle tema
  const toggleTheme = () => {
    setIsDark(!isDark);
    updateState({ settings: { ...state.settings, theme: isDark ? 'light' : 'dark' } });
  };

  // Exportar backup
  const handleExport = () => {
    exportJSON(state);
    showToast('Backup exportado correctamente');
  };

  // Importar backup
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

  // Resetear datos
  const handleReset = () => {
    if (confirm('¿Estás seguro? Se perderán todos los datos actuales.')) {
      setState(resetState());
      showToast('Datos reseteados correctamente');
    }
  };

  // Renderizar módulo activo
  const renderModule = () => {
    const props = { state, updateState, showToast };
    switch (activeModule) {
      case 'dashboard': return <Dashboard {...props} />;
      case 'programme': return <Programme {...props} />;
      case 'students': return <Students {...props} />;
      case 'ensembles': return <Ensembles {...props} />;
      case 'criteria': return <Criteria {...props} />;
      case 'assessment': return <Assessment {...props} />;
      case 'coassessment': return <CoAssessment {...props} />;
      case 'grades': return <Grades {...props} />;
      case 'units': return <Units {...props} />;
      case 'annexes': return <Annexes {...props} />;
      case 'coordination': return <Coordination {...props} />;
      case 'settings': return <SettingsModule {...props} onExport={handleExport} onImport={handleImport} onReset={handleReset} />;
      case 'help': return <Help />;
      default: return <Dashboard {...props} />;
    }
  };

  // Contar alertas HOLD
  const holdCount = state.holds.filter(h => !h.resolved).length;

  return (
    <div className={`min-h-screen ${isDark ? 'dark' : ''}`}>
      {/* Overlay para móvil */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Barra lateral */}
      <aside className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="p-4 border-b border-white/20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg gradient-accent flex items-center justify-center">
              <Music size={20} color="#1a3a5c" />
            </div>
            <div>
              <h1 className="text-sm font-bold text-white leading-tight">Programa Didáctico</h1>
              <p className="text-xs text-white/60">2026/2027 · Extremadura</p>
            </div>
          </div>
        </div>

        <nav className="py-2">
          {modules.map(mod => (
            <div
              key={mod.id}
              className={`sidebar-item ${activeModule === mod.id ? 'active' : ''}`}
              onClick={() => {
                setActiveModule(mod.id);
                setSidebarOpen(false);
              }}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => { if (e.key === 'Enter') { setActiveModule(mod.id); setSidebarOpen(false); } }}
              aria-label={mod.label}
            >
              <mod.icon size={18} />
              <span>{mod.label}</span>
              {mod.id === 'dashboard' && holdCount > 0 && (
                <span className="ml-auto badge badge-danger text-xs">{holdCount}</span>
              )}
            </div>
          ))}
        </nav>

        <div className="p-4 border-t border-white/20 mt-auto">
          <div className="flex items-center gap-2">
            <Download size={14} className="text-white/60" />
            <button
              onClick={handleExport}
              className="text-xs text-white/60 hover:text-white transition"
            >
              Exportar backup
            </button>
          </div>
        </div>
      </aside>

      {/* Contenido principal */}
      <div className={`main-content ${sidebarOpen ? '' : 'expanded lg:ml-[260px]'}`}>
        {/* Barra superior */}
        <header className="topbar">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition lg:hidden"
              aria-label="Menú"
            >
              {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            <div className="hidden md:block relative">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar en el programa..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 pr-4 py-2 w-64 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-[var(--primary)] bg-[var(--bg)]"
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            {holdCount > 0 && (
              <div className="flex items-center gap-1 px-2 py-1 rounded-lg bg-red-50 text-red-600 text-xs">
                <AlertTriangle size={14} />
                <span>{holdCount} HOLD</span>
              </div>
            )}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition"
              aria-label="Cambiar tema"
            >
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <label className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition cursor-pointer" title="Importar backup">
              <Upload size={18} />
              <input type="file" accept=".json" onChange={handleImport} className="hidden" />
            </label>
          </div>
        </header>

        {/* Contenido del módulo */}
        <main className="p-4 md:p-6 lg:p-8 fade-in">
          {renderModule()}
        </main>
      </div>

      {/* Toast de notificación */}
      {toast && (
        <div className={`toast toast-${toast.type}`}>
          {toast.message}
        </div>
      )}
    </div>
  );
}

export default App;
