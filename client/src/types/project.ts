export interface Project {
  id: number;
  name: string;
  type: 'commercial' | 'residential';
  client: string;
  start_date: string;
  end_date: string | null;
  created_at: string;
  updated_at: string;
}

export interface CreateProjectDTO {
  name: string;
  type: 'commercial' | 'residential';
  client: string;
  start_date: string;
  end_date?: string;
}

export type UpdateProjectDTO = Partial<CreateProjectDTO>; 