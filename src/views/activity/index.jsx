import useItemsUploader from "@hooks/items-uploader";
import { getOperatorActivities } from "@modules/user/creators";
import useLocalStorage from "@hooks/local-storage";
import ActivityTable from "@components/tables/activity";
import { getClassifications } from "@modules/request/creators";

export default function Activity() {
  const id = useLocalStorage("ABV_CRM.id").item;
  const activitiesParams = ["user", "activities", "activities", getOperatorActivities, id];
  const classificationParams = ["request", "classifications", "classifications", getClassifications];
  const [{ items: activities, loading: activitiesLoading }] = useItemsUploader(...activitiesParams);
  const [{ items: classifications, loading: classificationsLoading }] = useItemsUploader(...classificationParams);

  return <>
    <ActivityTable
      items={activities}
      loading={activitiesLoading || classificationsLoading}
      classifications={classifications}
    />
  </>;
}
