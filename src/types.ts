// =====================================================
// TIPOS DE DATOS - Programa Didáctico 2026/2027
// Estudios Profesionales de Música de Extremadura
// =====================================================

// Tipos de agrupaciones
export type EnsembleType = 'Chamber' | 'Band' | 'Orchestra';
export type EnsembleTypeLabel = 'Música de Cámara' | 'Banda' | 'Orquesta';

// Niveles de evaluación
export type RubricLevel = 'Initial' | 'Developing' | 'Adequate' | 'Consolidated';
export type TribunalLevel = 1 | 2 | 3 | 4; // No competente, Básico, Medio, Avanzado

// Estado de unidades didácticas
export type UnitStatus = 'pending' | 'inprogress' | 'taught';

// Tipo de actividad
export type ActivityType = 'section_rehearsal' | 'ensemble_rehearsal' | 'public_performance';

// ESTUDIANTE
export interface Student {
  id: string;
  firstName: string;
  lastName: string;
  instrument: string;
  course: number; // 1-6
  ensembles: string[]; // IDs de agrupaciones
  email: string;
  phone: string;
  observations: string;
  registrationDate: string;
  active: boolean;
}

// AGRUPACIÓN
export interface Ensemble {
  id: string;
  name: string;
  type: EnsembleType;
  course: number;
  members: string[]; // IDs de estudiantes
  repertoire: string[];
  teacher: string;
  schedule: string;
  room: string;
  observations: string;
}

// EVALUACIÓN POR CRITERIOS
export interface Assessment {
  id: string;
  studentId: string;
  ensembleId: string;
  term: number; // 1, 2, 3
  date: string;
  criteria: Record<string, RubricLevel>; // CO-01 a CO-12
  finalGrade: number;
  observations: string;
  assessor: string;
}

// EVALUACIÓN POR TRIBUNAL
export interface TribunalAssessment {
  id: string;
  studentId: string;
  ensembleId: string;
  date: string;
  tribunal: string[]; // IDs de miembros del tribunal
  criteria: {
    dynamics: TribunalLevel;
    rhythm: TribunalLevel;
    articulation: TribunalLevel;
    phrasing: TribunalLevel;
    coordination: TribunalLevel;
    intonation: TribunalLevel;
  };
  finalGrade: number;
  tribunalAverage: number;
}

// REGISTRO DE ENSAYO
export interface RehearsalLog {
  id: string;
  date: string;
  course: number;
  subject: string;
  type: ActivityType;
  work: string;
  objective: string;
  difficulty: number; // 1-5
  adjustment: string;
  result: string;
  pending: string;
  criteria: string[];
  observations: string;
}

// REGISTRO DE INCIDENCIA
export interface IncidentLog {
  id: string;
  date: string;
  course: number;
  subject: string;
  situation: string;
  incident: string;
  response: string;
  continuityLevel: number; // 1-4
  criteria: string[];
  observations: string;
}

// REGISTRO DE ACTUACIÓN
export interface PerformanceLog {
  id: string;
  date: string;
  type: 'audition' | 'concert';
  work: string;
  venue: string;
  aspects: Record<string, number>; // 1-4
  observations: string;
}

// AUTOEVALUACIÓN
export interface SelfAssessment {
  id: string;
  studentId: string;
  date: string;
  activity: string;
  answers: {
    prepared: string;
    detected: string;
    adjusted: string;
    achieved: string;
    improve: string;
  };
  criteria: string[];
}

// COEVALUACIÓN
export interface PeerAssessment {
  id: string;
  observerId: string;
  observedId: string;
  date: string;
  answers: {
    worked: string;
    difficulties: string;
    improvements: string;
    proposal: string;
  };
  criteria: string[];
}

// UNIDAD DIDÁCTICA
export interface DidacticUnit {
  id: string;
  code: string;
  title: string;
  course: number;
  subject: string;
  term: number;
  timing: string;
  justification: string;
  objectives: string[];
  contents: string[];
  competences: string[];
  activities: string[];
  methodology: string;
  diversity: string;
  resources: string[];
  evidence: string[];
  instruments: string[];
  criteria: string[];
  indicators: string[];
  product: string;
  recovery: string;
  status: UnitStatus;
  observations: string;
}

// REUNIÓN DE COORDINACIÓN
export interface Meeting {
  id: string;
  date: string;
  type: string;
  attendees: string[];
  agenda: string;
  agreements: string[];
  observations: string;
}

// CONFIGURACIÓN
export interface Settings {
  school: string;
  locality: string;
  province: string;
  department: string;
  staff: string[];
  academicYear: string;
  weightings: {
    type: 'A' | 'B';
    criteriaWeights: Record<string, number>;
    evidenceDistribution: Record<string, number>;
  };
  theme: 'light' | 'dark';
}

// ALERTA HOLD
export interface HoldAlert {
  id: string;
  type: string;
  description: string;
  date: string;
  resolved: boolean;
  justification: string;
}

// ESTADO GLOBAL DE LA APLICACIÓN
export interface AppState {
  students: Student[];
  ensembles: Ensemble[];
  assessments: Assessment[];
  tribunals: TribunalAssessment[];
  rehearsalLogs: RehearsalLog[];
  incidentLogs: IncidentLog[];
  performanceLogs: PerformanceLog[];
  selfAssessments: SelfAssessment[];
  peerAssessments: PeerAssessment[];
  units: DidacticUnit[];
  meetings: Meeting[];
  settings: Settings;
  holds: HoldAlert[];
}

// CRITERIO DE EVALUACIÓN
export interface Criterion {
  code: string;
  description: string;
  indicators: string[];
  rubric: {
    Initial: string;
    Developing: string;
    Adequate: string;
    Consolidated: string;
  };
}

// OBJETIVO
export interface Objective {
  code: string;
  description: string;
  type: 'general' | 'chamber' | 'band' | 'orchestra';
}

// COMPETENCIA
export interface Competence {
  code: string;
  description: string;
  type: 'musical' | 'interpretive' | 'personal' | 'autonomy' | 'digital';
}

// =====================================================
// TIPOS PARA BLOQUES DE CONTENIDO (Módulo Bloques)
// =====================================================

// BLOQUE BASE
export interface Bloque {
  id: string;
  code: string;
  title: string;
  description: string;
  subject?: 'Camara' | 'Banda' | 'Orquesta' | 'All';
  course?: number | 'All';
  relatedObjectives?: string[];
  relatedCriteria?: string[];
  relatedCompetences?: string[];
  relatedContents?: string[];
}

// OBJETIVO
export interface Objetivo extends Bloque {
  type: 'general' | 'camara' | 'banda' | 'orquesta';
}

// CONTENIDO
export interface Contenido extends Bloque {
  subcontents: string[];
}

// COMPETENCIA (para Bloques)
export interface CompetenciaBloque extends Bloque {
  family: 'musical' | 'interpretativa' | 'personal' | 'autonomia' | 'digital';
  manifestations: string[];
  units: string[];
  evidence: string[];
  instruments: string[];
}

// FILTROS DE BLOQUES
export interface BloquesFilters {
  subject: 'All' | 'Camara' | 'Banda' | 'Orquesta';
  course: 'All' | 1 | 2 | 3 | 4 | 5 | 6;
  search: string;
}

// =====================================================
// TIPOS PARA CATÁLOGO DE RÚBRICAS (Anexo)
// =====================================================

// RÚBRICA
export interface Rubric {
  id: string;
  code: string;
  title: string;
  subject?: 'Camara' | 'Banda' | 'Orquesta' | 'All';
  course?: 1 | 2 | 3 | 4 | 5 | 6 | 'All';
  criterionCodes: string[];
  competenceCodes: string[];
  levels: {
    initial: string;
    developing: string;
    adequate: string;
    consolidated: string;
  };
  evidence: string[];
  instruments: string[];
  weight?: number;
}

// CADENA DE TRAZABILIDAD
export interface TraceabilityChain {
  id: string;
  contentId: string;
  contentTitle: string;
  objectiveId: string;
  objectiveTitle: string;
  criterionCode: string;
  criterionTitle: string;
  competenceCode: string;
  competenceTitle: string;
  activityId: string;
  activityTitle: string;
  evidenceId: string;
  evidenceTitle: string;
  instrumentId: string;
  instrumentTitle: string;
  achievementLevel: 1 | 2 | 3 | 4;
  unitCode: string;
  course: number;
  subject: 'Camara' | 'Banda' | 'Orquesta';
}

// FILTROS DEL CATÁLOGO
export interface RubricCatalogFilters {
  subject: 'All' | 'Camara' | 'Banda' | 'Orquesta';
  course: 'All' | 1 | 2 | 3 | 4 | 5 | 6;
  criterion: 'All' | string;
  competence: 'All' | string;
  search: string;
}
