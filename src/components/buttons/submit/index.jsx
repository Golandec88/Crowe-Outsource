import Button from "@mui/material/Button";
import { Grid } from "@mui/material";
import proptypes from "prop-types";

export default function SubmitButtons({ size }) {
  return <>
    <Grid container
      spacing={3}
      direction="row"
      justifyContent="flex-end"
      alignItems="center">
      <Grid item>
        <Button size={size} variant="contained" color="error">
          Отклонить заявку
        </Button>
      </Grid>
      <Grid item>
        <Button size={size} variant="contained" color="primary">
          Подтведрить заявку
        </Button>
      </Grid>
    </Grid>
  </>;
}
SubmitButtons.propTypes = {
  size: proptypes.string
};
