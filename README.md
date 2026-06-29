# QUERCUS App

PWA de gestión de espacios exteriores — Módulo 1: Login + estructura base.

## Stack
- React + Vite
- Supabase (auth + base de datos)
- Vercel (hosting)

## Configuración

### 1. Variables de entorno

Creá un archivo `.env` en la raíz del proyecto:

```
VITE_SUPABASE_URL=https://rxpvlotvsyrpywaygylz.supabase.co
VITE_SUPABASE_ANON_KEY=sb_publishable_ZE14NqsJ5LnFkEucdrCaXg_-P0Zam5y
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Correr en local

```bash
npm run dev
```

### 4. Deploy en Vercel

1. Subir este proyecto a GitHub
2. Ir a vercel.com → "Add New Project"
3. Importar el repo de GitHub
4. En "Environment Variables" agregar:
   - `VITE_SUPABASE_URL` → `https://rxpvlotvsyrpywaygylz.supabase.co`
   - `VITE_SUPABASE_ANON_KEY` → `sb_publishable_ZE14NqsJ5LnFkEucdrCaXg_-P0Zam5y`
5. Deploy

### 5. Configurar Supabase Auth

En tu panel de Supabase:
1. Ir a **Authentication → Settings**
2. En "Site URL" poner la URL de tu app en Vercel (ej: `https://quercus.vercel.app`)
3. Crear el primer usuario: **Authentication → Users → Add user**

## Estructura del proyecto

```
src/
├── lib/
│   ├── supabase.js        # Cliente Supabase
│   └── AuthContext.jsx    # Contexto de autenticación global
├── components/
│   ├── Layout.jsx         # Header + bottom nav
│   └── ProtectedRoute.jsx # Protección de rutas
├── pages/
│   ├── Login.jsx          # Pantalla de login
│   └── Home.jsx           # Home del cliente
└── styles/
    └── global.css         # Variables CSS y reset
```

## Próximos módulos

- **Módulo 2**: Portal cliente completo (novedades, cuenta, galería)
- **Módulo 3**: Panel empleados (fichaje GPS, checklist, fotos)
- **Módulo 4**: Panel admin (gestión de clientes, reportes)
- 
