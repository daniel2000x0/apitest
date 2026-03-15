📅 API Test - Google Calendar con React

Proyecto de prueba para integrar Google Calendar API en una aplicación desarrollada con React.
Permite autenticar usuarios con Google y crear eventos en su calendario.

🚀 Descripción

Este proyecto es una aplicación simple que conecta una app de React con la Google Calendar API para probar funcionalidades como:

Autenticación con Google

Crear eventos en el calendario

Obtener eventos existentes

Manejar fechas desde formularios

El objetivo es aprender e implementar la integración con la API de Google Calendar.

🛠 Tecnologías usadas

⚛️ React

🟨 JavaScript / TypeScript

🌐 Google Calendar API

🔐 Google OAuth 2.0

📦 Node.js

📦 Instalación

Clona el repositorio:

git clone https://github.com/tuusuario/api-test.git

Entra al proyecto:

cd api-test

Instala dependencias:

npm install

Inicia el proyecto:

npm run dev
⚙️ Configuración de Google Cloud

Para usar la API necesitas crear credenciales en Google Cloud Console.

Crear un proyecto en Google Cloud.

Habilitar la Google Calendar API.

Crear credenciales OAuth 2.0 Client ID.

Configurar el Authorized JavaScript origin.

Ejemplo:

http://localhost:5173
📅 Ejemplo de creación de evento
const event = {
  summary: "Evento de prueba",
  description: "Evento creado desde React",
  start: {
    dateTime: "2026-03-15T10:00:00",
    timeZone: "America/Guayaquil",
  },
  end: {
    dateTime: "2026-03-15T11:00:00",
    timeZone: "America/Guayaquil",
  },
};
📂 Estructura del proyecto
src
 ├── components
 │   └── CalendarForm.jsx
 ├── services
 │   └── googleCalendar.js
 ├── App.jsx
 └── main.jsx
🧪 Objetivo del proyecto

Este proyecto es un entorno de pruebas para:

Aprender a usar APIs externas

Practicar autenticación OAuth

Integrar servicios de Google en aplicaciones web

📄 Licencia

Proyecto de prueba con fines educativos.

Si quieres, también puedo hacerte una versión de README más profesional (nivel GitHub portfolio) con:

badges

screenshots

demo

arquitectura del proyecto