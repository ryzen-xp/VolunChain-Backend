import { Request, Response } from 'express';
import ProjectService from '../services/ProjectService';

class ProjectController {
  private projectService = new ProjectService();

  async createProject(req: Request, res: Response): Promise<void> {
    try {
      const { name, description, location, startDate, endDate, organizationId } = req.body;
      const project = await this.projectService.createProject(
        name,
        description,
        location,
        new Date(startDate),
        new Date(endDate),
        organizationId
      );
      res.status(201).json(project);
    } catch (error) {
      res.status(400).json({ error: error instanceof Error ? error.message : 'An unknown error occurred' });
    }
  }

  async getProjectById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const project = await this.projectService.getProjectById(id);
      if (!project) {
        res.status(404).json({ error: 'Project not found' });
        return;
      }
      res.status(200).json(project);
    } catch (error) {
      res.status(400).json({ error: error instanceof Error ? error.message : 'An unknown error occurred' });
    }
  }

  async getProjectsByOrganizationId(req: Request, res: Response): Promise<void> {
    try {
      const { organizationId } = req.params;
      const projects = await this.projectService.getProjectsByOrganizationId(organizationId);
      res.status(200).json(projects);
    } catch (error) {
      res.status(400).json({ error: error instanceof Error ? error.message : 'An unknown error occurred' });
    }
  }
}

export default ProjectController;
