// =====================================================
// DATOS DE MUESTRA INICIALES
// Estudiantes, agrupaciones y configuración por defecto
// =====================================================

import { Student, Ensemble, Settings, AppState } from '../types';
import { generateUnits } from './programmeData';

// --- ESTUDIANTES DE MUESTRA ---
export const sampleStudents: Student[] = [
  {
    id: 's1', firstName: 'María', lastName: 'García López', instrument: 'Violín',
    course: 2, ensembles: ['e1', 'e3'], email: 'maria.garcia@conservatorio.es',
    phone: '600123456', observations: 'Excelente progreso técnico', registrationDate: '2026-09-01', active: true
  },
  {
    id: 's2', firstName: 'Pablo', lastName: 'Martínez Ruiz', instrument: 'Violoncello',
    course: 2, ensembles: ['e1', 'e3'], email: 'pablo.martinez@conservatorio.es',
    phone: '600234567', observations: 'Necesita reforzar la lectura a primera vista', registrationDate: '2026-09-01', active: true
  },
  {
    id: 's3', firstName: 'Lucía', lastName: 'Fernández Díaz', instrument: 'Piano',
    course: 3, ensembles: ['e1'], email: 'lucia.fernandez@conservatorio.es',
    phone: '600345678', observations: 'Gran sensibilidad musical', registrationDate: '2026-09-01', active: true
  },
  {
    id: 's4', firstName: 'Carlos', lastName: 'Rodríguez Sánchez', instrument: 'Clarinete',
    course: 1, ensembles: ['e2'], email: 'carlos.rodriguez@conservatorio.es',
    phone: '600456789', observations: 'Buen oído y afinación', registrationDate: '2026-09-15', active: true
  },
  {
    id: 's5', firstName: 'Ana', lastName: 'López Moreno', instrument: 'Flauta',
    course: 1, ensembles: ['e2'], email: 'ana.lopez@conservatorio.es',
    phone: '600567890', observations: 'Muy motivada', registrationDate: '2026-09-15', active: true
  },
  {
    id: 's6', firstName: 'Javier', lastName: 'Hernández Gil', instrument: 'Trompeta',
    course: 3, ensembles: ['e2', 'e3'], email: 'javier.hernandez@conservatorio.es',
    phone: '600678901', observations: 'Lidera la sección de metales', registrationDate: '2026-09-01', active: true
  },
  {
    id: 's7', firstName: 'Elena', lastName: 'Navarro Pérez', instrument: 'Viola',
    course: 4, ensembles: ['e1', 'e3'], email: 'elena.navarro@conservatorio.es',
    phone: '600789012', observations: 'Nivel avanzado', registrationDate: '2025-09-01', active: true
  },
  {
    id: 's8', firstName: 'Diego', lastName: 'Romero Castro', instrument: 'Tuba',
    course: 2, ensembles: ['e2'], email: 'diego.romero@conservatorio.es',
    phone: '600890123', observations: 'Buena lectura rítmica', registrationDate: '2026-09-01', active: true
  },
];

// --- AGRUPACIONES DE MUESTRA ---
export const sampleEnsembles: Ensemble[] = [
  {
    id: 'e1', name: 'Trío Clásico A', type: 'Chamber', course: 2,
    members: ['s1', 's2', 's3'], repertoire: ['Mozart Trío K.498', 'Beethoven Trío Op.11'],
    teacher: 'Prof. Isabel Martín', schedule: 'Lunes y Miércoles 16:00-17:30', room: 'Sala de Cámara 1',
    observations: 'Grupo con excelente proyección'
  },
  {
    id: 'e2', name: 'Banda Juvenil', type: 'Band', course: 1,
    members: ['s4', 's5', 's6', 's8'], repertoire: ['Holst Suite nº1', 'Alford Colonel Bogey'],
    teacher: 'Prof. Antonio Vega', schedule: 'Martes y Jueves 17:00-19:00', room: 'Sala de Ensembles',
    observations: '20 miembros en total'
  },
  {
    id: 'e3', name: 'Orquesta de Cámara', type: 'Orchestra', course: 3,
    members: ['s1', 's2', 's6', 's7'], repertoire: ['Mozart Sinfonía nº40', 'Vivaldi Cuatro Estaciones'],
    teacher: 'Prof. Carmen Delgado', schedule: 'Viernes 16:00-18:00', room: 'Auditorio',
    observations: 'Preparando concierto de Navidad'
  },
];

// --- CONFIGURACIÓN POR DEFECTO ---
export const defaultSettings: Settings = {
  school: 'Conservatorio Profesional de Música',
  locality: 'Badajoz',
  province: 'Badajoz',
  department: 'Música de Cámara, Banda y Orquesta',
  staff: ['Prof. Isabel Martín', 'Prof. Antonio Vega', 'Prof. Carmen Delgado'],
  academicYear: '2026/2027',
  weightings: {
    type: 'A',
    criteriaWeights: {
      'CO-01': 2, 'CO-02': 2, 'CO-03': 2, 'CO-04': 2, 'CO-05': 2,
      'CO-06': 2, 'CO-07': 2, 'CO-08': 2, 'CO-09': 2, 'CO-10': 2,
      'CO-11': 2, 'CO-12': 2,
    },
    evidenceDistribution: {
      'rehearsal': 30, 'performance': 40, 'self_peer': 15, 'continuous': 15,
    },
  },
  theme: 'light',
};

// --- ESTADO INICIAL ---
export const getInitialState = (): AppState => ({
  students: sampleStudents,
  ensembles: sampleEnsembles,
  assessments: [],
  tribunals: [],
  rehearsalLogs: [],
  incidentLogs: [],
  performanceLogs: [],
  selfAssessments: [],
  peerAssessments: [],
  units: generateUnits(),
  meetings: [],
  settings: defaultSettings,
  holds: [],
});
