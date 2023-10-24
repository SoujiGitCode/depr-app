import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { getFormattedDate } from "@/utils/helpers";

const UserProfileInfo = ({ formik }) => {
  return (
    <>
      <Box sx={{ display: "flex", paddingBottom: "1.3rem" }}>
        <Typography sx={{ fontWeight: "bold", fontSize: "1.2rem" }}>
          Nombre Completo: &nbsp;
        </Typography>
        <Typography
          sx={{
            lineBreak: "anywhere",
            fontSize: "1.2rem",
          }}
        >
          {formik.values.name}
        </Typography>
      </Box>
      <Box sx={{ display: "flex", paddingBottom: "1.3rem" }}>
        <Typography sx={{ fontWeight: "bold", fontSize: "1.2rem" }}>
          Seguro Social: &nbsp;
        </Typography>
        <Typography
          sx={{
            lineBreak: "anywhere",
            fontSize: "1.2rem",
          }}
        >
          {formik.values.social_security}
        </Typography>
      </Box>
      <Box sx={{ display: "flex", paddingBottom: "1.3rem" }}>
        <Typography sx={{ fontWeight: "bold", fontSize: "1.2rem" }}>
          Fecha de nacimiento: &nbsp;
        </Typography>
        <Typography sx={{ lineBreak: "anywhere", fontSize: "1.2rem" }}>
          {getFormattedDate(formik.values.birth_date)}
        </Typography>
      </Box>
      <Box sx={{ display: "flex", paddingBottom: "1.3rem" }}>
        <Typography sx={{ fontWeight: "bold", fontSize: "1.2rem" }}>
          Numero de Telefono: &nbsp;
        </Typography>
        <Typography sx={{ lineBreak: "anywhere", fontSize: "1.2rem" }}>
          {formik.values.phone_number}
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          paddingBottom: "1.3rem",
          width: "140%",
        }}
      >
        <Typography sx={{ fontWeight: "bold", fontSize: "1.2rem" }}>
          Correo electronico: &nbsp;
        </Typography>
        <Typography sx={{ lineBreak: "anywhere", fontSize: "1.2rem" }}>
          {formik.values.email}
        </Typography>
      </Box>
    </>
  );
};

export default UserProfileInfo;
