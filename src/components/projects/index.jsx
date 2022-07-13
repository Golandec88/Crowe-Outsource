import proptypes from "prop-types";
import { projectType } from "@types/project";
import {
  getProjectClients,
  getProjectOperators,
} from "@modules/project/creators";
import s from "./style.module.scss";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";

import ClientsModal from "@components/modals/clients";
import OperatorsModal from "@components/modals/operators";
import CloseIcon from "@mui/icons-material/Close";
import ProjectCard from "@components/cards/project";

import IconButton from "@mui/material/IconButton";
import {
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  Dialog,
} from "@mui/material";

export default function Projects({ items, onAddProject, role, loading }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [selected, setSelected] = useState();
  const [clientsModal, setClientsModal] = useState(false);
  const [operatorsModal, setOperatorsModal] = useState(false);
  const [addProjectModal, setAddProjectModal] = useState(false);
  const [projectName, setProjectName] = useState(null);
  const operators = useSelector(({ project }) => project.operators);
  const operatorsLoading = useSelector(
    ({ global }) => global.loadingFields.operators
  );
  const clients = useSelector(({ project }) => project.clients);
  const clientsLoading = useSelector(
    ({ global }) => global.loadingFields.clients
  );

  function onChange(type, id) {
    setSelected(id);
    if (type === "clients") {
      if (role === "manager") getProjectClients(id);
      setClientsModal(true);
    }
    if (type === "operators" && role === "manager") {
      getProjectOperators(id);
      setOperatorsModal(true);
    }
  }
  function close() {
    setAddProjectModal(false);
    setProjectName(null);
  }

  return (
    <>
      <div className={s.container}>
        {items?.length ? (
          items.map(({ name, id }, index) => (
            <ProjectCard
              key={`#project-card-${index}`}
              onChange={onChange}
              name={name}
              role={role}
              id={id}
              loading={loading}
            />
          ))
        ) : (
          <>{t("empty")}...</>
        )}
      </div>
      {onAddProject && (
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
      )}
      <ClientsModal
        model={clientsModal}
        close={() => setClientsModal(false)}
        clients={
          role === "manager"
            ? clients
            : selected
            ? items.find((item) => item.id === selected).requests
            : []
        }
        loading={clientsLoading}
        id={selected}
        disableAdd={role === "operator"}
      />
      <OperatorsModal
        model={operatorsModal}
        close={() => setOperatorsModal(false)}
        operators={operators}
        loading={operatorsLoading}
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
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            placeholder={t("name")}
            onChange={(event) => setProjectName(event.target.value)}
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
    </>
  );
}

Projects.propTypes = {
  items: proptypes.arrayOf(projectType()),
  onAddProject: proptypes.oneOfType([proptypes.func, null]),
  role: proptypes.oneOf(["manager", "operator"]),
  loading: proptypes.bool,
};

Projects.defaultProps = {
  items: [],
};
