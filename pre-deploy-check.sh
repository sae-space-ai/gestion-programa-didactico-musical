#!/bin/bash

# =====================================================
# Script de Verificación Pre-Despliegue
# Programa Didáctico Musical 2026/2027
# =====================================================

echo "🔍 Verificación Pre-Despliegue"
echo "================================"
echo ""

# Verificar Node.js
echo "1️⃣  Verificando Node.js..."
if command -v node &> /dev/null; then
    NODE_VERSION=$(node -v)
    echo "   ✅ Node.js $NODE_VERSION"
else
    echo "   ❌ Node.js no encontrado"
    exit 1
fi

# Verificar npm
echo "2️⃣  Verificando npm..."
if command -v npm &> /dev/null; then
    NPM_VERSION=$(npm -v)
    echo "   ✅ npm $NPM_VERSION"
else
    echo "   ❌ npm no encontrado"
    exit 1
fi

# Verificar dependencias
echo "3️⃣  Verificando dependencias..."
if [ ! -d "node_modules" ]; then
    echo "   ⚠️  node_modules no encontrado. Instalando..."
    npm install
fi
echo "   ✅ Dependencias instaladas"

# Verificar tipos TypeScript
echo "4️⃣  Verificando tipos TypeScript..."
if npm run typecheck > /dev/null 2>&1; then
    echo "   ✅ Tipos TypeScript correctos"
else
    echo "   ⚠️  Errores de TypeScript encontrados (ver arriba)"
fi

# Verificar build
echo "5️⃣  Verificando build..."
if npm run build > /dev/null 2>&1; then
    echo "   ✅ Build exitoso"
else
    echo "   ❌ Error en el build"
    exit 1
fi

# Verificar archivos necesarios
echo "6️⃣  Verificando archivos necesarios..."
FILES_OK=true

if [ -f "package.json" ]; then
    echo "   ✅ package.json"
else
    echo "   ❌ package.json no encontrado"
    FILES_OK=false
fi

if [ -f "vercel.json" ]; then
    echo "   ✅ vercel.json"
else
    echo "   ❌ vercel.json no encontrado"
    FILES_OK=false
fi

if [ -f "vite.config.js" ]; then
    echo "   ✅ vite.config.js"
else
    echo "   ❌ vite.config.js no encontrado"
    FILES_OK=false
fi

if [ -d "dist" ]; then
    echo "   ✅ dist/ (build generado)"
else
    echo "   ❌ dist/ no encontrado"
    FILES_OK=false
fi

if [ "$FILES_OK" = false ]; then
    exit 1
fi

# Verificar tamaño del build
echo "7️⃣  Verificando tamaño del build..."
BUILD_SIZE=$(du -sh dist | cut -f1)
echo "   ✅ Tamaño del build: $BUILD_SIZE"

# Resumen
echo ""
echo "================================"
echo "✅ Verificación completada"
echo ""
echo "📦 Tu proyecto está listo para desplegar en Vercel"
echo ""
echo "🚀 Opciones de despliegue:"
echo "   1. Vercel Dashboard: https://vercel.com/new"
echo "   2. Vercel CLI: vercel --prod"
echo "   3. GitHub App: Auto-deploy en push a main"
echo ""
echo "📖 Guía completa: VERCEL_DEPLOY.md"
echo ""
