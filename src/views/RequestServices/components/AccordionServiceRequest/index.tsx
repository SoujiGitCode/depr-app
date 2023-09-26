import { ChangeEvent, useEffect, useState } from "react";
import { Accordion, AccordionSummary, AccordionDetails, Typography, Grid, TextField } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import styles from "./styles.module.scss";
import CustomLabel from '@/components/CustomLabel';
import { DatePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { getUserInformation } from '@/views/RequestServices/functions';
import { IUserInfoData } from '@/views/RequestServices/types';
import useAuthStore from "@/hooks/useAuthStore";
import useAlert from "@/hooks/useAlert";
import dayjs, { Dayjs } from 'dayjs';

interface MyTextFieldProps {
  name: string;
  placeholder: string;
  value: string;
  onValueChange: (name: string, value: string) => void;
}

const MyTextField: React.FC<MyTextFieldProps> = ({
  name,
  placeholder,
  value,
  onValueChange,
}) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    onValueChange(name, newValue);
  };


  const primaryColor = "#009999";
  const placeholderColor = "rgba(51, 51, 51, 0.4)";

  const customTextField = {
    backgroundColor: 'white',
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
  };

  return (
    <TextField
      sx={customTextField}
      placeholder={placeholder}
      size="small"
      variant="outlined"
      fullWidth
      value={value}
      onChange={handleChange}
      name={name}
    />
  );
};

export default function BasicAccordion({ setPersonalForm, personalForm }: any) {

  const token = useAuthStore((state: any) => state.token);
  const { setAlert } = useAlert();

  const [personalInfo, setPersonalInfo] = useState<IUserInfoData>();

  useEffect(() => {
    console.log(personalForm)
    getUserPersonalInformation();
  }, [])

  const getUserPersonalInformation = async () => {
    try {
      const response = await getUserInformation(token);
      setPersonalInfo(response)
      const {
        first_name,
        middle_name,
        last_name,
        second_last_name,
        birthdate,
        cell_phone,
        student_id,
        email
      } = response;

      setPersonalForm({
        first_name,
        middle_name,
        last_name,
        second_last_name,
        birthdate,
        cell_phone,
        student_id,
        email
      });

    } catch (error) {
      setAlert('Personal Information failed', 'error')
    }
  }

  const handlePersonalFormChange = (key: string, newValue: string) => {
    setPersonalForm((prevState: any) => ({
      ...prevState,
      [key]: newValue,
    }));
  };

  // const handleDateChange = (key: string, newDate: Dayjs | null) => {
  //   if (newDate) {
  //     setPersonalForm((prevState: any) => ({
  //       ...prevState,
  //       [key]: newDate.format(), // convertir la fecha Dayjs a string
  //     }));
  //   }
  // };

  const handleDateChange = (key: string, newDate: Dayjs | null) => {
    if (newDate) {
      const adjustedDate = newDate.add(12, 'hour'); // agregar 12 horas a la fecha
      setPersonalForm((prevState: any) => ({
        ...prevState,
        [key]: adjustedDate.format(), // convertir la fecha Dayjs a string
      }));
    }
  };

  return (
    <>
      <Accordion
        expanded={true}
        sx={{
          backgroundColor: "#efefef",
          width: "100%",
          borderRadius: "5px",
          padding: "0.5rem !important",
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography className={styles["box-academic-i"]}>
            Personal Information
          </Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ width: 'calc(100% - 1.5rem)' }}>
          <Grid container spacing={2} sx={{ py: 1 }}>
            <Grid item xs={12} sm={6} md={4}>
              <div>
                <CustomLabel name="First Name" required={true} />
                <MyTextField
                  name="first_name"
                  placeholder="First Name"
                  value={personalForm?.first_name || ''}
                  onValueChange={(name, value) => handlePersonalFormChange(name, value)}
                />
              </div>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <div>
                <CustomLabel name="Middle Name" required={false} />
                <MyTextField
                  name="middle_name"
                  placeholder="Middle Name"
                  value={personalForm?.middle_name || ''}
                  onValueChange={(name, value) => handlePersonalFormChange(name, value)}
                />
              </div>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <div>
                <CustomLabel name="Last Name" required={true} />
                <MyTextField
                  name="last_name"
                  placeholder="Last Name"
                  value={personalForm?.last_name || ''}
                  onValueChange={(name, value) => handlePersonalFormChange(name, value)}
                />
              </div>
            </Grid>
            {/* Second Row */}
            <Grid item xs={12} sm={6} md={4}>
              <CustomLabel name="Second Last Name" required={false} />
              <MyTextField
                name="second_last_name"
                placeholder="Second Last Name"
                value={personalForm?.second_last_name || ''}
                onValueChange={(name, value) => handlePersonalFormChange(name, value)}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <CustomLabel name="Date of Birth" required={true} />
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  sx={{
                    backgroundColor: 'white',
                    "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#009999",
                      borderRadius: 0,
                      border: "2px solid " + "#009999",
                    },
                    "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline":
                    {
                      borderColor: "#009999",
                    },
                    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                    {
                      borderColor: "#009999",
                    },
                    "& .MuiInputLabel-outlined": {
                      fontSize: "1rem",
                      color: "#333333",
                    },
                    "& .MuiInputLabel-outlined.Mui-focused": {
                      color: "#009999",
                    },
                    "& .MuiOutlinedInput-input": {
                      padding: "0.7rem",
                    },
                  }}
                  value={dayjs(personalInfo?.birthdate)}
                  slotProps={{ textField: { size: "small", fullWidth: true } }}
                  onChange={(date: Dayjs | null) => handleDateChange('birthdate', date)}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <CustomLabel name="Phone Number" required={true} />
              <MyTextField
                name="cell_phone"
                placeholder="Phone Number"
                value={personalForm?.cell_phone || ''}
                onValueChange={(name, value) => handlePersonalFormChange(name, value)}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <CustomLabel name="Email" required={true} />
              <MyTextField
                name="email"
                placeholder="Email"
                value={personalForm?.email || ''}
                onValueChange={(name, value) => handlePersonalFormChange(name, value)}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <CustomLabel name="Student Id" required={true} />
              <MyTextField
                name="student_id"
                placeholder="Student Id"
                value={personalForm?.student_id || ''}
                onValueChange={(name, value) => handlePersonalFormChange(name, value)}
              />
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
    </>
  );
}