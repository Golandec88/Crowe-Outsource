import { useTranslation } from "react-i18next";
import { Box, Tooltip, Typography, Skeleton } from "@mui/material";
import s from "@components/projects/style.module.scss";
import Card from "@components/cards/cards";
import IconButton from "@mui/material/IconButton";
import { Hail, SupervisorAccount } from "@mui/icons-material";
import proptypes from "prop-types";

export default function ProjectCard({ name, id, onChange, role, loading }) {
  const { t } = useTranslation();

  return <>
    <Box className={s.box}>
      {loading ? <>
        <Typography variant="h2">
          <Skeleton/>
        </Typography>
      </> : <Card>
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
            {role === "manager" && <>
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
            </>}
          </div>
        </div>
      </Card>}
    </Box>
  </>;
}

ProjectCard.propTypes = {
  name: proptypes.string,
  onChange: proptypes.func,
  id: proptypes.string,
  role: proptypes.oneOf(["manager", "operator"]),
  loading: proptypes.bool
};
