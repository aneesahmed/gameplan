import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Project } from './project';

@Injectable()
export class ProjectService {

  private projectsUrl = 'app/projects';  // URL to web api

  constructor(private http: Http) { }

  getProjects(): Promise<Project[]> {
    return this.http.get(this.projectsUrl)
               .toPromise()
               .then(response => response.json().data)
               .catch(this.handleError);
  }

  getProject(id: number) {
    return this.getProjects()
               .then(projects => projects.filter(project => project.id === id)[0]);
  }

  save(project: Project): Promise<Project>  {
    if (project.id) {
      return this.put(project);
    }
    return this.post(project);
  }

  delete(project: Project) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    let url = `${this.projectsUrl}/${project.id}`;

    return this.http
               .delete(url, headers)
               .toPromise()
               .catch(this.handleError);
  }

  // Add new 
  private post(project: Project): Promise<Project> {
    let headers = new Headers({
      'Content-Type': 'application/json'});

    return this.http
               .post(this.projectsUrl, JSON.stringify(project), {headers: headers})
               .toPromise()
               .then(res => res.json().data)
               .catch(this.handleError);
  }

  // Update existing 
  private put(project: Project) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    let url = `${this.projectsUrl}/${project.id}`;

    return this.http
               .put(url, JSON.stringify(project), {headers: headers})
               .toPromise()
               .then(() => project)
               .catch(this.handleError);
  }

  private handleError(error: any) {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}