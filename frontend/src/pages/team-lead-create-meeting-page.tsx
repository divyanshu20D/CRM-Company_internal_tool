import { startTransition } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import { tlProjects } from "@/components/team-lead/tl-data";
import { SectionHeading, StackedNoteCard } from "@/components/workspace/workspace-ui";
import { Button } from "@/components/ui/button";
import { Field, FieldContent, FieldDescription, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const selectClasses =
  "flex h-8 w-full rounded-lg border border-border bg-background px-3 text-sm outline-none transition-colors focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50";

export function TeamLeadCreateMeetingPage() {
  const navigate = useNavigate();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    startTransition(() => {
      toast.success("Team Lead meeting setup is ready for backend and Google Meet wiring.");
      navigate("/team-lead/meetings");
    });
  };

  return (
    <div className="grid gap-4 xl:grid-cols-[minmax(0,1.45fr)_360px]">
      <section className="rounded-md border border-border/80 bg-card/95 p-4 shadow-sm sm:p-5">
        <SectionHeading
          title="Schedule meeting"
          description="Create an internal project meeting for developers, PM, QA, and the delivery group on the selected project."
        />

        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
          <FieldGroup className="grid gap-5 lg:grid-cols-2">
            <Field>
              <FieldLabel htmlFor="meeting-project">Project</FieldLabel>
              <FieldContent>
                <select id="meeting-project" className={selectClasses} defaultValue={tlProjects[0].id}>
                  {tlProjects.map((project) => (
                    <option key={project.id} value={project.id}>
                      {project.name}
                    </option>
                  ))}
                </select>
              </FieldContent>
            </Field>

            <Field>
              <FieldLabel htmlFor="meeting-type">Meeting type</FieldLabel>
              <FieldContent>
                <select id="meeting-type" className={selectClasses} defaultValue="blocker-sync">
                  <option value="standup">Standup</option>
                  <option value="blocker-sync">Blocker sync</option>
                  <option value="qa-handoff">QA handoff</option>
                  <option value="technical-review">Technical review</option>
                </select>
              </FieldContent>
            </Field>
          </FieldGroup>

          <FieldGroup className="grid gap-5 lg:grid-cols-2">
            <Field>
              <FieldLabel htmlFor="meeting-title">Meeting title</FieldLabel>
              <FieldContent>
                <Input id="meeting-title" placeholder="Northstar blocker sync" />
              </FieldContent>
            </Field>

            <Field>
              <FieldLabel htmlFor="meeting-date">Meeting date</FieldLabel>
              <FieldContent>
                <Input id="meeting-date" type="date" />
              </FieldContent>
            </Field>
          </FieldGroup>

          <FieldGroup className="grid gap-5 lg:grid-cols-3">
            <Field>
              <FieldLabel htmlFor="meeting-time">Time</FieldLabel>
              <FieldContent>
                <Input id="meeting-time" type="time" />
              </FieldContent>
            </Field>

            <Field>
              <FieldLabel htmlFor="meeting-mode">Meeting mode</FieldLabel>
              <FieldContent>
                <select id="meeting-mode" className={selectClasses} defaultValue="google-meet">
                  <option value="google-meet">Google Meet</option>
                  <option value="in-office">In office</option>
                  <option value="hybrid">Hybrid</option>
                </select>
              </FieldContent>
            </Field>

            <Field>
              <FieldLabel htmlFor="meeting-duration">Duration</FieldLabel>
              <FieldContent>
                <select id="meeting-duration" className={selectClasses} defaultValue="30">
                  <option value="15">15 minutes</option>
                  <option value="30">30 minutes</option>
                  <option value="45">45 minutes</option>
                  <option value="60">60 minutes</option>
                </select>
              </FieldContent>
            </Field>
          </FieldGroup>

          <Field>
            <FieldLabel htmlFor="meeting-attendees">Attendees</FieldLabel>
            <FieldContent>
              <Textarea
                id="meeting-attendees"
                rows={4}
                placeholder="Project Manager, Tech Lead, Developer names, QA owner"
              />
              <FieldDescription>
                Team Lead meetings should stay scoped to the assigned project team and delivery stakeholders.
              </FieldDescription>
            </FieldContent>
          </Field>

          <Field>
            <FieldLabel htmlFor="meeting-agenda">Agenda</FieldLabel>
            <FieldContent>
              <Textarea
                id="meeting-agenda"
                rows={5}
                placeholder="List blockers, build decisions, QA handoff context, and what must close from this meeting."
              />
            </FieldContent>
          </Field>

          <div className="flex flex-wrap gap-3 pt-2">
            <Button type="submit">Schedule Meeting</Button>
            <Button type="button" variant="outline" onClick={() => navigate("/team-lead/meetings")}>
              Cancel
            </Button>
          </div>
        </form>
      </section>

      <aside className="flex min-w-0 flex-col gap-4">
        <StackedNoteCard
          title="What this should automate"
          description="The Team Lead meeting flow is meant to become an operational shortcut, not just a form."
          items={[
            { copy: "Create the meeting under the selected project with scoped internal attendees." },
            { copy: "Generate a Google Meet link when the mode is set to Google Meet." },
            { copy: "Attach the meeting back to the project timeline, discussion flow, and notifications." },
          ]}
        />
      </aside>
    </div>
  );
}
