import { DialogActions, DialogContent, DialogTitle, TextField, Autocomplete, Box } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import { useTranslation } from "react-i18next";
import proptypes from "prop-types";
import { projectType } from "@types/project";
import s from "./style.module.scss";
import { staffUserType } from "@types/user";
import { useState } from "react";

export default function AttachToProject({ model, close, projects, operators, confirm }) {
  const { t } = useTranslation();
  const [selected, setSelected] = useState({
    project: null,
    operator: null
  });
  return <Dialog
    fullWidth
    onClose={close}
    aria-labelledby="customized-dialog-title"
    open={model}
  >
    <DialogTitle>
      {t("attachToProject")}
      <IconButton
        aria-label="close"
        onClick={close}
        sx={{
          position: "absolute",
          right: 8,
          top: 8,
          color: theme => theme.palette.grey[500],
        }}
      >
        <CloseIcon/>
      </IconButton>
    </DialogTitle>
    <DialogContent className={s.select}>
      <div className={s.project}>
        <Autocomplete
          className={s["project-autocomplete"]}
          disablePortal
          options={projects}
          noOptionsText={t("empty")}
          autoHighlight
          getOptionLabel={(option) => option.name}
          onChange={(_, { id }) => setSelected(Object.assign(selected, { project: id }))}
          renderOption={(props, option) => {
            return <Box component="li" {...props}>
              {option.name}
            </Box>;
          }}
          renderInput={(params ) => {
            return <TextField
              {...params}
              label={"* " + t("selectProject")}
              inputProps={{
                ...params.inputProps
              }}
            />;
          }}
        />
        <span className={s.additionalText}>{t("orCreateNew")} <a className={s.link}>{t("create")}</a></span>
      </div>
      <div className={s.operator}>
        <Autocomplete
          className={s["operator-autocomplete"]}
          disablePortal
          options={operators}
          noOptionsText={t("empty")}
          autoHighlight
          getOptionLabel={(option) => option.id}
          onChange={(_, { id }) => setSelected(Object.assign(selected, { operator: id }))}
          renderOption={(props, option) => {
            return <Box component="li" {...props}>
              {option.role === 1 ? option.fullName + " Manager": option.fullName}
            </Box>;
          }}
          renderInput={(params ) => {
            return <TextField
              {...params}
              label={"* " + t("selectOperator")}
              inputProps={{
                ...params.inputProps
              }}
            />;
          }}
        />
      </div>
    </DialogContent>
    <DialogActions>
      <Button
        size="medium"
        variant="contained"
        color="error"
        disableElevation
        onClick={close}
      >
        {t("close")}
      </Button>
      <Button
        size="medium"
        variant="contained"
        color="primary"
        disableElevation
        onClick={() => confirm(selected)}
      >
        {t("confirm")}
      </Button>
    </DialogActions>
  </Dialog>;
}

AttachToProject.propTypes = {
  model: proptypes.bool,
  confirm: proptypes.func,
  projects: proptypes.arrayOf(projectType()),
  operators: proptypes.arrayOf(staffUserType()),
  close: proptypes.func
};

AttachToProject.defaultProps = {
  projects: [],
  operators: []
};
