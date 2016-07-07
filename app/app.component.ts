    import { Component } from '@angular/core';
    import { RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from '@angular/router-deprecated';
    import { DashboardComponent }     from './dashboard.component';
    import { ProjectsComponent }      from './projects.component';
    import { ProjectDetailComponent } from './project-detail.component';
    import { ProjectService }         from './project.service';
    @Component({
      selector: 'my-app',
      template: `
        <h1>{{title}}</h1>
        <nav>
          <a [routerLink]="['Dashboard']">Dashboard</a>
          <a [routerLink]="['Projects']">Projects</a>
        </nav>
        <router-outlet></router-outlet>
      `,
      styleUrls: ['app/app.component.css'],
      directives: [ROUTER_DIRECTIVES],
      providers: [
        ROUTER_PROVIDERS,
        ProjectService,
      ]
    })
    @RouteConfig([
      { path: '/dashboard',  name: 'Dashboard',  component: DashboardComponent, useAsDefault: true },
      { path: '/detail/:id', name: 'ProjectDetail', component: ProjectDetailComponent },
      { path: '/projects',     name: 'Projects',     component: ProjectsComponent }
    ])
    export class AppComponent {
      title = 'Top Projects';
    }