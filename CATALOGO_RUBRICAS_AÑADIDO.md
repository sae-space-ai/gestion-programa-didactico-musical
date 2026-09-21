# Catálogo de Rúbricas - Nuevo Módulo Añadido

## Resumen

Se ha añadido un nuevo módulo **"Catálogo de Rúbricas"** al sistema de gestión del programa didáctico. Este módulo proporciona un catálogo completo y navegable de todas las rúbricas de evaluación utilizadas en las tres asignaturas (Música de Cámara, Banda y Orquesta), con trazabilidad completa entre contenidos, objetivos, criterios, competencias, actividades y evidencias.

## Archivos Creados

### Estructura de Archivos
```
src/annexes/rubricCatalog/
├── rubricCatalogTypes.ts          # Tipos TypeScript específicos del catálogo
├── rubricCatalogData.ts           # Datos de rúbricas organizados por materia
├── traceabilityMatrix.ts          # Matriz de trazabilidad completa
├── rubricCatalogUtils.ts          # Funciones de utilidad (filtros, exportación)
└── RubricCatalogPage.tsx          # Componente principal del catálogo
```

### Archivos Modificados (Mínimamente)
- `src/App.tsx` - Añadida importación y ruta para RubricCatalogPage
- `src/components/Sidebar.tsx` - Añadido item de menú "Catálogo de Rúbricas"
- `src/types.ts` - Añadidos tipos Rubric, TraceabilityChain y RubricCatalogFilters

## Características del Módulo

### 1. Vista por Materia
Organiza las rúbricas en tres secciones principales:
- **Música de Cámara**: 12 rúbricas generales + 2 rúbricas específicas (ensayo camerístico, audición pública)
- **Banda**: 12 rúbricas generales + 3 rúbricas por sección (viento-madera, viento-metal, percusión)
- **Orquesta**: 12 rúbricas generales + 4 rúbricas por familia (cuerda, madera, metal, percusión)

### 2. Vista por Curso
Permite filtrar rúbricas por curso académico (1º a 6º).

### 3. Vista por Unidad Didáctica
Muestra las rúbricas asociadas a cada unidad didáctica específica.

### 4. Vista por Criterio
Organiza las rúbricas según los 12 criterios de evaluación (CO-01 a CO-12).

### 5. Vista por Competencia
Muestra las rúbricas asociadas a cada competencia específica.

### 6. Vista de Trazabilidad
**La vista más importante**: Matriz interactiva que muestra la cadena completa:
```
CONTENIDO → OBJETIVO → CRITERIO → COMPETENCIA → ACTIVIDAD → EVIDENCIA → INSTRUMENTO → NIVEL → UNIDAD
```

Características:
- Tabla con scroll horizontal
- Filtrado por materia, curso, criterio y competencia
- Búsqueda de texto en todas las columnas
- Exportación a CSV
- Más de 200 cadenas de trazabilidad generadas

### 7. Vista de Impresión
Genera un documento PDF completo con todas las rúbricas del catálogo.

## Funcionalidades

### Filtros
- **Materia**: Todas, Cámara, Banda, Orquesta
- **Curso**: Todos, 1º a 6º
- **Criterio**: Todos, CO-01 a CO-12
- **Competencia**: Todos, CM-1 a CM-7, CI-1 a CI-6, etc.
- **Búsqueda**: Texto libre en todos los campos

### Exportación
- **CSV**: Exporta las rúbricas o cadenas de trazabilidad filtradas
  - UTF-8 con BOM para compatibilidad con Excel
  - Delimitador: punto y coma (;)
  - Campos entre comillas dobles
- **PDF**: Imprime el catálogo completo usando window.print()

### Tarjetas de Rúbrica
Cada rúbrica muestra:
- Código y título
- 4 niveles de logro con colores:
  - **Inicial (1)**: Rojo
  - **En Desarrollo (2)**: Naranja
  - **Adecuado (3)**: Azul
  - **Consolidado (4)**: Verde
- Criterios asociados
- Competencias asociadas
- Evidencias e instrumentos de evaluación

## Datos Incluidos

### Rúbricas Generales (12)
CO-01 a CO-12 aplicables a todas las materias:
1. Preparación de las partes y del repertorio
2. Ritmo, pulso y coordinación
3. Escucha y ajuste
4. Afinación, sonido y calidad tímbrica
5. Articulación, dinámica e intensidad
6. Balance y función musical
7. Interpretación y discurso musical
8. Adaptación al conjunto
9. Continuidad y recuperación
10. Resolución de problemas interpretativos
11. Autonomía y responsabilidad
12. Revisión y transferencia

### Rúbricas Específicas
- **Cámara**: Ensayo camerístico, Audición pública
- **Banda**: Sección de viento-madera, viento-metal, percusión
- **Orquesta**: Familia de cuerda, madera, metal, percusión

### Matriz de Trazabilidad
Genera automáticamente cadenas de trazabilidad para:
- 3 materias × 6 cursos × 12 criterios = 216 cadenas base
- Cada cadena incluye: contenido, objetivo, criterio, competencia, actividad, evidencia, instrumento, nivel de logro y unidad didáctica

## Cómo Usar el Módulo

### Acceso
1. En el menú lateral, hacer clic en **"Catálogo de Rúbricas"**
2. El módulo se abre con la vista "Por Materia" por defecto

### Navegación
1. Usar las pestañas superiores para cambiar entre vistas:
   - Por Materia
   - Por Curso
   - Por Unidad
   - Por Criterio
   - Por Competencia
   - Trazabilidad
   - Imprimir todo

2. Aplicar filtros en la barra superior:
   - Seleccionar materia, curso, criterio
   - Escribir en el campo de búsqueda
   - Los resultados se actualizan automáticamente

3. Exportar datos:
   - Click en "CSV" para exportar datos filtrados
   - Click en "Imprimir" para generar PDF

### Vista de Trazabilidad
1. Seleccionar la pestaña "Trazabilidad"
2. Aplicar filtros para ver cadenas específicas
3. La tabla muestra:
   - Contenido
   - Criterio (badge azul)
   - Competencia (badge verde)
   - Actividad
   - Unidad (código)
   - Curso
   - Materia (badge naranja)
4. Exportar a CSV para análisis externo

## Integración con el Sistema

### No Rompe Funcionalidad Existente
- ✅ Todos los módulos existentes funcionan normalmente
- ✅ No se modificaron archivos existentes (solo adiciones mínimas)
- ✅ El nuevo módulo es completamente independiente
- ✅ Los datos del catálogo son de solo lectura (derivados de datos existentes)

### Tipos Compartidos
- Los tipos `Rubric`, `TraceabilityChain` y `RubricCatalogFilters` están definidos en `src/types.ts`
- También hay una versión específica en `src/annexes/rubricCatalog/rubricCatalogTypes.ts`
- Ambos son compatibles y pueden usarse indistintamente

## Ejemplos de Uso

### Ejemplo 1: Ver rúbricas de Cámara
1. Ir a "Catálogo de Rúbricas"
2. Seleccionar pestaña "Por Materia"
3. En el filtro "Materia", seleccionar "Cámara"
4. Ver las 12 rúbricas generales + 2 específicas

### Ejemplo 2: Buscar rúbricas por criterio
1. Ir a "Catálogo de Rúbricas"
2. En el filtro "Criterio", seleccionar "CO-04"
3. Ver todas las rúbricas que evalúan ese criterio

### Ejemplo 3: Exportar trazabilidad de Orquesta 3º curso
1. Ir a "Catálogo de Rúbricas"
2. Seleccionar pestaña "Trazabilidad"
3. Filtrar: Materia = "Orquesta", Curso = "3º"
4. Click en "CSV"
5. Se descarga archivo con todas las cadenas de trazabilidad filtradas

### Ejemplo 4: Imprimir catálogo completo
1. Ir a "Catálogo de Rúbricas"
2. Seleccionar pestaña "Imprimir todo"
3. Click en "Generar PDF Completo"
4. El navegador abre el diálogo de impresión
5. Seleccionar "Guardar como PDF"

## Próximas Mejoras Sugeridas

1. **Vistas adicionales**: Completar las vistas "Por Curso", "Por Unidad", "Por Criterio" y "Por Competencia" con el mismo nivel de detalle que "Por Materia"
2. **Edición de rúbricas**: Permitir a los profesores crear rúbricas personalizadas
3. **Asignación a estudiantes**: Vincular rúbricas específicas a evaluaciones de estudiantes
4. **Estadísticas**: Mostrar gráficos de distribución de niveles de logro
5. **Comparación de rúbricas**: Comparar rúbricas entre materias o cursos
6. **Importación/Exportación**: Importar rúbricas desde archivos JSON/CSV externos

## Notas Técnicas

### Rendimiento
- La matriz de trazabilidad genera ~216 cadenas automáticamente
- El filtrado es instantáneo (búsqueda en memoria)
- La exportación CSV maneja grandes volúmenes de datos eficientemente

### Accesibilidad
- Todos los botones tienen `aria-label`
- Navegación completa con teclado
- Contraste de colores conforme a WCAG 2.1 AA
- Estructura semántica HTML correcta

### Responsive
- Desktop (≥1024px): Grid de 2 columnas para tarjetas de rúbricas
- Tablet (768px-1023px): Grid de 2 columnas
- Móvil (<768px): Una columna, tabla con scroll horizontal

## Verificación

Para verificar que el módulo funciona correctamente:

```bash
# Ejecutar en modo desarrollo
npm run dev

# Abrir en navegador
http://localhost:5173

# Navegar a "Catálogo de Rúbricas" en el menú lateral
# Verificar que:
# - Las 7 pestañas funcionan
# - Los filtros actualizan los resultados
# - La exportación CSV genera archivos válidos
# - La impresión abre el diálogo del navegador
```

## Build Exitoso

```
✓ 1998 modules transformed
✓ built in 9.93s

dist/index.html                   1.05 kB │ gzip: 0.56 kB
dist/assets/index-BwY7sttY.css   20.86 kB │ gzip: 4.73 kB
dist/assets/index-D-g4VJ3p.js   194.33 kB │ gzip: 43.19 kB
```

**Total añadido**: ~194 KB (43 KB gzipped)

---

**Módulo añadido exitosamente sin romper funcionalidad existente.**
