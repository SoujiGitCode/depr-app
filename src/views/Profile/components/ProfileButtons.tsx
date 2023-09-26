import { Grid, Button, InputAdornment, IconButton, Typography } from "@mui/material";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import profileScss from "../../Profile/Profile.module.scss";
import LockPersonIcon from '@mui/icons-material/LockPerson';
import { useEffect, useState } from "react";

import { Modal, TextField, Box } from "@mui/material";
import { VisibilityOff } from "@mui/icons-material";
import Visibility from "@mui/icons-material/Visibility";
import styles from "../Profile.module.scss";
import ApiRequest from "@/utils/services/apiService";
import useAuthStore from "@/hooks/useAuthStore";
import useAlert from "@/hooks/useAlert";


interface IProfileButtons {
  isEditMode: boolean;
  activateEditForm: () => void;
  submitForm: () => void;
  uploadPhoto: (e: React.ChangeEvent) => void;
}

const ProfileButtons = ({ isEditMode, activateEditForm, submitForm, uploadPhoto }: IProfileButtons) => {

  // Souji getting deep in the mug for the team coding an entire module in 20mins from memory, what a team player.
  const token = useAuthStore((state: any) => state.token);
  const { setAlert } = useAlert();

  const [openModal, setOpenModal] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');


  const handleOpenModal = () => {
    setPasswordError('');
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setPasswordError('');
    setOpenModal(false);
  };


  const primaryColor = "#009999";
  const placeholderColor = "rgba(51, 51, 51, 0.4)";

  const customTextField = {
    backgroundColor: 'white !important',
    width: "100%",
    "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
      borderColor: primaryColor,
      borderRadius: 0,
      border: "2px solid " + primaryColor,
    },
    "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
      borderColor: primaryColor,
    },
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: primaryColor,
    },
    "& .MuiOutlinedInput-root.Mui-focused": {
      backgroundColor: 'white'
    },
    "& .MuiInputLabel-outlined": {
      fontSize: "1rem",
      color: placeholderColor,
    },
    "& .MuiInputLabel-outlined.Mui-focused": {
      color: primaryColor,
    },
    "& .MuiOutlinedInput-input": {
      padding: "0.7rem",
    },
    // Estilo para el autocompletado
    "& .MuiOutlinedInput-input:-webkit-autofill": {
      WebkitBoxShadow: "0 0 0 1000px white inset",
      WebkitTextFillColor: 'inherit', // Esto es para el color del texto, si quieres mantenerlo
    },
  };


  const onSave = async () => {
    try {
      const recoveryRequest = {
        current_password: currentPassword,
        password: password,
      };

      const api = new ApiRequest();
      api.resource = "/user/changepwd";
      api.token = token;

      const response = await api.post({
        body: recoveryRequest,
      });
      console.log(response)
      if (response.code === 200) {
        setAlert('Password Changed!', "success");
      }

      handleCloseModal();

    } catch (error) {
      handleCloseModal();
      setAlert('Error', "error");
      console.log(error);
      throw error;
    }
  };

  const isPasswordValid = () => {
    if (password !== '' && currentPassword !== '' && password === confirmPassword && passwordError === '') return true;
    return false;
  }

  function isPasswordValidFunction() {
    // Regular expression to match password requirements
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*();])[a-zA-Z\d!@#$%^&*();]{8,}$/;

    if (!passwordRegex.test(password)) {
      setPasswordError('Password must have at least 8 characters, a number, a capital letter, and a symbol.');
      return false;
    }

    if (password !== confirmPassword) {
      setPasswordError('Passwords must match.');
      return false;
    }

    // If both checks pass, reset any previous error message and return true
    setPasswordError('');
    return true;
  }


  useEffect(() => {
    isPasswordValidFunction()
  }, [password, confirmPassword, currentPassword]);
  // ---- this will need refractoring later------///
  return (
    <Grid
      item
      sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', paddingTop: '2rem' }}
    >
      {
        isEditMode ?
          <Button
            variant="outlined"
            className={profileScss["profiles-button"]}
            type="submit"
            onClick={submitForm}
          >
            Save Profile
          </Button> :
          <Button
            variant="outlined"
            className={profileScss["profiles-button"]}
            type="button"
            onClick={() => activateEditForm()}
          >
            Edit Profile
          </Button>
      }
      <Button
        variant="outlined"
        className={profileScss["profiles-button"]}
        component="label"
      >
        Change
        <input type="file" id="avatar" name="avatar" accept="image/png" onChange={(e) => uploadPhoto(e)} hidden />
        &nbsp;
        <CameraAltIcon sx={{ fontSize: '18px' }} />
      </Button>

      <Button
        sx={{ fontSize: '12px' }}
        variant="outlined"
        className={profileScss["profiles-button"]}
        type="button"
        onClick={handleOpenModal}
      >
        New Password <LockPersonIcon sx={{ fontSize: '18px' }} />
      </Button>


      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="change-password-modal"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <Box
          sx={{
            bgcolor: 'white !important',
            boxShadow: 24,
            p: 4,
            width: 400
          }}

        >
          <Grid container>

            <Grid item xs={12} className="mb-1  flex-center">
              <Typography color="" sx={{ fontSize: '18px' }}>
                Change Password
              </Typography>
            </Grid>
            {/* Grid para los inputs */}
            <Grid item xs={12}>
              <div className="mb-1">
                <TextField
                  sx={customTextField}
                  size="small"
                  placeholder="Current Password"
                  type={showPassword ? "text" : "password"}
                  name="currentPassword"
                  fullWidth
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPassword(!showPassword)}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  onChange={(e: any) => setCurrentPassword(e.target.value)}
                />
              </div>
            </Grid>
            <Grid item xs={12} sx={{ marginBottom: 2 }}>
              <div className="mb-1">
                <TextField
                  sx={customTextField}
                  size="small"
                  placeholder="Password"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  fullWidth
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPassword(!showPassword)}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  onChange={(e: any) => setPassword(e.target.value)}
                />
              </div>
            </Grid>
            <Grid item xs={12} sx={{ marginBottom: 1 }}>
              <div className="mb-1">
                <TextField
                  sx={customTextField}
                  size="small"
                  placeholder="Confirm Password"
                  type={showPassword ? "text" : "password"}
                  name="confirmPassword"
                  fullWidth
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPassword(!showPassword)}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  onChange={(e: any) => setConfirmPassword(e.target.value)}
                />
              </div>

            </Grid>

            <Grid item xs={12} className="mb-1 mt-1">
              {passwordError && (
                <Typography color="error" sx={{ fontSize: '12px' }}>
                  {passwordError}
                </Typography>
              )}
            </Grid>

            {/* Grid para los botones */}
            <Grid container item justifyContent="center">
              <Grid item xs={5} className="mr-1">
                <Button
                  variant="outlined"
                  color="primary"
                  fullWidth
                  onClick={handleCloseModal}
                >
                  Cancel
                </Button>
              </Grid>
              <Grid item xs={5}>
                <Button
                  className={styles.submitButton}
                  disabled={!isPasswordValid()}
                  variant="contained"
                  color="primary"
                  fullWidth
                  onClick={onSave}
                >
                  Save
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Modal>


    </Grid>
  );
};

export default ProfileButtons;
