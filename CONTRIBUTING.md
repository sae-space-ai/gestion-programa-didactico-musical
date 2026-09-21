# Guía de Contribución

¡Gracias por tu interés en contribuir al **Programa Didáctico Musical 2026/2027**!

---

## 📋 Código de Conducta

Este proyecto sigue un código de conducta básico:

- Sé respetuoso con los demás colaboradores.
- Mantén un tono profesional y constructivo.
- Valora la diversidad de opiniones y experiencias.
- Acepta las críticas de forma constructiva.

---

## 🚀 Cómo Contribuir

### 1. Reportar Bugs

Si encuentras un error:

1. Verifica que no exista ya un **Issue** similar.
2. Abre un nuevo **Issue** con:
   - Descripción clara del problema.
   - Pasos para reproducirlo.
   - Comportamiento esperado vs. actual.
   - Capturas de pantalla si es posible.
   - Navegador y versión del sistema operativo.

### 2. Sugerir Mejoras

Para nuevas funcionalidades:

1. Abre un **Issue** con la etiqueta `enhancement`.
2. Describe la funcionalidad propuesta.
3. Explica el caso de uso y los beneficios.
4. Si es posible, incluye mockups o ejemplos.

### 3. Enviar Código (Pull Requests)

#### Proceso

1. **Fork** el repositorio.
2. **Clona** tu fork:
   ```bash
   git clone https://github.com/TU_USUARIO/gestion-programa-didactico-musical.git
   cd gestion-programa-didactico-musical
   ```
3. **Crea una rama** para tu funcionalidad:
   ```bash
   git checkout -b feature/nombre-descriptivo
   # o
   git checkout -b fix/descripcion-del-bug
   ```
4. **Desarrolla** tus cambios:
   - Sigue el estilo de código existente.
   - Añade comentarios en español.
   - Mantén la coherencia con la arquitectura actual.
5. **Prueba** tus cambios:
   ```bash
   npm run typecheck
   npm run build
   ```
6. **Commit** de tus cambios:
   ```bash
   git add .
   git commit -m "Descripción clara del cambio"
   ```
7. **Push** a tu fork:
   ```bash
   git push origin feature/nombre-descriptivo
   ```
8. **Abre un Pull Request** desde tu fork al repositorio original.

#### Convenciones de Commits

Usa mensajes descriptivos en español o inglés:

- `feat: Añadir módulo de calificaciones`
- `fix: Corregir cálculo de nota tribunal`
- `docs: Actualizar README`
- `style: Mejorar formato de componentes`
- `refactor: Reorganizar estructura de datos`
- `test: Añadir pruebas de unidad`
- `chore: Actualizar dependencias`

---

## 🛠️ Estándares de Código

### TypeScript

- Usa tipado estricto.
- Evita `any` siempre que sea posible.
- Nombres de variables y funciones en inglés o español (consistencia interna).
- Comentarios en español.

### React

- Componentes funcionales con hooks.
- Props tipadas con interfaces.
- Evita estado duplicado.
- Usa `useCallback` y `useMemo` cuando sea necesario.

### Estilos

- Tailwind CSS para estilos utilitarios.
- Variables CSS para colores y temas.
- Responsive design (mobile-first).

### Estructura

- Un componente por archivo.
- Módulos en `src/modules/`.
- Componentes reutilizables en `src/components/`.
- Datos en `src/data/`.
- Utilidades en `src/utils/`.

---

## 📝 Documentación

Si añades una nueva funcionalidad:

1. Actualiza el **README.md** si es relevante.
2. Añade comentarios en el código.
3. Actualiza **INSTRUCCIONES.md** si cambia el flujo de uso.

---

## 🧪 Pruebas

Antes de enviar un PR:

```bash
# Verificar tipos
npm run typecheck

# Compilar el proyecto
npm run build

# Probar en desarrollo
npm run dev
```

Verifica manualmente:

- [ ] La funcionalidad works como se espera.
- [ ] No hay errores en la consola del navegador.
- [ ] El diseño responsive funciona.
- [ ] La persistencia en IndexedDB funciona.
- [ ] Los exports CSV/JSON funcionan.

---

## 📞 Contacto

Para dudas sobre contribución, abre un **Issue** con la etiqueta `question`.

---

¡Gracias por contribuir! 🎵
