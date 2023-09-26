import { Grid } from "@mui/material";
import sxStyles from "../ItemSx";
import profileScss from "../../Profile/Profile.module.scss";
import useAuthStore from "@/hooks/useAuthStore";
import { useEffect, useState } from "react";

const ProfilePhoto = () => {
  const token = useAuthStore((state: any) => state.token);
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    if (token) {
      setImageUrl(`http://phsu.lobsys.net/avatar.php?t=${token}`)
    } else {
      setImageUrl('http://phsu.lobsys.net/avatar.php?t=4893439482342390482390432902390394085757895')
    }
  }, [token])

  return (
    <Grid
      item
      sx={{ display: 'flex', padding: 0, justifyContent: 'center' }}
    >
      <img
        src={imageUrl}
        alt="user-photo"
        className={profileScss["img-profile-style"]}
      />
    </Grid>
  );
};

export default ProfilePhoto;
