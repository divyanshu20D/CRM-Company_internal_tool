export type SprintPlannedIssue = {
  id: string;
  title: string;
  assignee: string;
  status: string;
};

export type SprintActivityEntry = {
  author: string;
  role: string;
  time: string;
  note: string;
};

export type SprintDetailRecord = {
  id: string;
  projectId: string;
  projectName: string;
  projectLabel: string;
  parentItem: string;
  parentItemType: string;
  title: string;
  summary: string;
  description: string;
  status: string;
  owner: string;
  reporter: string;
  sprintType: string;
  priority: string;
  sprintLabel: string;
  tagLabel: string;
  dueDate: string;
  estimatedTime: string;
  loggedTime: string;
  timeTrackingHint: string;
  createdBy: string;
  createdAt: string;
  modifiedBy: string;
  modifiedAt: string;
  plannedIssues: SprintPlannedIssue[];
  checklist: string[];
  activity: SprintActivityEntry[];
};
