import { Grid } from "@mui/material";
import { Sidebar, Footer } from "@/layout";
import { Outlet } from "react-router-dom";
import AlertPopup from "@/components/AlertPopup";
import AccessibilityWidget from "@/components/AccessibilityWidget";

const AuthorizedLayout = () => {
  return (
    <Grid container>
      <AlertPopup />
      <Grid item xs={12} md={1}>
        <Sidebar />
      </Grid>
      <Grid item xs={12} md={11} sx={{ display: 'flex', alignItems: 'center', minHeight: '90vh' }}>
        <Outlet />
      </Grid>

      <Grid item xs={12}>
        <Footer />
      </Grid>

      <AccessibilityWidget />
    </Grid>
  );
};

export default AuthorizedLayout;
