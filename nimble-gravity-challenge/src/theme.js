import { createTheme } from "@mui/material/styles";

export default createTheme({
  palette: {
    mode: "light",
    primary: { main: "#6D28D9" },
    secondary: { main: "#312E81" },
    background: { default: "#F7F5FF", paper: "#FFFFFF" },
    divider: "rgba(109,40,217,0.14)",
  },
  typography: {
    fontFamily:
      '"Plus Jakarta Sans", system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif',
    h4: { fontWeight: 800, letterSpacing: -0.8, lineHeight: 1.15, fontSize: "2.1rem" },
    h6: { fontWeight: 700, letterSpacing: -0.3, lineHeight: 1.2, fontSize: "1.1rem" },
    body1: { lineHeight: 1.6, fontSize: "1rem" },
    body2: { lineHeight: 1.55, fontSize: "0.95rem" },
    caption: { fontSize: "0.82rem", letterSpacing: 0.2 },
    button: { fontWeight: 700, textTransform: "none", letterSpacing: 0.2 },
  },
  shape: { borderRadius: 14 },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          background:
            "radial-gradient(900px 500px at 20% 0%, rgba(109,40,217,0.12), transparent 60%), #F7F5FF",
        },
      },
    },
    MuiAppBar: {
      defaultProps: { elevation: 0, color: "transparent" },
      styleOverrides: {
        root: {
          borderBottom: "1px solid rgba(109,40,217,0.14)",
          backdropFilter: "blur(10px)",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: "0 10px 30px rgba(49,46,129,0.08)",
        },
      },
    },
    MuiButton: {
      defaultProps: { disableElevation: true },
      styleOverrides: { root: { borderRadius: 12 } },
    },
    MuiTextField: {
      defaultProps: { size: "small" },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "rgba(109,40,217,0.35)",
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "#6D28D9",
            borderWidth: 2,
          },
          "&.Mui-focused": {
            boxShadow: "0 0 0 4px rgba(109,40,217,0.14)",
            borderRadius: 12,
          },
        },
      },
    },
  },
});