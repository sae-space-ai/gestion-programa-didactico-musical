// =====================================================
// DATOS DEL PROGRAMA DIDÁCTICO 2026/2027
// Estudios Profesionales de Música de Extremadura
// =====================================================

import { Criterion, Competence, Objective, DidacticUnit } from '../types';

// --- 26 OBJETIVOS GENERALES COMUNES ---
export const generalObjectives: Objective[] = [
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

// --- 28 OBJETIVOS ESPECÍFICOS MÚSICA DE CÁMARA ---
export const chamberObjectives: Objective[] = [
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

// --- 31 OBJETIVOS ESPECÍFICOS BANDA ---
export const bandObjectives: Objective[] = [
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

// --- 33 OBJETIVOS ESPECÍFICOS ORQUESTA ---
export const orchestraObjectives: Objective[] = [
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

// --- 12 CRITERIOS DE EVALUACIÓN CO-01 a CO-12 ---
export const criteria: Criterion[] = [
  {
    code: 'CO-01',
    description: 'Interpretar obras de diferentes estilos y épocas con corrección técnica, afinación y sensibilidad artística, demostrando conocimiento del contexto histórico-estilístico.',
    indicators: [
      'Ejecuta las obras con precisión técnica adecuada al nivel.',
      'Mantiene la afinación correcta durante toda la interpretación.',
      'Demuestra sensibilidad artística y expresividad.',
      'Aplica criterios estilísticos apropiados.'
    ],
    rubric: {
      Initial: 'Ejecución con errores técnicos frecuentes y problemas de afinación constantes.',
      Developing: 'Ejecución con algunos errores técnicos y afinación inestable en pasajes difíciles.',
      Adequate: 'Ejecución correcta con afinación adecuada y expresividad básica.',
      Consolidated: 'Ejecución precisa con afinación excelente y expresividad artística notable.'
    }
  },
  {
    code: 'CO-02',
    description: 'Demostrar capacidad de escucha activa y respuesta musical inmediata ante las indicaciones del director o los compañeros de agrupación.',
    indicators: [
      'Responde con prontitud a las indicaciones del director.',
      'Mantiene atención auditiva constante hacia el conjunto.',
      'Ajusta su interpretación en tiempo real.',
      'Anticipa entradas y cambios musicales.'
    ],
    rubric: {
      Initial: 'No responde a indicaciones externas; toca de forma aislada.',
      Developing: 'Responde con retraso a las indicaciones; atención auditiva intermitente.',
      Adequate: 'Responde adecuadamente a las indicaciones; mantiene escucha activa.',
      Consolidated: 'Anticipa y responde con precisión; escucha activa permanente y ajustada.'
    }
  },
  {
    code: 'CO-03',
    description: 'Aplicar principios de equilibrio sonoro, blend y mezcla de planos dinámicos en la interpretación colectiva.',
    indicators: [
      'Equilibra su sonido con el del conjunto.',
      'Respeta los planos dinámicos indicados.',
      'Adapta la intensidad según el rol melódico o acompañante.',
      'Contribuye al blend general de la sección.'
    ],
    rubric: {
      Initial: 'No controla la dinámica; suena desequilibrado respecto al grupo.',
      Developing: 'Controla parcialmente la dinámica; desequilibrios ocasionales.',
      Adequate: 'Equilibrio sonoro adecuado en la mayoría de situaciones.',
      Consolidated: 'Equilibrio sonoro excelente; contribuye activamente al blend.'
    }
  },
  {
    code: 'CO-04',
    description: 'Coordinar ataques, releases, articulaciones y respiraciones con el grupo de forma precisa y unificada.',
    indicators: [
      'Los ataques son simultáneos con el grupo.',
      'Los releases son limpios y coordinados.',
      'Las articulaciones coinciden con la sección.',
      'Las respiraciones están planificadas y no interrumpen.'
    ],
    rubric: {
      Initial: 'Ataques y releases desincronizados; articulaciones inconsistentes.',
      Developing: 'Coordinación parcial; algunas desincronizaciones en pasajes rápidos.',
      Adequate: 'Buena coordinación general; pequeñas imprecisiones ocasionales.',
      Consolidated: 'Coordinación precisa y unificada en todos los aspectos.'
    }
  },
  {
    code: 'CO-05',
    description: 'Analizar e interpretar partituras completas, comprendiendo la estructura formal, armónica y textural de las obras.',
    indicators: [
      'Identifica la forma y estructura de la obra.',
      'Comprende las relaciones armónicas.',
      'Reconoce su rol dentro de la textura.',
      'Relaciona su parte con el conjunto.'
    ],
    rubric: {
      Initial: 'No comprende la estructura ni su rol en el conjunto.',
      Developing: 'Comprende parcialmente la estructura; rol limitado.',
      Adequate: 'Comprende la estructura y su rol adecuadamente.',
      Consolidated: 'Análisis completo; comprensión profunda de su rol y relaciones.'
    }
  },
  {
    code: 'CO-06',
    description: 'Demostrar autonomía en la preparación individual de las partes, llegando a los ensayos con el material estudiado.',
    indicators: [
      'Prepara las partes individualmente antes del ensayo.',
      'Resuelve problemas técnicos por sí mismo.',
      'Estudia con método y planificación.',
      'Aporta soluciones al grupo.'
    ],
    rubric: {
      Initial: 'No prepara el material individual; depende totalmente del ensayo.',
      Developing: 'Preparación incompleta; necesita apoyo frecuente.',
      Adequate: 'Preparación adecuada; resuelve la mayoría de problemas.',
      Consolidated: 'Preparación excelente; aporta soluciones y lidera secciones.'
    }
  },
  {
    code: 'CO-07',
    description: 'Interpretar de memoria fragmentos significativos del repertorio con seguridad y calidad artística.',
    indicators: [
      'Memoriza fragmentos designados.',
      'Mantiene la seguridad en la interpretación de memoria.',
      'No pierde el hilo musical en caso de distracción.',
      'Demuestra comprensión de lo memorizado.'
    ],
    rubric: {
      Initial: 'No logra memorizar; inseguridad total sin partitura.',
      Developing: 'Memoriza parcialmente; inseguridad en pasajes complejos.',
      Adequate: 'Memoriza los fragmentos requeridos con seguridad aceptable.',
      Consolidated: 'Memoriza con total seguridad y calidad artística.'
    }
  },
  {
    code: 'CO-08',
    description: 'Participar activamente en audiciones y conciertos, demostrando preparación, concentración y profesionalidad.',
    indicators: [
      'Asiste preparado a las actuaciones.',
      'Mantiene la concentración durante todo el programa.',
      'Demuestra actitud profesional en escena.',
      'Gestiona adecuadamente el estrés escénico.'
    ],
    rubric: {
      Initial: 'No demuestra preparación; problemas de concentración evidentes.',
      Developing: 'Preparación parcial; concentración inestable.',
      Adequate: 'Buena preparación y concentración; actitud profesional.',
      Consolidated: 'Excelente preparación; concentración total; profesionalidad notable.'
    }
  },
  {
    code: 'CO-09',
    description: 'Desarrollar habilidades de trabajo colaborativo, comunicación y resolución de conflictos en el grupo.',
    indicators: [
      'Se comunica eficazmente con los compañeros.',
      'Participa en la toma de decisiones musicales.',
      'Resuelve conflictos de forma constructiva.',
      'Contribuye al buen ambiente de trabajo.'
    ],
    rubric: {
      Initial: 'No participa en el trabajo grupal; conflictos sin resolver.',
      Developing: 'Participación limitada; dificultades en la comunicación.',
      Adequate: 'Buena participación; comunicación y resolución adecuadas.',
      Consolidated: 'Liderazgo positivo; comunicación excelente; resuelve conflictos.'
    }
  },
  {
    code: 'CO-10',
    description: 'Utilizar recursos tecnológicos (grabaciones, metrónomo, afinador, partituras digitales) para el estudio y la autoevaluación.',
    indicators: [
      'Usa grabaciones para autoevaluarse.',
      'Emplea metrónomo y afinador en el estudio.',
      'Utiliza partituras digitales eficazmente.',
      'Aplica tecnología a la mejora interpretativa.'
    ],
    rubric: {
      Initial: 'No utiliza recursos tecnológicos para el estudio.',
      Developing: 'Uso esporádico e ineficaz de la tecnología.',
      Adequate: 'Uso regular y adecuado de recursos tecnológicos.',
      Consolidated: 'Uso experto e integrador de la tecnología en su proceso.'
    }
  },
  {
    code: 'CO-11',
    description: 'Demostrar capacidad de autocrítica, reflexión y planificación de la mejora continua.',
    indicators: [
      'Identifica sus propios puntos fuertes y débiles.',
      'Planifica estrategias de mejora.',
      'Acepta y aplica las críticas constructivas.',
      'Muestra progreso constante.'
    ],
    rubric: {
      Initial: 'No muestra capacidad de autocrítica; no planifica mejoras.',
      Developing: 'Autocrítica superficial; planificación limitada.',
      Adequate: 'Buena autocrítica; planificación adecuada de mejoras.',
      Consolidated: 'Autocrítica profunda; planificación estratégica; mejora constante.'
    }
  },
  {
    code: 'CO-12',
    description: 'Valorar la práctica musical colectiva como experiencia enriquecedora, mostrando respeto, compromiso y responsabilidad.',
    indicators: [
      'Muestra compromiso con la agrupación.',
      'Respeta los horarios y normas de ensayo.',
      'Valora la aportación de cada miembro.',
      'Demuestra responsabilidad con el material y el espacio.'
    ],
    rubric: {
      Initial: 'Falta de compromiso y respeto; irresponsabilidad.',
      Developing: 'Compromiso irregular; respeto y responsabilidad parciales.',
      Adequate: 'Buen compromiso; respeto y responsabilidad adecuados.',
      Consolidated: 'Compromiso total; respeto y responsabilidad ejemplares.'
    }
  },
];

// --- COMPETENCIAS MUSICALES CM-1 a CM-7 ---
export const musicalCompetences: Competence[] = [
  { code: 'CM-1', description: 'Interpretar con corrección técnica y expresividad artística.', type: 'musical' },
  { code: 'CM-2', description: 'Leer e interpretar partituras con fluidez y comprensión.', type: 'musical' },
  { code: 'CM-3', description: 'Escuchar activamente y analizar música con criterio.', type: 'musical' },
  { code: 'CM-4', description: 'Crear y componer música con coherencia estructural.', type: 'musical' },
  { code: 'CM-5', description: 'Improvisar con libertad dentro de marcos estilísticos.', type: 'musical' },
  { code: 'CM-6', description: 'Transcribir y arreglar música para diferentes formaciones.', type: 'musical' },
  { code: 'CM-7', description: 'Conocer y contextualizar el patrimonio musical.', type: 'musical' },
];

// --- COMPETENCIAS INTERPRETATIVAS CI-1 a CI-6 ---
export const interpretiveCompetences: Competence[] = [
  { code: 'CI-1', description: 'Aplicar criterios estilísticos en la interpretación.', type: 'interpretive' },
  { code: 'CI-2', description: 'Desarrollar una identidad sonora personal.', type: 'interpretive' },
  { code: 'CI-3', description: 'Gestionar la tensión escénica y la concentración.', type: 'interpretive' },
  { code: 'CI-4', description: 'Comunicar musicalmente al público.', type: 'interpretive' },
  { code: 'CI-5', description: 'Adaptar la interpretación al contexto acústico.', type: 'interpretive' },
  { code: 'CI-6', description: 'Integrar elementos técnicos y expresivos de forma natural.', type: 'interpretive' },
];

// --- COMPETENCIAS PERSONALES/SOCIALES CPS-1 a CPS-6 ---
export const personalCompetences: Competence[] = [
  { code: 'CPS-1', description: 'Trabajar colaborativamente en equipo.', type: 'personal' },
  { code: 'CPS-2', description: 'Comunicarse eficazmente en contextos musicales.', type: 'personal' },
  { code: 'CPS-3', description: 'Gestionar emociones y resolver conflictos.', type: 'personal' },
  { code: 'CPS-4', description: 'Mostrar empatía y respeto hacia los demás.', type: 'personal' },
  { code: 'CPS-5', description: 'Asumir responsabilidades individuales y grupales.', type: 'personal' },
  { code: 'CPS-6', description: 'Valorar la diversidad cultural y musical.', type: 'personal' },
];

// --- COMPETENCIAS DE AUTONOMÍA CA-1 a CA-5 ---
export const autonomyCompetences: Competence[] = [
  { code: 'CA-1', description: 'Planificar y organizar el estudio autónomo.', type: 'autonomy' },
  { code: 'CA-2', description: 'Autoevaluarse con criterio y objetividad.', type: 'autonomy' },
  { code: 'CA-3', description: 'Tomar decisiones musicales fundamentadas.', type: 'autonomy' },
  { code: 'CA-4', description: 'Buscar y seleccionar recursos de aprendizaje.', type: 'autonomy' },
  { code: 'CA-5', description: 'Establecer objetivos y metas de mejora.', type: 'autonomy' },
];

// --- COMPETENCIAS DIGITALES CD-1 a CD-5 ---
export const digitalCompetences: Competence[] = [
  { code: 'CD-1', description: 'Utilizar software de notación musical.', type: 'digital' },
  { code: 'CD-2', description: 'Grabar y editar audio para autoevaluación.', type: 'digital' },
  { code: 'CD-3', description: 'Usar aplicaciones de metrónomo, afinador y partituras.', type: 'digital' },
  { code: 'CD-4', description: 'Buscar y curar recursos musicales en internet.', type: 'digital' },
  { code: 'CD-5', description: 'Crear contenido digital musical (vídeo, podcast).', type: 'digital' },
];

// --- BLOQUES DE CONTENIDO GENERAL (10) ---
export const contentBlocks = [
  { code: 'CB-01', title: 'Técnica instrumental aplicada a la práctica colectiva', description: 'Ejercicios técnicos específicos para la interpretación en grupo.' },
  { code: 'CB-02', title: 'Lectura e interpretación de partituras', description: 'Lectura a primera vista, análisis y comprensión de partituras.' },
  { code: 'CB-03', title: 'Afinación y equilibrio sonoro', description: 'Principios de afinación colectiva, blend y balance.' },
  { code: 'CB-04', title: 'Ritmo, pulso y coordinación grupal', description: 'Desarrollo rítmico aplicado a la sincronización colectiva.' },
  { code: 'CB-05', title: 'Repertorio por estilos y épocas', description: 'Obras representativas del repertorio camerístico, bandístico y orquestal.' },
  { code: 'CB-06', title: 'Improvisación y creación colectiva', description: 'Prácticas improvisatorias y compositivas en grupo.' },
  { code: 'CB-07', title: 'Historia y contexto de las formaciones instrumentales', description: 'Evolución histórica de cámara, banda y orquesta.' },
  { code: 'CB-08', title: 'Interpretación y expresión musical', description: 'Elementos expresivos: dinámica, articulación, fraseo, tempo.' },
  { code: 'CB-09', title: 'Tecnología aplicada a la música', description: 'Recursos digitales para el estudio y la interpretación.' },
  { code: 'CB-10', title: 'Patrimonio musical extremeño y español', description: 'Obras y compositores de Extremadura y España.' },
];

// --- CRITERIOS DE TRIBUNAL (6) ---
export const tribunalCriteria = [
  { code: 'T-01', name: 'Control dinámico', description: 'Capacidad de graduar y mantener la intensidad sonora según las indicaciones.', levels: ['No competente', 'Básico', 'Medio', 'Avanzado'] },
  { code: 'T-02', name: 'Precisión rítmica', description: 'Exactitud en la ejecución de figuras rítmicas y mantenimiento del pulso.', levels: ['No competente', 'Básico', 'Medio', 'Avanzado'] },
  { code: 'T-03', name: 'Articulación', description: 'Claridad y corrección en la ejecución de las articulaciones indicadas.', levels: ['No competente', 'Básico', 'Medio', 'Avanzado'] },
  { code: 'T-04', name: 'Fraseo y estilo', description: 'Capacidad de dar forma musical y aplicar criterios estilísticos.', levels: ['No competente', 'Básico', 'Medio', 'Avanzado'] },
  { code: 'T-05', name: 'Coordinación y escucha', description: 'Sincronización con el grupo y capacidad de escucha activa.', levels: ['No competente', 'Básico', 'Medio', 'Avanzado'] },
  { code: 'T-06', name: 'Afinación y planos sonoros', description: 'Precisión en la afinación y gestión de planos dinámicos.', levels: ['No competente', 'Básico', 'Medio', 'Avanzado'] },
];

// --- 90 UNIDADES DIDÁCTICAS (36 Banda + 36 Orquesta + 18 Cámara) ---
export const generateUnits = (): DidacticUnit[] => {
  const units: DidacticUnit[] = [];
  
  // 36 unidades de Banda (4 por curso, 9 cursos = 36)
  const bandTitles = [
    'Introducción al lenguaje bandístico', 'Marchas procesionales extremeñas', 'Pasodobles clásicos', 'Himnos y obras solemnes',
    'Repertorio festero', 'Música de cine para banda', 'Obras sinfónicas adaptadas', 'Jazz y swing para banda',
    'Música popular extremeña', 'Transcripciones de obras orquestales', 'Obras originales siglo XXI', 'Certamen: preparación integral',
    'Bandas sonoras épicas', 'Música tradicional iberoamericana', 'Obras de vanguardia', 'Música para desfiles',
    'Repertorio navideño', 'Obras con narrador', 'Música de compositores extremeños', 'Arreglos para banda juvenil',
    'Obras programáticas', 'Música minimalista para banda', 'Repertorio de concierto', 'Obras con percusión destacada',
    'Música de tradición oral', 'Obras románticas adaptadas', 'Música contemporánea accesible', 'Repertorio para certamen',
    'Obras con solistas', 'Música folclórica universal', 'Bandas sonoras animadas', 'Obras descriptivas',
    'Repertorio de primavera', 'Música para celebraciones', 'Obras de encargo', 'Proyecto final de curso'
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
      timing: `${Math.floor(Math.random() * 4) + 2} sesiones`,
      justification: 'Unidad fundamental para el desarrollo de competencias interpretativas en formación bandística.',
      objectives: [`OB-${String((i % 31) + 1).padStart(2, '0')}`, `OG-${String((i % 26) + 1).padStart(2, '0')}`],
      contents: [`${contentBlocks[i % 10].code}: ${contentBlocks[i % 10].title}`],
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
  
  // 36 unidades de Orquesta
  const orchTitles = [
    'Introducción al repertorio orquestal', 'Sinfonías clásicas (fragmentos)', 'Oberturas románticas', 'Danzas sinfónicas',
    'Poemas sinfónicos', 'Música de ballet', 'Conciertos para solista', 'Sinfonías del siglo XX',
    'Música de cine sinfónica', 'Obras de compositores españoles', 'Música contemporánea', 'Repertorio barroco',
    'Ópera en versión concierto', 'Música impressionista', 'Sinfonías nacionalistas', 'Obras programáticas modernas',
    'Música minimalista orquestal', 'Sinfonías de Beethoven', 'Repertorio romántico tardío', 'Música neoclásica',
    'Obras con coro y orquesta', 'Sinfonías Mahler (fragmentos)', 'Música de Stravinsky', 'Repertorio ruso',
    'Música francesa del s.XIX', 'Obras de Debussy y Ravel', 'Sinfonías de Brahms', 'Música de Tchaikovsky',
    'Repertorio para cuerdas', 'Obras con metales destacados', 'Música de woodwinds', 'Repertorio iberoamericano',
    'Obras de compositores extremeños', 'Música para ceremonies', 'Proyecto sinfónico', 'Concierto fin de curso'
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
      timing: `${Math.floor(Math.random() * 4) + 3} sesiones`,
      justification: 'Unidad esencial para el desarrollo de competencias orquestales y sinfónicas.',
      objectives: [`OO-${String((i % 33) + 1).padStart(2, '0')}`, `OG-${String((i % 26) + 1).padStart(2, '0')}`],
      contents: [`${contentBlocks[i % 10].code}: ${contentBlocks[i % 10].title}`],
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
  
  // 18 unidades de Cámara
  const chamberTitles = [
    'Introducción a la música de cámara', 'Dúos del Clasicismo', 'Tríos románticos', 'Cuartetos de cuerda (I)',
    'Cuartetos de cuerda (II)', 'Quintetos con piano', 'Repertorio español para cámara', 'Música de cámara del s.XX',
    'Música de cámara contemporánea', 'Obras de compositores extremeños', 'Repertorio con viento', 'Repertorio mixto',
    'Música de cámara y voz', 'Transcripciones camerísticas', 'Obras con piano', 'Ensemble de cámara',
    'Proyecto camerístico I', 'Proyecto camerístico II'
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
      timing: `${Math.floor(Math.random() * 3) + 2} sesiones`,
      justification: 'Unidad clave para el desarrollo de la escucha activa y la comunicación musical.',
      objectives: [`OC-${String((i % 28) + 1).padStart(2, '0')}`, `OG-${String((i % 26) + 1).padStart(2, '0')}`],
      contents: [`${contentBlocks[i % 10].code}: ${contentBlocks[i % 10].title}`],
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
};

// --- REPERTORIO ORIENTATIVO ---
export const repertoire = {
  chamber: [
    { course: 1, works: ['Mozart - Dúo para violín y viola K.423', 'Beethoven - Trío Op.1 nº1', 'Haydn - Cuarteto Op.76 nº3'] },
    { course: 2, works: ['Mendelssohn - Octeto Op.20', 'Schubert - Quinteto La Mayor D.667', 'Brahms - Sexteto Op.18'] },
    { course: 3, works: ['Ravel - Cuarteto en Fa', 'Debussy - Cuarteto Op.10', 'Shostakovich - Cuarteto nº8'] },
    { course: 4, works: ['Bartók - Cuarteto nº4', 'Messiaen - Cuarteto para el fin de los tiempos', 'Ligeti - Sexteto'] },
  ],
  band: [
    { course: 1, works: ['Alford - Colonel Bogey', 'Sousa - Stars and Stripes Forever', 'Holst - Second Suite'] },
    { course: 2, works: ['Grainger - Lincolnshire Posy', 'Reed - Armenian Dances', 'Maslanka - Symphony nº4'] },
    { course: 3, works: ['Ticheli - Blue Shades', 'Bryant - The Lost Art of Letter Writing', 'Barnes - Symphony for Band'] },
    { course: 4, works: ['Higdon - City Scape', 'Bryant - Dog Days of Summer', 'Mackey - Foundry'] },
  ],
  orchestra: [
    { course: 1, works: ['Mozart - Sinfonía nº40', 'Beethoven - Sinfonía nº5', 'Dvorák - Sinfonía nº8'] },
    { course: 2, works: ['Brahms - Sinfonía nº1', 'Tchaikovsky - Sinfonía nº4', 'Schubert - Sinfonía Incompleta'] },
    { course: 3, works: ['Mahler - Sinfonía nº1', 'Stravinsky - Suite del Pájaro de Fuego', 'Ravel - Bolero'] },
    { course: 4, works: ['Shostakovich - Sinfonía nº5', 'Prokofiev - Sinfonía nº5', 'Vaughan Williams - Sinfonía Antártica'] },
  ],
};

// --- 38 ELEMENTOS HOLD ---
export const holdElements = [
  { id: 'H-01', category: 'Normativa', description: 'Verificar adecuación a DOE 2026/2027' },
  { id: 'H-02', category: 'Normativa', description: 'Revisar ratios alumno/profesor' },
  { id: 'H-03', category: 'Normativa', description: 'Confirmar horarios lectivos mínimos' },
  { id: 'H-04', category: 'Evaluación', description: 'Validar criterios de promoción' },
  { id: 'H-05', category: 'Evaluación', description: 'Revisar ponderaciones de criterios' },
  { id: 'H-06', category: 'Evaluación', description: 'Confirmar instrumentos de evaluación' },
  { id: 'H-07', category: 'Evaluación', description: 'Verificar actas de evaluación' },
  { id: 'H-08', category: 'Alumnado', description: 'Comprobar matrícula de alumnos' },
  { id: 'H-09', category: 'Alumnado', description: 'Revisar adaptaciones curriculares' },
  { id: 'H-10', category: 'Alumnado', description: 'Verificar agrupaciones asignadas' },
  { id: 'H-11', category: 'Recursos', description: 'Disponibilidad de salas de ensayo' },
  { id: 'H-12', category: 'Recursos', description: 'Inventario de instrumentos' },
  { id: 'H-13', category: 'Recursos', description: 'Material fungible necesario' },
  { id: 'H-14', category: 'Recursos', description: 'Partituras y repertorio disponible' },
  { id: 'H-15', category: 'Actividades', description: 'Autorización de audiciones' },
  { id: 'H-16', category: 'Actividades', description: 'Permisos para conciertos externos' },
  { id: 'H-17', category: 'Actividades', description: 'Seguros de actividades extraescolares' },
  { id: 'H-18', category: 'Actividades', description: 'Transporte para actuaciones' },
  { id: 'H-19', category: 'Coordinación', description: 'Actas de reuniones pendientes' },
  { id: 'H-20', category: 'Coordinación', description: 'Acuerdos sin implementar' },
  { id: 'H-21', category: 'Coordinación', description: 'Coordinación con otros departamentos' },
  { id: 'H-22', category: 'Documentación', description: 'Programación didáctica revisada' },
  { id: 'H-23', category: 'Documentación', description: 'Memoria anual actualizada' },
  { id: 'H-24', category: 'Documentación', description: 'Registros de evaluación completos' },
  { id: 'H-25', category: 'Documentación', description: 'Informes trimestrales' },
  { id: 'H-26', category: 'Tribunal', description: 'Composición del tribunal verificada' },
  { id: 'H-27', category: 'Tribunal', description: 'Calendario de pruebas confirmado' },
  { id: 'H-28', category: 'Tribunal', description: 'Repertorio de pruebas aprobado' },
  { id: 'H-29', category: 'Tribunal', description: 'Actas de tribunal firmadas' },
  { id: 'H-30', category: 'TIC', description: 'Plataforma digital operativa' },
  { id: 'H-31', category: 'TIC', description: 'Acceso a recursos digitales' },
  { id: 'H-32', category: 'TIC', description: 'Copias de seguridad realizadas' },
  { id: 'H-33', category: 'Formación', description: 'Necesidades de formación del profesorado' },
  { id: 'H-34', category: 'Formación', description: 'Plan de formación del departamento' },
  { id: 'H-35', category: 'Convivencia', description: 'Protocolos de actuación revisados' },
  { id: 'H-36', category: 'Convivencia', description: 'Normas de uso de espacios' },
  { id: 'H-37', category: 'Convivencia', description: 'Registro de incidencias' },
  { id: 'H-38', category: 'Convivencia', description: 'Plan de mejora de convivencia' },
];

// --- MATRICES ---
export const normativeMatrix = {
  title: 'Matriz Normativa',
  items: [
    { norm: 'LOMLOE', ref: 'Ley Orgánica 3/2020', scope: 'Marco general del sistema educativo' },
    { norm: 'Decreto 42/2023', ref: 'DOE', scope: 'Currículo enseñanzas profesionales de música en Extremadura' },
    { norm: 'Ordenación académica', ref: 'Resolución anual', scope: 'Organización de enseñanzas y evaluación' },
    { norm: 'Decreto de evaluación', ref: 'DOE', scope: 'Criterios de evaluación y calificación' },
  ],
};

// --- PLANTILLAS DE REGISTRO ---
export const recordTemplates = [
  { id: 'RT-01', name: 'Registro de ensayo', fields: ['Fecha', 'Agrupación', 'Obras trabajadas', 'Objetivos', 'Dificultades', 'Acuerdos'] },
  { id: 'RT-02', name: 'Registro de seguimiento', fields: ['Fecha', 'Alumno', 'Progreso', 'Observaciones', 'Tareas'] },
  { id: 'RT-03', name: 'Registro de incidencias', fields: ['Fecha', 'Situación', 'Actuación', 'Resolución'] },
  { id: 'RT-04', name: 'Registro de actuación', fields: ['Fecha', 'Tipo', 'Obras', 'Lugar', 'Valoración'] },
  { id: 'RT-05', name: 'Acta de reunión', fields: ['Fecha', 'Asistentes', 'Orden del día', 'Acuerdos'] },
  { id: 'RT-06', name: 'Registro de tribunal', fields: ['Fecha', 'Alumno', 'Criterios', 'Calificación', 'Observaciones'] },
  { id: 'RT-07', name: 'Ficha de autoevaluación', fields: ['Fecha', 'Actividad', 'Preparación', 'Dificultades', 'Logros'] },
  { id: 'RT-08', name: 'Ficha de coevaluación', fields: ['Fecha', 'Observador', 'Observado', 'Aspectos', 'Propuestas'] },
  { id: 'RT-09', name: 'Registro de repertorio', fields: ['Agrupación', 'Obra', 'Compositor', 'Estado', 'Fecha estreno'] },
  { id: 'RT-10', name: 'Control de asistencia', fields: ['Fecha', 'Agrupación', 'Presentes', 'Ausentes', 'Justificaciones'] },
  { id: 'RT-11', name: 'Registro de criterios', fields: ['Alumno', 'Criterio', 'Nivel', 'Evidencia', 'Fecha'] },
  { id: 'RT-12', name: 'Plan de recuperación', fields: ['Alumno', 'Criterios no superados', 'Actividades', 'Plazo', 'Resultado'] },
  { id: 'RT-13', name: 'Registro de HOLD', fields: ['ID', 'Categoría', 'Descripción', 'Fecha', 'Estado', 'Resolución'] },
  { id: 'RT-14', name: 'Informe individual', fields: ['Alumno', 'Trimestre', 'Progreso', 'Fortalezas', 'Áreas de mejora'] },
];

// --- PROTOCOLOS DE ACTUACIÓN ---
export const actionProtocols = [
  { id: 'PA-01', name: 'Protocolo de absentismo', description: 'Actuación ante faltas repetidas de asistencia.' },
  { id: 'PA-02', name: 'Protocolo de dificultades de aprendizaje', description: 'Identificación y actuación ante dificultades.' },
  { id: 'PA-03', name: 'Protocolo de altas capacidades', description: 'Adaptaciones para alumnado con talento musical.' },
  { id: 'PA-04', name: 'Protocolo de conflictos', description: 'Resolución de conflictos en el contexto musical.' },
  { id: 'PA-05', name: 'Protocolo de actuaciones públicas', description: 'Organización y logística de conciertos.' },
  { id: 'PA-06', name: 'Protocolo de evaluación por tribunal', description: 'Organización y desarrollo de pruebas de tribunal.' },
];

// --- GUÍAS DE APOYO ---
export const supportGuides = [
  { id: 'SG-01', name: 'Guía de estudio autónomo', description: 'Estrategias para el estudio individual eficaz.' },
  { id: 'SG-02', name: 'Guía de ensayo eficaz', description: 'Técnicas para optimizar el tiempo de ensayo.' },
  { id: 'SG-03', name: 'Guía de gestión del estrés escénico', description: 'Técnicas de relajación y concentración.' },
  { id: 'SG-04', name: 'Guía de uso de recursos digitales', description: 'Herramientas tecnológicas para el músico.' },
  { id: 'SG-05', name: 'Guía de análisis de partituras', description: 'Método para analizar partituras colectivas.' },
  { id: 'SG-06', name: 'Guía de preparación de audiciones', description: 'Cómo preparar una audición o prueba.' },
];
