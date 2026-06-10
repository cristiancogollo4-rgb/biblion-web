# Biblion Web

Biblion Web es una aplicación frontend construida con Next.js para facilitar el estudio bíblico, la lectura de pasajes y la preparación de enseñanzas.

## Características

- Página principal con navegación a secciones clave: Identidad, Funciones, Modo Estudio, Bibi.
- Modo estudio integrado para trabajar con lector y editor en una misma vista.
- Asistente bíblico inteligente "Bibi" para ayuda en explicaciones, bosquejos y aplicaciones prácticas.
- Diseño moderno con componentes reutilizables y mockups de estudio.

## Tecnologías

- Next.js 15
- React 19
- TypeScript
- lucide-react

## Estructura principal

- `src/app/` - rutas y páginas principales.
- `src/components/` - componentes reutilizables de la interfaz.
- `public/` - activos estáticos como logos.

## Instalación

1. Instala dependencias:

```bash
npm install
```

2. Ejecuta la aplicación en modo de desarrollo:

```bash
npm run dev
```

3. Abre `http://localhost:3000` en tu navegador.

## Scripts útiles

- `npm run dev` - inicia el servidor de desarrollo.
- `npm run build` - crea una versión de producción.
- `npm run start` - ejecuta la aplicación compilada.
- `npm run lint` - ejecuta ESLint.

## Notas

- Este proyecto está configurado como privado en `package.json`.
- Está pensado para una experiencia de estudio bíblico centrada en lectura, análisis y preparación de sermones.
