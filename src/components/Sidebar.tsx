// =====================================================
// SIDEBAR - Menú Lateral Izquierdo
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
  { id: 'rubricCatalog', label: 'Catálogo de Rúbricas', icon: FileText },
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
      <div className="sidebar-header">
        <div className="sidebar-logo">
          <div className="logo-icon">
            <Music size={24} color="#1a3a5c" strokeWidth={2.5} />
          </div>
          <div className="logo-text">
            <h1 className="logo-title">Programa Didáctico</h1>
            <p className="logo-subtitle">2026/2027 · Extremadura</p>
          </div>
        </div>
        {/* Botón cerrar (solo móvil) */}
        <button
          onClick={() => setSidebarOpen(false)}
          className="sidebar-close"
          aria-label="Cerrar menú"
        >
          <X size={20} />
        </button>
      </div>

      {/* Navegación */}
      <nav className="sidebar-nav">
        {modules.map((mod) => (
          <button
            key={mod.id}
            className={`sidebar-item ${activeModule === mod.id ? 'active' : ''}`}
            onClick={() => {
              setActiveModule(mod.id);
              setSidebarOpen(false);
            }}
            aria-label={mod.label}
            aria-current={activeModule === mod.id ? 'page' : undefined}
          >
            <mod.icon size={20} strokeWidth={activeModule === mod.id ? 2.5 : 2} />
            <span className="sidebar-item-label">{mod.label}</span>
            {mod.badge && holdCount > 0 && (
              <span className="sidebar-badge">{holdCount}</span>
            )}
          </button>
        ))}
      </nav>

      {/* Footer con export */}
      <div className="sidebar-footer">
        <button
          onClick={onExport}
          className="sidebar-export-btn"
          aria-label="Exportar backup"
        >
          <Download size={16} />
          <span>Exportar backup</span>
        </button>
      </div>
    </aside>
  );
}
