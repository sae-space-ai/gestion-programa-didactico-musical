// =====================================================
// SIDEBAR - Menú lateral mejorado
// Programa Didáctico 2026/2027
// =====================================================

import {
  Home, BookOpen, Users, Music, Target, ClipboardCheck,
  UserCheck, BarChart3, GraduationCap, FileText, Users2,
  Settings, HelpCircle, Download, X
} from 'lucide-react';

interface SidebarProps {
  activeModule: string;
  setActiveModule: (id: string) => void;
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  holdCount: number;
  onExport: () => void;
}

const modules = [
  { id: 'dashboard', label: 'Inicio', icon: Home, badge: true },
  { id: 'programme', label: 'Programación Didáctica', icon: BookOpen },
  { id: 'students', label: 'Alumnado', icon: Users },
  { id: 'ensembles', label: 'Agrupaciones', icon: Music },
  { id: 'criteria', label: 'Criterios y Rúbricas', icon: Target },
  { id: 'assessment', label: 'Evaluación', icon: ClipboardCheck },
  { id: 'coassessment', label: 'Auto/Co-evaluación', icon: UserCheck },
  { id: 'grades', label: 'Calificaciones', icon: BarChart3 },
  { id: 'units', label: 'Unidades Didácticas', icon: GraduationCap },
  { id: 'annexes', label: 'Anexos', icon: FileText },
  { id: 'coordination', label: 'Coordinación', icon: Users2 },
  { id: 'settings', label: 'Configuración', icon: Settings },
  { id: 'help', label: 'Ayuda', icon: HelpCircle },
];

export default function Sidebar({
  activeModule,
  setActiveModule,
  sidebarOpen,
  setSidebarOpen,
  holdCount,
  onExport,
}: SidebarProps) {
  return (
    <aside className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
      {/* Header del sidebar */}
      <div className="p-6 border-b border-white/20">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full gradient-accent flex items-center justify-center shadow-lg">
              <Music size={24} color="#1a3a5c" strokeWidth={2.5} />
            </div>
            <div>
              <h1 className="text-sm font-bold text-white leading-tight">Programa Didáctico</h1>
              <p className="text-xs text-white/60 mt-0.5">2026/2027 · Extremadura</p>
            </div>
          </div>
          {/* Botón cerrar (solo móvil) */}
          <button
            onClick={() => setSidebarOpen(false)}
            className="p-2 hover:bg-white/10 rounded-lg lg:hidden transition-colors"
            aria-label="Cerrar menú"
          >
            <X size={20} className="text-white" />
          </button>
        </div>
      </div>

      {/* Navegación */}
      <nav className="flex-1 py-4">
        {modules.map((mod) => (
          <div
            key={mod.id}
            className={`sidebar-item ${activeModule === mod.id ? 'active' : ''}`}
            onClick={() => {
              setActiveModule(mod.id);
              setSidebarOpen(false);
            }}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                setActiveModule(mod.id);
                setSidebarOpen(false);
              }
            }}
            aria-label={mod.label}
            aria-current={activeModule === mod.id ? 'page' : undefined}
          >
            <mod.icon size={20} strokeWidth={activeModule === mod.id ? 2.5 : 2} />
            <span className="flex-1">{mod.label}</span>
            {mod.badge && holdCount > 0 && (
              <span className="ml-auto bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full min-w-[20px] text-center">
                {holdCount}
              </span>
            )}
          </div>
        ))}
      </nav>

      {/* Footer con export */}
      <div className="p-4 border-t border-white/20">
        <button
          onClick={onExport}
          className="flex items-center gap-2 text-xs text-white/70 hover:text-white transition-colors w-full px-3 py-2 rounded-lg hover:bg-white/10"
          aria-label="Exportar backup"
        >
          <Download size={16} />
          <span>Exportar backup</span>
        </button>
      </div>
    </aside>
  );
}
