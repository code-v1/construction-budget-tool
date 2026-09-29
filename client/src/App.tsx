import React, { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { ProjectList } from './components/ProjectList';
import { ProjectForm } from './components/ProjectForm';
import { projectsApi } from './api/projects';
import { Project, CreateProjectDTO } from './types/project';

function App() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const queryClient = useQueryClient();

  const createMutation = useMutation(projectsApi.create, {
    onSuccess: () => {
      queryClient.invalidateQueries('projects');
      handleCloseForm();
    },
  });

  const updateMutation = useMutation(
    (data: { id: number; project: CreateProjectDTO }) => 
      projectsApi.update(data.id, data.project),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('projects');
        handleCloseForm();
      },
    }
  );

  const handleSubmit = async (data: CreateProjectDTO) => {
    if (editingProject) {
      await updateMutation.mutateAsync({ id: editingProject.id, project: data });
    } else {
      await createMutation.mutateAsync(data);
    }
  };

  const handleEdit = (project: Project) => {
    setEditingProject(project);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingProject(null);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-900">
              Construction Budget Tool
            </h1>
            <button
              onClick={() => setIsFormOpen(true)}
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              New Project
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {isFormOpen ? (
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">
              {editingProject ? 'Edit Project' : 'Create New Project'}
            </h2>
            <ProjectForm
              project={editingProject}
              onSubmit={handleSubmit}
              onCancel={handleCloseForm}
            />
          </div>
        ) : (
          <div>
            <h2 className="text-xl font-semibold mb-4">Projects</h2>
            <ProjectList onEdit={handleEdit} />
          </div>
        )}
      </main>
    </div>
  );
}

export default App; 