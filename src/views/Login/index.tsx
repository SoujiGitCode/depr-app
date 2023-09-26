import { Grid, Box, Typography } from "@mui/material";
import { ListItem } from "@/components";
import styles from "./login.module.scss";
import {
  servicesList,
  description,
  welcomeTitle,
  serviceTitle,
} from "./constants";

const Login = () => {
  return (
    <div className={styles["main-grid-container"]}>
      <div className={styles["column-wrapper"]}>
        <div className={styles["left-div"]}>
          <Box className={styles["welcome-container"]}>
            <Box className={styles["background-image"]}>
              <Typography className={styles["text"]}>{welcomeTitle}</Typography>
              <Typography className={styles["description"]}>{description}</Typography>
            </Box>
          </Box>
        </div>
        <div className={styles["right-div"]}>
          <div className={styles["services-container"]}>
            <Typography className={styles["upper-text-title"]}>{serviceTitle}</Typography>
            {servicesList?.map((service) => (
              <ListItem
                key={service.number}
                number={service.number}
                listItem={service.listItem}
                description={service.description}
                url={service.url}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};


export default Login;
