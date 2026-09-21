// =====================================================
// MÓDULO AYUDA
// Guía de usuario, FAQ, atajos de teclado, enlaces
// =====================================================

import { HelpCircle, Keyboard, ExternalLink, BookOpen } from 'lucide-react';

export default function Help() {
  const faqs = [
    { q: '¿Cómo registro un nuevo alumno?', a: 'Ve al módulo "Alumnado", pulsa "Nuevo alumno" y completa el formulario. También puedes importar alumnos desde un archivo CSV.' },
    { q: '¿Cómo calculo la nota final?', a: 'La nota se calcula automáticamente. Para tribunal: (suma de niveles × 10) / 24. Para criterios: según las ponderaciones configuradas en Ajustes.' },
    { q: '¿Puedo trabajar sin conexión?', a: 'Sí, la aplicación funciona offline. Todos los datos se guardan en el navegador (localStorage).' },
    { q: '¿Cómo hago una copia de seguridad?', a: 'En "Configuración > Backup", pulsa "Exportar backup JSON". Para restaurar, usa "Importar datos".' },
    { q: '¿Qué son los elementos HOLD?', a: 'Son elementos pendientes de verificación (normativa, evaluación, recursos...). Se gestionan en "Configuración > HOLD".' },
    { q: '¿Cómo exporto las calificaciones?', a: 'En el módulo "Calificaciones", pulsa el botón "CSV" para descargar un archivo con todas las notas.' },
    { q: '¿Puedo imprimir fichas de evaluación?', a: 'Sí, en "Auto/Co-evaluación" puedes generar fichas imprimibles. Usa Ctrl+P o el botón de imprimir.' },
    { q: '¿Cómo cambio entre tema claro y oscuro?', a: 'Pulsa el icono de luna/sol en la barra superior.' },
  ];

  const shortcuts = [
    { keys: 'Ctrl + S', action: 'Guardar datos (automático)' },
    { keys: 'Ctrl + P', action: 'Imprimir vista actual' },
    { keys: 'Ctrl + F', action: 'Buscar en el módulo actual' },
    { keys: 'Esc', action: 'Cerrar modal' },
    { keys: '1-9', action: 'Navegar entre módulos (en desarrollo)' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[var(--primary)]">Ayuda</h1>
        <p className="text-sm text-[var(--text-light)]">Guía de uso, preguntas frecuentes y recursos</p>
      </div>

      {/* Guía rápida */}
      <div className="card">
        <h2 className="font-bold text-[var(--primary)] mb-4 flex items-center gap-2"><BookOpen size={20} /> Guía Rápida de Uso</h2>
        <div className="space-y-3 text-sm">
          <div className="p-3 rounded-lg bg-[var(--bg-alt)]">
            <h4 className="font-semibold">1. Configuración inicial</h4>
            <p className="text-[var(--text-light)]">Accede a "Configuración" y completa los datos institucionales del centro, profesorado y curso académico.</p>
          </div>
          <div className="p-3 rounded-lg bg-[var(--bg-alt)]">
            <h4 className="font-semibold">2. Registro de alumnado</h4>
            <p className="text-[var(--text-light)]">En "Alumnado" registra los estudiantes o impórtalos desde CSV. Asígnales a las agrupaciones correspondientes.</p>
          </div>
          <div className="p-3 rounded-lg bg-[var(--bg-alt)]">
            <h4 className="font-semibold">3. Crear agrupaciones</h4>
            <p className="text-[var(--text-light)]">En "Agrupaciones" crea los grupos de Cámara, Banda y Orquesta, asignando miembros y repertorio.</p>
          </div>
          <div className="p-3 rounded-lg bg-[var(--bg-alt)]">
            <h4 className="font-semibold">4. Evaluar</h4>
            <p className="text-[var(--text-light)]">Usa "Evaluación" para registrar evaluaciones por criterios o por tribunal. Las notas se calculan automáticamente.</p>
          </div>
          <div className="p-3 rounded-lg bg-[var(--bg-alt)]">
            <h4 className="font-semibold">5. Consultar calificaciones</h4>
            <p className="text-[var(--text-light)]">En "Calificaciones" consulta el resumen de notas, estadísticas y exporta a CSV.</p>
          </div>
          <div className="p-3 rounded-lg bg-[var(--bg-alt)]">
            <h4 className="font-semibold">6. Backup periódico</h4>
            <p className="text-[var(--text-light)]">Realiza copias de seguridad regularmente desde "Configuración {'>'} Backup".</p>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="card">
        <h2 className="font-bold text-[var(--primary)] mb-4 flex items-center gap-2"><HelpCircle size={20} /> Preguntas Frecuentes</h2>
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <details key={i} className="group">
              <summary className="cursor-pointer p-3 rounded-lg bg-[var(--bg-alt)] hover:bg-[var(--bg-alt)]/80 transition font-medium text-sm list-none flex items-center justify-between">
                {faq.q}
                <span className="text-[var(--text-muted)] group-open:rotate-180 transition-transform">{'\u25BC'}</span>
              </summary>
              <p className="text-sm text-[var(--text-light)] p-3 pt-2">{faq.a}</p>
            </details>
          ))}
        </div>
      </div>

      {/* Atajos de teclado */}
      <div className="card">
        <h2 className="font-bold text-[var(--primary)] mb-4 flex items-center gap-2"><Keyboard size={20} /> Atajos de Teclado</h2>
        <div className="space-y-2">
          {shortcuts.map((s, i) => (
            <div key={i} className="flex items-center justify-between p-2 rounded bg-[var(--bg-alt)]">
              <span className="text-sm">{s.action}</span>
              <kbd className="px-2 py-1 rounded border border-[var(--border)] bg-white text-xs font-mono">{s.keys}</kbd>
            </div>
          ))}
        </div>
      </div>

      {/* Enlaces normativos */}
      <div className="card">
        <h2 className="font-bold text-[var(--primary)] mb-4 flex items-center gap-2"><ExternalLink size={20} /> Enlaces Normativos</h2>
        <div className="space-y-2">
          {[
            { title: 'LOMLOE - Ley Orgánica 3/2020', url: 'https://www.boe.es/eli/es/l/2020/12/29/3' },
            { title: 'Currículo Enseñanzas Profesionales - Extremadura', url: 'https://doe.juntaex.es/' },
            { title: 'Decreto 42/2023 - Currículo musical Extremadura', url: 'https://doe.juntaex.es/' },
            { title: 'BOE - Boletín Oficial del Estado', url: 'https://www.boe.es/' },
            { title: 'DOE - Diario Oficial de Extremadura', url: 'https://doe.juntaex.es/' },
          ].map((link, i) => (
            <a key={i} href={link.url} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 p-3 rounded-lg bg-[var(--bg-alt)] hover:bg-blue-50 transition text-sm text-[var(--primary)] hover:underline">
              <ExternalLink size={14} />
              {link.title}
            </a>
          ))}
        </div>
      </div>

      {/* Acerca de */}
      <div className="card bg-[var(--bg-alt)] text-center">
        <h3 className="font-bold text-[var(--primary)]">Programa Didáctico 2026/2027</h3>
        <p className="text-sm text-[var(--text-light)] mt-1">Música de Cámara, Banda y Orquesta</p>
        <p className="text-sm text-[var(--text-light)]">Estudios Profesionales de Música de Extremadura</p>
        <p className="text-xs text-[var(--text-muted)] mt-3">Aplicación offline-first · Datos almacenados localmente · v1.0</p>
      </div>
    </div>
  );
}
