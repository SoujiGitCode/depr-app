import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";

const UserEditProfile = ({ formik }) => {
  const customText = {
    "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
      borderColor: "pink",
      borderRadius: 0,
      border: "2px solid " + "#a09c9c92",
    },
    width: "100%",
  };

  return (
    <>
      {/* Name */}
      <Box
        sx={{
          display: "flex",
          paddingBottom: "1rem",
          width: "90%",
        }}
      >
        <Typography
          sx={{
            width: "49%",
            fontWeight: "bold",
            fontSize: "1.2rem",
          }}
        >
          Nombre completo:
        </Typography>

        <div style={{ width: "50%" }}>
          <TextField
            id="name"
            name="name"
            size="small"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            sx={customText}
          />
          {formik.touched.name && formik.errors.name && (
            <Typography
              sx={{
                color: "red",
                fontSize: "0.8rem",
                paddingTop: "0.5rem",
              }}
            >
              {formik.errors.name}
            </Typography>
          )}
        </div>
      </Box>

      {/* Social Security */}
      <Box
        sx={{
          display: "flex",
          paddingBottom: "1rem",
          width: "90%",
        }}
      >
        <Typography
          sx={{
            width: "49%",
            fontWeight: "bold",
            fontSize: "1.2rem",
          }}
        >
          Seguro Social: &nbsp;
        </Typography>
        <div style={{ width: "50%" }}>
          <TextField
            id="social_security"
            name="social_security"
            value={formik.values.social_security}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            sx={customText}
          />
          {formik.touched.social_security && formik.errors.social_security && (
            <Typography
              sx={{
                color: "red",
                fontSize: "0.8rem",
                paddingTop: "0.5rem",
              }}
            >
              {formik.errors.social_security}
            </Typography>
          )}
        </div>
      </Box>

      {/* Birthdate */}
      <Box
        sx={{
          display: "flex",
          paddingBottom: "1rem",
          width: "90%",
        }}
      >
        <Typography
          sx={{
            width: "49%",
            fontWeight: "bold",
            fontSize: "1.2rem",
          }}
        >
          Fecha de Nacimiento: &nbsp;
        </Typography>
        <div style={{ width: "50%" }}>
          <TextField
            id="birth_date"
            name="birth_date"
            type="date"
            sx={customText}
            value={formik.values.birth_date}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.birth_date && formik.errors.birth_date && (
            <Typography
              sx={{
                color: "red",
                fontSize: "0.8rem",
                paddingTop: "0.5rem",
              }}
            >
              {formik.errors.birth_date}
            </Typography>
          )}
        </div>
      </Box>

      {/* Phone Number */}
      <Box
        sx={{
          display: "flex",
          paddingBottom: "1rem",
          width: "90%",
        }}
      >
        <Typography
          sx={{
            width: "49%",
            fontWeight: "bold",
            fontSize: "1.2rem",
          }}
        >
          Numero de Telefono: &nbsp;
        </Typography>

        <div style={{ width: "50%" }}>
          <TextField
            id="phone_number"
            name="phone_number"
            sx={customText}
            value={formik.values.phone_number}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.phone_number && formik.errors.phone_number && (
            <Typography
              sx={{
                color: "red",
                fontSize: "0.8rem",
                paddingTop: "0.5rem",
              }}
            >
              {formik.errors.phone_number}
            </Typography>
          )}
        </div>
      </Box>

      {/* Email */}
      <Box
        sx={{
          display: "flex",
          paddingBottom: "1rem",
          width: "90%",
        }}
      >
        <Typography
          sx={{
            width: "49%",
            fontWeight: "bold",
            fontSize: "1.2rem",
          }}
        >
          Correo Electronico: &nbsp;
        </Typography>
        <div style={{ width: "50%" }}>
          <TextField
            id="email"
            name="email"
            sx={customText}
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.email && formik.errors.email && (
            <Typography
              sx={{
                color: "red",
                fontSize: "0.8rem",
                paddingTop: "0.5rem",
              }}
            >
              {formik.errors.email}
            </Typography>
          )}
        </div>
      </Box>
    </>
  );
};

export default UserEditProfile;
