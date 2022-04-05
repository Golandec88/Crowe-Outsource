import Button from "@mui/material/Button";
import { Grid } from "@mui/material";
import proptypes from "prop-types";


export default function SubmitButtons({ size, decline, accept }) {
  return <>
    <Grid container
      spacing={3}
      direction="row"
      justifyContent="flex-end"
      alignItems="center">
      <Grid item>
        <Button size={size} variant="contained" color="error" disableElevation onClick={decline}>
          Отклонить заявку
        </Button>
      </Grid>
      <Grid item>
        <Button size={size} variant="contained" color="primary" disableElevation onClick={accept}>
          Подтведрить заявку
        </Button>
      </Grid>
    </Grid>
  </>;
}
SubmitButtons.propTypes = {
  size: proptypes.string,
  decline: proptypes.func,
  accept: proptypes.func,
};
