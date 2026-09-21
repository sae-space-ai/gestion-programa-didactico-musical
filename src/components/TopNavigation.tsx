// =====================================================
// TOP NAVIGATION - Menú Superior Horizontal
// Programa Didáctico 2026/2027
// =====================================================

import {
  Home, BookOpen, Users, Music, Target, ClipboardCheck,
  UserCheck, BarChart3, GraduationCap, FileText, Users2,
  Settings, HelpCircle, Menu, X, Sun, Moon, Search, Upload,
  AlertTriangle, Download
} from 'lucide-react';

interface TopNavigationProps {
  activeModule: string;
  setActiveModule: (id: string) => void;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
  isDark: boolean;
  toggleTheme: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  holdCount: number;
  onImport: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onExport: () => void;
}

const modules = [
  { id: 'dashboard', label: 'Inicio', icon: Home },
  { id: 'programme', label: 'Programación', icon: BookOpen },
  { id: 'students', label: 'Alumnado', icon: Users },
  { id: 'ensembles', label: 'Agrupaciones', icon: Music },
  { id: 'criteria', label: 'Criterios', icon: Target },
  { id: 'assessment', label: 'Evaluación', icon: ClipboardCheck },
  { id: 'coassessment', label: 'Auto/Co-eval', icon: UserCheck },
  { id: 'grades', label: 'Calificaciones', icon: BarChart3 },
  { id: 'units', label: 'Unidades', icon: GraduationCap },
  { id: 'annexes', label: 'Anexos', icon: FileText },
  { id: 'coordination', label: 'Coordinación', icon: Users2 },
  { id: 'settings', label: 'Configuración', icon: Settings },
  { id: 'help', label: 'Ayuda', icon: HelpCircle },
];

export default function TopNavigation({
  activeModule,
  setActiveModule,
  mobileMenuOpen,
  setMobileMenuOpen,
  isDark,
  toggleTheme,
  searchQuery,
  setSearchQuery,
  holdCount,
  onImport,
  onExport,
}: TopNavigationProps) {
  return (
    <>
      {/* Barra de navegación superior */}
      <header className="top-nav">
        {/* Sección izquierda: Logo + Hamburguesa */}
        <div className="top-nav-left">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="mobile-menu-btn"
            aria-label="Abrir menú"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          <div className="logo-section">
            <div className="logo-icon">
              <Music size={20} color="#1a3a5c" strokeWidth={2.5} />
            </div>
            <div className="logo-text">
              <h1 className="logo-title">Programa Didáctico</h1>
              <p className="logo-subtitle">2026/2027 · Extremadura</p>
            </div>
          </div>
        </div>

        {/* Sección central: Menú de navegación (desktop) */}
        <nav className="top-nav-center">
          {modules.slice(0, 8).map((mod) => (
            <button
              key={mod.id}
              className={`nav-item ${activeModule === mod.id ? 'active' : ''}`}
              onClick={() => setActiveModule(mod.id)}
              aria-current={activeModule === mod.id ? 'page' : undefined}
            >
              <mod.icon size={16} />
              <span>{mod.label}</span>
              {mod.id === 'dashboard' && holdCount > 0 && (
                <span className="nav-badge">{holdCount}</span>
              )}
            </button>
          ))}
          
          {/* Menú desplegable para más opciones */}
          <div className="nav-dropdown">
            <button className="nav-item">
              <span>Más</span>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <div className="nav-dropdown-menu">
              {modules.slice(8).map((mod) => (
                <button
                  key={mod.id}
                  className={`nav-dropdown-item ${activeModule === mod.id ? 'active' : ''}`}
                  onClick={() => setActiveModule(mod.id)}
                >
                  <mod.icon size={16} />
                  <span>{mod.label}</span>
                </button>
              ))}
            </div>
          </div>
        </nav>

        {/* Sección derecha: Acciones */}
        <div className="top-nav-right">
          {/* Búsqueda */}
          <div className="search-box">
            <Search size={16} className="search-icon" />
            <input
              type="text"
              placeholder="Buscar..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
              aria-label="Búsqueda global"
            />
          </div>

          {/* Badge HOLD */}
          {holdCount > 0 && (
            <button
              className="hold-badge"
              aria-label={`${holdCount} elementos HOLD pendientes`}
              title="Elementos de verificación pendientes"
            >
              <AlertTriangle size={14} />
              <span>{holdCount}</span>
            </button>
          )}

          {/* Toggle tema */}
          <button
            onClick={toggleTheme}
            className="icon-btn"
            aria-label={isDark ? 'Cambiar a tema claro' : 'Cambiar a tema oscuro'}
            title={isDark ? 'Tema claro' : 'Tema oscuro'}
          >
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          {/* Importar backup */}
          <label
            className="icon-btn"
            title="Importar backup JSON"
            aria-label="Importar backup"
          >
            <Upload size={18} />
            <input type="file" accept=".json" onChange={onImport} className="hidden" />
          </label>

          {/* Exportar backup */}
          <button
            onClick={onExport}
            className="icon-btn"
            title="Exportar backup"
            aria-label="Exportar backup"
          >
            <Download size={18} />
          </button>
        </div>
      </header>

      {/* Menú móvil desplegable */}
      {mobileMenuOpen && (
        <div className="mobile-menu">
          <div className="mobile-menu-header">
            <h2>Menú de Navegación</h2>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="mobile-menu-close"
              aria-label="Cerrar menú"
            >
              <X size={24} />
            </button>
          </div>
          
          <nav className="mobile-menu-nav">
            {modules.map((mod) => (
              <button
                key={mod.id}
                className={`mobile-menu-item ${activeModule === mod.id ? 'active' : ''}`}
                onClick={() => {
                  setActiveModule(mod.id);
                  setMobileMenuOpen(false);
                }}
              >
                <mod.icon size={20} />
                <span>{mod.label}</span>
                {mod.id === 'dashboard' && holdCount > 0 && (
                  <span className="mobile-menu-badge">{holdCount}</span>
                )}
              </button>
            ))}
          </nav>
        </div>
      )}
    </>
  );
}
