import proptypes from "prop-types";
import { projectType } from "@types/project";
import Card from "@components/card";
import { Box, DialogActions, DialogContent, DialogTitle, TextField, Tooltip } from "@mui/material";
import s from "./style.module.scss";
import IconButton from "@mui/material/IconButton";
import { Hail, SupervisorAccount } from "@mui/icons-material";
import { useTranslation } from "react-i18next";
import ClientsModal from "@components/modals/clients";
import OperatorsModal from "@components/modals/operators";
import { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import CloseIcon from "@mui/icons-material/Close";

export default function Projects({ items, onAddProject }) {
  const { t } = useTranslation();
  const [selected, setSelected] = useState();
  const [clientsModal, setClientsModal] = useState(false);
  const [operatorsModal, setOperatorsModal] = useState(false);
  const [addProjectModal, setAddProjectModal] = useState(false);
  const [projectName, setProjectName] = useState(null);

  function onChange(type, id) {
    setSelected(id);
    if(type === "clients") setClientsModal(true);
    if(type === "operators") setOperatorsModal(true);
  }

  function close() {
    setAddProjectModal(false);
    setProjectName(null);
  }

  return <>
    <div className={s.container}>
      {items.map(({ name, id }, index) => <Item
        key={`#project-card-${index}`}
        onChange={onChange}
        name={name}
        id={id}
      />)}
    </div>
    <div className={s.addButton}>
      <Button
        size="medium"
        variant="contained"
        color="secondary"
        disableElevation
        onClick={() => setAddProjectModal(true)}
      >
        {t("addProject")}
      </Button>
    </div>
    <ClientsModal
      model={clientsModal}
      close={() => setClientsModal(false)}
      id={selected}
    />
    <OperatorsModal
      model={operatorsModal}
      close={() => setOperatorsModal(false)}
      id={selected}
    />
    <Dialog open={addProjectModal}>
      <DialogTitle>
        {t("addProject")}
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
      <DialogContent>
        <TextField
          fullWidth
          placeholder={t("name")}
          onChange={event => setProjectName(event.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button
          size="medium"
          variant="contained"
          color="primary"
          disableElevation
          onClick={() => {
            onAddProject(projectName);
            close();
          }}
        >
          {t("addProject")}
        </Button>
        <Button
          size="medium"
          variant="contained"
          color="error"
          disableElevation
          onClick={close}
        >
          {t("cancel")}
        </Button>
      </DialogActions>
    </Dialog>
  </>;
}

Projects.propTypes = {
  items: proptypes.arrayOf(projectType()),
  onAddProject: proptypes.func
};

Projects.defaultProps = {
  items: []
};

function Item({ name, id, onChange }) {
  const { t } = useTranslation();

  return <>
    <Box className={s.box}>
      <Card>
        <div className={s["card-container"]}>
          <b className={s.title}>{name}</b>
          <div className={s.buttons}>
            <Tooltip title={t("clients")}>
              <IconButton
                className={s.button}
                aria-label="clients"
                color="primary"
                onClick={() => onChange("clients", id)}
              >
                <Hail fontSize="small" />
              </IconButton>
            </Tooltip>
            <Tooltip title={t("operators")}>
              <IconButton
                className={s.button}
                aria-label="operators"
                color="secondary"
                onClick={() => onChange("operators", id)}
              >
                <SupervisorAccount fontSize="small" />
              </IconButton>
            </Tooltip>
          </div>
        </div>
      </Card>
    </Box>
  </>;
}

Item.propTypes = {
  name: proptypes.string,
  onChange: proptypes.func,
  id: proptypes.string
};
