import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { Project } from 'src/app/services/contentRepositories/models';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss'],
})
export class ProjectComponent implements OnInit {

  @Input() project: Project;
  constructor() { }

  ngOnInit(): void {
  }

}
