import { Typography } from "@mui/material";
import { useMediaQueries } from "./BMediaQuerys";
import sxStyles from "../ItemSx";
import profileScss from "../../Profile/Profile.module.scss";

const ProfileTitle = () => {
  const { isScreenLg, isVeryScreenSmall, isMedium } = useMediaQueries();
  return (
    <Typography
      variant="h4"
      className={profileScss["title"]}
      // sx={sxStyles(isVeryScreenSmall, isMedium, isScreenLg).title}
    >
      Profile
    </Typography>
  );
};

export default ProfileTitle;
