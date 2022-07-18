import Title from "@components/title";
import Projects from "@components/projects";
import { useTranslation } from "react-i18next";
import useLocalStorage from "@hooks/local-storage";
import useItemsLoader from "@hooks/items-uploader";
import { getProjects } from "@modules/project/creators";
import React from "react";
import { projectType } from "@store/types";

const OperatorProjects: React.FC = () => {
  const { t } = useTranslation();
  const id = useLocalStorage("ABV_CRM.id").item;
  const params = { role: "operator", id } as { role: string; id: string };
  const [{ items: projects, loading }] = useItemsLoader<
    projectType[],
    { role: string; id: string }
  >("project", "projects", "projects", getProjects, params);

  return (
    <>
      <Title text={t("projects")} />
      <Projects items={projects} role="operator" loading={loading} />
    </>
  );
};

export default OperatorProjects;
