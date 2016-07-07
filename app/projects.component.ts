import { Component, OnInit } from '@angular/core';
import { Router }            from '@angular/router-deprecated';

import { Project }                from './project';
import { ProjectService }         from './project.service';
import { ProjectDetailComponent } from './project-detail.component';

@Component({
  selector: 'my-projects',
  templateUrl: 'app/projects.component.html',
  styleUrls:  ['app/projects.component.css'],
  directives: [ProjectDetailComponent]
})
export class ProjectsComponent implements OnInit {
  projects: Project[];
  selectedProject: Project;
  addingProject = false;
  error: any;

  constructor(
    private router: Router,
    private projectService: ProjectService) { }

  getProjects() {
    this.projectService
        .getProjects()
        .then(projects => this.projects = projects)
        .catch(error => this.error = error); // TODO: Display error message
  }

  addProject() {
    this.addingProject = true;
    this.selectedProject = null;
  }

  close(savedProject: Project) {
    this.addingProject = false;
    if (savedProject) { this.getProjects(); }
  }

  delete(project: Project, event: any) {
    event.stopPropagation();
    this.projectService
        .delete(project)
        .then(res => {
          this.projects = this.projects.filter(h => h !== project);
          if (this.selectedProject === project) { this.selectedProject = null; }
        })
        .catch(error => this.error = error); // TODO: Display error message
  }

  ngOnInit() {
    this.getProjects();
  }

  onSelect(project: Project) {
    this.selectedProject = project;
    this.addingProject = false;
  }

  gotoDetail() {
    this.router.navigate(['ProjectDetail', { id: this.selectedProject.id }]);
  }
}
