import { Request, Response } from 'express';
import { ProjectModel } from '../models/project';
import { CreateProjectSchema, UpdateProjectSchema } from '../types/project';

export class ProjectController {
  static async getAll(req: Request, res: Response) {
    try {
      const projects = await ProjectModel.getAll();
      res.json(projects);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch projects' });
    }
  }

  static async getById(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ error: 'Invalid project ID' });
      }

      const project = await ProjectModel.getById(id);
      if (!project) {
        return res.status(404).json({ error: 'Project not found' });
      }

      res.json(project);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch project' });
    }
  }

  static async create(req: Request, res: Response) {
    try {
      const validation = CreateProjectSchema.safeParse(req.body);
      if (!validation.success) {
        return res.status(400).json({ error: 'Invalid data', details: validation.error.flatten() });
      }

      const project = await ProjectModel.create(validation.data);
      res.status(201).json(project);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create project' });
    }
  }

  static async update(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ error: 'Invalid project ID' });
      }

      const validation = UpdateProjectSchema.safeParse(req.body);
      if (!validation.success) {
        return res.status(400).json({ error: 'Invalid data', details: validation.error.flatten() });
      }

      const project = await ProjectModel.update(id, validation.data);
      if (!project) {
        return res.status(404).json({ error: 'Project not found' });
      }

      res.json(project);
    } catch (error) {
      res.status(500).json({ error: 'Failed to update project' });
    }
  }

  static async delete(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ error: 'Invalid project ID' });
      }

      const deleted = await ProjectModel.delete(id);
      if (!deleted) {
        return res.status(404).json({ error: 'Project not found' });
      }

      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete project' });
    }
  }
} 