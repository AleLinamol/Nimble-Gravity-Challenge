# Job Apply (React + MUI)

Mini app en React que consume una API para:
- Obtener posiciones abiertas (jobs).
- Obtener datos del candidato por email.
- Enviar postulación a un job con la URL del repo de GitHub.

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
VITE_BASE_URL= Tu_Base_URL