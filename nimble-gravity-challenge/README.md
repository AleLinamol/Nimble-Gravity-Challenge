# Job Apply (React + MUI)

Mini app en React que consume una API para:
- Obtener posiciones abiertas (jobs).
- Obtener datos del candidato por email.
- Enviar la postulación a una posición con la URL del repo de GitHub.

---

## Stack
- React (Vite)
- Material UI (MUI)
- Fetch API (wrapper simple en `src/api/client.js`)
- Tests: Vitest + React Testing Library

---

## Requisitos
- Node.js 18+ (recomendado 20+)
- npm

---

## Configuración

### 1) Variables de entorno
Creá un archivo `.env` en la raíz del proyecto (mismo nivel que `package.json`) basado en `.env.example`.

**.env.example**
```bash
VITE_BASE_URL=Tu_Base_URL
```

> En Vite, las variables expuestas al frontend deben comenzar con `VITE_`.

---

## Instalación y ejecución

```bash
npm install
npm run dev
```

La app se levanta en la URL que te muestre la terminal (por defecto `http://localhost:5173`).

---

## Funcionalidad implementada

### Obtener datos del candidato
- Se consulta el endpoint:
  - `GET /api/candidate/get-by-email?email=TU_EMAIL`
- UI:
  - Input de email + botón Buscar
  - Estado de carga y error
  - Indicador de "Cargado/No cargado"
  - Botón "Limpiar"
- Persistencia:
  - Los datos del candidato se guardan en `localStorage` para mantener el estado al refrescar.

  ### Listado de posiciones abiertas
- Se consulta el endpoint:
  - `GET /api/jobs/get-list`
- Se muestra una lista de posiciones con:
  - Título (con soporte opcional de traducción ES/EN por diccionario)
  - Campo para URL de repo
  - Botón `Submit` (habilitado solo cuando el candidato está cargado y la URL es válida)
- Manejo de estados:
  - Loading (Skeleton)
  - Error (Alert)

### Enviar postulación (Apply to job)
- Se consulta el endpoint:
  - `POST /api/candidate/apply-to-job`
- En el envío se incluye (según validación real del backend):
  - `uuid`
  - `jobId`
  - `candidateId`
  - `applicationId` (**requerido por el backend** )
  - `repoUrl`
- Manejo de estados por card:
  - Submitting
  - Success
  - Error (muestra `fieldErrors` si vienen en el body)

---

## Endpoints

Base URL: `VITE_BASE_URL`

### Jobs list
- **GET** `${VITE_BASE_URL}/api/jobs/get-list`
- **Response (200)**
```json
[
  { "id": "4416372005", "title": "Fullstack developer" },
  { "id": "9100000001", "title": "Head Chef" }
]
```

### Candidate by email
- **GET** `${VITE_BASE_URL}/api/candidate/get-by-email?email=TU_EMAIL`
- **Response (200)**
```json
{
  "uuid": "a1b2c3d4-...",
  "candidateId": "a1b2c3d4",
  "applicationId": "a1b2c3d4",
  "firstName": "Jane",
  "lastName": "Doe",
  "email": "jane.doe@example.com"
}
```

### Apply to job
- **POST** `${VITE_BASE_URL}/api/candidate/apply-to-job`
- **Body**
```json
{
  "uuid": "tu uuid",
  "jobId": "id del job",
  "candidateId": "tu candidateId",
  "applicationId": "tu applicationId",
  "repoUrl": "https://github.com/tu-usuario/tu-repo"
}
```
- **Response (200)**
```json
{ "ok": true }
```

---

## Tests

### Ejecutar tests
- Modo watch:
```bash
npm test
```

- Una sola corrida:
```bash
npm run test:run
```

### Tech
- Vitest (runner)
- jsdom (DOM environment)
- React Testing Library + jest-dom

### Qué se testea
- Toggle de idioma ES/EN (i18n)
- Carga y render del listado de jobs (mock de fetch)
- Lookup de candidato por email (success + error localizado)
- Envío de postulación: valida que el `POST` incluya los campos requeridos (incluyendo `applicationId`)

---

## Estructura del proyecto

```txt
src/
  api/
    client.js          # wrapper GET/POST + parsing de errores
    jobs.js            # getJobs()
    candidate.js       # getCandidateByEmail()
    apply.js           # applyToJob()
  components/
    CandidateForm.jsx  # Obtiene los datos del candidato
    JobsList.jsx       # Lista las posiciones abiertas
    JobCard.jsx        # Aplica a la posición
  i18n/
    translations.js    # diccionario ES/EN
    I18nProvider.jsx   # provider (context)
    useI18n.js         # hook
  test/
    setupTests.js
    App.i18n.test.jsx
    JobsList.test.jsx
    CandidateForm.test.jsx
    JobCard.apply.test.jsx
  theme.js             # MUI Theme (Lavanda + tipografía)
  App.jsx
  main.jsx
```

---

## Notas de UX / UI
- Se usa MUI Theme con paleta lavanda y tipografía moderna.
- Inputs y botones alineados y con tamaños coherentes.
- Skeleton loader en la carga del listado.
- Persistencia del candidato en `localStorage`.

---


