// =====================================================
// MÓDULO CALIFICACIONES
// Tablas resumen, estadísticas, exportación CSV/PDF
// =====================================================

import { useState } from 'react';
import { AppState } from '../types';
import { calculateAverage, calculateDistribution, exportCSV, getQualitativeGrade, isPassing } from '../utils/helpers';
import { BarChart3, Download, Printer } from 'lucide-react';

interface Props { state: AppState; updateState: (u: Partial<AppState>) => void; showToast: (m: string, t?: string) => void; }

export default function Grades({ state }: Props) {
  const [filterTerm, setFilterTerm] = useState<number>(0);
  const [filterEnsemble, setFilterEnsemble] = useState<string>('');

  const getStudentGrades = (studentId: string) => {
    let assessments = state.assessments.filter(a => a.studentId === studentId);
    if (filterTerm) assessments = assessments.filter(a => a.term === filterTerm);
    if (filterEnsemble) assessments = assessments.filter(a => a.ensembleId === filterEnsemble);
    return assessments;
  };

  const getStudentTribunalGrades = (studentId: string) => {
    return state.tribunals.filter(t => t.studentId === studentId);
  };

  const allGrades = state.assessments.map(a => a.finalGrade);
  const average = calculateAverage(allGrades);
  const distribution = calculateDistribution(allGrades);
  const passingRate = allGrades.length > 0 ? Math.round((allGrades.filter(g => isPassing(g)).length / allGrades.length) * 100) : 0;

  const handleExportCSV = () => {
    const data = state.students.filter(s => s.active).map(s => {
      const assessments = getStudentGrades(s.id);
      const tribunals = getStudentTribunalGrades(s.id);
      const avgGrade = assessments.length > 0 ? calculateAverage(assessments.map(a => a.finalGrade)) : null;
      return {
        Nombre: s.firstName,
        Apellidos: s.lastName,
        Instrumento: s.instrument,
        Curso: s.course,
        'Nº Evaluaciones': assessments.length,
        'Media Criterios': avgGrade ?? '-',
        'Nº Tribunales': tribunals.length,
        'Media Tribunal': tribunals.length > 0 ? calculateAverage(tribunals.map(t => t.finalGrade)) : '-',
        'Cualificación': avgGrade ? getQualitativeGrade(avgGrade) : '-',
        'Aprobado': avgGrade ? (isPassing(avgGrade) ? 'Sí' : 'No') : '-',
      };
    });
    exportCSV(data, 'calificaciones');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[var(--primary)]">Calificaciones</h1>
          <p className="text-sm text-[var(--text-light)]">Resumen de calificaciones por alumno, trimestre y agrupación</p>
        </div>
        <div className="flex gap-2">
          <button onClick={handleExportCSV} className="btn btn-outline"><Download size={16} /> CSV</button>
          <button onClick={() => window.print()} className="btn btn-primary"><Printer size={16} /> Imprimir</button>
        </div>
      </div>

      {/* Estadísticas generales */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="card text-center">
          <p className="text-3xl font-bold text-[var(--primary)]">{average || '-'}</p>
          <p className="text-xs text-[var(--text-muted)]">Media del grupo</p>
        </div>
        <div className="card text-center">
          <p className="text-3xl font-bold text-green-600">{passingRate}%</p>
          <p className="text-xs text-[var(--text-muted)]">Tasa de aprobados</p>
        </div>
        <div className="card text-center">
          <p className="text-3xl font-bold text-[var(--primary)]">{allGrades.length}</p>
          <p className="text-xs text-[var(--text-muted)]">Evaluaciones registradas</p>
        </div>
        <div className="card text-center">
          <p className="text-3xl font-bold text-[var(--accent)]">{state.tribunals.length}</p>
          <p className="text-xs text-[var(--text-muted)]">Evaluaciones tribunal</p>
        </div>
      </div>

      {/* Distribución */}
      <div className="card">
        <h2 className="font-bold text-[var(--primary)] mb-4 flex items-center gap-2"><BarChart3 size={20} /> Distribución de calificaciones</h2>
        <div className="space-y-2">
          {Object.entries(distribution).map(([range, count]) => (
            <div key={range} className="flex items-center gap-3">
              <span className="text-xs w-32 text-[var(--text-light)]">{range}</span>
              <div className="flex-1 bg-gray-200 rounded-full h-4">
                <div
                  className={`h-4 rounded-full transition-all ${
                    range.includes('Insuficiente') ? 'bg-red-400' :
                    range.includes('Suficiente') ? 'bg-orange-400' :
                    range.includes('Bien') ? 'bg-blue-400' :
                    range.includes('Notable') ? 'bg-green-400' : 'bg-purple-400'
                  }`}
                  style={{ width: `${allGrades.length > 0 ? (count / allGrades.length) * 100 : 0}%` }}
                />
              </div>
              <span className="text-xs font-medium w-8 text-right">{count}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Filtros */}
      <div className="card">
        <div className="flex flex-wrap gap-3">
          <select value={filterTerm} onChange={(e) => setFilterTerm(Number(e.target.value))} className="form-select w-auto">
            <option value={0}>Todos los trimestres</option>
            <option value={1}>1º Trimestre</option>
            <option value={2}>2º Trimestre</option>
            <option value={3}>3º Trimestre</option>
          </select>
          <select value={filterEnsemble} onChange={(e) => setFilterEnsemble(e.target.value)} className="form-select w-auto">
            <option value="">Todas las agrupaciones</option>
            {state.ensembles.map(e => <option key={e.id} value={e.id}>{e.name}</option>)}
          </select>
        </div>
      </div>

      {/* Tabla de calificaciones */}
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Alumno</th>
              <th>Instrumento</th>
              <th>Curso</th>
              <th>Evaluaciones</th>
              <th>Media</th>
              <th>Tribunal</th>
              <th>Cualificación</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            {state.students.filter(s => s.active).map(student => {
              const assessments = getStudentGrades(student.id);
              const tribunals = getStudentTribunalGrades(student.id);
              const avgGrade = assessments.length > 0 ? calculateAverage(assessments.map(a => a.finalGrade)) : null;
              const tribunalAvg = tribunals.length > 0 ? calculateAverage(tribunals.map(t => t.finalGrade)) : null;
              return (
                <tr key={student.id}>
                  <td className="font-medium">{student.lastName}, {student.firstName}</td>
                  <td>{student.instrument}</td>
                  <td>{student.course}º</td>
                  <td>{assessments.length}</td>
                  <td className="font-bold">{avgGrade ?? '-'}</td>
                  <td className="font-bold">{tribunalAvg ?? '-'}</td>
                  <td>{avgGrade ? getQualitativeGrade(avgGrade) : '-'}</td>
                  <td>
                    {avgGrade ? (
                      <span className={`badge ${isPassing(avgGrade) ? 'badge-success' : 'badge-danger'}`}>
                        {isPassing(avgGrade) ? 'Aprobado' : 'Suspenso'}
                      </span>
                    ) : <span className="text-[var(--text-muted)] text-xs">Sin datos</span>}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
