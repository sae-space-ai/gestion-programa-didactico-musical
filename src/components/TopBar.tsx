// =====================================================
// TOPBAR - Barra superior mejorada
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
      <div className="flex items-center gap-4">
        {/* Botón hamburguesa (solo móvil) */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors lg:hidden"
          aria-label="Abrir menú"
          aria-expanded={sidebarOpen}
        >
          <Menu size={24} />
        </button>

        {/* Logo y título (visible en tablet y desktop) */}
        <div className="hidden md:flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg gradient-accent flex items-center justify-center">
            <span className="text-[var(--primary-dark)] font-bold text-lg">GP</span>
          </div>
          <div>
            <h1 className="text-sm font-bold text-[var(--text)] leading-tight">
              Gestión Programa Didáctico
            </h1>
            <p className="text-xs text-[var(--text-muted)]">
              2026/2027 · Música · Extremadura
            </p>
          </div>
        </div>
      </div>

      {/* Sección central - Búsqueda */}
      <div className="flex-1 max-w-md mx-4 hidden sm:block">
        <div className="relative">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]"
          />
          <input
            type="text"
            placeholder="Buscar en el programa..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-[var(--border)] text-sm focus:outline-none focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/20 bg-[var(--bg)] transition-all"
            aria-label="Búsqueda global"
          />
        </div>
      </div>

      {/* Sección derecha */}
      <div className="flex items-center gap-2">
        {/* Badge HOLD */}
        {holdCount > 0 && (
          <button
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-xs font-semibold hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors"
            aria-label={`${holdCount} elementos HOLD pendientes`}
            title="Elementos de verificación pendientes"
          >
            <AlertTriangle size={14} className="animate-pulse" />
            <span>{holdCount} HOLD</span>
          </button>
        )}

        {/* Toggle tema */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          aria-label={isDark ? 'Cambiar a tema claro' : 'Cambiar a tema oscuro'}
          title={isDark ? 'Tema claro' : 'Tema oscuro'}
        >
          {isDark ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        {/* Importar backup */}
        <label
          className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors cursor-pointer"
          title="Importar backup JSON"
          aria-label="Importar backup"
        >
          <Upload size={20} />
          <input type="file" accept=".json" onChange={onImport} className="hidden" />
        </label>

        {/* Avatar usuario (placeholder) */}
        <div
          className="w-9 h-9 rounded-full bg-gradient-to-br from-[var(--primary)] to-[var(--primary-light)] flex items-center justify-center text-white font-semibold text-sm cursor-pointer hover:shadow-md transition-shadow"
          title="Perfil de usuario"
          aria-label="Perfil de usuario"
        >
          MG
        </div>
      </div>
    </header>
  );
}
