import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import profileScss from "../../Profile/Profile.module.scss";
import customTextField from "../sxTexField";
import { FormikProps } from "formik";
import { UserProfile } from "@/types/user";
import { CustomTextField } from '../constants';

interface IAddressInformation {
  isEditMode: boolean;
  formik: FormikProps<UserProfile>
}

const AddressInformation = ({ isEditMode, formik }: IAddressInformation) => {

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'flex-start'}}>
      <Typography
        variant="h5"
        className={profileScss["title-address-information"]}
        sx={{ paddingBottom: '1rem' }}
      >
        Address
      </Typography>
    {
      !isEditMode ? (
        <>
          <Box sx={{ display: 'flex', paddingBottom: '1rem', width: '100%'}}>
            <Typography>Address Line 1: &nbsp;</Typography>
            <Typography sx={{ lineBreak: 'anywhere'}}>{formik.values.address_line1}</Typography>
          </Box>
          <Box sx={{ display: 'flex', paddingBottom: '1rem', width: '100%'}}>
            <Typography>Address Line 2: &nbsp;</Typography>
            <Typography sx={{ lineBreak: 'anywhere' }}>{formik.values.address_line2}</Typography>
          </Box>
          <Box sx={{ display: 'flex', paddingBottom: '1rem'}}>
            <Typography>City: &nbsp;</Typography>
            <Typography>{formik.values.address_city}</Typography>
          </Box>
          <Box sx={{ display: 'flex', paddingBottom: '1rem'}}>
            <Typography>State: &nbsp;</Typography>
            <Typography>{formik.values.address_state}</Typography>
          </Box>
          <Box sx={{ display: 'flex', paddingBottom: '1rem'}}>
            <Typography>Zip code: &nbsp;</Typography>
            <Typography>{formik.values.address_zipcode}</Typography>
          </Box>
        </>
      ) : (
        <>
          <Box sx={{ display: 'flex', paddingBottom: '1rem', width: '100%' }}>
            <Typography sx={{ width: '40%' }}>Address Line 1: &nbsp;</Typography>
            <TextField
              id="address_line1"
              name="address_line1"
              value={formik.values.address_line1}
              onChange={formik.handleChange}
              error={formik.touched.address_line1 && !!formik.errors.address_line1}
              helperText={formik.touched.address_line1 && formik.errors.address_line1}
              sx={{...CustomTextField, width: '50%' }}
            />
          </Box>
          <Box sx={{ display: 'flex', paddingBottom: '1rem', width: '100%' }}>
            <Typography sx={{ width: '40%' }}>Address Line 2: &nbsp;</Typography>
            <TextField
              id="address_line2"
              name="address_line2"
              value={formik.values.address_line2}
              onChange={formik.handleChange}
              error={formik.touched.address_line2 && !!formik.errors.address_line2}
              helperText={formik.touched.address_line2 && formik.errors.address_line2}
              sx={{...CustomTextField, width: '50%' }}
            />
          </Box>
          <Box sx={{ display: 'flex', paddingBottom: '1rem', width: '100%' }}>
            <Typography sx={{ width: '40%' }}>City: &nbsp;</Typography>
            <TextField
              id="address_city"
              name="address_city"
              value={formik.values.address_city}
              onChange={formik.handleChange}
              error={formik.touched.address_city && !!formik.errors.address_city}
              helperText={formik.touched.address_city && formik.errors.address_city}
              sx={{...CustomTextField, width: '50%' }}
            />
          </Box>
          <Box sx={{ display: 'flex', paddingBottom: '1rem', width: '100%' }}>
            <Typography sx={{ width: '40%' }}>State: &nbsp;</Typography>
            <TextField
              id="address_state"
              name="address_state"
              value={formik.values.address_state}
              onChange={formik.handleChange}
              error={formik.touched.address_state && !!formik.errors.address_state}
              helperText={formik.touched.address_state && formik.errors.address_state}
              sx={{...CustomTextField, width: '50%' }}
            />
          </Box>
          <Box sx={{ display: 'flex', paddingBottom: '1rem', width: '100%' }}>
            <Typography sx={{ width: '40%' }}>Zip code: &nbsp;</Typography>
            <TextField
              id="address_zipcode"
              name="address_zipcode"
              value={formik.values.address_zipcode}
              onChange={formik.handleChange}
              error={formik.touched.address_zipcode && !!formik.errors.address_zipcode}
              helperText={formik.touched.address_zipcode && formik.errors.address_zipcode}
              sx={{...CustomTextField, width: '50%' }}
            />
          </Box>
        </>
      )
    }
    </Box>
  );
};

export default AddressInformation;