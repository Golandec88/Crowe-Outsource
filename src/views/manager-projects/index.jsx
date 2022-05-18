import useItemsLoader from "@hooks/items-uploader.js";
import { createProject as submit, getProjects } from "@modules/project/creators.js";
import useLocalStorage from "@hooks/local-storage.js";
import Projects from "@components/projects";
import { useTranslation } from "react-i18next";
import Title from "@components/title";
import { setMessage } from "@modules/global/creators.js";
import { useDispatch } from "react-redux";

export default function ProjectsPage() {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const id = useLocalStorage("ABV_CRM.id").item;
  const params = { role: "manager", id };
  const [{ items: projects, loading }, update] = useItemsLoader(
    "project", "projects", "projects",
    getProjects, params
  );

  function createProject(projectName) {
    submit(dispatch, projectName, id, () => {
      setMessage(dispatch, { type: "info", text: t("created") });
      update();
    });
  }

  return <>
    <Title text={t("projects")}/>
    <Projects
      items={projects}
      onAddProject={createProject}
      role="manager"
      loading={loading}
    />
  </>;
}
