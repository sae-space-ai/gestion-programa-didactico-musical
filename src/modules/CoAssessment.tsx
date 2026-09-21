// =====================================================
// MÓDULO AUTOEVALUACIÓN Y COEVALUACIÓN
// Generadores de fichas y registro
// =====================================================

import { AppState } from '../types';
import { UserCheck, Printer } from 'lucide-react';

interface Props { state: AppState; updateState: (u: Partial<AppState>) => void; showToast: (m: string, t?: string) => void; }

export default function CoAssessment({ state }: Props) {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[var(--primary)]">Autoevaluación y Coevaluación</h1>
        <p className="text-sm text-[var(--text-light)]">Generadores de fichas imprimibles y registro de evaluaciones</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Autoevaluación */}
        <div className="card">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-blue-50"><UserCheck size={24} className="text-blue-600" /></div>
            <div>
              <h2 className="font-bold text-[var(--primary)]">Autoevaluación</h2>
              <p className="text-xs text-[var(--text-muted)]">{state.selfAssessments.length} registros</p>
            </div>
          </div>
          <p className="text-sm text-[var(--text-light)] mb-4">
            Genera fichas de autoevaluación para que el alumno reflexione sobre su propio proceso de aprendizaje.
          </p>
          <div className="space-y-2 mb-4">
            <h4 className="text-sm font-semibold">Preguntas guía:</h4>
            <ul className="text-xs space-y-1 text-[var(--text-light)]">
              <li>• ¿He preparado adecuadamente mi parte?</li>
              <li>• ¿He detectado dificultades en el ensayo?</li>
              <li>• ¿He ajustado mi interpretación según las indicaciones?</li>
              <li>• ¿He logrado los objetivos propuestos?</li>
              <li>• ¿Qué aspectos necesito mejorar?</li>
            </ul>
          </div>
          <button onClick={() => window.print()} className="btn btn-outline w-full">
            <Printer size={16} /> Generar ficha de autoevaluación
          </button>

          {/* Ficha imprimible */}
          <div className="mt-4 p-4 border border-dashed border-[var(--border)] rounded-lg">
            <h4 className="font-bold text-sm text-center mb-2">FICHA DE AUTOEVALUACIÓN</h4>
            <p className="text-xs text-center text-[var(--text-muted)] mb-3">{state.settings.school} · {state.settings.academicYear}</p>
            <div className="space-y-2 text-xs">
              <div className="flex gap-2"><span className="w-20 font-medium">Nombre:</span><div className="flex-1 border-b border-gray-300"></div></div>
              <div className="flex gap-2"><span className="w-20 font-medium">Agrupación:</span><div className="flex-1 border-b border-gray-300"></div></div>
              <div className="flex gap-2"><span className="w-20 font-medium">Fecha:</span><div className="flex-1 border-b border-gray-300"></div></div>
              <div className="flex gap-2"><span className="w-20 font-medium">Actividad:</span><div className="flex-1 border-b border-gray-300"></div></div>
              <div className="mt-3">
                <p className="font-medium mb-1">1. ¿He preparado mi parte individualmente?</p>
                <div className="flex gap-4"><label className="flex items-center gap-1"><input type="checkbox" /> Sí, totalmente</label><label className="flex items-center gap-1"><input type="checkbox" /> Parcialmente</label><label className="flex items-center gap-1"><input type="checkbox" /> No</label></div>
              </div>
              <div>
                <p className="font-medium mb-1">2. ¿Qué dificultades he encontrado?</p>
                <div className="h-12 border border-gray-300 rounded"></div>
              </div>
              <div>
                <p className="font-medium mb-1">3. ¿Qué he logrado mejorar?</p>
                <div className="h-12 border border-gray-300 rounded"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Coevaluación */}
        <div className="card">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-purple-50"><UserCheck size={24} className="text-purple-600" /></div>
            <div>
              <h2 className="font-bold text-[var(--primary)]">Coevaluación</h2>
              <p className="text-xs text-[var(--text-muted)]">{state.peerAssessments.length} registros</p>
            </div>
          </div>
          <p className="text-sm text-[var(--text-light)] mb-4">
            Genera fichas de coevaluación para que los compañeros se evalúen entre sí de forma constructiva.
          </p>
          <div className="space-y-2 mb-4">
            <h4 className="text-sm font-semibold">Preguntas guía:</h4>
            <ul className="text-xs space-y-1 text-[var(--text-light)]">
              <li>• ¿Ha trabajado adecuadamente en el ensayo?</li>
              <li>• ¿Qué dificultades has observado?</li>
              <li>• ¿Qué aspectos ha mejorado?</li>
              <li>• ¿Qué propuesta de mejora le harías?</li>
            </ul>
          </div>
          <button onClick={() => window.print()} className="btn btn-outline w-full">
            <Printer size={16} /> Generar ficha de coevaluación
          </button>

          {/* Ficha imprimible */}
          <div className="mt-4 p-4 border border-dashed border-[var(--border)] rounded-lg">
            <h4 className="font-bold text-sm text-center mb-2">FICHA DE COEVALUACIÓN</h4>
            <p className="text-xs text-center text-[var(--text-muted)] mb-3">{state.settings.school} · {state.settings.academicYear}</p>
            <div className="space-y-2 text-xs">
              <div className="flex gap-2"><span className="w-24 font-medium">Observador:</span><div className="flex-1 border-b border-gray-300"></div></div>
              <div className="flex gap-2"><span className="w-24 font-medium">Observado:</span><div className="flex-1 border-b border-gray-300"></div></div>
              <div className="flex gap-2"><span className="w-24 font-medium">Fecha:</span><div className="flex-1 border-b border-gray-300"></div></div>
              <div>
                <p className="font-medium mb-1">1. ¿Ha trabajado de forma adecuada?</p>
                <div className="h-12 border border-gray-300 rounded"></div>
              </div>
              <div>
                <p className="font-medium mb-1">2. ¿Qué dificultades has observado?</p>
                <div className="h-12 border border-gray-300 rounded"></div>
              </div>
              <div>
                <p className="font-medium mb-1">3. Propuesta de mejora:</p>
                <div className="h-12 border border-gray-300 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Comparativa */}
      <div className="card">
        <h2 className="font-bold text-[var(--primary)] mb-4">Comparativa: Autoevaluación vs Coevaluación vs Evaluación del profesor</h2>
        <p className="text-sm text-[var(--text-light)] mb-4">
          Cuando se dispongan de los tres tipos de evaluación para un mismo alumno y actividad, se mostrará aquí una comparativa visual.
        </p>
        <div className="table-container">
          <table>
            <thead>
              <tr><th>Alumno</th><th>Autoevaluación</th><th>Coevaluación</th><th>Profesor</th><th>Diferencia</th></tr>
            </thead>
            <tbody>
              {state.students.filter(s => s.active).slice(0, 5).map(s => (
                <tr key={s.id}>
                  <td>{s.firstName} {s.lastName}</td>
                  <td className="text-center">-</td>
                  <td className="text-center">-</td>
                  <td className="text-center">
                    {state.assessments.filter(a => a.studentId === s.id).length > 0
                      ? state.assessments.filter(a => a.studentId === s.id).slice(-1)[0].finalGrade
                      : '-'}
                  </td>
                  <td className="text-center text-[var(--text-muted)]">Pendiente</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
