// =====================================================
// TOPBAR - Barra superior
// Programa Didáctico 2026/2027
// =====================================================

import { Menu, Sun, Moon, Search, Upload, AlertTriangle } from 'lucide-react';

interface TopBarProps {
  isDark: boolean;
  toggleTheme: () => void;
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  holdCount: number;
  onImport: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function TopBar({
  isDark,
  toggleTheme,
  sidebarOpen,
  setSidebarOpen,
  searchQuery,
  setSearchQuery,
  holdCount,
  onImport,
}: TopBarProps) {
  return (
    <header className="topbar">
      {/* Sección izquierda */}
      <div className="topbar-left">
        {/* Botón hamburguesa (solo móvil) */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="hamburger-btn"
          aria-label="Abrir menú"
          aria-expanded={sidebarOpen}
        >
          <Menu size={24} />
        </button>
      </div>

      {/* Sección central - Búsqueda */}
      <div className="topbar-center">
        <div className="search-box">
          <Search size={18} className="search-icon" />
          <input
            type="text"
            placeholder="Buscar en el programa..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
            aria-label="Búsqueda global"
          />
        </div>
      </div>

      {/* Sección derecha */}
      <div className="topbar-right">
        {/* Badge HOLD */}
        {holdCount > 0 && (
          <button
            className="hold-badge"
            aria-label={`${holdCount} elementos HOLD pendientes`}
            title="Elementos de verificación pendientes"
          >
            <AlertTriangle size={14} />
            <span>{holdCount} HOLD</span>
          </button>
        )}

        {/* Toggle tema */}
        <button
          onClick={toggleTheme}
          className="icon-btn"
          aria-label={isDark ? 'Cambiar a tema claro' : 'Cambiar a tema oscuro'}
          title={isDark ? 'Tema claro' : 'Tema oscuro'}
        >
          {isDark ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        {/* Importar backup */}
        <label
          className="icon-btn"
          title="Importar backup JSON"
          aria-label="Importar backup"
        >
          <Upload size={20} />
          <input type="file" accept=".json" onChange={onImport} className="hidden" />
        </label>

        {/* Avatar usuario */}
        <div
          className="user-avatar"
          title="Perfil de usuario"
          aria-label="Perfil de usuario"
        >
          MG
        </div>
      </div>
    </header>
  );
}
