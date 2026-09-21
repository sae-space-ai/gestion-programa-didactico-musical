// =====================================================
// DASHBOARD - Panel de inicio mejorado
// Programa Didáctico 2026/2027
// =====================================================

import { AppState } from '../types';
import {
  Users, Music, BookOpen, ClipboardCheck, AlertTriangle,
  TrendingUp, Calendar, Award, CheckCircle2, Clock, ArrowRight
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
    { label: 'Alumnos activos', value: activeStudents, icon: Users, color: 'bg-blue-500' },
    { label: 'Agrupaciones', value: activeEnsembles, icon: Music, color: 'bg-purple-500' },
    { label: 'Unidades impartidas', value: `${unitsTaught}/${totalUnits}`, icon: BookOpen, color: 'bg-green-500' },
    { label: 'Evaluaciones', value: assessmentsCount, icon: ClipboardCheck, color: 'bg-orange-500' },
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

  // Datos para gráfico de unidades por asignatura
  const subjectData = [
    { name: 'Banda', unidades: units.filter((u) => u.subject === 'Banda').length, impartidas: units.filter((u) => u.subject === 'Banda' && u.status === 'taught').length },
    { name: 'Orquesta', unidades: units.filter((u) => u.subject === 'Orquesta').length, impartidas: units.filter((u) => u.subject === 'Orquesta' && u.status === 'taught').length },
    { name: 'Cámara', unidades: units.filter((u) => u.subject === 'Cámara').length, impartidas: units.filter((u) => u.subject === 'Cámara' && u.status === 'taught').length },
  ];

  // Evolución de evaluaciones
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
      {/* Hero Banner */}
      <div className="gradient-primary rounded-xl p-8 md:p-10 text-white shadow-lg">
        <h1 className="text-2xl md:text-3xl font-bold mb-2 break-words">
          Programación Didáctica 2026/2027
        </h1>
        <p className="text-lg md:text-xl text-blue-100 mb-1 break-words">
          Música de Cámara · Banda · Orquesta
        </p>
        <p className="text-sm text-blue-200 italic break-words">
          Enseñanzas Profesionales de Música · Extremadura
        </p>
        <div className="mt-4 pt-4 border-t border-white/20">
          <p className="text-sm text-blue-100">
            {settings.school} · {settings.locality}
          </p>
        </div>
      </div>

      {/* Alerta HOLD */}
      {unresolvedHolds > 0 && (
        <div className="card border-l-4 border-l-[var(--warning)] bg-[#fff8e6] dark:bg-[var(--warning)]/10">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              <AlertTriangle className="text-[var(--warning)]" size={24} />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-[var(--warning)] mb-1 break-words">
                Elementos de verificación (HOLD)
              </h3>
              <p className="text-sm text-[var(--text)] mb-3 break-words">
                Hay <strong>{unresolvedHolds}</strong> elementos pendientes de verificación que requieren tu atención.
              </p>
              <button className="btn btn-accent">
                Revisar HOLD
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Estadísticas principales */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map((stat, i) => (
          <div key={i} className="card hover:shadow-lg transition-all hover:-translate-y-1">
            <div className="flex items-center gap-4">
              <div className={`${stat.color} p-3 rounded-xl text-white flex-shrink-0`}>
                <stat.icon size={28} />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-3xl font-bold text-[var(--text)] break-words">{stat.value}</p>
                <p className="text-sm text-[var(--text-light)] break-words">{stat.label}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Estado de unidades (Pie) */}
        <div className="card">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2 break-words">
            <TrendingUp size={20} className="text-[var(--primary)] flex-shrink-0" />
            Estado de Unidades Didácticas
          </h2>
          <ResponsiveContainer width="100%" height={240}>
            <PieChart>
              <Pie
                data={unitStatusData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
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
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2 break-words">
            <Users size={20} className="text-[var(--primary)] flex-shrink-0" />
            Alumnos por Curso
          </h2>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={courseData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="curso" stroke="var(--text-light)" fontSize={12} />
              <YAxis stroke="var(--text-light)" fontSize={12} />
              <Tooltip />
              <Bar dataKey="alumnos" fill="var(--primary)" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Unidades por asignatura (Bar comparativo) */}
        <div className="card">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2 break-words">
            <BookOpen size={20} className="text-[var(--primary)] flex-shrink-0" />
            Unidades por Asignatura
          </h2>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={subjectData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="name" stroke="var(--text-light)" fontSize={12} />
              <YAxis stroke="var(--text-light)" fontSize={12} />
              <Tooltip />
              <Legend />
              <Bar dataKey="unidades" fill="var(--primary-light)" name="Total" radius={[8, 8, 0, 0]} />
              <Bar dataKey="impartidas" fill="var(--success)" name="Impartidas" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Evolución de evaluaciones (Line) */}
        <div className="card">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2 break-words">
            <Award size={20} className="text-[var(--primary)] flex-shrink-0" />
            Evolución de Evaluaciones
          </h2>
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={evolutionData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="mes" stroke="var(--text-light)" fontSize={12} />
              <YAxis stroke="var(--text-light)" fontSize={12} />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="evaluaciones"
                stroke="var(--accent)"
                strokeWidth={3}
                dot={{ fill: 'var(--accent)', r: 5 }}
                activeDot={{ r: 7 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Distribución por tipo de agrupación */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {(['Chamber', 'Band', 'Orchestra'] as const).map((type) => {
          const typeEnsembles = ensembles.filter((e) => e.type === type);
          const typeUnits = units.filter((u) => u.subject === (type === 'Chamber' ? 'Cámara' : type));
          const typeLabels: Record<string, string> = { Chamber: 'Cámara', Band: 'Banda', Orchestra: 'Orquesta' };
          return (
            <div key={type} className="card hover:shadow-lg transition-all hover:-translate-y-1">
              <h3 className="font-semibold text-[var(--primary)] mb-4 break-words">{typeLabels[type]}</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between items-center">
                  <span className="text-[var(--text-light)]">Agrupaciones:</span>
                  <span className="font-bold text-lg">{typeEnsembles.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[var(--text-light)]">Unidades:</span>
                  <span className="font-bold text-lg">{typeUnits.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[var(--text-light)]">Impartidas:</span>
                  <span className="font-bold text-lg text-[var(--success)]">
                    {typeUnits.filter((u) => u.status === 'taught').length}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Accesos rápidos y estado institucional */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Accesos rápidos */}
        <div className="card">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2 break-words">
            <Calendar size={20} className="text-[var(--primary)] flex-shrink-0" />
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
                className="flex flex-col items-center gap-3 p-4 rounded-lg border border-[var(--border)] hover:border-[var(--primary)] hover:bg-[var(--bg-alt)] transition-all hover:shadow-md text-center"
              >
                <item.icon size={28} className="text-[var(--primary)]" />
                <span className="text-sm text-[var(--text)] break-words">{item.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Estado de datos institucionales */}
        <div className="card">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2 break-words">
            <CheckCircle2 size={20} className="text-[var(--primary)] flex-shrink-0" />
            Datos Institucionales
          </h2>
          <div className="mb-4">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-[var(--text-light)]">Completitud</span>
              <span className="font-bold">{completedChecks}/{institutionalCheck.length}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
              <div
                className="bg-gradient-to-r from-[var(--primary)] to-[var(--primary-light)] h-3 rounded-full transition-all"
                style={{ width: `${(completedChecks / institutionalCheck.length) * 100}%` }}
              />
            </div>
          </div>
          <div className="space-y-2">
            {institutionalCheck.map((check, i) => (
              <div key={i} className="flex items-center gap-3 text-sm">
                {check.ok ? (
                  <CheckCircle2 size={18} className="text-[var(--success)] flex-shrink-0" />
                ) : (
                  <Clock size={18} className="text-[var(--warning)] flex-shrink-0" />
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
