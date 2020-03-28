import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProjectRepository } from '../services/contentRepositories/project.repository';
import { Project } from '../services/contentRepositories/models';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit, OnDestroy {

  projectsList: Project[];
  subscriptions: Subscription[] = [];
  constructor(public projectRepository: ProjectRepository){

    let subscription = projectRepository.items.subscribe(projectsList => {
      this.projectsList = projectsList;
    });

    this.subscriptions.push(subscription);
  }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => {
      subscription.unsubscribe();
    });
  }
}
