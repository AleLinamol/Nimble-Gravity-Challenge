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
VITE_BASE_URL=https://botfilter-h5ddh6dye8exb7ha.centralus-01.azurewebsites.net
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

### Step 3 — Listado de posiciones abiertas
- Se consulta el endpoint:
  - `GET /api/jobs/get-list`
- Se muestra una lista de posiciones con:
  - Título
  - Campo para URL de repo
  - Botón `Submit` (habilitado solo cuando el candidato está cargado y la URL es válida)
- Manejo de estados:
  - Loading (Skeleton)
  - Error (Alert)

### Step 2 — Obtener datos del candidato
- Se consulta el endpoint:
  - `GET /api/candidate/get-by-email?email=TU_EMAIL`
- UI:
  - Input de email + botón Buscar
  - Estado de carga y error
  - Indicador de "Cargado/No cargado"
  - Botón "Limpiar"
- Persistencia:
  - Los datos del candidato se guardan en `localStorage` para mantener el estado al refrescar.

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
  "repoUrl": "https://github.com/tu-usuario/tu-repo"
}
```
- **Response (200)**
```json
{ "ok": true }
```

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
    CandidateForm.jsx  # Step 2
    JobsList.jsx       # Step 3
    JobCard.jsx        # UI por job
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

## Próximos pasos (opcional)
- Controlar logs con flag de entorno (`VITE_DEBUG`) para no imprimir en producción.
- Mejorar mensajes de error según respuesta del backend.

---
