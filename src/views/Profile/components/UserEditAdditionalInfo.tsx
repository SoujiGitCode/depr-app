import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { UserDetails } from "..";
import { FormikProps } from "formik";

interface ListItem {
  value: string;
  label: string;
}

interface UserProfileInfoProps {
  formik: FormikProps<UserDetails>;
  listGenre: ListItem[];
  listId: ListItem[];
  isEditMode: boolean;
}

const UserEditAdditionalInfo = ({
  formik,
  listGenre,
  listId,
  isEditMode,
}: UserProfileInfoProps) => {
  const customText = {
    // "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
    //   borderColor: "pink",
    //   borderRadius: 0,
    //   border: "2px solid " + "#a09c9c92",
    // },
    // width: "100%",
  };

  const licTextField = {
    // "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
    //   borderRadius: 0,
    //   border: "2px solid " + "#a09c9c92",
    // },
    // width: "4.6rem",
    // paddingRight: "1rem",
  };

  return (
    <>
      {/* Phone Number */}
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
          Número de Teléfono: &nbsp;
        </Typography>

        <div style={{ width: "50%" }}>
          <TextField
            id="depr_phone"
            name="depr_phone"
            sx={customText}
            value={formik.values.depr_phone}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.depr_phone && formik.errors.depr_phone && (
            <Typography
              sx={{
                color: "red",
                fontSize: "0.8rem",
                paddingTop: "0.5rem",
              }}
            >
              {formik.errors.depr_phone}
            </Typography>
          )}
        </div>
      </Box>

      {/* Genre */}
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
          Género: &nbsp;
        </Typography>
        <TextField
          select
          name="depr_gender"
          id="depr_gender"
          type="text"
          variant="outlined"
          value={formik.values.depr_gender}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.depr_gender && Boolean(formik.errors.depr_gender)}
          helperText={formik.touched.depr_gender && formik.errors.depr_gender}
          sx={{
            width: "50%",
          }}
        >
          {listGenre.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      </Box >

      {/* ID Document */}
      < Box
        sx={{
          display: "flex",
          paddingBottom: "2rem",
          width: "95%",
          alignItems: "center !important"
        }
        }
      >
        <Typography
          sx={{
            width: "49%",
            fontWeight: "bold",
            fontSize: "1.2rem",
          }}
        >
          Licencia / Real ID
        </Typography>

        <div style={{ width: "50%" }}>
          <TextField
            name="identification"
            id="identification"
            type="text"
            variant="outlined"
            value={formik.values.identification}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.identification &&
              Boolean(formik.errors.identification)
            }
          />
          {formik.touched.identification && formik.errors.identification && (
            <Typography
              sx={{
                color: "red",
                fontSize: "0.8rem",
                paddingTop: "0.5rem",
              }}
            >
              {formik.errors.identification}
            </Typography>
          )}
        </div>
      </Box >

      {/* Email */}
      < Box
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
          Correo Electrónico: &nbsp;
        </Typography>
        <div style={{ width: "50%" }}>
          <TextField
            id="email"
            name="email"
            sx={customText}
            inputProps={
              { readOnly: true, }
            }
            variant="filled"
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
      </Box >
    </>
  );
};

export default UserEditAdditionalInfo;
