# INSTRUCCIONES - Gestión Programa Didáctico Musical 2026/2027

Aplicación web para la gestión del Programa Didáctico de Música de Cámara, Banda y Orquesta de los Estudios Profesionales de Música de Extremadura.

---

## 1. Instalación Local

### Prerrequisitos

- **Node.js 20.x** o superior ([descargar](https://nodejs.org/))
- **npm** (incluido con Node.js)
- Navegador moderno (Chrome, Firefox, Safari, Edge)

### Comandos

```bash
# 1. Clonar o descargar el repositorio
# (o descomprimir el archivo descargado)

# 2. Entrar en la carpeta del proyecto
cd gestion-programa-didactico-musical

# 3. Instalar dependencias
npm install

# 4. Ejecutar en modo desarrollo
npm run dev
# Abre http://localhost:5173 en el navegador

# 5. Compilar para producción
npm run build

# 6. Previsualizar la versión compilada
npm run preview
```

### Acceso Local

Una vez ejecutado `npm run dev`, abre tu navegador en:

```
http://localhost:5173
```

---

## 2. Verificación de Funcionalidades

### Checklist de Pruebas

- [ ] **Carga inicial**: La aplicación carga los datos semilla (3 alumnos, 3 agrupaciones, 90 unidades, 38 HOLD) en el primer arranque.
- [ ] **Persistencia**: Cierra el navegador, vuelve a abrir la app. Los datos deben mantenerse.
- [ ] **Dashboard**: Muestra estadísticas, gráficos de Recharts y alertas HOLD.
- [ ] **Alumnado**: Crear, editar, eliminar alumnos. Importar CSV. Exportar CSV.
- [ ] **Agrupaciones**: Crear agrupaciones de tipo Cámara/Banda/Orquesta. Asignar alumnos.
- [ ] **Criterios y Rúbricas**: Visualizar los 12 criterios CO-01 a CO-12 con sus 4 niveles.
- [ ] **Evaluación por criterios**: Crear evaluación, calcular nota automáticamente.
- [ ] **Evaluación por tribunal**: 6 criterios con niveles ×1 a ×4, fórmula (suma × 10) / 24.
- [ ] **Auto/Co-evaluación**: Generar fichas imprimibles.
- [ ] **Calificaciones**: Tabla resumen con medias, estadísticas, exportar CSV.
- [ ] **Unidades Didácticas**: 90 unidades con filtros y cambio de estado.
- [ ] **Anexos y Plantillas**: Matrices, protocolos, guías.
- [ ] **Coordinación**: Registrar reuniones y acuerdos.
- [ ] **Configuración**: Editar datos institucionales, ponderaciones, HOLD.
- [ ] **Backup**: Exportar JSON, importar JSON, resetear datos.
- [ ] **Tema oscuro**: Toggle claro/oscuro funcional.
- [ ] **Responsive**: Probar en móvil, tablet y escritorio.

### Verificar IndexedDB

1. Abre las **DevTools** del navegador (F12).
2. Ve a la pestaña **Application** (Chrome) o **Storage** (Firefox).
3. En el panel izquierdo, expande **IndexedDB**.
4. Debe aparecer la base de datos `programa_didactico_2026_2027`.
5. Dentro, el store `app_state` debe contener los datos.

### Verificar Cálculo de Notas

**Fórmula Tribunal**: `Nota = (suma de niveles × 10) / 24`

- Ejemplo: 6 criterios con nivel 3 (Adecuado) → suma = 18 → nota = (18 × 10) / 24 = 7.5 → redondeado = 8
- Ejemplo: 6 criterios con nivel 4 (Consolidado) → suma = 24 → nota = (24 × 10) / 24 = 10

**Fórmula Criterios**: `(suma ponderada × 10) / (peso máximo)`

- 12 criterios con peso 2 y nivel 3 → suma ponderada = 72 → nota = (72 × 10) / (24 × 4) = 7.5 → redondeado = 8

### Verificar Exportación CSV/JSON

1. Ve a **Alumnado** → pulsa "CSV" → debe descargarse un archivo `.csv`.
2. Ve a **Calificaciones** → pulsa "CSV" → debe descargarse un archivo con las notas.
3. Ve a **Configuración > Backup** → pulsa "Exportar backup JSON" → debe descargarse un `.json`.
4. Importa el JSON → los datos deben restaurarse.

### Verificar Generación PDF

1. En cualquier módulo, pulsa `Ctrl+P` (o `Cmd+P` en Mac).
2. La vista debe estar optimizada para impresión (sin sidebar, sin botones).
3. Selecciona "Guardar como PDF" en el diálogo de impresión.

---

## 3. Estructura del Proyecto

```
/
├── index.html                  # Punto de entrada HTML
├── package.json                # Dependencias y scripts
├── vite.config.js              # Configuración de Vite
├── tsconfig.json               # Configuración TypeScript
├── vercel.json                 # Configuración Vercel
├── deploy.sh                   # Script de despliegue
├── README.md                   # Documentación principal
├── INSTRUCCIONES.md            # Este archivo
├── CONTRIBUTING.md             # Guía de contribución
├── LICENSE                     # Licencia MIT
├── .gitignore                  # Archivos ignorados por Git
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions (GitHub Pages)
├── src/
│   ├── main.tsx                # Bootstrap de React
│   ├── App.tsx                 # Componente raíz + router
│   ├── index.css               # Estilos globales (Tailwind)
│   ├── types.ts                # Tipos TypeScript
│   ├── store.ts                # Gestión de estado + IndexedDB
│   ├── components/
│   │   ├── Sidebar.tsx         # Menú lateral (13 módulos)
│   │   └── TopBar.tsx          # Barra superior
│   ├── modules/
│   │   ├── Dashboard.tsx       # Panel de inicio + gráficos
│   │   ├── Programme.tsx       # Programación didáctica
│   │   ├── Students.tsx        # Gestión de alumnado
│   │   ├── Ensembles.tsx       # Gestión de agrupaciones
│   │   ├── Criteria.tsx        # Criterios y rúbricas
│   │   ├── Assessment.tsx      # Evaluación por criterios y tribunal
│   │   ├── CoAssessment.tsx    # Autoevaluación y coevaluación
│   │   ├── Grades.tsx          # Calificaciones y estadísticas
│   │   ├── Units.tsx           # Unidades didácticas (90)
│   │   ├── Annexes.tsx         # Anexos y plantillas
│   │   ├── Coordination.tsx    # Coordinación y reuniones
│   │   ├── Settings.tsx        # Configuración
│   │   └── Help.tsx            # Ayuda
│   ├── data/
│   │   ├── seed.ts             # Datos semilla completos
│   │   ├── programmeData.ts    # Datos del programa
│   │   └── sampleData.ts       # Datos de ejemplo
│   ├── db/
│   │   └── seed.ts             # Inicialización IndexedDB
│   └── utils/
│       └── helpers.ts          # Utilidades (cálculos, CSV, etc.)
└── public/                     # Archivos estáticos
```

---

## 4. Tecnologías Utilizadas

| Tecnología | Versión | Uso |
|---|---|---|
| React | 18.2 | UI components |
| TypeScript | 5.7 | Tipado estático |
| Vite | 6.3 | Build tool |
| Tailwind CSS | 4.1 | Estilos utilitarios |
| Recharts | 2.10 | Gráficos estadísticos |
| Lucide React | 0.294 | Iconos |
| IndexedDB | Nativo | Persistencia offline-first |

**100% cliente, sin backend.**

---

## 5. Subir a GitHub

### Paso a paso

```bash
# 1. Inicializar Git
git init

# 2. Añadir todos los archivos
git add .

# 3. Primer commit
git commit -m "Initial commit: Music Didactic Programme Management 2026/2027"

# 4. Crear repositorio en https://github.com/new
#    Nombre: gestion-programa-didactico-musical
#    Visibilidad: público
#    NO marcar "Add README" ni "Add .gitignore"

# 5. Conectar con el repositorio remoto
git remote add origin https://github.com/TU_USUARIO/gestion-programa-didactico-musical.git

# 6. Renombrar rama a main
git branch -M main

# 7. Subir al repositorio
git push -u origin main
```

### Habilitar GitHub Pages

1. Ve a tu repositorio en GitHub.
2. **Settings** → **Pages**.
3. En **Source**, selecciona **GitHub Actions**.
4. El workflow `.github/workflows/deploy.yml` se ejecutará automáticamente.
5. En 1-2 minutos, tu sitio estará en:
   `https://TU_USUARIO.github.io/gestion-programa-didactico-musical/`

---

## 6. Desplegar en Vercel

### Opción A — Dashboard (recomendada)

1. Ve a [https://vercel.com/new](https://vercel.com/new).
2. Haz clic en **"Import Git Repository"**.
3. Selecciona tu repositorio `gestion-programa-didactico-musical`.
4. Configuración:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`
   - **Node.js Version**: 20.x
5. Haz clic en **Deploy**.
6. En 1-2 minutos tendrás tu URL: `https://gestion-programa-didactico-musical.vercel.app`

### Opción B — CLI

```bash
# Instalar Vercel CLI
npm i -g vercel

# Iniciar sesión
vercel login

# Desplegar
vercel --prod
```

### Opción C — GitHub App (auto-deploy)

1. Instala la **Vercel GitHub App** desde [vercel.com/github](https://vercel.com/github).
2. Conecta tu repositorio.
3. Cada push a `main` desplegará automáticamente.

### Acciones Post-despliegue

- **Dominio personalizado**: En Vercel Dashboard → Settings → Domains.
- **Analíticas**: Vercel Analytics incluido (gratis).
- **SSL automático**: Activado por defecto.
- **Verificar en móvil**: Abre la URL en tu teléfono.

---

## 7. Soporte

Para dudas o incidencias, consulta el módulo **Ayuda** dentro de la aplicación o abre un **Issue** en el repositorio de GitHub.

---

*Programa Didáctico 2026/2027 · Música de Cámara, Banda y Orquesta · Estudios Profesionales de Música de Extremadura*
