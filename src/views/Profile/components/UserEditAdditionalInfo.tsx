import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";

const UserEditAdditionalInfo = ({ formik, listGenre, listId, isEditMode }) => {
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

  return (
    <>
      {/* School */}
      <Box
        sx={{
          display: "flex",
          paddingBottom: "1rem",
          width: "100%",
        }}
      >
        <Typography
          sx={{
            width: "20%",
            fontWeight: "bold",
            fontSize: "1.2rem",
          }}
        >
          Escuela: &nbsp;
        </Typography>
        <div style={{ width: "50%" }}>
          <TextField
            id="school"
            name="school"
            value={formik.values.school}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            sx={customText}
          />
          {formik.touched.school && formik.errors.school && (
            <Typography
              sx={{
                color: "red",
                fontSize: "0.8rem",
                paddingTop: "0.5rem",
              }}
            >
              {formik.errors.school}
            </Typography>
          )}
        </div>
      </Box>

      {/* Genre */}
      <Box
        sx={{
          display: "flex",
          paddingBottom: "1rem",
          width: "100%",
        }}
      >
        <Typography
          sx={{
            width: "20%",
            fontWeight: "bold",
            fontSize: "1.2rem",
          }}
        >
          Genero: &nbsp;
        </Typography>
        <TextField
          select
          name="genre"
          id="genre"
          type="text"
          variant="outlined"
          value={formik.values.genre}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.genre && Boolean(formik.errors.genre)}
          helperText={formik.touched.genre && formik.errors.genre}
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
            width: "22%",
            fontWeight: "bold",
            fontSize: "1.2rem",
          }}
        >
          {isEditMode ? "ID:" : "Documento de Identidad"}
        </Typography>
        <TextField
          select
          name="docType"
          id="docType"
          type="text"
          variant="outlined"
          value={formik.values.docType}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.docType && Boolean(formik.errors.docType)}
          helperText={formik.touched.docType && formik.errors.docType}
          sx={licTextField}
        >
          {listId.map((option) => (
            <MenuItem
              key={option.value}
              value={option.value}
              sx={{ width: "3rem" }}
            >
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <div>
          <TextField
            sx={{
              "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
                borderRadius: 0,
                border: "2px solid " + "#a09c9c92",
              },
              width: "84%",
            }}
            name="docNumber"
            id="docNumber"
            type="text"
            variant="outlined"
            value={formik.values.docNumber}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.docNumber && Boolean(formik.errors.docNumber)}
          />
          {formik.touched.docNumber && formik.errors.docNumber && (
            <Typography
              sx={{
                color: "red",
                fontSize: "0.8rem",
                paddingTop: "0.5rem",
              }}
            >
              {formik.errors.docNumber}
            </Typography>
          )}
        </div>
      </Box>
    </>
  );
};

export default UserEditAdditionalInfo;
