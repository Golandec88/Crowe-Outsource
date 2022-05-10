import useItemsLoader from "@hooks/items-uploader";
import { getProjects } from "@modules/project/creators";
import useLocalStorage from "@hooks/local-storage";
import ProjectsTable from "@components/tables/projects/manager";

export default function ProjectsPage() {
  const id = useLocalStorage("ABV_CRM.id").item;
  const params = { role: "manager", id };
  const [{ items: projects }] = useItemsLoader(
    "project", "projects", "projects",
    getProjects, params
  );

  return <>
    <ProjectsTable items={projects} />
  </>;
}
