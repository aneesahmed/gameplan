import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { RouteParams } from '@angular/router-deprecated';

import { Project }        from './project';
import { ProjectService } from './project.service';

@Component({
  selector: 'my-project-detail',
  templateUrl: 'app/project-detail.component.html',
  styleUrls: ['app/project-detail.component.css']
})
export class ProjectDetailComponent implements OnInit {
  @Input() project: Project;
  @Output() close = new EventEmitter();
  error: any;
  navigated = false; // true if navigated here

  constructor(
    private projectService: ProjectService,
    private routeParams: RouteParams) {
  }

  ngOnInit() {
    if (this.routeParams.get('id') !== null) {
      let id = +this.routeParams.get('id');
      this.navigated = true;
      this.projectService.getProject(id)
          .then(project => this.project = project);
    } else {
      this.navigated = false;
      this.project = new Project();
    }
  }
  save() {
    this.projectService
        .save(this.project)
        .then(project => {
          this.project = project; // saved project, w/ id if new
          this.goBack(project);
        })
        .catch(error => this.error = error); // TODO: Display error message
  }
  goBack(savedProject: Project = null) {
    this.close.emit(savedProject);
    if (this.navigated) { window.history.back(); }
  }
}

