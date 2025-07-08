import { SectionContainer } from "../components/UI"
import { HeaderTask, KanbanSection } from "../sections/tasks"


export function Tasks() {

  return (
    <SectionContainer>
      <HeaderTask />
      <KanbanSection />
    </SectionContainer>
  )
}