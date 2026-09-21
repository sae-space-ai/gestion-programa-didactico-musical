#!/bin/bash

# =====================================================
# Script de despliegue a Vercel
# Programa Didáctico Musical 2026/2027
# =====================================================

echo "🎵 Deploying Music Didactic Programme Management to Vercel..."
echo ""

# Verificar que Vercel CLI está instalado
if ! command -v vercel &> /dev/null; then
    echo "❌ Vercel CLI no está instalado."
    echo "   Instala con: npm i -g vercel"
    exit 1
fi

# Verificar que hay sesión iniciada
if ! vercel whoami &> /dev/null; then
    echo "❌ No hay sesión de Vercel iniciada."
    echo "   Inicia sesión con: vercel login"
    exit 1
fi

echo "✅ Vercel CLI detectado."
echo "✅ Sesión iniciada."
echo ""

# Compilar primero para verificar
echo "🔨 Compilando proyecto..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Error en la compilación. Abortando despliegue."
    exit 1
fi

echo "✅ Compilación exitosa."
echo ""

# Desplegar a producción
echo "🚀 Desplegando a producción..."
vercel --prod

if [ $? -ne 0 ]; then
    echo "❌ Error en el despliegue."
    exit 1
fi

echo ""
echo "✅ Deployment complete!"
echo "🎵 Programa Didáctico Musical 2026/2027 está en línea."
