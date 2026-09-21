// =====================================================
// COMPONENTE TOPBAR - Barra superior
// Búsqueda global + selector de tema + alertas HOLD
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
      <div className="flex items-center gap-3">
        {/* Botón hamburguesa (móvil) */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition lg:hidden"
          aria-label="Menú"
        >
          <Menu size={20} />
        </button>

        {/* Búsqueda global */}
        <div className="hidden md:block relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar en el programa..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 pr-4 py-2 w-64 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-[var(--primary)] bg-[var(--bg)]"
            aria-label="Búsqueda global"
          />
        </div>
      </div>

      <div className="flex items-center gap-2">
        {/* Alerta HOLD */}
        {holdCount > 0 && (
          <div className="flex items-center gap-1 px-2 py-1 rounded-lg bg-red-50 text-red-600 text-xs">
            <AlertTriangle size={14} />
            <span>{holdCount} HOLD</span>
          </div>
        )}

        {/* Selector de tema */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition"
          aria-label={isDark ? 'Cambiar a tema claro' : 'Cambiar a tema oscuro'}
          title={isDark ? 'Tema claro' : 'Tema oscuro'}
        >
          {isDark ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        {/* Importar backup */}
        <label
          className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition cursor-pointer"
          title="Importar backup JSON"
        >
          <Upload size={18} />
          <input type="file" accept=".json" onChange={onImport} className="hidden" />
        </label>
      </div>
    </header>
  );
}
