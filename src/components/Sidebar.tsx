// =====================================================
// COMPONENTE SIDEBAR - Menú lateral de navegación
// 13 módulos del programa didáctico
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

export default function Sidebar({
  activeModule,
  setActiveModule,
  sidebarOpen,
  setSidebarOpen,
  holdCount,
  onExport,
}: SidebarProps) {
  return (
    <>
      {/* Overlay móvil */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        {/* Cabecera */}
        <div className="p-4 border-b border-white/20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg gradient-accent flex items-center justify-center">
              <Music size={20} color="#1a3a5c" />
            </div>
            <div>
              <h1 className="text-sm font-bold text-white leading-tight">Programa Didáctico</h1>
              <p className="text-xs text-white/60">2026/2027 · Extremadura</p>
            </div>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="p-1 hover:bg-white/10 rounded lg:hidden"
            aria-label="Cerrar menú"
          >
            <X size={18} className="text-white" />
          </button>
        </div>

        {/* Navegación */}
        <nav className="py-2 flex-1">
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
                if (e.key === 'Enter') {
                  setActiveModule(mod.id);
                  setSidebarOpen(false);
                }
              }}
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

        {/* Footer con export */}
        <div className="p-4 border-t border-white/20">
          <button
            onClick={onExport}
            className="flex items-center gap-2 text-xs text-white/60 hover:text-white transition w-full"
          >
            <Download size={14} />
            Exportar backup
          </button>
        </div>
      </aside>
    </>
  );
}
