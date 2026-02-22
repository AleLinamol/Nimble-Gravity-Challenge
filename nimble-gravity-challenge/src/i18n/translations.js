export const translations = {
  es: {
    appTitle: "Job Apply",
    openPositions: "Posiciones Abiertas",
    subtitle:
      "Elige una posición, pega la URL de tu repo de GitHub y envia tu postulación.",

    candidateTitle: "Datos del candidato",
    candidateSubtitle: "Ingresa tu email.",
    loaded: "Cargado",
    notLoaded: "No cargado",
    emailLabel: "Email",
    emailPlaceholder: "tu.email@dominio.com",
    emailHelpEmpty: "Usa el mismo email con el que estás registrado/a.",
    emailHelpInvalid: "Email inválido.",
    searching: "Buscando...",
    search: "Buscar",
    clear: "Limpiar",
    candidateLoaded: "Candidato cargado",

    // Candidate lookup errors
    candidateNotFound: "No se encontró ningún candidato con ese email.",
    candidateFetchError: "Error buscando candidato.",

    jobsLoadError: "No se pudieron cargar las posiciones.",
    githubRepoLabel: "URL del repo de GitHub",
    githubRepoPlaceholder: "https://github.com/tu-usuario/tu-repo",
    githubHelpEmpty: "Ej: https://github.com/user/proyecto",
    githubHelpInvalid: "Pega una URL válida de GitHub (user/repo).",
    submit: "Enviar",

    // ✅ Job title translations (prefer by ID, fallback by name)
    jobTitlesById: {
      "4416372005": "Desarrollador Fullstack",
      "9100000001": "Jefe de Cocina",
      "9100000002": "Veterinario",
      "9100000003": "Ingeniero Civil",
      "9100000004": "Diseñador de Interiores",
      "9100000005": "Asistente de Vuelo",
      "9100000006": "Biólogo Marino",
      "9100000007": "Arquitecto Paisajista",
      "9100000008": "Chef Pastelero",
      "9100000009": "Fisioterapeuta",
    },
    jobTitlesByName: {
      "Fullstack developer": "Desarrollador Fullstack",
      "Head Chef": "Jefe de Cocina",
      Veterinarian: "Veterinario",
      "Civil Engineer": "Ingeniero Civil",
      "Interior Designer": "Diseñador de Interiores",
      "Flight Attendant": "Asistente de Vuelo",
      "Marine Biologist": "Biólogo Marino",
      "Landscape Architect": "Arquitecto Paisajista",
      "Pastry Chef": "Chef Pastelero",
      "Physical Therapist": "Fisioterapeuta",
    },

    // Apply
    submitting: "Enviando...",
    applySuccess: "Postulación enviada",
    applyErrorDefault: "Error enviando la postulación",
    mustLoadCandidate:
      "Primero carga tu candidato con el email para habilitar el envío.",
  },

  en: {
    appTitle: "Job Apply",
    openPositions: "Open Positions",
    subtitle:
      "Pick a position, paste your GitHub repository URL, and submit your application.",

    candidateTitle: "Candidate details",
    candidateSubtitle: "Enter your email.",
    loaded: "Loaded",
    notLoaded: "Not loaded",
    emailLabel: "Email",
    emailPlaceholder: "your.email@domain.com",
    emailHelpEmpty: "Use the same email you registered with.",
    emailHelpInvalid: "Invalid email.",
    searching: "Searching...",
    search: "Search",
    clear: "Clear",
    candidateLoaded: "Candidate loaded",

    // Candidate lookup errors
    candidateNotFound: "No candidate found with that email.",
    candidateFetchError: "Error fetching candidate.",

    jobsLoadError: "Could not load positions.",
    githubRepoLabel: "GitHub repo URL",
    githubRepoPlaceholder: "https://github.com/your-user/your-repo",
    githubHelpEmpty: "Example: https://github.com/user/project",
    githubHelpInvalid: "Please enter a valid GitHub URL (user/repo).",
    submit: "Submit",

    // ✅ Keep empty or passthrough in EN
    jobTitlesById: {},
    jobTitlesByName: {},

    // Apply
    submitting: "Submitting...",
    applySuccess: "Application submitted",
    applyErrorDefault: "Error submitting application",
    mustLoadCandidate: "Load your candidate email first to enable submission.",
  },
};