export interface TaskData {
  id: number;
  name: string;
  effort: number;
  complexity: number;
  dependencies: number[];
  skills_required: Record<string, number>;
  priority: string;
}

export interface TaskCardData {
  id: string | number;
  title: string;
  description: string;
  task?: TaskData;
} 