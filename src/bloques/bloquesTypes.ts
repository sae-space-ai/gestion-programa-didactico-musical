// Tipos para el módulo Bloques de Contenido

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

export interface Objetivo extends Bloque {
  type: 'general' | 'camara' | 'banda' | 'orquesta';
}

export interface Contenido extends Bloque {
  subcontents: string[];
}

export interface Competencia extends Bloque {
  family: 'musical' | 'interpretativa' | 'personal' | 'autonomia' | 'digital';
  manifestations: string[];
  units: string[];
  evidence: string[];
  instruments: string[];
}

export interface PrincipioMetodologico extends Bloque {
  sequence: string[];
  strategies: string[];
  examples: {
    camara?: string;
    banda?: string;
    orquesta?: string;
  };
}

export interface PrincipioEvaluacion extends Bloque {
  application: {
    camara?: string;
    banda?: string;
    orquesta?: string;
  };
  evidenceTypes: string[];
}

export interface Repertorio extends Bloque {
  composers: string[];
  works: string[];
  difficulty: 'basic' | 'intermediate' | 'advanced';
  priorities: string[];
}

export interface Actividad extends Bloque {
  objectives: string[];
  preparation: string[];
  realisation: string[];
  review: string[];
}

export interface Recurso extends Bloque {
  types: string[];
  examples: string[];
  criteria: string[];
  activities: string[];
}

export interface Diversidad extends Bloque {
  strategies: string[];
  applications: {
    camara?: string;
    banda?: string;
    orquesta?: string;
  };
}

export interface Temporalizacion {
  term: 1 | 2 | 3;
  purpose: string;
  sequence: string[];
  methodology: string[];
  activities: string[];
  evaluation: string[];
  contents: string[];
  units: string[];
}

export interface ElementoTransversal extends Bloque {
  integration: string[];
  activities: string[];
  indicators: string[];
}

export interface Norma {
  code: string;
  title: string;
  description: string;
  rank: string;
  date: string;
  issuer: string;
  publication: string;
  scope: string;
  validity: string;
  relation: string;
}

export interface EvaluacionFinal extends Bloque {
  procedure: string[];
  timing: string;
  documentation: string[];
  legalBasis: string;
}

export interface BloquesFilters {
  subject: 'All' | 'Camara' | 'Banda' | 'Orquesta';
  course: 'All' | 1 | 2 | 3 | 4 | 5 | 6;
  search: string;
}
