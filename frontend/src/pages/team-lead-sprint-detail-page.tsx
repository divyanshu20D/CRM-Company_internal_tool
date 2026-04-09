import { useParams } from "react-router-dom";

import { getSprintDetail } from "@/components/sprint/sprint-detail-data";
import { SprintDetailView } from "@/components/sprint/sprint-detail-view";

export function TeamLeadSprintDetailPage() {
  const { projectId, sprintId } = useParams();
  const sprint = getSprintDetail(projectId, sprintId);

  return <SprintDetailView sprint={sprint} roleLabel="Team lead" />;
}
