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
import { useMediaQueries } from "@/components/querys/UseQueries";

const Sidebar = () => {
  const logout = useAuthStore((state: any) => state.setLogout);
  const token = useAuthStore((state: any) => state.token);

  const { isScreenLg, isVeryScreenSmall, isMedium, isXLarge, isXsmall } =
    useMediaQueries();
  const handleLogout = async () => {
    try {
      await logOut(token);
      logout();
    } catch (error) {
      console.log("error");
      logout();
    }
  };

  return (
    <>
      {isMedium ? (
        <Grid
          className={styles["container-medium"]}
          sx={{ flexDirection: "column", height: "100%" }}
        >
          <Options
            children={
              <AppsIcon
                sx={{ color: "white", fontSize: "2.6rem !important" }}
              />
            }
            text=""
            redirect={PATH.DASHBOARD}
          />
          <Options
            children={<FeedIcon sx={{ color: "white", fontSize: "2.6rem" }} />}
            text=""
            redirect={PATH.DASHBOARD}
            // redirect={PATH.REQUEST_SERVICES}
          />
          <Options
            children={
              <PersonIcon sx={{ color: "white", fontSize: "2.6rem" }} />
            }
            text=""
            redirect={PATH.DASHBOARD}
            // redirect={PATH.PROFILE}
          />
        </Grid>
      ) : (
        <Grid
          className={styles["container"]}
          sx={{ flexDirection: "column", height: "100%" }}
        >
          <Options
            children={
              <AppsIcon
                sx={{ color: "white", fontSize: "1.5rem !important" }}
              />
            }
            text="Dashboard"
            redirect={PATH.DASHBOARD}
          />
          <Options
            children={<FeedIcon sx={{ color: "white", fontSize: "1.5rem" }} />}
            text="Solicitudes"
            redirect={PATH.DASHBOARD}
            // redirect={PATH.REQUEST_SERVICES}
          />
          <Options
            children={
              <PersonIcon sx={{ color: "white", fontSize: "1.5rem" }} />
            }
            text="Profile"
            redirect={PATH.DASHBOARD}
            // redirect={PATH.PROFILE}
          />

          <Box onClick={handleLogout}>
            <Options
              children={
                <TransitEnterexitIcon
                  sx={{ color: "white", fontSize: "1.5rem" }}
                />
              }
              text="Cerrar Sesión"
            />
          </Box>
        </Grid>
      )}
    </>
  );
};

export default Sidebar;
