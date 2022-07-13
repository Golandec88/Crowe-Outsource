import useItemsLoader from "@hooks/items-uploader";
import useLocalStorage from "@hooks/local-storage.ts";
import {
  createProject as submit,
  getProjects,
} from "@modules/project/creators.ts";
import { setMessage } from "@modules/global/creators.ts";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";

import Title from "@components/title";
import Projects from "@components/projects";

export default function ProjectsPage() {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const id = useLocalStorage("ABV_CRM.id").item;
  const params = { role: "manager", id };
  const [{ items: projects, loading }, update] = useItemsLoader(
    "project",
    "projects",
    "projects",
    getProjects,
    params
  );

  function createProject(projectName) {
    submit(projectName, id, () => {
      setMessage({ type: "info", text: t("created") });
      update();
    });
  }

  return (
    <>
      <Title text={t("projects")} />
      <Projects
        items={projects}
        onAddProject={createProject}
        role="manager"
        loading={loading}
      />
    </>
  );
}
