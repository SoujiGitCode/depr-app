import { Grid, Typography, Divider } from "@mui/material";
import profileScss from "./Profile.module.scss";
import { useFormik } from "formik";
import { useState, useEffect } from "react";
import { validationSchema } from "./validateconstants";
import { getUserDetails, uploadProfilePhoto, getUploadProfilePhoto } from "./users";
import { UserProfile } from "@/types/user";
import { editProfile } from "@/utils/functions";
import useAuthStore from "@/hooks/useAuthStore";
import useAlert from "@/hooks/useAlert";
import { 
  ProfilePhoto, 
  ProfileButtons, 
  ProfileTitle, 
  PersonalInformation, 
  AcademicInformation, 
  AddressInformation, 
  PersonalInformation2 } from "./components";
import { initialValues } from './constants';
import { setUserDataInFormik } from './utils';

const Profile = () => {
  const [isEditMode, setIsEditMode] = useState(false);

  const token = useAuthStore((state: any) => state.token);
  const logout = useAuthStore((state: any) => state.setLogout);
  const { setAlert } = useAlert();

  useEffect(() => {
    fetchUserProfile();
  }, [token]);
  
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: values => updateUserProfile(values)
  })

  const fetchUserProfile = async () => {
    try {
      const profile = await getUserDetails(token);
      formik.setValues(setUserDataInFormik(profile));
    } catch (error) {
      setAlert("Something went wrong getting the user data", "error")
      if(error?.status === 404) logout()
    }
  };

  const updateUserProfile = async(values: UserProfile) => {
    try {
      await editProfile(token, values);
      setAlert("Information updated successfully!", "success")
      setIsEditMode(false);
    } catch (error) {
      setIsEditMode(false);
      setAlert("Something wrong happened. Please, try again later", "error")
    }
  }

  const uploadPhoto = async (e: any) => {
    try {
      await uploadProfilePhoto(token, e.target.files[0])
      setAlert("Information updated successfully!", "success")
      location.reload()
    } catch (error) {
      setAlert("Something wrong happened. Please, try again later", "error")
    }
  }

  return (
    <>
      <Grid container sx={{ padding: '3rem' }}>
        <Grid item xs={12} sx={{ paddingLeft: '5rem', marginBottom: '2rem'}}>
          <ProfileTitle />
        </Grid>
        <Grid item xs={3} sx={{ display: 'flex', flexDirection: 'column', paddingTop: '2rem' }}>
          <ProfilePhoto />
          <ProfileButtons 
            isEditMode={isEditMode} 
            activateEditForm={() => setIsEditMode(true)}
            submitForm={formik.handleSubmit}
            uploadPhoto={uploadPhoto}
          />
        </Grid>
        <Grid item xs={9} sx={{ paddingTop: '2rem' }}>
          <Grid container>
            <Grid item xs={12}>
              <Typography
                variant="h5"
                className={profileScss["title-address-information"]}
                sx={{ paddingBottom: '1rem' }}
              >
                Personal Information
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <PersonalInformation isEditMode={isEditMode} formik={formik} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <PersonalInformation2 isEditMode={isEditMode} formik={formik} />
            </Grid>
            <Divider
              orientation="horizontal"
              sx={{
                borderBottom: "1px solid gray",
                width: "95%",
                paddingTop: "1rem",
              }}
            />
            <Grid item xs={12} sm={6} sx={{ paddingTop: '2rem' }}>
              <AddressInformation isEditMode={isEditMode} formik={formik} />
            </Grid>
            <Grid item xs={12} sm={6} sx={{ paddingTop: '2rem' }}>
              {/* <AcademicInformation isEditMode={isEditMode} formik={formik} /> */}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default Profile;
