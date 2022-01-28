import { Avatar, Box, Skeleton, Typography } from "@mui/material";
import * as proptypes from "prop-types";
import { memo } from "react";
import s from "./style.module.scss";


const UserAvatar = ({ name, position, loading }) => <>
  <Box className={s.user_avatar}>
    <Avatar className={s.avatar} alt="avatar" src="https://source.unsplash.com/random/100x100/?lady,bad" />
    {loading ? <>
      <Skeleton className={s.skeleton} sx={{ width: 150, mt: 1 }}/>
      <Skeleton className={s.skeleton} sx={{ width: 100 }}/>
    </> : <>
      <Typography className={s.name} variant="h6" component="div">
        {name}
      </Typography>
      <Typography className={s.position}>
        {position}
      </Typography>
    </>}
  </Box>
</>;

UserAvatar.propTypes = {
  loading: proptypes.bool,
  name: proptypes.string,
  position: proptypes.string
};

UserAvatar.defaultProps = {
  loading: false
};

export default memo(UserAvatar);