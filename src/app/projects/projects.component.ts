import { Component, OnInit, Inject } from '@angular/core';
import { Project } from './project'
import { ProjectsService } from '../services/projects.service'

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {

  projectsList: Project[];
  constructor(@Inject(ProjectsService) service){
    this.projectsList = service.getProjects();
  }

  ngOnInit() {
  }

}
