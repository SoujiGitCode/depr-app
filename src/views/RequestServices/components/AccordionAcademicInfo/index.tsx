import { ChangeEvent, useEffect, useState } from "react";
import {
  Accordion,
  FormControl,
  Select,
  MenuItem,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Grid
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import styles from "./styles.module.scss";
import CustomLabel from '@/components/CustomLabel';
import { selectStyles } from '@/views/RequestServices/constants';
import { IEntranceTermsData, ICampusData } from '@/views/RequestServices/types';
import { getAcademicYears, getEntranceTerms } from '@/views/RequestServices/functions';
import { set } from "lodash";

interface IAccordionAcademicInfoProps {
  campusData: any,
  campusId: string;
  academicForm: any;
  setAcademicForm: any;
}

const AccordionAcademicInfo = ({ campusData, campusId, academicForm, setAcademicForm }: IAccordionAcademicInfoProps) => {

  const [selectedAYear, setSelectedAYear] = useState('');
  const [academicYears, setAcademicYears] = useState<number[]>([]);
  const [selectedETerm, setSelectedETerm] = useState('');
  const [entranceTerms, setEntranceTerms] = useState<IEntranceTermsData[]>([]);

  useEffect(() => {
    getAllAcademicYears();
  }, [])




  useEffect(() => {
    console.log(campusData?.term_id);
    if (!campusData) return;
    setSelectedAYear(campusData.academic_year);
    setSelectedETerm(campusData.term_id);
    setAcademicForm({
      campus_id: campusId,
      term_id: campusData.term_id || academicForm.term_id,
      academic_year: campusData.academic_year || academicForm.academic_year
    });
  }, [campusData]);


  useEffect(() => {
    if (campusId) getAllEntranceTerms();

  }, [campusId])

  const getAllAcademicYears = async () => {
    try {
      const response = await getAcademicYears();
      setAcademicYears(response)
    } catch (error) { console.log(error) }
  }

  const getAllEntranceTerms = async () => {
    handleAcademicFormChange('campus_id', campusId);
    try {
      const response = await getEntranceTerms(campusId);
      setEntranceTerms(response)
    } catch (error) { console.log(error) }
  }

  const handleAcademicFormChange = (key: string, newValue: string) => {
    setAcademicForm((prevState: any) => ({
      ...prevState,
      [key]: newValue,
    }));
  };


  return (
    <>
      <Accordion
        expanded={true}
        sx={{
          backgroundColor: "#efefef",
          width: "100%",
          borderRadius: "5px",
          padding: "0.5rem",
          marginBottom: "1.5rem !important"
        }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={styles["box-academic-i"]}>
            Academic Information
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={2} sx={{ py: 1 }}>
            <Grid item xs={12} sm={6} md={3}>
              <FormControl fullWidth={true} variant="outlined" sx={selectStyles} disabled={campusId === ''}>
                <CustomLabel name="Entrance Academic Year" required={true} />
                <Select
                  style={{ backgroundColor: 'white' }}
                  value={academicForm.academic_year || "placeholder"}
                  onChange={e => {
                    const newValue = e.target.value;
                    setSelectedAYear(newValue);
                    handleAcademicFormChange('academic_year', newValue);
                  }}
                >
                  <MenuItem value={"placeholder"} disabled>
                    Select Academic Year
                  </MenuItem>
                  {academicYears?.map((option) => (
                    <MenuItem key={option} value={option}>{option}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <FormControl fullWidth={true} variant="outlined" sx={selectStyles} disabled={campusId === ''}>
                <CustomLabel name="Entrance Term" required={true} />
                <Select
                  style={{ backgroundColor: 'white' }}
                  value={academicForm.term_id || "placeholder"}
                  onChange={e => {
                    const newValue = e.target.value;
                    setSelectedETerm(newValue);
                    handleAcademicFormChange('term_id', newValue);
                  }}
                >
                  <MenuItem value={"placeholder"} disabled>
                    Select Entrance Term
                  </MenuItem>
                  {entranceTerms?.map((option) => (
                    <MenuItem key={option.id} value={option.id}>{option.title}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
    </>
  );
}

export default AccordionAcademicInfo;