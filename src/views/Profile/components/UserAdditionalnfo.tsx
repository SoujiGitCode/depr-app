import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { UserDetails } from "..";
import { FormikProps } from "formik";

interface UserProfileInfoProps {
  formik: FormikProps<UserDetails>;
}

const UserAdditionalInfo: React.FC<UserProfileInfoProps> = ({ formik }) => {
  return (
    <>
      <Box sx={{ display: "flex", paddingBottom: "1.3rem" }}>
        <Typography sx={{ fontWeight: "bold", fontSize: "1.2rem" }}>
          Numero de Telefono: &nbsp;
        </Typography>
        <Typography sx={{ lineBreak: "anywhere", fontSize: "1.2rem" }}>
          {formik.values.phone}
        </Typography>
      </Box>

      <Box sx={{ display: "flex", paddingBottom: "1rem" }}>
        <Typography sx={{ fontWeight: "bold", fontSize: "1.2rem" }}>
          Género: &nbsp;
        </Typography>
        <Typography sx={{ lineBreak: "anywhere", fontSize: "1.2rem" }}>
          {formik.values.gender}
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
          Documento de identidad: &nbsp;
        </Typography>
        <Typography sx={{ lineBreak: "anywhere", fontSize: "1.2rem" }}>
          {formik.values.identification}
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

export default UserAdditionalInfo;
