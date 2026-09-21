// =====================================================
// MÓDULO DASHBOARD - Panel de inicio
// Resumen del curso, accesos rápidos, alertas HOLD
// Gráficos de evolución con Recharts
// =====================================================

import { AppState } from '../types';
import {
  Users, Music, BookOpen, ClipboardCheck, AlertTriangle,
  TrendingUp, Calendar, Award, CheckCircle2, Clock
} from 'lucide-react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, PieChart, Pie, Cell, Legend,
  LineChart, Line
} from 'recharts';

interface Props {
  state: AppState;
  updateState: (updates: Partial<AppState>) => void;
  showToast: (msg: string, type?: string) => void;
}

export default function Dashboard({ state }: Props) {
  const { students, ensembles, units, assessments, tribunals, holds, settings } = state;
  const activeStudents = students.filter((s) => s.active).length;
  const activeEnsembles = ensembles.length;
  const unitsTaught = units.filter((u) => u.status === 'taught').length;
  const unitsInProgress = units.filter((u) => u.status === 'inprogress').length;
  const totalUnits = units.length;
  const assessmentsCount = assessments.length + tribunals.length;
  const unresolvedHolds = holds.filter((h) => !h.resolved).length;

  // Estadísticas principales
  const stats = [
    { label: 'Alumnos activos', value: activeStudents, icon: Users, color: 'bg-blue-50 text-blue-600' },
    { label: 'Agrupaciones', value: activeEnsembles, icon: Music, color: 'bg-purple-50 text-purple-600' },
    { label: 'Unidades impartidas', value: `${unitsTaught}/${totalUnits}`, icon: BookOpen, color: 'bg-green-50 text-green-600' },
    { label: 'Evaluaciones', value: assessmentsCount, icon: ClipboardCheck, color: 'bg-amber-50 text-amber-600' },
  ];

  // Datos para gráfico de distribución por asignatura
  const subjectData = [
    { name: 'Banda', unidades: units.filter((u) => u.subject === 'Banda').length, impartidas: units.filter((u) => u.subject === 'Banda' && u.status === 'taught').length },
    { name: 'Orquesta', unidades: units.filter((u) => u.subject === 'Orquesta').length, impartidas: units.filter((u) => u.subject === 'Orquesta' && u.status === 'taught').length },
    { name: 'Cámara', unidades: units.filter((u) => u.subject === 'Cámara').length, impartidas: units.filter((u) => u.subject === 'Cámara' && u.status === 'taught').length },
  ];

  // Datos para gráfico de estado de unidades
  const unitStatusData = [
    { name: 'Impartidas', value: unitsTaught, color: '#7ab87a' },
    { name: 'En progreso', value: unitsInProgress, color: '#e6c34d' },
    { name: 'Pendientes', value: totalUnits - unitsTaught - unitsInProgress, color: '#9ca3af' },
  ];

  // Datos para gráfico de distribución de alumnos por curso
  const courseData = [1, 2, 3, 4, 5, 6].map((c) => ({
    curso: `${c}º`,
    alumnos: students.filter((s) => s.course === c && s.active).length,
  }));

  // Evolución mensual simulada (basada en evaluaciones)
  const evolutionData = [
    { mes: 'Sep', evaluaciones: 0 },
    { mes: 'Oct', evaluaciones: Math.min(assessmentsCount, 2) },
    { mes: 'Nov', evaluaciones: Math.min(assessmentsCount, 5) },
    { mes: 'Dic', evaluaciones: Math.min(assessmentsCount, 8) },
    { mes: 'Ene', evaluaciones: Math.min(assessmentsCount, 10) },
    { mes: 'Feb', evaluaciones: Math.min(assessmentsCount, 12) },
    { mes: 'Mar', evaluaciones: Math.min(assessmentsCount, 15) },
    { mes: 'Abr', evaluaciones: Math.min(assessmentsCount, 18) },
    { mes: 'May', evaluaciones: assessmentsCount },
  ];

  // Verificación de datos institucionales
  const institutionalCheck = [
    { label: 'Centro educativo', ok: !!settings.school },
    { label: 'Localidad', ok: !!settings.locality },
    { label: 'Departamento', ok: !!settings.department },
    { label: 'Profesorado', ok: settings.staff.length > 0 },
    { label: 'Curso académico', ok: !!settings.academicYear },
  ];
  const completedChecks = institutionalCheck.filter((c) => c.ok).length;

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
              <p className="font-semibold text-red-700 text-sm">
                {unresolvedHolds} elementos pendientes de verificación (HOLD)
              </p>
              <p className="text-red-600 text-xs">
                Revisa la sección de Configuración para resolverlos.
              </p>
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

      {/* Gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Estado de unidades (Pie) */}
        <div className="card">
          <h2 className="text-base font-semibold mb-3 flex items-center gap-2">
            <TrendingUp size={18} className="text-[var(--primary)]" />
            Estado de Unidades Didácticas
          </h2>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie
                data={unitStatusData}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={80}
                dataKey="value"
                label={(entry) => `${entry.name}: ${entry.value}`}
              >
                {unitStatusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Alumnos por curso (Bar) */}
        <div className="card">
          <h2 className="text-base font-semibold mb-3 flex items-center gap-2">
            <Users size={18} className="text-[var(--primary)]" />
            Alumnos por Curso
          </h2>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={courseData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="curso" stroke="var(--text-light)" fontSize={12} />
              <YAxis stroke="var(--text-light)" fontSize={12} />
              <Tooltip />
              <Bar dataKey="alumnos" fill="var(--primary)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Unidades por asignatura (Bar comparativo) */}
        <div className="card">
          <h2 className="text-base font-semibold mb-3 flex items-center gap-2">
            <BookOpen size={18} className="text-[var(--primary)]" />
            Unidades por Asignatura
          </h2>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={subjectData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="name" stroke="var(--text-light)" fontSize={12} />
              <YAxis stroke="var(--text-light)" fontSize={12} />
              <Tooltip />
              <Legend />
              <Bar dataKey="unidades" fill="var(--primary-light)" name="Total" radius={[4, 4, 0, 0]} />
              <Bar dataKey="impartidas" fill="var(--success)" name="Impartidas" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Evolución de evaluaciones (Line) */}
        <div className="card">
          <h2 className="text-base font-semibold mb-3 flex items-center gap-2">
            <Award size={18} className="text-[var(--primary)]" />
            Evolución de Evaluaciones
          </h2>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={evolutionData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="mes" stroke="var(--text-light)" fontSize={12} />
              <YAxis stroke="var(--text-light)" fontSize={12} />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="evaluaciones"
                stroke="var(--accent)"
                strokeWidth={2}
                dot={{ fill: 'var(--accent)', r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Distribución por tipo de agrupación */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {(['Chamber', 'Band', 'Orchestra'] as const).map((type) => {
          const typeEnsembles = ensembles.filter((e) => e.type === type);
          const typeUnits = units.filter((u) => u.subject === (type === 'Chamber' ? 'Cámara' : type));
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
                  <span className="font-medium">{typeUnits.filter((u) => u.status === 'taught').length}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Accesos rápidos y estado institucional */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Accesos rápidos */}
        <div className="card">
          <h2 className="text-base font-semibold mb-4 flex items-center gap-2">
            <Calendar size={18} className="text-[var(--primary)]" />
            Accesos Rápidos
          </h2>
          <div className="grid grid-cols-2 gap-3">
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

        {/* Estado de datos institucionales */}
        <div className="card">
          <h2 className="text-base font-semibold mb-4 flex items-center gap-2">
            <CheckCircle2 size={18} className="text-[var(--primary)]" />
            Datos Institucionales
          </h2>
          <div className="mb-3">
            <div className="flex justify-between text-xs mb-1">
              <span className="text-[var(--text-light)]">Completitud</span>
              <span className="font-medium">{completedChecks}/{institutionalCheck.length}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-[var(--primary)] h-2 rounded-full transition-all"
                style={{ width: `${(completedChecks / institutionalCheck.length) * 100}%` }}
              />
            </div>
          </div>
          <div className="space-y-1.5">
            {institutionalCheck.map((check, i) => (
              <div key={i} className="flex items-center gap-2 text-sm">
                {check.ok ? (
                  <CheckCircle2 size={14} className="text-green-500" />
                ) : (
                  <Clock size={14} className="text-amber-500" />
                )}
                <span className={check.ok ? 'text-[var(--text)]' : 'text-[var(--text-muted)]'}>
                  {check.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
