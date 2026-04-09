import { useParams } from "react-router-dom";

import { getPmProject } from "@/components/project-manager/pm-data";
import { getSprintDetail } from "@/components/sprint/sprint-detail-data";
import { SprintDetailView } from "@/components/sprint/sprint-detail-view";

export function ProjectManagerSprintDetailPage() {
  const { projectId, sprintId } = useParams();
  const project = getPmProject(projectId);
  const sprint = getSprintDetail(projectId, sprintId);

  return (
    <SprintDetailView
      sprint={{
        ...sprint,
        projectName: project.name,
        projectLabel: project.client,
      }}
      roleLabel="Project manager"
    />
  );
}
