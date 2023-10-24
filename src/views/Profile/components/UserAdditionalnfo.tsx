import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const UserAdditionalInfo = ({ formik }) => {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          paddingBottom: "1rem",
        }}
      >
        <Typography sx={{ fontWeight: "bold", fontSize: "1.2rem" }}>
          Escuela: &nbsp;
        </Typography>
        <Typography sx={{ lineBreak: "anywhere", fontSize: "1.2rem" }}>
          {formik.values.school}
        </Typography>
      </Box>

      <Box sx={{ display: "flex", paddingBottom: "1rem" }}>
        <Typography sx={{ fontWeight: "bold", fontSize: "1.2rem" }}>
          Genero: &nbsp;
        </Typography>
        <Typography sx={{ lineBreak: "anywhere", fontSize: "1.2rem" }}>
          {formik.values.genre}
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
          {formik.values.docNumber}
        </Typography>
      </Box>
    </>
  );
};

export default UserAdditionalInfo;
