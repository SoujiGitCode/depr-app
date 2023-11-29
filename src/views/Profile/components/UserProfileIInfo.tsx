import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { getFormattedDate } from "@/utils/helpers";
import { UserDetails } from "..";
import { FormikProps } from "formik";

interface UserProfileInfoProps {
  formik: FormikProps<UserDetails>;
}

const UserProfileInfo: React.FC<UserProfileInfoProps> = ({ formik }) => {
  return (
    <>
      <Box sx={{ display: "flex", paddingBottom: "1.3rem" }}>
        <Typography sx={{ fontWeight: "bold", fontSize: "1.2rem" }}>
          Primer Nombre: &nbsp;
        </Typography>
        <Typography
          sx={{
            lineBreak: "anywhere",
            fontSize: "1.2rem",
          }}
        >
          {formik.values.first_name}
        </Typography>
      </Box>

      <Box sx={{ display: "flex", paddingBottom: "1.3rem" }}>
        <Typography sx={{ fontWeight: "bold", fontSize: "1.2rem" }}>
          Segundo Nombre: &nbsp;
        </Typography>
        <Typography
          sx={{
            lineBreak: "anywhere",
            fontSize: "1.2rem",
          }}
        >
          {formik.values.second_name}
        </Typography>
      </Box>

      <Box sx={{ display: "flex", paddingBottom: "1.3rem" }}>
        <Typography sx={{ fontWeight: "bold", fontSize: "1.2rem" }}>
          Primer Apellido: &nbsp;
        </Typography>
        <Typography
          sx={{
            lineBreak: "anywhere",
            fontSize: "1.2rem",
          }}
        >
          {formik.values.last_name}
        </Typography>
      </Box>

      <Box sx={{ display: "flex", paddingBottom: "1.3rem" }}>
        <Typography sx={{ fontWeight: "bold", fontSize: "1.2rem" }}>
          Segundo Apellido: &nbsp;
        </Typography>
        <Typography
          sx={{
            lineBreak: "anywhere",
            fontSize: "1.2rem",
          }}
        >
          {formik.values.second_last_name}
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
          {getFormattedDate(formik.values.birthdate)}
        </Typography>
      </Box>
    </>
  );
};

export default UserProfileInfo;
