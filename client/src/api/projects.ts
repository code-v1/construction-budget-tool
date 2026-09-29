import axios from 'axios';
import { Project, CreateProjectDTO, UpdateProjectDTO } from '../types/project';

const API_BASE = '/api';

export const projectsApi = {
  getAll: async (): Promise<Project[]> => {
    const { data } = await axios.get(`${API_BASE}/projects`);
    return data;
  },

  getById: async (id: number): Promise<Project> => {
    const { data } = await axios.get(`${API_BASE}/projects/${id}`);
    return data;
  },

  create: async (project: CreateProjectDTO): Promise<Project> => {
    const { data } = await axios.post(`${API_BASE}/projects`, project);
    return data;
  },

  update: async (id: number, project: UpdateProjectDTO): Promise<Project> => {
    const { data } = await axios.put(`${API_BASE}/projects/${id}`, project);
    return data;
  },

  delete: async (id: number): Promise<void> => {
    await axios.delete(`${API_BASE}/projects/${id}`);
  },
}; 