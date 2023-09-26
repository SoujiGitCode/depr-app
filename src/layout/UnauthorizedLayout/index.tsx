import { Grid } from "@mui/material";
import { Header, Footer } from "@/layout";
import { Outlet } from "react-router-dom";
import AlertPopup from "@/components/AlertPopup";
import styles from "./styles.module.scss";

const UnautoziredLayout = () => {
  return (
    // <Grid container sx={{ height: '100%', width: '100%', flexGrow: 1 }}>

    //   <AlertPopup />

    //   <Grid item xs={12} sx={{ display: 'flex', flex: 'column', alignItems: 'start', background: 'red', maxHeight: '5vh' }}>
    //     <Header />
    //   </Grid>

    //   <Grid item xs={12} sx={{ flexGrow: 1, display: 'flex', flex: 'column', alignItems: 'start', background: 'blue', maxHeight: '70vh' }}>
    //     <Outlet />
    //   </Grid>

    //   <Grid item xs={12} sx={{ display: 'flex', flex: 'column', alignItems: 'end', background: 'yellow', maxHeight: '10vh' }}>
    //    <Footer />
    //   </Grid>
    // </Grid>

    <>
      <div className="main-container">
        <AlertPopup />

        <div className="header-container">
          <Header />
        </div>

        <div className="outlet-container">
          <Outlet />
        </div>

        <div className="footer-container">
          <Footer />
        </div>
      </div>

    </>

  );
};



export default UnautoziredLayout;
