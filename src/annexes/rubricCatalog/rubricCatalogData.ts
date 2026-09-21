// =====================================================
// DATOS - Rúbricas por Materia, Curso, Unidad, Criterio y Competencia
// Catálogo de Rúbricas - Programa Didáctico 2026/2027
// =====================================================

import { Rubric, RubricBySubject, RubricByCourse, RubricByUnit, RubricByCriterion, RubricByCompetence, Subject, Course } from './rubricCatalogTypes';

// =====================================================
// RÚBRICAS GENERALES (CO-01 a CO-12) - Aplican a todas las materias
// =====================================================
const generalRubrics: Rubric[] = [
  {
    id: 'RUB-CO-01-GEN',
    code: 'CO-01',
    title: 'Preparación de las partes y del repertorio',
    subject: 'All',
    course: 'All',
    criterionCodes: ['CO-01'],
    competenceCodes: ['CA-1', 'CA-4'],
    levels: {
      initial: 'No prepara el material individual; depende totalmente del ensayo.',
      developing: 'Preparación incompleta; necesita apoyo frecuente.',
      adequate: 'Preparación adecuada; resuelve la mayoría de problemas.',
      consolidated: 'Preparación excelente; aporta soluciones y lidera secciones.'
    },
    evidence: ['Partitura anotada', 'Grabación de estudio individual'],
    instruments: ['Observación directa', 'Autoevaluación'],
    weight: 2
  },
  {
    id: 'RUB-CO-02-GEN',
    code: 'CO-02',
    title: 'Ritmo, pulso y coordinación',
    subject: 'All',
    course: 'All',
    criterionCodes: ['CO-02'],
    competenceCodes: ['CM-2', 'CM-3'],
    levels: {
      initial: 'No mantiene el pulso; desincronización constante.',
      developing: 'Mantiene el pulso con dificultad; desincronizaciones frecuentes.',
      adequate: 'Mantiene el pulso correctamente; buena coordinación en la mayoría de pasajes.',
      consolidated: 'Pulso estable y preciso; coordinación excelente en todos los contextos.'
    },
    evidence: ['Grabación de ensayo', 'Ejercicios rítmicos'],
    instruments: ['Rúbrica de observación', 'Metrónomo'],
    weight: 2
  },
  {
    id: 'RUB-CO-03-GEN',
    code: 'CO-03',
    title: 'Escucha y ajuste',
    subject: 'All',
    course: 'All',
    criterionCodes: ['CO-03'],
    competenceCodes: ['CM-3', 'CPS-1'],
    levels: {
      initial: 'No escucha al conjunto; toca de forma aislada.',
      developing: 'Escucha parcial; ajustes lentos o incorrectos.',
      adequate: 'Escucha activa; ajusta su interpretación al conjunto.',
      consolidated: 'Escucha permanente; ajustes inmediatos y precisos.'
    },
    evidence: ['Grabación de ensayo', 'Diario de ensayo'],
    instruments: ['Coevaluación', 'Observación del director'],
    weight: 2
  },
  {
    id: 'RUB-CO-04-GEN',
    code: 'CO-04',
    title: 'Afinación, sonido y calidad tímbrica',
    subject: 'All',
    course: 'All',
    criterionCodes: ['CO-04'],
    competenceCodes: ['CM-1', 'CI-2'],
    levels: {
      initial: 'Afinación incorrecta; sonido de baja calidad.',
      developing: 'Afinación inestable; sonido mejorable.',
      adequate: 'Afinación correcta; sonido de buena calidad.',
      consolidated: 'Afinación precisa; sonido excelente y tímbricamente rico.'
    },
    evidence: ['Grabación', 'Ejercicios de afinación'],
    instruments: ['Afinador electrónico', 'Observación directa'],
    weight: 2
  },
  {
    id: 'RUB-CO-05-GEN',
    code: 'CO-05',
    title: 'Articulación, dinámica e intensidad',
    subject: 'All',
    course: 'All',
    criterionCodes: ['CO-05'],
    competenceCodes: ['CM-1', 'CI-1'],
    levels: {
      initial: 'No sigue las articulaciones ni dinámicas indicadas.',
      developing: 'Sigue parcialmente articulaciones y dinámicas.',
      adequate: 'Sigue correctamente articulaciones y dinámicas.',
      consolidated: 'Articulaciones y dinámicas precisas con sensibilidad artística.'
    },
    evidence: ['Partitura anotada', 'Grabación'],
    instruments: ['Rúbrica de interpretación', 'Observación'],
    weight: 2
  },
  {
    id: 'RUB-CO-06-GEN',
    code: 'CO-06',
    title: 'Balance y función musical',
    subject: 'All',
    course: 'All',
    criterionCodes: ['CO-06'],
    competenceCodes: ['CM-3', 'CI-4'],
    levels: {
      initial: 'No controla el balance; no asume su función musical.',
      developing: 'Balance inestable; función musical parcial.',
      adequate: 'Balance adecuado; asume correctamente su función.',
      consolidated: 'Balance excelente; función musical asumida con sensibilidad.'
    },
    evidence: ['Grabación de ensayo', 'Análisis de partitura'],
    instruments: ['Observación del director', 'Autoevaluación'],
    weight: 2
  },
  {
    id: 'RUB-CO-07-GEN',
    code: 'CO-07',
    title: 'Interpretación y discurso musical',
    subject: 'All',
    course: 'All',
    criterionCodes: ['CO-07'],
    competenceCodes: ['CM-1', 'CI-1', 'CI-4'],
    levels: {
      initial: 'Interpretación mecánica; sin discurso musical.',
      developing: 'Interpretación básica; discurso musical incipiente.',
      adequate: 'Interpretación expresiva; discurso musical coherente.',
      consolidated: 'Interpretación artística; discurso musical convincente y personal.'
    },
    evidence: ['Grabación de actuación', 'Análisis estilístico'],
    instruments: ['Rúbrica de tribunal', 'Coevaluación'],
    weight: 2
  },
  {
    id: 'RUB-CO-08-GEN',
    code: 'CO-08',
    title: 'Adaptación al conjunto',
    subject: 'All',
    course: 'All',
    criterionCodes: ['CO-08'],
    competenceCodes: ['CPS-1', 'CPS-2'],
    levels: {
      initial: 'No se adapta al conjunto; toca de forma individual.',
      developing: 'Adaptación limitada; dificultades de integración.',
      adequate: 'Buena adaptación; integración efectiva en el conjunto.',
      consolidated: 'Adaptación excelente; liderazgo positivo en el conjunto.'
    },
    evidence: ['Grabación de ensayo', 'Observación de grupo'],
    instruments: ['Coevaluación', 'Observación del director'],
    weight: 2
  },
  {
    id: 'RUB-CO-09-GEN',
    code: 'CO-09',
    title: 'Continuidad y recuperación',
    subject: 'All',
    course: 'All',
    criterionCodes: ['CO-09'],
    competenceCodes: ['CI-3', 'CA-3'],
    levels: {
      initial: 'Se detiene ante errores; no retoma la interpretación.',
      developing: 'Recuperación lenta; interrupciones frecuentes.',
      adequate: 'Recuperación efectiva; continuidad en la interpretación.',
      consolidated: 'Recuperación inmediata; continuidad artística sin interrupciones.'
    },
    evidence: ['Grabación de actuación', 'Registro de incidencias'],
    instruments: ['Observación directa', 'Autoevaluación'],
    weight: 2
  },
  {
    id: 'RUB-CO-10-GEN',
    code: 'CO-10',
    title: 'Resolución de problemas interpretativos',
    subject: 'All',
    course: 'All',
    criterionCodes: ['CO-10'],
    competenceCodes: ['CA-3', 'CD-2'],
    levels: {
      initial: 'No identifica ni resuelve problemas interpretativos.',
      developing: 'Identifica problemas; resolución limitada.',
      adequate: 'Identifica y resuelve problemas efectivamente.',
      consolidated: 'Anticipa problemas; resolución creativa y autónoma.'
    },
    evidence: ['Diario de ensayo', 'Grabación de estudio'],
    instruments: ['Autoevaluación', 'Observación del profesor'],
    weight: 2
  },
  {
    id: 'RUB-CO-11-GEN',
    code: 'CO-11',
    title: 'Autonomía y responsabilidad',
    subject: 'All',
    course: 'All',
    criterionCodes: ['CO-11'],
    competenceCodes: ['CA-1', 'CA-2', 'CPS-5'],
    levels: {
      initial: 'Dependencia total; falta de responsabilidad.',
      developing: 'Autonomía limitada; responsabilidad parcial.',
      adequate: 'Buena autonomía; responsabilidad adecuada.',
      consolidated: 'Autonomía total; responsabilidad ejemplar.'
    },
    evidence: ['Registro de asistencia', 'Diario de estudio'],
    instruments: ['Autoevaluación', 'Observación del profesor'],
    weight: 2
  },
  {
    id: 'RUB-CO-12-GEN',
    code: 'CO-12',
    title: 'Revisión y transferencia',
    subject: 'All',
    course: 'All',
    criterionCodes: ['CO-12'],
    competenceCodes: ['CA-2', 'CA-5', 'CD-5'],
    levels: {
      initial: 'No revisa su trabajo; no transfiere aprendizajes.',
      developing: 'Revisión superficial; transferencia limitada.',
      adequate: 'Revisión efectiva; transferencia a nuevos contextos.',
      consolidated: 'Revisión crítica; transferencia creativa y autónoma.'
    },
    evidence: ['Portfolio', 'Grabación comparativa'],
    instruments: ['Autoevaluación', 'Rúbrica de proceso'],
    weight: 2
  }
];

// =====================================================
// RÚBRICAS ESPECÍFICAS POR MATERIA
// =====================================================

// Cámara - Rúbricas por actividad
const camaraActivityRubrics: Rubric[] = [
  {
    id: 'RUB-CAM-ENSAYO',
    code: 'RUB-CAM-01',
    title: 'Ensayo camerístico',
    subject: 'Camara',
    course: 'All',
    criterionCodes: ['CO-02', 'CO-03', 'CO-08'],
    competenceCodes: ['CPS-1', 'CM-3'],
    levels: {
      initial: 'No participa activamente en el ensayo; falta de coordinación.',
      developing: 'Participación irregular; coordinación básica.',
      adequate: 'Participación activa; buena coordinación grupal.',
      consolidated: 'Liderazgo positivo; coordinación excelente y comunicación fluida.'
    },
    evidence: ['Grabación de ensayo', 'Diario de grupo'],
    instruments: ['Coevaluación', 'Observación'],
    weight: 2
  },
  {
    id: 'RUB-CAM-AUDICION',
    code: 'RUB-CAM-02',
    title: 'Audición pública de cámara',
    subject: 'Camara',
    course: 'All',
    criterionCodes: ['CO-07', 'CO-09'],
    competenceCodes: ['CI-3', 'CI-4'],
    levels: {
      initial: 'Interpretación insegura; problemas de continuidad.',
      developing: 'Interpretación básica; algunas interrupciones.',
      adequate: 'Interpretación convincente; continuidad mantenida.',
      consolidated: 'Interpretación artística; comunicación efectiva con el público.'
    },
    evidence: ['Grabación de audición', 'Crítica del público'],
    instruments: ['Rúbrica de tribunal', 'Autoevaluación'],
    weight: 3
  }
];

// Banda - Rúbricas por sección
const bandaSectionRubrics: Rubric[] = [
  {
    id: 'RUB-BANDA-MADERA',
    code: 'RUB-BAN-01',
    title: 'Sección de viento-madera',
    subject: 'Banda',
    course: 'All',
    criterionCodes: ['CO-04', 'CO-05'],
    competenceCodes: ['CM-1', 'CI-2'],
    levels: {
      initial: 'Afinación y articulación deficientes en la sección.',
      developing: 'Afinación y articulación mejorables; falta de uniformidad.',
      adequate: 'Afinación y articulación correctas; buena uniformidad.',
      consolidated: 'Afinación y articulación excelentes; uniformidad perfecta.'
    },
    evidence: ['Grabación de sección', 'Ejercicios técnicos'],
    instruments: ['Observación del director de sección', 'Rúbrica técnica'],
    weight: 2
  },
  {
    id: 'RUB-BANDA-METAL',
    code: 'RUB-BAN-02',
    title: 'Sección de viento-metal',
    subject: 'Banda',
    course: 'All',
    criterionCodes: ['CO-04', 'CO-06'],
    competenceCodes: ['CM-1', 'CI-2'],
    levels: {
      initial: 'Sonido deficiente; balance descontrolado.',
      developing: 'Sonido mejorable; balance inestable.',
      adequate: 'Sonido de calidad; balance adecuado.',
      consolidated: 'Sonido potente y controlado; balance excelente.'
    },
    evidence: ['Grabación de sección', 'Ejercicios de balance'],
    instruments: ['Observación del director de sección', 'Rúbrica técnica'],
    weight: 2
  },
  {
    id: 'RUB-BANDA-PERCUSION',
    code: 'RUB-BAN-03',
    title: 'Sección de percusión',
    subject: 'Banda',
    course: 'All',
    criterionCodes: ['CO-02', 'CO-05'],
    competenceCodes: ['CM-2', 'CI-1'],
    levels: {
      initial: 'Ritmo impreciso; articulaciones incorrectas.',
      developing: 'Ritmo inestable; articulaciones mejorables.',
      adequate: 'Ritmo preciso; articulaciones correctas.',
      consolidated: 'Ritmo perfecto; articulaciones variadas y expresivas.'
    },
    evidence: ['Grabación de sección', 'Ejercicios rítmicos'],
    instruments: ['Observación del director de sección', 'Metrónomo'],
    weight: 2
  }
];

// Orquesta - Rúbricas por familia
const orquestaFamilyRubrics: Rubric[] = [
  {
    id: 'RUB-ORQ-CUERDA',
    code: 'RUB-ORQ-01',
    title: 'Familia de cuerda',
    subject: 'Orquesta',
    course: 'All',
    criterionCodes: ['CO-04', 'CO-05', 'CO-06'],
    competenceCodes: ['CM-1', 'CI-1', 'CI-2'],
    levels: {
      initial: 'Arcos desunificados; afinación y balance deficientes.',
      developing: 'Arcos parcialmente unificados; afinación y balance mejorables.',
      adequate: 'Arcos unificados; afinación y balance correctos.',
      consolidated: 'Arcos perfectamente unificados; afinación y balance excelentes.'
    },
    evidence: ['Grabación de sección', 'Ejercicios de arcos'],
    instruments: ['Observación del concertino', 'Rúbrica técnica'],
    weight: 2
  },
  {
    id: 'RUB-ORQ-MADERA',
    code: 'RUB-ORQ-02',
    title: 'Familia de madera',
    subject: 'Orquesta',
    course: 'All',
    criterionCodes: ['CO-04', 'CO-05'],
    competenceCodes: ['CM-1', 'CI-2'],
    levels: {
      initial: 'Sonido y articulación deficientes en la familia.',
      developing: 'Sonido y articulación mejorables; falta de uniformidad.',
      adequate: 'Sonido y articulación correctos; buena uniformidad.',
      consolidated: 'Sonido y articulación excelentes; uniformidad perfecta.'
    },
    evidence: ['Grabación de familia', 'Ejercicios técnicos'],
    instruments: ['Observación del director', 'Rúbrica técnica'],
    weight: 2
  },
  {
    id: 'RUB-ORQ-METAL',
    code: 'RUB-ORQ-03',
    title: 'Familia de metal',
    subject: 'Orquesta',
    course: 'All',
    criterionCodes: ['CO-04', 'CO-06'],
    competenceCodes: ['CM-1', 'CI-2'],
    levels: {
      initial: 'Sonido deficiente; balance descontrolado.',
      developing: 'Sonido mejorable; balance inestable.',
      adequate: 'Sonido de calidad; balance adecuado.',
      consolidated: 'Sonido potente y controlado; balance excelente.'
    },
    evidence: ['Grabación de familia', 'Ejercicios de balance'],
    instruments: ['Observación del director', 'Rúbrica técnica'],
    weight: 2
  },
  {
    id: 'RUB-ORQ-PERCUSION',
    code: 'RUB-ORQ-04',
    title: 'Familia de percusión',
    subject: 'Orquesta',
    course: 'All',
    criterionCodes: ['CO-02', 'CO-05'],
    competenceCodes: ['CM-2', 'CI-1'],
    levels: {
      initial: 'Ritmo impreciso; entradas desincronizadas.',
      developing: 'Ritmo inestable; entradas mejorables.',
      adequate: 'Ritmo preciso; entradas sincronizadas.',
      consolidated: 'Ritmo perfecto; entradas y salidas expresivas.'
    },
    evidence: ['Grabación de familia', 'Ejercicios rítmicos'],
    instruments: ['Observación del director', 'Metrónomo'],
    weight: 2
  }
];

// =====================================================
// EXPORTS
// =====================================================

export { generalRubrics, camaraActivityRubrics, bandaSectionRubrics, orquestaFamilyRubrics };

// Rúbricas por materia (estructura completa)
export const rubricsBySubject: RubricBySubject[] = [
  {
    subject: 'Camara',
    generalRubrics: generalRubrics,
    activityRubrics: camaraActivityRubrics,
    courseRubrics: [] // Se generan dinámicamente
  },
  {
    subject: 'Banda',
    generalRubrics: generalRubrics,
    activityRubrics: [],
    sectionRubrics: bandaSectionRubrics,
    courseRubrics: []
  },
  {
    subject: 'Orquesta',
    generalRubrics: generalRubrics,
    activityRubrics: [],
    sectionRubrics: orquestaFamilyRubrics,
    courseRubrics: []
  }
];
