import { z } from 'zod';

export const ProjectType = z.enum(['commercial', 'residential']);

export const CreateProjectSchema = z.object({
  name: z.string().min(1).max(255),
  type: ProjectType,
  client: z.string().min(1).max(255),
  start_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  end_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional()
});

export const UpdateProjectSchema = CreateProjectSchema.partial();

export type Project = {
  id: number;
  name: string;
  type: 'commercial' | 'residential';
  client: string;
  start_date: string;
  end_date: string | null;
  created_at: string;
  updated_at: string;
};

export type CreateProjectDTO = z.infer<typeof CreateProjectSchema>;
export type UpdateProjectDTO = z.infer<typeof UpdateProjectSchema>; 