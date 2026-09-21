# 🎵 Gestión Programa Didáctico Musical 2026/2027

> Aplicación web offline-first para la gestión del Programa Didáctico de Música de Cámara, Banda y Orquesta de los Estudios Profesionales de Música de Extremadura.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/TU_USUARIO/gestion-programa-didactico-musical)

---

## 🚀 Despliegue Rápido en Vercel

### Opción 1: Un Clic (Recomendado)

Haz clic en el botón de arriba y sigue las instrucciones.

### Opción 2: Manual

```bash
# 1. Clonar repositorio
git clone https://github.com/TU_USUARIO/gestion-programa-didactico-musical.git
cd gestion-programa-didactico-musical

# 2. Instalar dependencias
npm install

# 3. Verificar que todo funciona
npm run build

# 4. Desplegar a Vercel
npx vercel --prod
```

### Opción 3: Desde Vercel Dashboard

1. Ve a [vercel.com/new](https://vercel.com/new)
2. Importa tu repositorio de GitHub
3. Framework Preset: **Vite**
4. Build Command: `npm run build`
5. Output Directory: `dist`
6. Click **Deploy**

📖 **Guía completa:** [VERCEL_DEPLOY.md](VERCEL_DEPLOY.md)

---

## 📋 Características

- ✅ **13 módulos funcionales** (Dashboard, Alumnado, Agrupaciones, Evaluación, etc.)
- ✅ **Offline-first** con IndexedDB
- ✅ **100% cliente** - sin backend necesario
- ✅ **90 unidades didácticas** precargadas
- ✅ **Cálculo automático** de notas: `(suma × 10) / 24`
- ✅ **Gráficos interactivos** con Recharts
- ✅ **Responsive** - funciona en móvil, tablet y escritorio
- ✅ **Exportación** CSV, JSON y PDF
- ✅ **Tema oscuro/claro**

---

## 🛠️ Tecnologías

- **React 18** + **TypeScript**
- **Vite** (build tool)
- **Tailwind CSS** (estilos)
- **Recharts** (gráficos)
- **Lucide React** (iconos)
- **IndexedDB** (persistencia local)

---

## 📦 Instalación Local

```bash
# Clonar
git clone https://github.com/TU_USUARIO/gestion-programa-didactico-musical.git
cd gestion-programa-didactico-musical

# Instalar
npm install

# Desarrollo
npm run dev
# Abre http://localhost:3000

# Build producción
npm run build

# Preview
npm run preview
```

---

## 📚 Documentación

- [📖 README completo](README.md) - Documentación detallada
- [🚀 Guía Vercel](VERCEL_DEPLOY.md) - Despliegue paso a paso
- [📋 Instrucciones](INSTRUCCIONES.md) - Instalación y uso
- [🤝 Contribuir](CONTRIBUTING.md) - Cómo contribuir
- [📜 Licencia](LICENSE) - MIT License

---

## ✅ Verificación Pre-Despliegue

```bash
# Ejecutar script de verificación
chmod +x pre-deploy-check.sh
./pre-deploy-check.sh
```

---

## 🎯 Estructura del Proyecto

```
├── src/
│   ├── modules/          # 13 módulos funcionales
│   ├── components/       # Sidebar, TopBar
│   ├── data/            # Datos semilla
│   ├── db/              # IndexedDB
│   └── utils/           # Utilidades
├── dist/                # Build de producción
├── vercel.json          # Configuración Vercel
└── package.json         # Dependencias
```

---

## 📊 Contenido Incluido

- 26 objetivos generales
- 28 objetivos Cámara + 31 Banda + 33 Orquesta
- 12 criterios de evaluación (CO-01 a CO-12)
- 29 competencias (CM, CI, CPS, CA, CD)
- 90 unidades didácticas completas
- 6 criterios de tribunal
- 38 elementos HOLD
- Matrices normativas y protocolos

---

## 🔧 Configuración

### vercel.json

```json
{
  "framework": "vite",
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

### Variables de Entorno

No se requieren variables de entorno. El proyecto es 100% cliente.

Si necesitas añadir alguna en el futuro, consulta [.env.example](.env.example).

---

## 🐛 Troubleshooting

### Error: "Build failed"
```bash
npm install
npm run build
# Verifica que funcione localmente antes de desplegar
```

### Error: "Page not found"
Verifica que `vercel.json` tenga la configuración de rewrites.

### Error: "IndexedDB not available"
Usa un navegador moderno (Chrome, Firefox, Safari, Edge).

📖 **Más ayuda:** [VERCEL_DEPLOY.md](VERCEL_DEPLOY.md#troubleshooting)

---

## 📞 Soporte

- **Issues:** Abre un issue en GitHub
- **Documentación Vercel:** [vercel.com/docs](https://vercel.com/docs)
- **Guía completa:** [VERCEL_DEPLOY.md](VERCEL_DEPLOY.md)

---

## 📄 Licencia

MIT License - Ver [LICENSE](LICENSE)

---

## 👤 Autor

**Departamento de Música**  
Conservatorio Profesional de Música  
Extremadura, España

---

**Programa Didáctico 2026/2027** · Música de Cámara, Banda y Orquesta · Estudios Profesionales de Música de Extremadura
