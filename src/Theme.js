import { createTheme } from "@mui/material/styles";

const theme = createTheme();

const LightTheme = createTheme({
  typography: {
    fontFamily: "Josefin Sans",
  },
  palette: {
    mode: "light",
    primary: {
      main: "#9277F7",
    },
    secondary: {
      main: "#F7F6FE",
    },
    table: {
      head: "#9277F7",
      body: "#F7F6FE",
    },
  },
});

export default LightTheme;
