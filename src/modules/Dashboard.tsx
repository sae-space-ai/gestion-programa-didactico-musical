// =====================================================
// MÓDULO DASHBOARD - Panel de inicio
// Resumen del curso, accesos rápidos y alertas HOLD
// =====================================================

import { AppState } from '../types';
import { Users, Music, BookOpen, ClipboardCheck, AlertTriangle, TrendingUp, Calendar, Award } from 'lucide-react';

interface Props {
  state: AppState;
  updateState: (updates: Partial<AppState>) => void;
  showToast: (msg: string, type?: string) => void;
}

export default function Dashboard({ state }: Props) {
  const { students, ensembles, units, assessments, holds, settings } = state;
  const activeStudents = students.filter(s => s.active).length;
  const activeEnsembles = ensembles.length;
  const unitsTaught = units.filter(u => u.status === 'taught').length;
  const unitsInProgress = units.filter(u => u.status === 'inprogress').length;
  const totalUnits = units.length;
  const assessmentsCount = assessments.length;
  const unresolvedHolds = holds.filter(h => !h.resolved).length;

  const stats = [
    { label: 'Alumnos activos', value: activeStudents, icon: Users, color: 'bg-blue-50 text-blue-600' },
    { label: 'Agrupaciones', value: activeEnsembles, icon: Music, color: 'bg-purple-50 text-purple-600' },
    { label: 'Unidades impartidas', value: `${unitsTaught}/${totalUnits}`, icon: BookOpen, color: 'bg-green-50 text-green-600' },
    { label: 'Evaluaciones', value: assessmentsCount, icon: ClipboardCheck, color: 'bg-amber-50 text-amber-600' },
  ];

  return (
    <div className="space-y-6">
      {/* Cabecera */}
      <div className="gradient-primary rounded-xl p-6 text-white">
        <h1 className="text-2xl font-bold mb-1">Bienvenido/a al Programa Didáctico</h1>
        <p className="text-white/80 text-sm">
          Música de Cámara, Banda y Orquesta · Estudios Profesionales de Música · {settings.academicYear}
        </p>
        <p className="text-white/60 text-xs mt-2">
          {settings.school} · {settings.locality} ({settings.province})
        </p>
      </div>

      {/* Alertas HOLD */}
      {unresolvedHolds > 0 && (
        <div className="card border-l-4 border-l-red-500 bg-red-50">
          <div className="flex items-center gap-3">
            <AlertTriangle className="text-red-500" size={20} />
            <div>
              <p className="font-semibold text-red-700 text-sm">{unresolvedHolds} elementos pendientes de verificación (HOLD)</p>
              <p className="text-red-600 text-xs">Revisa la sección de Configuración para resolverlos.</p>
            </div>
          </div>
        </div>
      )}

      {/* Estadísticas principales */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <div key={i} className="card flex items-center gap-4">
            <div className={`p-3 rounded-lg ${stat.color}`}>
              <stat.icon size={24} />
            </div>
            <div>
              <p className="text-2xl font-bold text-[var(--text)]">{stat.value}</p>
              <p className="text-xs text-[var(--text-light)]">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Progreso de unidades */}
      <div className="card">
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <TrendingUp size={20} className="text-[var(--primary)]" />
          Progreso de Unidades Didácticas
        </h2>
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <span className="text-sm w-32 text-[var(--text-light)]">Impartidas</span>
            <div className="flex-1 bg-gray-200 rounded-full h-3">
              <div
                className="bg-green-500 h-3 rounded-full transition-all"
                style={{ width: `${totalUnits > 0 ? (unitsTaught / totalUnits) * 100 : 0}%` }}
              />
            </div>
            <span className="text-sm font-medium w-16 text-right">{totalUnits > 0 ? Math.round((unitsTaught / totalUnits) * 100) : 0}%</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm w-32 text-[var(--text-light)]">En progreso</span>
            <div className="flex-1 bg-gray-200 rounded-full h-3">
              <div
                className="bg-amber-500 h-3 rounded-full transition-all"
                style={{ width: `${totalUnits > 0 ? (unitsInProgress / totalUnits) * 100 : 0}%` }}
              />
            </div>
            <span className="text-sm font-medium w-16 text-right">{totalUnits > 0 ? Math.round((unitsInProgress / totalUnits) * 100) : 0}%</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm w-32 text-[var(--text-light)]">Pendientes</span>
            <div className="flex-1 bg-gray-200 rounded-full h-3">
              <div
                className="bg-gray-400 h-3 rounded-full transition-all"
                style={{ width: `${totalUnits > 0 ? ((totalUnits - unitsTaught - unitsInProgress) / totalUnits) * 100 : 0}%` }}
              />
            </div>
            <span className="text-sm font-medium w-16 text-right">{totalUnits > 0 ? Math.round(((totalUnits - unitsTaught - unitsInProgress) / totalUnits) * 100) : 0}%</span>
          </div>
        </div>
      </div>

      {/* Distribución por asignatura */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {['Chamber', 'Band', 'Orchestra'].map(type => {
          const typeEnsembles = ensembles.filter(e => e.type === type);
          const typeUnits = units.filter(u => u.subject === type);
          const typeLabels: Record<string, string> = { Chamber: 'Cámara', Band: 'Banda', Orchestra: 'Orquesta' };
          return (
            <div key={type} className="card">
              <h3 className="font-semibold text-[var(--primary)] mb-3">{typeLabels[type]}</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-[var(--text-light)]">Agrupaciones:</span>
                  <span className="font-medium">{typeEnsembles.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[var(--text-light)]">Unidades:</span>
                  <span className="font-medium">{typeUnits.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[var(--text-light)]">Impartidas:</span>
                  <span className="font-medium">{typeUnits.filter(u => u.status === 'taught').length}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Accesos rápidos */}
      <div className="card">
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Calendar size={20} className="text-[var(--primary)]" />
          Accesos Rápidos
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { label: 'Nuevo alumno', icon: Users },
            { label: 'Nueva agrupación', icon: Music },
            { label: 'Registrar ensayo', icon: ClipboardCheck },
            { label: 'Ver calificaciones', icon: Award },
          ].map((item, i) => (
            <button
              key={i}
              className="flex flex-col items-center gap-2 p-4 rounded-lg border border-[var(--border)] hover:border-[var(--primary)] hover:bg-[var(--bg-alt)] transition text-center"
            >
              <item.icon size={24} className="text-[var(--primary)]" />
              <span className="text-xs text-[var(--text)]">{item.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Datos institucionales */}
      <div className="card bg-[var(--bg-alt)]">
        <h3 className="font-semibold text-sm text-[var(--text-light)] mb-2">Datos Institucionales</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div>
            <p className="text-[var(--text-muted)] text-xs">Centro</p>
            <p className="font-medium">{settings.school}</p>
          </div>
          <div>
            <p className="text-[var(--text-muted)] text-xs">Localidad</p>
            <p className="font-medium">{settings.locality}</p>
          </div>
          <div>
            <p className="text-[var(--text-muted)] text-xs">Departamento</p>
            <p className="font-medium">{settings.department}</p>
          </div>
          <div>
            <p className="text-[var(--text-muted)] text-xs">Curso académico</p>
            <p className="font-medium">{settings.academicYear}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
