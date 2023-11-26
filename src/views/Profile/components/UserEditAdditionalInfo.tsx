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

const UserEditAdditionalInfo: React.FC<UserProfileInfoProps> = ({
  formik,
  listGenre,
  listId,
  isEditMode,
}) => {
  const customText = {
    "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
      borderColor: "pink",
      borderRadius: 0,
      border: "2px solid " + "#a09c9c92",
    },
    width: "100%",
  };

  const licTextField = {
    "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
      borderRadius: 0,
      border: "2px solid " + "#a09c9c92",
    },
    width: "4.6rem",
    paddingRight: "1rem",
  };

  console.log(formik.values.identification_type);

  return (
    <>
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
            width: "42%",
            fontWeight: "bold",
            fontSize: "1.2rem",
          }}
        >
          Numero de Telefono: &nbsp;
        </Typography>

        <div style={{ width: "50%" }}>
          <TextField
            id="phone"
            name="phone"
            sx={customText}
            value={formik.values.phone}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.phone && formik.errors.phone && (
            <Typography
              sx={{
                color: "red",
                fontSize: "0.8rem",
                paddingTop: "0.5rem",
              }}
            >
              {formik.errors.phone}
            </Typography>
          )}
        </div>
      </Box>

      {/* Genre */}
      <Box
        sx={{
          display: "flex",
          paddingBottom: "1rem",
          width: "90%",
        }}
      >
        <Typography
          sx={{
            width: "42%",
            fontWeight: "bold",
            fontSize: "1.2rem",
          }}
        >
          Genero: &nbsp;
        </Typography>
        <TextField
          select
          name="gender"
          id="gender"
          type="text"
          variant="outlined"
          value={formik.values.gender}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.gender && Boolean(formik.errors.gender)}
          helperText={formik.touched.gender && formik.errors.gender}
          sx={{
            "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
              borderRadius: 0,
              border: "2px solid " + "#a09c9c92",
            },
            width: "50%",
          }}
        >
          {listGenre.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      </Box>

      {/* ID Document */}
      <Box
        sx={{
          display: "flex",
          paddingBottom: "1rem",
          width: "90%",
        }}
      >
        <Typography
          sx={{
            width: "42%",
            fontWeight: "bold",
            fontSize: "1.2rem",
          }}
        >
          {isEditMode ? "ID:" : "Documento de Identidad"}
        </Typography>

        <div>
          <TextField
            sx={{
              "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
                borderRadius: 0,
                border: "2px solid " + "#a09c9c92",
              },
              width: "108%",
            }}
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
            width: "42%",
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

export default UserEditAdditionalInfo;
