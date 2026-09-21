# 🚀 Despliegue en Vercel - Guía Completa

Esta guía te llevará paso a paso para desplegar **Gestión Programa Didáctico Musical 2026/2027** en Vercel.

---

## 📋 Requisitos Previos

- ✅ Cuenta de GitHub
- ✅ Repositorio subido a GitHub
- ✅ Node.js 20.x instalado (solo para despliegue local con CLI)

---

## 🎯 Opción A: Despliegue desde Vercel Dashboard (Recomendado)

### Paso 1: Acceder a Vercel

1. Ve a [https://vercel.com/new](https://vercel.com/new)
2. Inicia sesión con tu cuenta de GitHub (recomendado) o email

### Paso 2: Importar Repositorio

1. Haz clic en **"Import Git Repository"**
2. Si es la primera vez, autoriza a Vercel para acceder a tus repositorios
3. Busca y selecciona: **`gestion-programa-didactico-musical`**
4. Haz clic en **"Import"**

### Paso 3: Configurar Proyecto

Vercel detectará automáticamente que es un proyecto Vite. Verifica que los campos estén así:

| Campo | Valor |
|-------|-------|
| **Framework Preset** | Vite |
| **Build Command** | `npm run build` |
| **Output Directory** | `dist` |
| **Install Command** | `npm install` |
| **Node Version** | `20.x` |

### Paso 4: Variables de Entorno (Opcional)

No se necesitan variables de entorno para este proyecto (es 100% cliente).

Si quisieras añadir alguna en el futuro:
- Haz clic en **"Environment Variables"**
- Añade las variables necesarias

### Paso 5: Desplegar

1. Haz clic en **"Deploy"**
2. Espera 1-2 minutos mientras Vercel construye tu proyecto
3. ¡Listo! Verás tu URL: `https://gestion-programa-didactico-musical.vercel.app`

---

## 🎯 Opción B: Despliegue con Vercel CLI

### Paso 1: Instalar Vercel CLI

```bash
npm install -g vercel
```

### Paso 2: Iniciar Sesión

```bash
vercel login
```

Sigue las instrucciones (te redirigirá al navegador para autenticar).

### Paso 3: Desplegar

Desde la raíz del proyecto:

```bash
vercel
```

Responde a las preguntas:
- **Set up and deploy?** → `Y`
- **Which scope?** → Selecciona tu cuenta
- **Link to existing project?** → `N`
- **What's your project's name?** → `gestion-programa-didactico-musical`
- **In which directory is your code?** → `.` (actual)
- **Want to override the settings?** → `N` (usar detección automática)

### Paso 4: Desplegar a Producción

```bash
vercel --prod
```

---

## 🎯 Opción C: Despliegue Automático con GitHub App

### Paso 1: Instalar Vercel GitHub App

1. Ve a [https://vercel.com/github](https://vercel.com/github)
2. Haz clic en **"Install Vercel GitHub App"**
3. Selecciona tu cuenta de GitHub
4. Elige qué repositorios pueden acceder (todos o específicos)
5. Autoriza la instalación

### Paso 2: Importar Repositorio

1. Ve a [https://vercel.com/new](https://vercel.com/new)
2. Selecciona tu repositorio
3. Configura como en la Opción A
4. Haz clic en **"Deploy"**

### Paso 3: Auto-Deploy Configurado

A partir de ahora, cada push a la rama `main` desplegará automáticamente:
- ✅ Push a `main` → Despliegue a producción
- ✅ Pull requests → Despliegues de preview

---

## 🔧 Configuración Avanzada

### Dominio Personalizado

1. En Vercel Dashboard, ve a tu proyecto
2. Haz clic en **"Settings"** → **"Domains"**
3. Añade tu dominio (ej: `musica.conservatorio.es`)
4. Configura los registros DNS según las instrucciones de Vercel

### Analytics

Vercel incluye Analytics gratuitos:
1. Ve a **"Analytics"** en el dashboard
2. Activa las métricas que necesites
3. Visualiza visitas, rendimiento y web vitals

### Preview Deployments

Para cada Pull Request, Vercel crea un despliegue de preview:
- URL única para cada PR
- Comentarios automáticos en GitHub
- Perfecto para revisar cambios antes de merge

---

## ✅ Verificación Post-Despliegue

### Checklist

- [ ] La aplicación carga correctamente en la URL de Vercel
- [ ] El Dashboard muestra los gráficos de Recharts
- [ ] IndexedDB se inicializa (verifica en DevTools → Application)
- [ ] Los datos semilla se cargan (3 alumnos, 3 agrupaciones, 90 unidades)
- [ ] Puedes crear/editar/eliminar alumnos
- [ ] Puedes crear evaluaciones y calcular notas
- [ ] Los exports CSV/JSON funcionan
- [ ] El tema oscuro/claro funciona
- [ ] Responsive en móvil y tablet
- [ ] No hay errores en la consola del navegador

### Verificar IndexedDB en Producción

1. Abre tu sitio en Vercel
2. Presiona `F12` para abrir DevTools
3. Ve a **Application** → **IndexedDB**
4. Debe aparecer: `programa_didactico_2026_2027`
5. Dentro, el store `app_state` debe contener los datos

### Verificar Performance

1. Ve a **Analytics** en Vercel Dashboard
2. Revisa las métricas de Core Web Vitals:
   - LCP (Largest Contentful Paint): < 2.5s
   - FID (First Input Delay): < 100ms
   - CLS (Cumulative Layout Shift): < 0.1

---

## 🐛 Troubleshooting

### Error: "Build failed"

**Causa:** Problemas con dependencias o configuración

**Solución:**
```bash
# Localmente
npm install
npm run build

# Si funciona localmente, verifica que package.json esté subido a GitHub
```

### Error: "Page not found" en rutas

**Causa:** Vercel no está redirigiendo correctamente las rutas SPA

**Solución:**
- Verifica que `vercel.json` tenga:
```json
"rewrites": [
  { "source": "/(.*)", "destination": "/index.html" }
]
```

### Error: "IndexedDB not available"

**Causa:** Navegador no soporta IndexedDB o está en modo incógnito

**Solución:**
- Usa un navegador moderno (Chrome, Firefox, Safari, Edge)
- Desactiva el modo incógnito
- Verifica que no haya extensiones bloqueando storage

### Error: "Assets not loading"

**Causa:** Rutas base incorrectas

**Solución:**
- Verifica que `vite.config.js` tenga `base: '/'`
- Verifica que `vercel.json` tenga la configuración correcta

### Despliegue lento

**Causa:** Muchos archivos o dependencias pesadas

**Solución:**
- Verifica que `.vercelignore` esté excluyendo archivos innecesarios
- Revisa el tamaño de `node_modules`
- Considera usar `npm ci` en lugar de `npm install`

---

## 📊 Monitoreo y Mantenimiento

### Ver Logs

1. Ve a tu proyecto en Vercel Dashboard
2. Haz clic en **"Deployments"**
3. Selecciona un despliegue
4. Haz clic en **"Functions"** o **"Build Logs"**

### Rollback

Si algo sale mal:
1. Ve a **"Deployments"**
2. Busca el despliegue anterior funcional
3. Haz clic en **"Promote to Production"**

### Actualizaciones Automáticas

Vercel detecta automáticamente cambios en GitHub:
- Push a `main` → Despliegue automático
- No necesitas hacer nada manualmente

---

## 🎉 ¡Listo!

Tu aplicación está desplegada en Vercel y lista para usar.

**URL típica:** `https://gestion-programa-didactico-musical.vercel.app`

**Próximos pasos:**
- Comparte la URL con tu equipo
- Configura un dominio personalizado si lo necesitas
- Activa Analytics para monitorear el uso
- Configura backups regulares de IndexedDB

---

## 📞 Soporte

- **Documentación de Vercel:** [https://vercel.com/docs](https://vercel.com/docs)
- **Soporte de Vercel:** [https://vercel.com/support](https://vercel.com/support)
- **Issues del proyecto:** Abre un issue en GitHub

---

*Programa Didáctico 2026/2027 · Música de Cámara, Banda y Orquesta · Extremadura*
