# 🎯 INTEGRACIÓN COMPLETA CON VERCEL

## ✅ Estado del Proyecto

Tu proyecto está **100% listo** para desplegar en Vercel. Todos los archivos de configuración están optimizados.

---

## 📦 Archivos de Configuración Creados

| Archivo | Propósito |
|---------|-----------|
| `vercel.json` | Configuración principal de Vercel |
| `.vercelignore` | Excluir archivos del despliegue |
| `.env.example` | Ejemplo de variables de entorno |
| `VERCEL_DEPLOY.md` | Guía completa de despliegue |
| `README_VERCEL.md` | README específico para Vercel |
| `pre-deploy-check.sh` | Script de verificación |
| `vite.config.js` | Optimizado para Vercel |
| `.github/workflows/ci-cd.yml` | CI/CD automático |

---

## 🚀 PASOS PARA DESPLEGAR EN VERCEL

### OPCIÓN A: Desde Vercel Dashboard (Más Fácil)

#### Paso 1: Subir código a GitHub

```bash
# Si aún no lo has hecho
git init
git add .
git commit -m "Initial commit: Music Didactic Programme Management 2026/2027"
git remote add origin https://github.com/TU_USUARIO/gestion-programa-didactico-musical.git
git branch -M main
git push -u origin main
```

#### Paso 2: Importar en Vercel

1. Ve a **https://vercel.com/new**
2. Inicia sesión con GitHub
3. Haz clic en **"Import Git Repository"**
4. Selecciona: `gestion-programa-didactico-musical`
5. Vercel detectará automáticamente la configuración

#### Paso 3: Verificar Configuración

Asegúrate de que estos campos estén correctos:

```
Framework Preset: Vite
Build Command: npm run build
Output Directory: dist
Install Command: npm install
Node Version: 20.x
```

#### Paso 4: Desplegar

1. Haz clic en **"Deploy"**
2. Espera 1-2 minutos
3. ¡Listo! Tu URL será: `https://gestion-programa-didactico-musical.vercel.app`

---

### OPCIÓN B: Con Vercel CLI (Línea de Comandos)

#### Paso 1: Instalar Vercel CLI

```bash
npm install -g vercel
```

#### Paso 2: Iniciar Sesión

```bash
vercel login
```

Sigue las instrucciones del navegador.

#### Paso 3: Verificar Proyecto

```bash
# Ejecutar script de verificación
chmod +x pre-deploy-check.sh
./pre-deploy-check.sh
```

#### Paso 4: Desplegar

```bash
# Desde la raíz del proyecto
vercel --prod
```

Responde a las preguntas:
- Set up and deploy? → `Y`
- Which scope? → Selecciona tu cuenta
- Link to existing project? → `N`
- What's your project's name? → `gestion-programa-didactico-musical`
- In which directory is your code? → `.`
- Want to override the settings? → `N`

---

### OPCIÓN C: Auto-Deploy con GitHub App

#### Paso 1: Instalar Vercel GitHub App

1. Ve a **https://vercel.com/github**
2. Haz clic en **"Install Vercel GitHub App"**
3. Selecciona tu cuenta de GitHub
4. Autoriza el acceso a tus repositorios

#### Paso 2: Importar Repositorio

1. Ve a **https://vercel.com/new**
2. Selecciona tu repositorio
3. Configura como en la Opción A
4. Haz clic en **"Deploy"**

#### Paso 3: Auto-Deploy Configurado

A partir de ahora:
- ✅ Cada push a `main` → Despliegue automático
- ✅ Cada Pull Request → Preview deployment

---

## 🔧 Configuración Avanzada

### Dominio Personalizado

1. En Vercel Dashboard → Tu proyecto → **Settings** → **Domains**
2. Añade tu dominio (ej: `musica.conservatorio.es`)
3. Configura los registros DNS según las instrucciones

### Variables de Entorno (Opcional)

Este proyecto NO necesita variables de entorno (es 100% cliente).

Si en el futuro necesitas alguna:
1. Settings → Environment Variables
2. Añade las variables necesarias
3. Redeploy

### Analytics

Vercel incluye Analytics gratuitos:
- Ve a **Analytics** en el dashboard
- Activa las métricas que necesites
- Monitorea visitas y rendimiento

---

## ✅ Verificación Post-Despliegue

### Checklist

- [ ] La aplicación carga en la URL de Vercel
- [ ] Dashboard muestra gráficos de Recharts
- [ ] IndexedDB se inicializa (DevTools → Application)
- [ ] Datos semilla cargados (3 alumnos, 3 agrupaciones, 90 unidades)
- [ ] Puedes crear/editar/eliminar alumnos
- [ ] Evaluaciones calculan notas correctamente
- [ ] Exports CSV/JSON funcionan
- [ ] Tema oscuro/claro funciona
- [ ] Responsive en móvil y tablet
- [ ] No hay errores en consola

### Verificar IndexedDB

1. Abre tu sitio en Vercel
2. Presiona `F12` → DevTools
3. Ve a **Application** → **IndexedDB**
4. Debe aparecer: `programa_didactico_2026_2027`
5. Store `app_state` debe contener los datos

---

## 🐛 Troubleshooting

### Error: "Build failed"

```bash
# Localmente
npm install
npm run build

# Si funciona localmente, verifica que package.json esté en GitHub
```

### Error: "Page not found"

Verifica que `vercel.json` tenga:
```json
"rewrites": [
  { "source": "/(.*)", "destination": "/index.html" }
]
```

### Error: "IndexedDB not available"

- Usa navegador moderno (Chrome, Firefox, Safari, Edge)
- Desactiva modo incógnito
- Verifica que no haya extensiones bloqueando storage

### Despliegue lento

- Verifica que `.vercelignore` esté excluyendo archivos innecesarios
- Revisa el tamaño de `node_modules`

---

## 📊 Monitoreo

### Ver Logs

1. Vercel Dashboard → Tu proyecto → **Deployments**
2. Selecciona un despliegue
3. Haz clic en **"Functions"** o **"Build Logs"**

### Rollback

Si algo sale mal:
1. Ve a **"Deployments"**
2. Busca el despliegue anterior funcional
3. Haz clic en **"Promote to Production"**

---

## 📚 Documentación Adicional

- **Guía completa:** [VERCEL_DEPLOY.md](VERCEL_DEPLOY.md)
- **README específico:** [README_VERCEL.md](README_VERCEL.md)
- **Instrucciones generales:** [INSTRUCCIONES.md](INSTRUCCIONES.md)
- **Documentación Vercel:** https://vercel.com/docs

---

## 🎉 ¡Listo para Desplegar!

Tu proyecto está completamente configurado y optimizado para Vercel.

**Próximos pasos:**

1. Sube el código a GitHub (si no lo has hecho)
2. Elige una de las 3 opciones de despliegue
3. Verifica que todo funcione
4. Comparte la URL con tu equipo

**URL típica:** `https://gestion-programa-didactico-musical.vercel.app`

---

## 📞 Soporte

- **Documentación Vercel:** https://vercel.com/docs
- **Soporte Vercel:** https://vercel.com/support
- **Issues del proyecto:** Abre un issue en GitHub

---

*Programa Didáctico 2026/2027 · Música de Cámara, Banda y Orquesta · Extremadura*
