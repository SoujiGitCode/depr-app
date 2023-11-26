import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { UserDetails } from "..";
import { FormikProps } from "formik";

interface UserProfileInfoProps {
  formik: FormikProps<UserDetails>;
}

const UserEditProfile: React.FC<UserProfileInfoProps> = ({ formik }) => {
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
          Nombre:
        </Typography>

        <div style={{ width: "50%" }}>
          <TextField
            id="first_name"
            name="first_name"
            size="small"
            value={formik.values.first_name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            sx={customText}
          />
          {formik.touched.first_name && formik.errors.first_name && (
            <Typography
              sx={{
                color: "red",
                fontSize: "0.8rem",
                paddingTop: "0.5rem",
              }}
            >
              {formik.errors.first_name}
            </Typography>
          )}
        </div>
      </Box>

      {/* Second Name */}
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
          Segundo Nombre:
        </Typography>

        <div style={{ width: "50%" }}>
          <TextField
            id="second_name"
            name="second_name"
            size="small"
            value={formik.values.second_name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            sx={customText}
          />
          {formik.touched.second_name && formik.errors.second_name && (
            <Typography
              sx={{
                color: "red",
                fontSize: "0.8rem",
                paddingTop: "0.5rem",
              }}
            >
              {formik.errors.second_name}
            </Typography>
          )}
        </div>
      </Box>

      {/*  lastName */}
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
          Apellido:
        </Typography>

        <div style={{ width: "50%" }}>
          <TextField
            id="last_name"
            name="last_name"
            size="small"
            value={formik.values.last_name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            sx={customText}
          />
          {formik.touched.last_name && formik.errors.last_name && (
            <Typography
              sx={{
                color: "red",
                fontSize: "0.8rem",
                paddingTop: "0.5rem",
              }}
            >
              {formik.errors.last_name}
            </Typography>
          )}
        </div>
      </Box>

      {/* second  lastName */}
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
          Segundo Apellido:
        </Typography>

        <div style={{ width: "50%" }}>
          <TextField
            id="second_last_name"
            name="second_last_name"
            size="small"
            value={formik.values.second_last_name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            sx={customText}
          />
          {formik.touched.second_last_name &&
            formik.errors.second_last_name && (
              <Typography
                sx={{
                  color: "red",
                  fontSize: "0.8rem",
                  paddingTop: "0.5rem",
                }}
              >
                {formik.errors.second_last_name}
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
            id="birthdate"
            name="birthdate"
            type="date"
            sx={customText}
            value={formik.values.birthdate}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.birthdate && formik.errors.birthdate && (
            <Typography
              sx={{
                color: "red",
                fontSize: "0.8rem",
                paddingTop: "0.5rem",
              }}
            >
              {formik.errors.birthdate}
            </Typography>
          )}
        </div>
      </Box>
    </>
  );
};

export default UserEditProfile;
