import { useState, useEffect } from "react";
import {
  Grid,
  Box,
  Typography,
  FormControl,
  Select,
  MenuItem,
} from "@mui/material";
import useAuthStore from "@/hooks/useAuthStore";
import { CustomLabel } from "@/components";
import {
  selectStyles,
  optionsService,
  servicesTextDescription,
  servicesTextTitle,
} from "./constants";
import { getCampuses, getCampusDocuments, getUserCampus } from "./functions";
import { Documents, AccordionServiceRequest, AccordionAcademicInfo, ActionButtons } from './components';
import { IAllCampusesData, ICampusDocumentsData, IUserDocumentsData, ICampusData } from './types'
import styles from "./styles.module.scss";
import { getAllUserDocuments } from "./functions";

const RequestServices = () => {
  const token = useAuthStore((state: any) => state.token);

  const [campusStatus, setCampusStatus] = useState(0);

  const [campuses, setCampuses] = useState<IAllCampusesData[]>([]);
  const [documentList, setDocumentList] = useState<ICampusDocumentsData[]>([]);
  const [displayList, setDisplayList] = useState(false);
  const [selectedCampus, setSelectedCampus] = useState("");
  const [selectedService, setSelectedService] = useState("");
  const [entranceTermId, setEntranceTermId] = useState<number>(0);
  const [academicYear, setAcademicYear] = useState<number>(0);
  const [userDocuments, setUserDocuments] = useState<IUserDocumentsData[]>([]);
  const [submitStatusCode, setSubmitStatusCode] = useState<number>();
  const [campusData, setCampusData] = useState<ICampusData | null>(null);


  const [academicForm, setAcademicForm] = useState({
    campus_id: '',
    term_id: '',
    academic_year: ''
  });

  const [personalForm, setPersonalForm] = useState({
    first_name: '',
    middle_name: '',
    last_name: '',
    second_last_name: '',
    birthdate: '',
    cell_phone: '',
    student_id: '',
    email: ''
  });

  useEffect(() => {
    getAllCampuses();
  }, []);

  useEffect(() => {
    if (selectedCampus !== "" && selectedService !== "")
      return setDisplayList(true);
    return setDisplayList(false);
  }, [selectedService]);

  useEffect(() => {
    if (selectedCampus === "0") return;
    requestUserDocuments();
  }, [selectedCampus]);

  useEffect(() => {
    console.log(campusStatus);
  }, [campusStatus]);

  const getAllCampuses = async () => {
    try {
      const response = await getCampuses();
      setCampuses(response);
    } catch (error) {
      console.log(error);
    }
  };

  const getUserCampusInfo = async (campusId: string) => {
    try {
      const response = await getUserCampus(campusId, token);
      setCampusStatus(parseInt(response.status));
      setCampusData(response);
    } catch (error) {
      console.log(error);
    }
  };

  const getDocumentsByCampus = async (id: number) => {
    try {
      const response = await getCampusDocuments(id);
      setDocumentList(response);
    } catch (error) {
      console.log(error);
    }
  };

  const requestUserDocuments = async () => {
    try {
      const response = await getAllUserDocuments(selectedCampus, token);
      setUserDocuments(response);

    } catch (error) {
      console.log(error);
    }
  };

  const handleCampusChange = (idValue: string) => {
    console.log(idValue);
    setSelectedCampus(idValue);
    getUserCampusInfo(idValue);
    getDocumentsByCampus(parseInt(idValue));
    // requestUserDocuments();
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        padding: "2rem",
        minHeight: "90vh",
      }}
    >
      <Box
        sx={{
          paddingLeft: "7rem",
          paddingTop: "2rem",
          width: "90%",
        }}
      >
        <Grid container spacing={1}>
          <Grid
            item
            xs={12}
            md={12}
            lg={12}
            sx={{ gap: "1rem", display: "flex", flexDirection: "column" }}
          >
            <Typography className={styles["title-services"]}>
              {servicesTextTitle}
            </Typography>
            <Typography className={styles["description-view-services"]}>
              {servicesTextDescription}
            </Typography>
          </Grid>

          <div className={styles["first-row-title"]}>
            <Grid item xs={12} md={12}>
              <Typography className={styles["campus-selection-title"]}>
                Campus Selection
              </Typography>
            </Grid>
          </div>

          <div className={styles["form-first-row"]}>
            <Grid item xs={12} md={7} paddingRight={"1rem"}>
              <FormControl
                fullWidth={true}
                variant="outlined"
                sx={selectStyles}
              >
                <CustomLabel name="Campus" required={true} />
                <Select
                  value={selectedCampus || "placeholder"}
                  onChange={(e) => handleCampusChange(e.target.value)}
                >
                  <MenuItem value={"placeholder"} disabled>
                    Select your Campus
                  </MenuItem>
                  {campuses?.map((option) => (
                    <MenuItem key={option.id} value={option.id}>
                      {option.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={7} paddingRight={"1rem"}>
              <FormControl
                fullWidth={true}
                variant="outlined"
                sx={selectStyles}
                disabled={selectedCampus === ""}
              >
                <CustomLabel name="Services" required={true} />
                <Select
                  value={selectedService || "placeholder"}
                  onChange={(e) => setSelectedService(e.target.value)}
                >
                  <MenuItem value="placeholder" disabled>
                    Select your Service
                  </MenuItem>
                  {optionsService?.map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </div>

          <Grid
            item
            xs={12}
            md={12}
            lg={12}
            sx={{
              paddingTop: "2.2rem",
              paddingBottom: "2rem",
            }}
          >
            {!displayList || selectedCampus === "0" ? (
              <>
                <Typography className={styles["campus-selection-title"]}>
                  Documents
                </Typography>
                <Typography sx={{ color: "gray" }}>
                  You have not selected your campus
                </Typography>
              </>
            ) : (
              <Grid container>
                <div className={styles["document-th-wrapper"]}>
                  <Grid item xs={8}>
                    <Typography className={styles["documents-th"]}>
                      Documents
                    </Typography>
                  </Grid>
                  <Grid item xs={2}>
                    <Typography className={styles["actions-th"]}>
                      Actions
                    </Typography>
                  </Grid>
                  <Grid item xs={2}>
                    <Typography className={styles["actions-th"]}>
                      Uploaded
                    </Typography>
                  </Grid>
                </div>

                {documentList?.map((document) => {
                  return (
                    <Grid item xs={12} key={document.id}>
                      <Documents
                        title={document.description}
                        campusId={parseInt(selectedCampus, 10)}
                        campusStatus={campusStatus}
                        documentId={document.id}
                        mandatory={document.mandatory}
                        getUserCampusInfo={(id) => getUserCampusInfo(id)}
                        campusDocuments={documentList}
                        userDocuments={userDocuments}
                        requestUserDocuments={() => requestUserDocuments()}
                      />
                    </Grid>
                  );
                })}
              </Grid>
            )}
          </Grid>

          <Grid item xs={12} md={12} lg={12} sx={{ paddingBottom: "1.2rem" }}>
            <div className={styles["accordions-wrapper"]}>
              <AccordionAcademicInfo
                campusData={campusData}
                campusId={selectedCampus}
                academicForm={academicForm}
                setAcademicForm={setAcademicForm}
              />
            </div>

            <div className={styles["accordions-wrapper"]}>
              <AccordionServiceRequest
                personalForm={personalForm}
                setPersonalForm={setPersonalForm} />
            </div>
          </Grid>

          <ActionButtons
            campusData={campusData}
            campusStatus={campusStatus}
            selectedCampus={selectedCampus}
            enabledSubmit={displayList}
            getUserCampusInfo={(id: any) => getUserCampusInfo(id)}
            personalForm={personalForm}
            academicForm={academicForm}
          />
        </Grid>
      </Box>
    </Box>
  );
};

export default RequestServices;
