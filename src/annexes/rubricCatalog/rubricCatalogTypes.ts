// =====================================================
// TIPOS - Catálogo de Rúbricas
// Programa Didáctico 2026/2027
// =====================================================

export type Subject = 'Camara' | 'Banda' | 'Orquesta';
export type Course = 1 | 2 | 3 | 4 | 5 | 6;
export type AchievementLevel = 1 | 2 | 3 | 4;

export interface Rubric {
  id: string;
  code: string;
  title: string;
  subject?: Subject | 'All';
  course?: Course | 'All';
  unitCode?: string;
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
  formula?: string;
}

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
  achievementLevel: AchievementLevel;
  unitCode: string;
  course: Course;
  subject: Subject;
}

export interface RubricCatalogFilters {
  subject: 'All' | Subject;
  course: 'All' | Course;
  criterion: 'All' | string;
  competence: 'All' | string;
  search: string;
}

export interface RubricBySubject {
  subject: Subject;
  generalRubrics: Rubric[];
  activityRubrics: Rubric[];
  roleRubrics?: Rubric[];
  sectionRubrics?: Rubric[];
  courseRubrics: Rubric[];
}

export interface RubricByCourse {
  course: Course;
  subjects: Subject[];
  unitCount: number;
  rubricCount: number;
  expectedLevel: AchievementLevel;
  rubrics: Rubric[];
}

export interface RubricByUnit {
  unitCode: string;
  unitTitle: string;
  course: Course;
  subject: Subject;
  term: number;
  objectives: string[];
  contents: string[];
  competences: string[];
  criteria: string[];
  rubrics: Rubric[];
  evidence: string[];
  instruments: string[];
  product: string;
  recovery: string;
}

export interface RubricByCriterion {
  criterionCode: string;
  criterionTitle: string;
  generalRubric: Rubric;
  subjectAdaptations: Record<Subject, Rubric>;
  courseAdaptations: Record<Course, Rubric>;
  relatedCompetences: string[];
  relatedContents: string[];
  relatedObjectives: string[];
  relatedUnits: string[];
}

export interface RubricByCompetence {
  competenceCode: string;
  competenceTitle: string;
  definition: string;
  rubric: Rubric;
  criteria: string[];
  units: string[];
  evidence: string[];
  instruments: string[];
}
