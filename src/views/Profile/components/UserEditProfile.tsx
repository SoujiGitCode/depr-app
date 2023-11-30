import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { UserDetails } from "..";
import { FormikProps } from "formik";

interface UserProfileInfoProps {
  formik: FormikProps<UserDetails>;
}

const UserEditProfile = ({ formik }: UserProfileInfoProps) => {
  const customText = {
    // "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
    //   borderColor: "pink",
    //   borderRadius: 0,
    //   border: "2px solid " + "#a09c9c92",
    // },
    // width: "100%",
  };

  return (
    <>
      {/* Name */}
      <Box
        sx={{
          display: "flex",
          paddingBottom: "2rem",
          width: "95%",
          alignItems: "center !important"
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
            name="depr_first_name"
            size="small"
            value={formik.values.depr_first_name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            sx={customText}
          />
          {formik.touched.depr_first_name && formik.errors.depr_first_name && (
            <Typography
              sx={{
                color: "red",
                fontSize: "0.8rem",
                paddingTop: "0.5rem",
              }}
            >
              {formik.errors.depr_first_name}
            </Typography>
          )}
        </div>
      </Box>

      {/* Second Name */}
      <Box
        sx={{
          display: "flex",
          paddingBottom: "2rem",
          width: "95%",
          alignItems: "center !important"
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
            name="depr_second_name"
            size="small"
            value={formik.values.depr_second_name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            sx={customText}
          />
          {formik.touched.depr_second_name && formik.errors.depr_second_name && (
            <Typography
              sx={{
                color: "red",
                fontSize: "0.8rem",
                paddingTop: "0.5rem",
              }}
            >
              {formik.errors.depr_second_name}
            </Typography>
          )}
        </div>
      </Box>

      {/*  lastName */}
      <Box
        sx={{
          display: "flex",
          paddingBottom: "2rem",
          width: "95%",
          alignItems: "center !important"
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
            name="depr_last_name"
            size="small"
            value={formik.values.depr_last_name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            sx={customText}
          />
          {formik.touched.depr_last_name && formik.errors.depr_last_name && (
            <Typography
              sx={{
                color: "red",
                fontSize: "0.8rem",
                paddingTop: "0.5rem",
              }}
            >
              {formik.errors.depr_last_name}
            </Typography>
          )}
        </div>
      </Box>

      {/* second  lastName */}
      <Box
        sx={{
          display: "flex",
          paddingBottom: "2rem",
          width: "95%",
          alignItems: "center !important"
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
            name="depr_second_last_name"
            size="small"
            value={formik.values.depr_second_last_name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            sx={customText}
          />
          {formik.touched.depr_second_last_name &&
            formik.errors.depr_second_last_name && (
              <Typography
                sx={{
                  color: "red",
                  fontSize: "0.8rem",
                  paddingTop: "0.5rem",
                }}
              >
                {formik.errors.depr_second_last_name}
              </Typography>
            )}
        </div>
      </Box>

      {/* Social Security */}
      <Box
        sx={{
          display: "flex",
          paddingBottom: "2rem",
          width: "95%",
          alignItems: "center !important"
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
            name="depr_social_security"
            value={formik.values.depr_social_security}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            sx={customText}
          />
          {formik.touched.depr_social_security && formik.errors.depr_social_security && (
            <Typography
              sx={{
                color: "red",
                fontSize: "0.8rem",
                paddingTop: "0.5rem",
              }}
            >
              {formik.errors.depr_social_security}
            </Typography>
          )}
        </div>
      </Box>

      {/* Birthdate */}
      <Box
        sx={{
          display: "flex",
          paddingBottom: "2rem",
          width: "95%",
          alignItems: "center !important"
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
            name="depr_birthdate"
            type="date"
            sx={customText}
            value={formik.values.depr_birthdate}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.depr_birthdate && formik.errors.depr_birthdate && (
            <Typography
              sx={{
                color: "red",
                fontSize: "0.8rem",
                paddingTop: "0.5rem",
              }}
            >
              {formik.errors.depr_birthdate}
            </Typography>
          )}
        </div>
      </Box>
    </>
  );
};

export default UserEditProfile;
