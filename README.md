# 🎵 Gestión Programa Didáctico Musical 2026/2027

Aplicación web **offline-first** para la gestión del **Programa Didáctico de Música de Cámara, Banda y Orquesta** de los Estudios Profesionales de Música de Extremadura (España).

> 100% cliente · Sin backend · Persistencia local con IndexedDB

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/TU_USUARIO/gestion-programa-didactico-musical)
[![Build Status](https://img.shields.io/badge/build-passing-brightgreen)]()
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

---

## 📋 Descripción

Herramienta profesional para profesores y departamentos de conservatorios que permite:

- 📖 Consultar la programación didáctica completa (90 unidades, 12 criterios, 29 competencias)
- 👥 Gestionar alumnos y agrupaciones (Cámara, Banda, Orquesta)
- 📊 Registrar evaluaciones por criterios y por tribunal
- 🧮 Calcular notas automáticamente: `(suma × 10) / 24`
- 📄 Generar PDFs, CSVs y backups JSON
- 🔌 Trabajar sin conexión a internet
- 📱 Ser totalmente responsive (escritorio, tablet, móvil)

---

## ✨ Características

### 13 Módulos Funcionales

1. **🏠 Dashboard** — Panel de inicio con gráficos de evolución (Recharts)
2. **📖 Programación Didáctica** — Visor de bloques con búsqueda y filtros
3. **👥 Alumnado** — CRUD de estudiantes, importación CSV
4. **🎼 Agrupaciones** — Gestión de Cámara/Banda/Orquesta
5. **🎯 Criterios y Rúbricas** — 12 criterios CO-01 a CO-12 con 4 niveles
6. **📝 Evaluación** — Por criterios y por tribunal (6 criterios ×1/×2/×3/×4)
7. **👤 Auto/Co-evaluación** — Fichas imprimibles
8. **📊 Calificaciones** — Tablas resumen, estadísticas, CSV
9. **📚 Unidades Didácticas** — 90 unidades con filtros y estados
10. **📎 Anexos y Plantillas** — Matrices, protocolos, guías
11. **🤝 Coordinación** — Reuniones, acuerdos, actividades
12. **⚙️ Configuración** — Datos institucionales, ponderaciones, HOLD
13. **❓ Ayuda** — Guía de uso, FAQ, atajos de teclado

### Contenido Incluido

- ✅ 26 objetivos generales comunes
- ✅ 28 objetivos específicos de Cámara
- ✅ 31 objetivos específicos de Banda
- ✅ 33 objetivos específicos de Orquesta
- ✅ 12 criterios CO-01 a CO-12 con rúbricas de 4 niveles
- ✅ 29 competencias (CM, CI, CPS, CA, CD)
- ✅ 90 unidades didácticas completas
- ✅ 6 criterios de tribunal con descriptores
- ✅ 38 elementos HOLD categorizados
- ✅ Matrices normativas, protocolos y guías

---

## 📸 Capturas de Pantalla

> *Próximamente*

| Dashboard | Evaluación | Calificaciones |
|-----------|------------|----------------|
| ![Dashboard](docs/screenshots/dashboard.png) | ![Evaluación](docs/screenshots/assessment.png) | ![Calificaciones](docs/screenshots/grades.png) |

---

## 🚀 Despliegue Rápido en Vercel

### Opción 1: Un Clic (Recomendado)

Haz clic en el botón **"Deploy with Vercel"** al inicio de este README.

### Opción 2: Manual

```bash
# Clonar y desplegar
git clone https://github.com/TU_USUARIO/gestion-programa-didactico-musical.git
cd gestion-programa-didactico-musical
npm install
npx vercel --prod
```

📖 **Guía completa:** [VERCEL_DEPLOY.md](VERCEL_DEPLOY.md)

---

## 💻 Instalación Local

### Prerrequisitos

- Node.js 20.x o superior
- npm

### Comandos

```bash
# Clonar el repositorio
git clone https://github.com/TU_USUARIO/gestion-programa-didactico-musical.git
cd gestion-programa-didactico-musical

# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm run dev
# Abre http://localhost:3000

# Compilar para producción
npm run build

# Previsualizar compilación
npm run preview
```

---

## 📖 Uso

1. **Primer arranque**: La aplicación carga automáticamente los datos semilla en IndexedDB.
2. **Configuración inicial**: Ve a *Configuración* y completa los datos del centro.
3. **Registro de alumnos**: Ve a *Alumnado* y añade estudiantes o importa CSV.
4. **Crear agrupaciones**: Ve a *Agrupaciones* y crea grupos de Cámara/Banda/Orquesta.
5. **Evaluar**: Ve a *Evaluación* y registra evaluaciones por criterios o tribunal.
6. **Consultar notas**: Ve a *Calificaciones* para ver el resumen.
7. **Backup periódico**: Ve a *Configuración > Backup* y exporta JSON regularmente.

### Atajos de Teclado

| Atajo | Acción |
|-------|--------|
| `Ctrl + P` | Imprimir vista actual |
| `Ctrl + F` | Buscar en el módulo |
| `Esc` | Cerrar modal |

---

## 🏗️ Estructura del Proyecto

```
/
├── src/
│   ├── App.tsx                 # Componente raíz
│   ├── types.ts                # Tipos TypeScript
│   ├── store.ts                # Gestión de estado + IndexedDB
│   ├── components/
│   │   ├── Sidebar.tsx         # Menú lateral
│   │   └── TopBar.tsx          # Barra superior
│   ├── modules/                # 13 módulos funcionales
│   ├── data/
│   │   └── seed.ts             # Datos semilla completos
│   ├── db/
│   │   └── seed.ts             # Inicialización IndexedDB
│   └── utils/
│       └── helpers.ts          # Utilidades
├── index.html
├── package.json
├── vercel.json
├── README.md
└── INSTRUCCIONES.md
```

---

## 🛠️ Tecnologías

| Tecnología | Versión | Uso |
|---|---|---|
| React | 18.2 | UI components |
| TypeScript | 5.7 | Tipado estático |
| Vite | 6.3 | Build tool |
| Tailwind CSS | 4.1 | Estilos |
| Recharts | 2.10 | Gráficos |
| Lucide React | 0.294 | Iconos |
| IndexedDB | Nativo | Persistencia offline |

---

## 🌐 Despliegue

### GitHub Pages

1. Sube el código a GitHub.
2. Ve a **Settings → Pages**.
3. Selecciona **Source: GitHub Actions**.
4. El workflow `.github/workflows/deploy.yml` se ejecutará automáticamente.

### Vercel

**Opción A — Dashboard:**
1. Ve a [vercel.com/new](https://vercel.com/new).
2. Importa el repositorio.
3. Framework Preset: **Vite**.
4. Build: `npm run build`, Output: `dist`.
5. Deploy.

**Opción B — CLI:**
```bash
npm i -g vercel
vercel login
vercel --prod
```

---

## 📄 Licencia

Este proyecto está bajo la licencia **MIT**. Ver [LICENSE](LICENSE) para más detalles.

---

## 👤 Autor

**Departamento de Música de Cámara, Banda y Orquesta**  
Conservatorio Profesional de Música  
Extremadura, España

---

## 🤝 Contribución

Las contribuciones son bienvenidas. Consulta [CONTRIBUTING.md](CONTRIBUTING.md) para más detalles.

1. Fork del repositorio
2. Crea tu rama (`git checkout -b feature/NuevaFuncionalidad`)
3. Commit de tus cambios (`git commit -m 'Añadir nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/NuevaFuncionalidad`)
5. Abre un Pull Request

---

## 📞 Soporte

Para dudas o incidencias, abre un **Issue** en el repositorio o consulta el módulo **Ayuda** dentro de la aplicación.

---

*Programa Didáctico 2026/2027 · Música de Cámara, Banda y Orquesta · Estudios Profesionales de Música de Extremadura*
