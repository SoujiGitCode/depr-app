import { Grid, Box } from "@mui/material";
import styles from "./styles.module.scss";
import AppsIcon from "@mui/icons-material/Apps";
import FeedIcon from "@mui/icons-material/Feed";
import PersonIcon from "@mui/icons-material/Person";
import TransitEnterexitIcon from "@mui/icons-material/TransitEnterexit";
import Options from "./components/Options";
import { PATH } from "@/routes/constants";
import useAuthStore from "@/hooks/useAuthStore";
import { logOut } from "@/utils/";
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const logout = useAuthStore((state: any) => state.setLogout);
  const token = useAuthStore((state: any) => state.token);

  const handleLogout = async () => {
    try {
      await logOut(token);
      logout();
      navigate('/');
    } catch (error) {
      console.log(error);
      console.log('log out error, check code line 24')
      navigate('/');
      logout();
    }
  };

  const navigate = useNavigate();

  const handleClick = () => {
    navigate(PATH.DASHBOARD, { state: { fromRequests: true } });
  }

  return (
    <Grid
      className={styles["container"]}
      sx={{ flexDirection: "column", height: "100%" }}
    >
      <Options
        children={
          <AppsIcon sx={{ color: "white", fontSize: "1.5rem !important" }} />
        }
        text="Inicio"
        redirect={PATH.DASHBOARD}
      />
      <Options
        children={<FeedIcon sx={{ color: "white", fontSize: "1.5rem" }} />}
        text="Solicitudes"
        redirect={handleClick}

      />
      <Options
        children={<PersonIcon sx={{ color: "white", fontSize: "1.5rem" }} />}
        text="Perfil"
        //redirect={PATH.PROFILE}
        redirect={PATH.PROFILE}
      />

      <Box onClick={handleLogout}>
        <Options
          children={
            <TransitEnterexitIcon sx={{ color: "white", fontSize: "1.5rem" }} />
          }
          text="Cerrar Sesión"
        />
      </Box>
    </Grid>
  );
};

export default Sidebar;
