// =====================================================
// DATOS SEMILLA CONSOLIDADOS
// Programa Didáctico 2026/2027 - Estudios Profesionales de Música
// Extremadura (España)
// =====================================================

import {
  Student,
  Ensemble,
  Assessment,
  TribunalAssessment,
  SelfAssessment,
  PeerAssessment,
  Meeting,
  DidacticUnit,
  Settings,
  HoldAlert,
  Criterion,
  Competence,
  Objective,
} from '../types';

// =====================================================
// 1. CRITERIOS DE EVALUACIÓN CO-01 A CO-12
// =====================================================
export const seedCriteria: Criterion[] = [
  {
    code: 'CO-01',
    description: 'Interpretar obras de diferentes estilos y épocas con corrección técnica, afinación y sensibilidad artística.',
    indicators: [
      'Ejecuta las obras con precisión técnica adecuada al nivel.',
      'Mantiene la afinación correcta durante toda la interpretación.',
      'Demuestra sensibilidad artística y expresividad.',
      'Aplica criterios estilísticos apropiados.',
    ],
    rubric: {
      Initial: 'Ejecución con errores técnicos frecuentes y problemas de afinación constantes.',
      Developing: 'Ejecución con algunos errores técnicos y afinación inestable en pasajes difíciles.',
      Adequate: 'Ejecución correcta con afinación adecuada y expresividad básica.',
      Consolidated: 'Ejecución precisa con afinación excelente y expresividad artística notable.',
    },
  },
  {
    code: 'CO-02',
    description: 'Demostrar capacidad de escucha activa y respuesta musical inmediata ante las indicaciones del director o compañeros.',
    indicators: [
      'Responde con prontitud a las indicaciones del director.',
      'Mantiene atención auditiva constante hacia el conjunto.',
      'Ajusta su interpretación en tiempo real.',
      'Anticipa entradas y cambios musicales.',
    ],
    rubric: {
      Initial: 'No responde a indicaciones externas; toca de forma aislada.',
      Developing: 'Responde con retraso a las indicaciones; atención auditiva intermitente.',
      Adequate: 'Responde adecuadamente a las indicaciones; mantiene escucha activa.',
      Consolidated: 'Anticipa y responde con precisión; escucha activa permanente y ajustada.',
    },
  },
  {
    code: 'CO-03',
    description: 'Aplicar principios de equilibrio sonoro, blend y mezcla de planos dinámicos en la interpretación colectiva.',
    indicators: [
      'Equilibra su sonido con el del conjunto.',
      'Respeta los planos dinámicos indicados.',
      'Adapta la intensidad según el rol melódico o acompañante.',
      'Contribuye al blend general de la sección.',
    ],
    rubric: {
      Initial: 'No controla la dinámica; suena desequilibrado respecto al grupo.',
      Developing: 'Controla parcialmente la dinámica; desequilibrios ocasionales.',
      Adequate: 'Equilibrio sonoro adecuado en la mayoría de situaciones.',
      Consolidated: 'Equilibrio sonoro excelente; contribuye activamente al blend.',
    },
  },
  {
    code: 'CO-04',
    description: 'Coordinar ataques, releases, articulaciones y respiraciones con el grupo de forma precisa y unificada.',
    indicators: [
      'Los ataques son simultáneos con el grupo.',
      'Los releases son limpios y coordinados.',
      'Las articulaciones coinciden con la sección.',
      'Las respiraciones están planificadas y no interrumpen.',
    ],
    rubric: {
      Initial: 'Ataques y releases desincronizados; articulaciones inconsistentes.',
      Developing: 'Coordinación parcial; algunas desincronizaciones en pasajes rápidos.',
      Adequate: 'Buena coordinación general; pequeñas imprecisiones ocasionales.',
      Consolidated: 'Coordinación precisa y unificada en todos los aspectos.',
    },
  },
  {
    code: 'CO-05',
    description: 'Analizar e interpretar partituras completas, comprendiendo la estructura formal, armónica y textural.',
    indicators: [
      'Identifica la forma y estructura de la obra.',
      'Comprende las relaciones armónicas.',
      'Reconoce su rol dentro de la textura.',
      'Relaciona su parte con el conjunto.',
    ],
    rubric: {
      Initial: 'No comprende la estructura ni su rol en el conjunto.',
      Developing: 'Comprende parcialmente la estructura; rol limitado.',
      Adequate: 'Comprende la estructura y su rol adecuadamente.',
      Consolidated: 'Análisis completo; comprensión profunda de su rol y relaciones.',
    },
  },
  {
    code: 'CO-06',
    description: 'Demostrar autonomía en la preparación individual de las partes, llegando a los ensayos con el material estudiado.',
    indicators: [
      'Prepara las partes individualmente antes del ensayo.',
      'Resuelve problemas técnicos por sí mismo.',
      'Estudia con método y planificación.',
      'Aporta soluciones al grupo.',
    ],
    rubric: {
      Initial: 'No prepara el material individual; depende totalmente del ensayo.',
      Developing: 'Preparación incompleta; necesita apoyo frecuente.',
      Adequate: 'Preparación adecuada; resuelve la mayoría de problemas.',
      Consolidated: 'Preparación excelente; aporta soluciones y lidera secciones.',
    },
  },
  {
    code: 'CO-07',
    description: 'Interpretar de memoria fragmentos significativos del repertorio con seguridad y calidad artística.',
    indicators: [
      'Memoriza fragmentos designados.',
      'Mantiene la seguridad en la interpretación de memoria.',
      'No pierde el hilo musical en caso de distracción.',
      'Demuestra comprensión de lo memorizado.',
    ],
    rubric: {
      Initial: 'No logra memorizar; inseguridad total sin partitura.',
      Developing: 'Memoriza parcialmente; inseguridad en pasajes complejos.',
      Adequate: 'Memoriza los fragmentos requeridos con seguridad aceptable.',
      Consolidated: 'Memoriza con total seguridad y calidad artística.',
    },
  },
  {
    code: 'CO-08',
    description: 'Participar activamente en audiciones y conciertos, demostrando preparación, concentración y profesionalidad.',
    indicators: [
      'Asiste preparado a las actuaciones.',
      'Mantiene la concentración durante todo el programa.',
      'Demuestra actitud profesional en escena.',
      'Gestiona adecuadamente el estrés escénico.',
    ],
    rubric: {
      Initial: 'No demuestra preparación; problemas de concentración evidentes.',
      Developing: 'Preparación parcial; concentración inestable.',
      Adequate: 'Buena preparación y concentración; actitud profesional.',
      Consolidated: 'Excelente preparación; concentración total; profesionalidad notable.',
    },
  },
  {
    code: 'CO-09',
    description: 'Desarrollar habilidades de trabajo colaborativo, comunicación y resolución de conflictos en el grupo.',
    indicators: [
      'Se comunica eficazmente con los compañeros.',
      'Participa en la toma de decisiones musicales.',
      'Resuelve conflictos de forma constructiva.',
      'Contribuye al buen ambiente de trabajo.',
    ],
    rubric: {
      Initial: 'No participa en el trabajo grupal; conflictos sin resolver.',
      Developing: 'Participación limitada; dificultades en la comunicación.',
      Adequate: 'Buena participación; comunicación y resolución adecuadas.',
      Consolidated: 'Liderazgo positivo; comunicación excelente; resuelve conflictos.',
    },
  },
  {
    code: 'CO-10',
    description: 'Utilizar recursos tecnológicos (grabaciones, metrónomo, afinador, partituras digitales) para el estudio y autoevaluación.',
    indicators: [
      'Usa grabaciones para autoevaluarse.',
      'Emplea metrónomo y afinador en el estudio.',
      'Utiliza partituras digitales eficazmente.',
      'Aplica tecnología a la mejora interpretativa.',
    ],
    rubric: {
      Initial: 'No utiliza recursos tecnológicos para el estudio.',
      Developing: 'Uso esporádico e ineficaz de la tecnología.',
      Adequate: 'Uso regular y adecuado de recursos tecnológicos.',
      Consolidated: 'Uso experto e integrador de la tecnología en su proceso.',
    },
  },
  {
    code: 'CO-11',
    description: 'Demostrar capacidad de autocrítica, reflexión y planificación de la mejora continua.',
    indicators: [
      'Identifica sus propios puntos fuertes y débiles.',
      'Planifica estrategias de mejora.',
      'Acepta y aplica las críticas constructivas.',
      'Muestra progreso constante.',
    ],
    rubric: {
      Initial: 'No muestra capacidad de autocrítica; no planifica mejoras.',
      Developing: 'Autocrítica superficial; planificación limitada.',
      Adequate: 'Buena autocrítica; planificación adecuada de mejoras.',
      Consolidated: 'Autocrítica profunda; planificación estratégica; mejora constante.',
    },
  },
  {
    code: 'CO-12',
    description: 'Valorar la práctica musical colectiva como experiencia enriquecedora, mostrando respeto, compromiso y responsabilidad.',
    indicators: [
      'Muestra compromiso con la agrupación.',
      'Respeta los horarios y normas de ensayo.',
      'Valora la aportación de cada miembro.',
      'Demuestra responsabilidad con el material y el espacio.',
    ],
    rubric: {
      Initial: 'Falta de compromiso y respeto; irresponsabilidad.',
      Developing: 'Compromiso irregular; respeto y responsabilidad parciales.',
      Adequate: 'Buen compromiso; respeto y responsabilidad adecuados.',
      Consolidated: 'Compromiso total; respeto y responsabilidad ejemplares.',
    },
  },
];

// =====================================================
// 2. OBJETIVOS GENERALES COMUNES (26)
// =====================================================
export const seedGeneralObjectives: Objective[] = [
  { code: 'OG-01', description: 'Interpretar obras de diferentes estilos y épocas con corrección técnica y sensibilidad artística.', type: 'general' },
  { code: 'OG-02', description: 'Desarrollar la capacidad de audición interna y anticipación musical.', type: 'general' },
  { code: 'OG-03', description: 'Practicar la lectura a primera vista con fluidez y comprensión musical.', type: 'general' },
  { code: 'OG-04', description: 'Desarrollar la memoria musical aplicada a la interpretación en grupo.', type: 'general' },
  { code: 'OG-05', description: 'Conocer y aplicar los principios de afinación y equilibrio sonoro en agrupaciones.', type: 'general' },
  { code: 'OG-06', description: 'Interpretar obras de memoria en público con seguridad y calidad artística.', type: 'general' },
  { code: 'OG-07', description: 'Desarrollar la capacidad de análisis e interpretación de partituras.', type: 'general' },
  { code: 'OG-08', description: 'Conocer la historia y evolución de las formaciones instrumentales.', type: 'general' },
  { code: 'OG-09', description: 'Desarrollar hábitos de trabajo colaborativo y responsabilidad grupal.', type: 'general' },
  { code: 'OG-10', description: 'Utilizar recursos tecnológicos para el estudio y la interpretación.', type: 'general' },
  { code: 'OG-11', description: 'Participar en audiciones y conciertos con actitud profesional.', type: 'general' },
  { code: 'OG-12', description: 'Desarrollar la creatividad en la interpretación musical.', type: 'general' },
  { code: 'OG-13', description: 'Valorar la música como medio de comunicación y expresión cultural.', type: 'general' },
  { code: 'OG-14', description: 'Conocer el repertorio específico de la agrupación correspondiente.', type: 'general' },
  { code: 'OG-15', description: 'Desarrollar la capacidad de autocrítica y mejora continua.', type: 'general' },
  { code: 'OG-16', description: 'Aplicar técnicas de relajación y control del estrés escénico.', type: 'general' },
  { code: 'OG-17', description: 'Comprender la estructura formal y armónica de las obras interpretadas.', type: 'general' },
  { code: 'OG-18', description: 'Desarrollar la sensibilidad hacia los diferentes estilos interpretativos.', type: 'general' },
  { code: 'OG-19', description: 'Trabajar la respiración y fraseo musical de manera coordinada.', type: 'general' },
  { code: 'OG-20', description: 'Conocer y respetar las normas de comportamiento en ensayos y conciertos.', type: 'general' },
  { code: 'OG-21', description: 'Desarrollar la capacidad de adaptación a diferentes directores y formaciones.', type: 'general' },
  { code: 'OG-22', description: 'Aplicar criterios de interpretación históricamente informados.', type: 'general' },
  { code: 'OG-23', description: 'Desarrollar habilidades de comunicación musical no verbal.', type: 'general' },
  { code: 'OG-24', description: 'Valorar el patrimonio musical extremeño y español.', type: 'general' },
  { code: 'OG-25', description: 'Integrar la tecnología digital en el proceso de aprendizaje musical.', type: 'general' },
  { code: 'OG-26', description: 'Desarrollar una identidad artística personal dentro del contexto grupal.', type: 'general' },
];

// =====================================================
// 3. OBJETIVOS ESPECÍFICOS MÚSICA DE CÁMARA (28)
// =====================================================
export const seedChamberObjectives: Objective[] = [
  { code: 'OC-01', description: 'Interpretar obras de cámara de diferentes formaciones (dúo, trío, cuarteto, quinteto).', type: 'chamber' },
  { code: 'OC-02', description: 'Desarrollar la escucha activa entre los componentes del grupo.', type: 'chamber' },
  { code: 'OC-03', description: 'Equilibrar planos sonoros y dinámicas en la interpretación camerística.', type: 'chamber' },
  { code: 'OC-04', description: 'Coordinar ataques, releases y articulaciones entre los intérpretes.', type: 'chamber' },
  { code: 'OC-05', description: 'Analizar la partitura completa, no solo la parte individual.', type: 'chamber' },
  { code: 'OC-06', description: 'Desarrollar la autonomía en el estudio individual de la parte.', type: 'chamber' },
  { code: 'OC-07', description: 'Aplicar criterios de afinación en temperamentos diversos.', type: 'chamber' },
  { code: 'OC-08', description: 'Interpretar obras del repertorio camerístico desde el Barroco hasta la actualidad.', type: 'chamber' },
  { code: 'OC-09', description: 'Desarrollar la comunicación gestual y visual entre intérpretes.', type: 'chamber' },
  { code: 'OC-10', description: 'Gestionar el tiempo de ensayo de forma eficiente.', type: 'chamber' },
  { code: 'OC-11', description: 'Tomar decisiones musicales consensuadas en el grupo.', type: 'chamber' },
  { code: 'OC-12', description: 'Preparar y presentar audiciones de cámara con calidad profesional.', type: 'chamber' },
  { code: 'OC-13', description: 'Conocer las diferentes escuelas y tradiciones interpretativas camerísticas.', type: 'chamber' },
  { code: 'OC-14', description: 'Desarrollar la capacidad de liderar y seguir en contextos cambiantes.', type: 'chamber' },
  { code: 'OC-15', description: 'Aplicar técnicas de transcripción y adaptación para la formación.', type: 'chamber' },
  { code: 'OC-16', description: 'Interpretar música de cámara española y extremeña.', type: 'chamber' },
  { code: 'OC-17', description: 'Desarrollar la flexibilidad rítmica y el rubato coordinado.', type: 'chamber' },
  { code: 'OC-18', description: 'Grabar y autoevaluar las interpretaciones camerísticas.', type: 'chamber' },
  { code: 'OC-19', description: 'Conocer el funcionamiento de grupos de cámara profesionales.', type: 'chamber' },
  { code: 'OC-20', description: 'Desarrollar la capacidad de improvisación controlada en cámara.', type: 'chamber' },
  { code: 'OC-21', description: 'Aplicar principios de acústica a la disposición espacial del grupo.', type: 'chamber' },
  { code: 'OC-22', description: 'Preparar programas de concierto con criterio artístico.', type: 'chamber' },
  { code: 'OC-23', description: 'Desarrollar la resistencia y concentración en actuaciones prolongadas.', type: 'chamber' },
  { code: 'OC-24', description: 'Interpretar obras con partes obligadas y continuas.', type: 'chamber' },
  { code: 'OC-25', description: 'Colaborar con compositores en el estreno de obras nuevas.', type: 'chamber' },
  { code: 'OC-26', description: 'Desarrollar la empatía musical con los compañeros de grupo.', type: 'chamber' },
  { code: 'OC-27', description: 'Aplicar técnicas de calentamiento grupal antes de ensayos y conciertos.', type: 'chamber' },
  { code: 'OC-28', description: 'Valorar la música de cámara como forma superior de comunicación musical.', type: 'chamber' },
];

// =====================================================
// 4. OBJETIVOS ESPECÍFICOS BANDA (31)
// =====================================================
export const seedBandObjectives: Objective[] = [
  { code: 'OB-01', description: 'Interpretar repertorio bandístico de diferentes estilos y niveles.', type: 'band' },
  { code: 'OB-02', description: 'Desarrollar la afinación colectiva en secciones y tutti.', type: 'band' },
  { code: 'OB-03', description: 'Seguir las indicaciones del director con atención y respuesta inmediata.', type: 'band' },
  { code: 'OB-04', description: 'Mantener el pulso y la regularidad rítmica en pasajes complejos.', type: 'band' },
  { code: 'OB-05', description: 'Equilibrar las secciones entre sí (maderas, metales, percusión).', type: 'band' },
  { code: 'OB-06', description: 'Interpretar obras originales para banda y transcripciones.', type: 'band' },
  { code: 'OB-07', description: 'Conocer la historia y evolución de la banda de música.', type: 'band' },
  { code: 'OB-08', description: 'Desarrollar la lectura de partituras en tonalidades transpuestas.', type: 'band' },
  { code: 'OB-09', description: 'Participar en desfiles y actos protocolarios con corrección.', type: 'band' },
  { code: 'OB-10', description: 'Aplicar técnicas de respiración coordinada en la sección.', type: 'band' },
  { code: 'OB-11', description: 'Desarrollar la capacidad de tocar durante períodos prolongados.', type: 'band' },
  { code: 'OB-12', description: 'Conocer el repertorio bandístico extremeño y español.', type: 'band' },
  { code: 'OB-13', description: 'Interpretar obras sinfónicas adaptadas para banda.', type: 'band' },
  { code: 'OB-14', description: 'Desarrollar la precisión en los ataques y cortes colectivos.', type: 'band' },
  { code: 'OB-15', description: 'Aplicar dinámicas contrastadas con el grupo.', type: 'band' },
  { code: 'OB-16', description: 'Interpretar música festera, pasodobles y marchas procesionales.', type: 'band' },
  { code: 'OB-17', description: 'Desarrollar la capacidad de adaptación a diferentes directores.', type: 'band' },
  { code: 'OB-18', description: 'Conocer la organología y acústica de la banda.', type: 'band' },
  { code: 'OB-19', description: 'Participar en certámenes y concursos de bandas.', type: 'band' },
  { code: 'OB-20', description: 'Desarrollar la disciplina de sección y la responsabilidad individual.', type: 'band' },
  { code: 'OB-21', description: 'Interpretar obras con elementos de música popular y jazz.', type: 'band' },
  { code: 'OB-22', description: 'Aplicar técnicas de calentamiento de sección.', type: 'band' },
  { code: 'OB-23', description: 'Desarrollar la capacidad de interpretar a memoria fragmentos.', type: 'band' },
  { code: 'OB-24', description: 'Conocer las diferentes formaciones bandísticas (sinfónica, concierto, juvenil).', type: 'band' },
  { code: 'OB-25', description: 'Colaborar en la organización de conciertos y eventos.', type: 'band' },
  { code: 'OB-26', description: 'Desarrollar la sensibilidad hacia la música de tradición oral.', type: 'band' },
  { code: 'OB-27', description: 'Interpretar obras con narrador, coro o solistas.', type: 'band' },
  { code: 'OB-28', description: 'Aplicar criterios de interpretación estilística en cada género.', type: 'band' },
  { code: 'OB-29', description: 'Desarrollar la capacidad de transposición a primera vista.', type: 'band' },
  { code: 'OB-30', description: 'Valorar la banda como institución cultural y social.', type: 'band' },
  { code: 'OB-31', description: 'Preparar programas de concierto con diversidad estilística.', type: 'band' },
];

// =====================================================
// 5. OBJETIVOS ESPECÍFICOS ORQUESTA (33)
// =====================================================
export const seedOrchestraObjectives: Objective[] = [
  { code: 'OO-01', description: 'Interpretar el repertorio orquestal sinfónico desde el Clasicismo a la actualidad.', type: 'orchestra' },
  { code: 'OO-02', description: 'Desarrollar la técnica de fragmentos orquestales para audiciones.', type: 'orchestra' },
  { code: 'OO-03', description: 'Seguir la batuta del director con precisión y anticipación.', type: 'orchestra' },
  { code: 'OO-04', description: 'Equilibrar la sonoridad entre cuerdas, maderas, metales y percusión.', type: 'orchestra' },
  { code: 'OO-05', description: 'Interpretar obras sinfónicas de gran formato.', type: 'orchestra' },
  { code: 'OO-06', description: 'Desarrollar la afinación en temperamento igual con flexibilidad.', type: 'orchestra' },
  { code: 'OO-07', description: 'Conocer la historia de la orquesta y su evolución.', type: 'orchestra' },
  { code: 'OO-08', description: 'Interpretar obras con solista (concertante, sinfónico).', type: 'orchestra' },
  { code: 'OO-09', description: 'Desarrollar la capacidad de tocar en secciones de cuerdas unificadas.', type: 'orchestra' },
  { code: 'OO-10', description: 'Aplicar arcos y articulaciones coordinadas en la sección.', type: 'orchestra' },
  { code: 'OO-11', description: 'Conocer y aplicar las normas de colocación orquestal.', type: 'orchestra' },
  { code: 'OO-12', description: 'Interpretar obras de ópera y ballet en foso o escenario.', type: 'orchestra' },
  { code: 'OO-13', description: 'Desarrollar la resistencia para programas sinfónicos completos.', type: 'orchestra' },
  { code: 'OO-14', description: 'Interpretar música del siglo XX y contemporánea con notación especial.', type: 'orchestra' },
  { code: 'OO-15', description: 'Desarrollar la capacidad de lectura de partituras en Do3 y Do4.', type: 'orchestra' },
  { code: 'OO-16', description: 'Aplicar técnicas de pizzicato, armónicos y efectos especiales.', type: 'orchestra' },
  { code: 'OO-17', description: 'Conocer el repertorio orquestal español y extremeño.', type: 'orchestra' },
  { code: 'OO-18', description: 'Desarrollar la capacidad de tocar en grupos de cámara dentro de la orquesta.', type: 'orchestra' },
  { code: 'OO-19', description: 'Interpretar obras barrocas con criterios históricos.', type: 'orchestra' },
  { code: 'OO-20', description: 'Desarrollar la comunicación visual con concertino y director.', type: 'orchestra' },
  { code: 'OO-21', description: 'Conocer las diferentes formaciones orquestales (clásica, romántica, moderna).', type: 'orchestra' },
  { code: 'OO-22', description: 'Aplicar principios de acústica de sala a la interpretación.', type: 'orchestra' },
  { code: 'OO-23', description: 'Desarrollar la capacidad de improvisación controlada (cadencias).', type: 'orchestra' },
  { code: 'OO-24', description: 'Interpretar música de cine y bandas sonoras.', type: 'orchestra' },
  { code: 'OO-25', description: 'Conocer el funcionamiento de una orquesta profesional.', type: 'orchestra' },
  { code: 'OO-26', description: 'Desarrollar la disciplina de atril y el respeto al turno.', type: 'orchestra' },
  { code: 'OO-27', description: 'Preparar fragmentos orquestales para pruebas de acceso.', type: 'orchestra' },
  { code: 'OO-28', description: 'Interpretar obras con electrónica o medios tecnológicos.', type: 'orchestra' },
  { code: 'OO-29', description: 'Desarrollar la capacidad de adaptación a diferentes acústicas.', type: 'orchestra' },
  { code: 'OO-30', description: 'Conocer el repertorio de cada instrumento en contexto orquestal.', type: 'orchestra' },
  { code: 'OO-31', description: 'Participar en grabaciones y producciones audiovisuales.', type: 'orchestra' },
  { code: 'OO-32', description: 'Desarrollar la sensibilidad hacia la música sinfónica como patrimonio cultural.', type: 'orchestra' },
  { code: 'OO-33', description: 'Valorar la orquesta como máxima expresión de la música colectiva.', type: 'orchestra' },
];

// =====================================================
// 6-10. COMPETENCIAS (29 total)
// =====================================================
export const seedCompetences: Competence[] = [
  // CM-1 a CM-7 (Musicales)
  { code: 'CM-1', description: 'Interpretar con corrección técnica y expresividad artística.', type: 'musical' },
  { code: 'CM-2', description: 'Leer e interpretar partituras con fluidez y comprensión.', type: 'musical' },
  { code: 'CM-3', description: 'Escuchar activamente y analizar música con criterio.', type: 'musical' },
  { code: 'CM-4', description: 'Crear y componer música con coherencia estructural.', type: 'musical' },
  { code: 'CM-5', description: 'Improvisar con libertad dentro de marcos estilísticos.', type: 'musical' },
  { code: 'CM-6', description: 'Transcribir y arreglar música para diferentes formaciones.', type: 'musical' },
  { code: 'CM-7', description: 'Conocer y contextualizar el patrimonio musical.', type: 'musical' },
  // CI-1 a CI-6 (Interpretativas)
  { code: 'CI-1', description: 'Aplicar criterios estilísticos en la interpretación.', type: 'interpretive' },
  { code: 'CI-2', description: 'Desarrollar una identidad sonora personal.', type: 'interpretive' },
  { code: 'CI-3', description: 'Gestionar la tensión escénica y la concentración.', type: 'interpretive' },
  { code: 'CI-4', description: 'Comunicar musicalmente al público.', type: 'interpretive' },
  { code: 'CI-5', description: 'Adaptar la interpretación al contexto acústico.', type: 'interpretive' },
  { code: 'CI-6', description: 'Integrar elementos técnicos y expresivos de forma natural.', type: 'interpretive' },
  // CPS-1 a CPS-6 (Personales/Sociales)
  { code: 'CPS-1', description: 'Trabajar colaborativamente en equipo.', type: 'personal' },
  { code: 'CPS-2', description: 'Comunicarse eficazmente en contextos musicales.', type: 'personal' },
  { code: 'CPS-3', description: 'Gestionar emociones y resolver conflictos.', type: 'personal' },
  { code: 'CPS-4', description: 'Mostrar empatía y respeto hacia los demás.', type: 'personal' },
  { code: 'CPS-5', description: 'Asumir responsabilidades individuales y grupales.', type: 'personal' },
  { code: 'CPS-6', description: 'Valorar la diversidad cultural y musical.', type: 'personal' },
  // CA-1 a CA-5 (Autonomía)
  { code: 'CA-1', description: 'Planificar y organizar el estudio autónomo.', type: 'autonomy' },
  { code: 'CA-2', description: 'Autoevaluarse con criterio y objetividad.', type: 'autonomy' },
  { code: 'CA-3', description: 'Tomar decisiones musicales fundamentadas.', type: 'autonomy' },
  { code: 'CA-4', description: 'Buscar y seleccionar recursos de aprendizaje.', type: 'autonomy' },
  { code: 'CA-5', description: 'Establecer objetivos y metas de mejora.', type: 'autonomy' },
  // CD-1 a CD-5 (Digitales)
  { code: 'CD-1', description: 'Utilizar software de notación musical.', type: 'digital' },
  { code: 'CD-2', description: 'Grabar y editar audio para autoevaluación.', type: 'digital' },
  { code: 'CD-3', description: 'Usar aplicaciones de metrónomo, afinador y partituras.', type: 'digital' },
  { code: 'CD-4', description: 'Buscar y curar recursos musicales en internet.', type: 'digital' },
  { code: 'CD-5', description: 'Crear contenido digital musical (vídeo, podcast).', type: 'digital' },
];

// =====================================================
// 11. UNIDADES DIDÁCTICAS (90: 36 Banda + 36 Orquesta + 18 Cámara)
// =====================================================
export const seedUnits: DidacticUnit[] = (() => {
  const units: DidacticUnit[] = [];
  const bandTitles = [
    'Introducción al lenguaje bandístico', 'Marchas procesionales extremeñas', 'Pasodobles clásicos', 'Himnos y obras solemnes',
    'Repertorio festero', 'Música de cine para banda', 'Obras sinfónicas adaptadas', 'Jazz y swing para banda',
    'Música popular extremeña', 'Transcripciones de obras orquestales', 'Obras originales siglo XXI', 'Certamen: preparación integral',
    'Bandas sonoras épicas', 'Música tradicional iberoamericana', 'Obras de vanguardia', 'Música para desfiles',
    'Repertorio navideño', 'Obras con narrador', 'Música de compositores extremeños', 'Arreglos para banda juvenil',
    'Obras programáticas', 'Música minimalista para banda', 'Repertorio de concierto', 'Obras con percusión destacada',
    'Música de tradición oral', 'Obras románticas adaptadas', 'Música contemporánea accesible', 'Repertorio para certamen',
    'Obras con solistas', 'Música folclórica universal', 'Bandas sonoras animadas', 'Obras descriptivas',
    'Repertorio de primavera', 'Música para celebraciones', 'Obras de encargo', 'Proyecto final de curso',
  ];
  for (let i = 0; i < 36; i++) {
    const course = Math.floor(i / 4) + 1;
    const term = (i % 3) + 1;
    units.push({
      id: `band-${i + 1}`,
      code: `UB-${String(i + 1).padStart(2, '0')}`,
      title: bandTitles[i],
      course,
      subject: 'Banda',
      term,
      timing: `${(i % 4) + 2} sesiones`,
      justification: 'Unidad fundamental para el desarrollo de competencias interpretativas en formación bandística.',
      objectives: [`OB-${String((i % 31) + 1).padStart(2, '0')}`, `OG-${String((i % 26) + 1).padStart(2, '0')}`],
      contents: [`CB-${String((i % 10) + 1).padStart(2, '0')}`],
      competences: [`CM-${(i % 7) + 1}`, `CI-${(i % 6) + 1}`, `CPS-${(i % 6) + 1}`],
      activities: ['Ensayo de sección', 'Ensayo general', 'Lectura a primera vista', 'Audición interna'],
      methodology: 'Aprendizaje cooperativo, ensayo deliberado, modelado del director.',
      diversity: 'Adaptación de partes según nivel; apoyo visual; tutoría entre pares.',
      resources: ['Partituras', 'Atriles', 'Pupitres', 'Equipo de sonido', 'Grabadora'],
      evidence: ['Grabación de ensayo', 'Partitura anotada', 'Autoinforme'],
      instruments: ['Rúbrica de interpretación', 'Observación directa', 'Autoevaluación'],
      criteria: [`CO-${String((i % 12) + 1).padStart(2, '0')}`, `CO-${String(((i + 1) % 12) + 1).padStart(2, '0')}`],
      indicators: ['Ejecución correcta', 'Afinación adecuada', 'Coordinación grupal'],
      product: 'Interpretación pública de la obra preparada',
      recovery: 'Ensayo adicional con sección reducida; trabajo individual guiado.',
      status: 'pending',
      observations: '',
    });
  }
  const orchTitles = [
    'Introducción al repertorio orquestal', 'Sinfonías clásicas (fragmentos)', 'Oberturas románticas', 'Danzas sinfónicas',
    'Poemas sinfónicos', 'Música de ballet', 'Conciertos para solista', 'Sinfonías del siglo XX',
    'Música de cine sinfónica', 'Obras de compositores españoles', 'Música contemporánea', 'Repertorio barroco',
    'Ópera en versión concierto', 'Música impresionista', 'Sinfonías nacionalistas', 'Obras programáticas modernas',
    'Música minimalista orquestal', 'Sinfonías de Beethoven', 'Repertorio romántico tardío', 'Música neoclásica',
    'Obras con coro y orquesta', 'Sinfonías Mahler (fragmentos)', 'Música de Stravinsky', 'Repertorio ruso',
    'Música francesa del s.XIX', 'Obras de Debussy y Ravel', 'Sinfonías de Brahms', 'Música de Tchaikovsky',
    'Repertorio para cuerdas', 'Obras con metales destacados', 'Música de woodwinds', 'Repertorio iberoamericano',
    'Obras de compositores extremeños', 'Música para ceremonies', 'Proyecto sinfónico', 'Concierto fin de curso',
  ];
  for (let i = 0; i < 36; i++) {
    const course = Math.floor(i / 4) + 1;
    const term = (i % 3) + 1;
    units.push({
      id: `orch-${i + 1}`,
      code: `UO-${String(i + 1).padStart(2, '0')}`,
      title: orchTitles[i],
      course,
      subject: 'Orquesta',
      term,
      timing: `${(i % 4) + 3} sesiones`,
      justification: 'Unidad esencial para el desarrollo de competencias orquestales y sinfónicas.',
      objectives: [`OO-${String((i % 33) + 1).padStart(2, '0')}`, `OG-${String((i % 26) + 1).padStart(2, '0')}`],
      contents: [`CB-${String((i % 10) + 1).padStart(2, '0')}`],
      competences: [`CM-${(i % 7) + 1}`, `CI-${(i % 6) + 1}`, `CA-${(i % 5) + 1}`],
      activities: ['Ensayo de cuerdas', 'Ensayo de secciones', 'Ensayo general', 'Concierto'],
      methodology: 'Ensayo por secciones, trabajo de fragmentos, ensayo integral.',
      diversity: 'Adaptación de partes; apoyo de atril compañero; grabaciones de referencia.',
      resources: ['Partituras orquestales', 'Atriles', 'Sala de ensayo', 'Equipo de grabación'],
      evidence: ['Grabación de ensayo', 'Partitura marcada', 'Informe de progreso'],
      instruments: ['Rúbrica de tribunal', 'Observación del director', 'Autoevaluación'],
      criteria: [`CO-${String((i % 12) + 1).padStart(2, '0')}`, `CO-${String(((i + 3) % 12) + 1).padStart(2, '0')}`],
      indicators: ['Interpretación precisa', 'Afinación orquestal', 'Seguimiento de batuta'],
      product: 'Concierto sinfónico público',
      recovery: 'Ensayo de sección con tutor; trabajo individual con grabación.',
      status: 'pending',
      observations: '',
    });
  }
  const chamberTitles = [
    'Introducción a la música de cámara', 'Dúos del Clasicismo', 'Tríos románticos', 'Cuartetos de cuerda (I)',
    'Cuartetos de cuerda (II)', 'Quintetos con piano', 'Repertorio español para cámara', 'Música de cámara del s.XX',
    'Música de cámara contemporánea', 'Obras de compositores extremeños', 'Repertorio con viento', 'Repertorio mixto',
    'Música de cámara y voz', 'Transcripciones camerísticas', 'Obras con piano', 'Ensemble de cámara',
    'Proyecto camerístico I', 'Proyecto camerístico II',
  ];
  for (let i = 0; i < 18; i++) {
    const course = Math.floor(i / 3) + 1;
    const term = (i % 3) + 1;
    units.push({
      id: `chamber-${i + 1}`,
      code: `UC-${String(i + 1).padStart(2, '0')}`,
      title: chamberTitles[i],
      course,
      subject: 'Cámara',
      term,
      timing: `${(i % 3) + 2} sesiones`,
      justification: 'Unidad clave para el desarrollo de la escucha activa y la comunicación musical.',
      objectives: [`OC-${String((i % 28) + 1).padStart(2, '0')}`, `OG-${String((i % 26) + 1).padStart(2, '0')}`],
      contents: [`CB-${String((i % 10) + 1).padStart(2, '0')}`],
      competences: [`CM-${(i % 7) + 1}`, `CI-${(i % 6) + 1}`, `CPS-${(i % 6) + 1}`, `CA-${(i % 5) + 1}`],
      activities: ['Ensayo autónomo', 'Ensayo dirigido', 'Audición interna', 'Grabación'],
      methodology: 'Trabajo autónomo del grupo, tutoría del profesor, grabación y análisis.',
      diversity: 'Adaptación del repertorio al nivel; roles intercambiables; apoyo entre pares.',
      resources: ['Partituras', 'Sala de cámara', 'Grabadora', 'Metronomo'],
      evidence: ['Grabación de interpretación', 'Análisis de la partitura', 'Diario de ensayos'],
      instruments: ['Rúbrica camerística', 'Coevaluación', 'Autoevaluación'],
      criteria: [`CO-${String((i % 12) + 1).padStart(2, '0')}`, `CO-${String(((i + 5) % 12) + 1).padStart(2, '0')}`],
      indicators: ['Comunicación musical', 'Equilibrio sonoro', 'Autonomía del grupo'],
      product: 'Audición de cámara pública',
      recovery: 'Ensayo adicional con apoyo del profesor; trabajo por secciones.',
      status: 'pending',
      observations: '',
    });
  }
  return units;
})();

// =====================================================
// 12. CRITERIOS DE TRIBUNAL (6)
// =====================================================
export const seedTribunalCriteria = [
  { code: 'T-01', name: 'Control dinámico', description: 'Capacidad de graduar y mantener la intensidad sonora según las indicaciones.', levels: ['No competente', 'Básico', 'Medio', 'Avanzado'] },
  { code: 'T-02', name: 'Precisión rítmica', description: 'Exactitud en la ejecución de figuras rítmicas y mantenimiento del pulso.', levels: ['No competente', 'Básico', 'Medio', 'Avanzado'] },
  { code: 'T-03', name: 'Articulación', description: 'Claridad y corrección en la ejecución de las articulaciones indicadas.', levels: ['No competente', 'Básico', 'Medio', 'Avanzado'] },
  { code: 'T-04', name: 'Fraseo y estilo', description: 'Capacidad de dar forma musical y aplicar criterios estilísticos.', levels: ['No competente', 'Básico', 'Medio', 'Avanzado'] },
  { code: 'T-05', name: 'Coordinación y escucha', description: 'Sincronización con el grupo y capacidad de escucha activa.', levels: ['No competente', 'Básico', 'Medio', 'Avanzado'] },
  { code: 'T-06', name: 'Afinación y planos sonoros', description: 'Precisión en la afinación y gestión de planos dinámicos.', levels: ['No competente', 'Básico', 'Medio', 'Avanzado'] },
];

// =====================================================
// 13. ELEMENTOS HOLD (38)
// =====================================================
export const seedHoldElements: HoldAlert[] = [
  { id: 'H-01', type: 'Normativa', description: 'Verificar adecuación a DOE 2026/2027', date: '2026-09-01', resolved: false, justification: '' },
  { id: 'H-02', type: 'Normativa', description: 'Revisar ratios alumno/profesor', date: '2026-09-01', resolved: false, justification: '' },
  { id: 'H-03', type: 'Normativa', description: 'Confirmar horarios lectivos mínimos', date: '2026-09-01', resolved: false, justification: '' },
  { id: 'H-04', type: 'Evaluación', description: 'Validar criterios de promoción', date: '2026-09-01', resolved: false, justification: '' },
  { id: 'H-05', type: 'Evaluación', description: 'Revisar ponderaciones de criterios', date: '2026-09-01', resolved: false, justification: '' },
  { id: 'H-06', type: 'Evaluación', description: 'Confirmar instrumentos de evaluación', date: '2026-09-01', resolved: false, justification: '' },
  { id: 'H-07', type: 'Evaluación', description: 'Verificar actas de evaluación', date: '2026-09-01', resolved: false, justification: '' },
  { id: 'H-08', type: 'Alumnado', description: 'Comprobar matrícula de alumnos', date: '2026-09-01', resolved: false, justification: '' },
  { id: 'H-09', type: 'Alumnado', description: 'Revisar adaptaciones curriculares', date: '2026-09-01', resolved: false, justification: '' },
  { id: 'H-10', type: 'Alumnado', description: 'Verificar agrupaciones asignadas', date: '2026-09-01', resolved: false, justification: '' },
  { id: 'H-11', type: 'Recursos', description: 'Disponibilidad de salas de ensayo', date: '2026-09-01', resolved: false, justification: '' },
  { id: 'H-12', type: 'Recursos', description: 'Inventario de instrumentos', date: '2026-09-01', resolved: false, justification: '' },
  { id: 'H-13', type: 'Recursos', description: 'Material fungible necesario', date: '2026-09-01', resolved: false, justification: '' },
  { id: 'H-14', type: 'Recursos', description: 'Partituras y repertorio disponible', date: '2026-09-01', resolved: false, justification: '' },
  { id: 'H-15', type: 'Actividades', description: 'Autorización de audiciones', date: '2026-09-01', resolved: false, justification: '' },
  { id: 'H-16', type: 'Actividades', description: 'Permisos para conciertos externos', date: '2026-09-01', resolved: false, justification: '' },
  { id: 'H-17', type: 'Actividades', description: 'Seguros de actividades extraescolares', date: '2026-09-01', resolved: false, justification: '' },
  { id: 'H-18', type: 'Actividades', description: 'Transporte para actuaciones', date: '2026-09-01', resolved: false, justification: '' },
  { id: 'H-19', type: 'Coordinación', description: 'Actas de reuniones pendientes', date: '2026-09-01', resolved: false, justification: '' },
  { id: 'H-20', type: 'Coordinación', description: 'Acuerdos sin implementar', date: '2026-09-01', resolved: false, justification: '' },
  { id: 'H-21', type: 'Coordinación', description: 'Coordinación con otros departamentos', date: '2026-09-01', resolved: false, justification: '' },
  { id: 'H-22', type: 'Documentación', description: 'Programación didáctica revisada', date: '2026-09-01', resolved: false, justification: '' },
  { id: 'H-23', type: 'Documentación', description: 'Memoria anual actualizada', date: '2026-09-01', resolved: false, justification: '' },
  { id: 'H-24', type: 'Documentación', description: 'Registros de evaluación completos', date: '2026-09-01', resolved: false, justification: '' },
  { id: 'H-25', type: 'Documentación', description: 'Informes trimestrales', date: '2026-09-01', resolved: false, justification: '' },
  { id: 'H-26', type: 'Tribunal', description: 'Composición del tribunal verificada', date: '2026-09-01', resolved: false, justification: '' },
  { id: 'H-27', type: 'Tribunal', description: 'Calendario de pruebas confirmado', date: '2026-09-01', resolved: false, justification: '' },
  { id: 'H-28', type: 'Tribunal', description: 'Repertorio de pruebas aprobado', date: '2026-09-01', resolved: false, justification: '' },
  { id: 'H-29', type: 'Tribunal', description: 'Actas de tribunal firmadas', date: '2026-09-01', resolved: false, justification: '' },
  { id: 'H-30', type: 'TIC', description: 'Plataforma digital operativa', date: '2026-09-01', resolved: false, justification: '' },
  { id: 'H-31', type: 'TIC', description: 'Acceso a recursos digitales', date: '2026-09-01', resolved: false, justification: '' },
  { id: 'H-32', type: 'TIC', description: 'Copias de seguridad realizadas', date: '2026-09-01', resolved: false, justification: '' },
  { id: 'H-33', type: 'Formación', description: 'Necesidades de formación del profesorado', date: '2026-09-01', resolved: false, justification: '' },
  { id: 'H-34', type: 'Formación', description: 'Plan de formación del departamento', date: '2026-09-01', resolved: false, justification: '' },
  { id: 'H-35', type: 'Convivencia', description: 'Protocolos de actuación revisados', date: '2026-09-01', resolved: false, justification: '' },
  { id: 'H-36', type: 'Convivencia', description: 'Normas de uso de espacios', date: '2026-09-01', resolved: false, justification: '' },
  { id: 'H-37', type: 'Convivencia', description: 'Registro de incidencias', date: '2026-09-01', resolved: false, justification: '' },
  { id: 'H-38', type: 'Convivencia', description: 'Plan de mejora de convivencia', date: '2026-09-01', resolved: false, justification: '' },
];

// =====================================================
// 14. DATOS DE EJEMPLO (3 alumnos + 3 agrupaciones)
// =====================================================
export const seedStudents: Student[] = [
  {
    id: 's1',
    firstName: 'María',
    lastName: 'García López',
    instrument: 'Violín',
    course: 2,
    ensembles: ['e1', 'e3'],
    email: 'maria.garcia@conservatorio.es',
    phone: '600123456',
    observations: 'Excelente progreso técnico',
    registrationDate: '2026-09-01',
    active: true,
  },
  {
    id: 's2',
    firstName: 'Pablo',
    lastName: 'Martínez Ruiz',
    instrument: 'Violoncello',
    course: 2,
    ensembles: ['e1', 'e3'],
    email: 'pablo.martinez@conservatorio.es',
    phone: '600234567',
    observations: 'Necesita reforzar la lectura a primera vista',
    registrationDate: '2026-09-01',
    active: true,
  },
  {
    id: 's3',
    firstName: 'Lucía',
    lastName: 'Fernández Díaz',
    instrument: 'Piano',
    course: 3,
    ensembles: ['e1'],
    email: 'lucia.fernandez@conservatorio.es',
    phone: '600345678',
    observations: 'Gran sensibilidad musical',
    registrationDate: '2026-09-01',
    active: true,
  },
];

export const seedEnsembles: Ensemble[] = [
  {
    id: 'e1',
    name: 'Trío Clásico A',
    type: 'Chamber',
    course: 2,
    members: ['s1', 's2', 's3'],
    repertoire: ['Mozart Trío K.498', 'Beethoven Trío Op.11'],
    teacher: 'Prof. Isabel Martín',
    schedule: 'Lunes y Miércoles 16:00-17:30',
    room: 'Sala de Cámara 1',
    observations: 'Grupo con excelente proyección',
  },
  {
    id: 'e2',
    name: 'Banda Juvenil',
    type: 'Band',
    course: 1,
    members: [],
    repertoire: ['Holst Suite nº1', 'Alford Colonel Bogey'],
    teacher: 'Prof. Antonio Vega',
    schedule: 'Martes y Jueves 17:00-19:00',
    room: 'Sala de Ensembles',
    observations: '20 miembros en total',
  },
  {
    id: 'e3',
    name: 'Orquesta de Cámara',
    type: 'Orchestra',
    course: 3,
    members: ['s1', 's2'],
    repertoire: ['Mozart Sinfonía nº40', 'Vivaldi Cuatro Estaciones'],
    teacher: 'Prof. Carmen Delgado',
    schedule: 'Viernes 16:00-18:00',
    room: 'Auditorio',
    observations: 'Preparando concierto de Navidad',
  },
];

// =====================================================
// ESTADO INICIAL COMPLETO
// =====================================================
export const seedSettings: Settings = {
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
      rehearsal: 30,
      performance: 40,
      self_peer: 15,
      continuous: 15,
    },
  },
  theme: 'light',
};

export const seedInitialState = {
  students: seedStudents,
  ensembles: seedEnsembles,
  assessments: [] as Assessment[],
  tribunals: [] as TribunalAssessment[],
  rehearsalLogs: [],
  incidentLogs: [],
  performanceLogs: [],
  selfAssessments: [] as SelfAssessment[],
  peerAssessments: [] as PeerAssessment[],
  units: seedUnits,
  meetings: [] as Meeting[],
  settings: seedSettings,
  holds: seedHoldElements,
};
