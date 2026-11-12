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

## Formulario de acceso anticipado

El formulario de la lista de espera se envía a `POST /api/waitlist`. El servidor valida el nombre, correo, consentimiento, uso principal, dispositivo y una descripción del perfil y motivación antes de reenviar el registro.

- `GOOGLE_CHAT_WEBHOOK_URL`: webhook entrante directo de Google Chat. El mensaje se envía con el formato oficial `{ "text": "..." }` e incluye nombre, correo, dispositivo, uso principal, perfil y motivación, origen y fecha.
- `GOOGLE_SHEETS_WEBHOOK_URL`: puente existente de Google Apps Script, compatible con la integración que también guarda registros en Sheets o los reenvía a Chat.

Se puede configurar uno de los dos destinos o ambos. Las URLs permanecen únicamente en variables de entorno del servidor y nunca se exponen al navegador. El endpoint también incorpora validación de origen, límite de tamaño, honeypot antispam, limitación de frecuencia y protección contra fórmulas al usar hojas de cálculo.

## Notas

- Este proyecto está configurado como privado en `package.json`.
- Está pensado para una experiencia de estudio bíblico centrada en lectura, análisis y preparación de sermones.
