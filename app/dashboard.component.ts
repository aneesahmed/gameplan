import { Component, OnInit } from '@angular/core';
import { Router }           from '@angular/router-deprecated';

import { Project }        from './project';
import { ProjectService } from './project.service';

@Component({
  selector: 'my-dashboard',
  templateUrl: 'app/dashboard.component.html',
  styleUrls: ['app/dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  projects: Project[] = [];

  constructor(
    private router: Router,
    private projectService: ProjectService) {
  }

  ngOnInit() {
    this.projectService.getProjects()
      .then(projects => this.projects = projects.slice(1, 5));
  }

  gotoDetail(project: Project) {
    let link = ['ProjectDetail', { id: project.id }];
    this.router.navigate(link);
  }
}
