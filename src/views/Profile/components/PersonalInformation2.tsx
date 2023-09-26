import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import profileScss from "../../Profile/Profile.module.scss";
import customTextField from "../sxTexField";
import { FormikProps } from "formik";
import { UserProfile } from "@/types/user";
import { getFormattedDate } from '@/utils/helpers';
import { CustomTextField } from '../constants';
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers";

interface IPersonalInformation2 {
  isEditMode: boolean;
  formik: FormikProps<UserProfile>
}


const PersonalInformation2 = ({ isEditMode, formik }: IPersonalInformation2) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'flex-start'}}>
    {
      !isEditMode ? (
        <>
          <Box sx={{ display: 'flex', paddingBottom: '1rem' }}>
            <Typography>Date or Birth: &nbsp;</Typography>
            <Typography sx={{ lineBreak: 'anywhere'}}>{getFormattedDate(formik.values.birthdate)}</Typography>
          </Box>
          <Box sx={{ display: 'flex', paddingBottom: '1rem' }}>
            <Typography>Phone number: &nbsp;</Typography>
            <Typography sx={{ lineBreak: 'anywhere'}}>{formik.values.cell_phone}</Typography>
          </Box>
          <Box sx={{ display: 'flex', paddingBottom: '1rem' }}>
            <Typography>Email: &nbsp;</Typography>
            <Typography sx={{ lineBreak: 'anywhere'}}>{formik.values.email}</Typography>
          </Box>
        </>
      ) : (
        <>
          <Box sx={{ display: 'flex', paddingBottom: '1rem', width: '100%' }}>
            <Typography sx={{ width: '40%' }}>Date or Birth: &nbsp;</Typography>
            <TextField
              id="birthdate"
              name="birthdate"
              value={formik.values.birthdate}
              onChange={formik.handleChange}
              error={formik.touched.birthdate && !!formik.errors.birthdate}
              helperText={formik.touched.birthdate && formik.errors.birthdate}
              sx={{...CustomTextField, width: '50%' }}
              type="date"
            />
          </Box>
          <Box sx={{ display: 'flex', paddingBottom: '1rem', width: '100%' }}>
            <Typography sx={{ width: '40%' }}>Phone number: &nbsp;</Typography>
            <TextField
              id="cell_phone"
              name="cell_phone"
              value={formik.values.cell_phone}
              onChange={formik.handleChange}
              error={formik.touched.cell_phone && !!formik.errors.cell_phone}
              helperText={
                formik.touched.cell_phone && formik.errors.cell_phone
              }
              sx={{...CustomTextField, width: '50%' }}
            />
          </Box>
          <Box sx={{ display: 'flex', paddingBottom: '1rem', width: '100%' }}>
            <Typography sx={{ width: '40%' }}>Email: &nbsp;</Typography>
            <TextField
              id="email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && !!formik.errors.email}
              helperText={formik.touched.email && formik.errors.email}
              sx={{...CustomTextField, width: '50%' }}
            />
          </Box>
        </>
      )
    }
    </Box>
  );
};

export default PersonalInformation2;