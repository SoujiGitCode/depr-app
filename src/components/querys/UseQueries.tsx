import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

export const useMediaQueries = () => {
  const theme = useTheme();
  const isScreenLg = useMediaQuery(theme.breakpoints.down("lg"));
  const isVeryScreenSmall = useMediaQuery(theme.breakpoints.down("sm"));
  const isMedium = useMediaQuery(theme.breakpoints.down("md"));
  const isXLarge = useMediaQuery(theme.breakpoints.down("xl"));
  const isXsmall = useMediaQuery(theme.breakpoints.down("xs"));
  // Puedes agregar más consultas de media según sea necesario

  return { isScreenLg, isVeryScreenSmall, isMedium, isXLarge, isXsmall };
};
