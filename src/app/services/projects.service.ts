import { Injectable } from '@angular/core';
import { Project } from '../projects/project'

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {
  projectsList: Project[];
  constructor() {
  this.projectsList = [
    new Project('Event Listings website', 
    'Lists upcoming events for a Calgary-based community group Habitat Studio Social. \
    Static front end hosted in S3 via Cloudfront. Backend created with serverless technologies. \
    Saves aprox. $300/year in operational costs compared to the previous wordpress website.', 
    'http://studiosocial.robertalbus.com', 
    'http://github.com/RobertAlbus/studio-social', 
    ['Angular 7', 'AWS', 'Lambda functions', 'NODE.js', 'API Gateway', 'DynamoDB', 'S3', 'AJAX', 'HTTPS']),
    new Project('Personal website', 
    'This portfolio site. Static Angular front end hosted in S3. Cloudfront used to facilitate proper HTML5 routing for SPAs', 
    'http://robertalbus.com', 
    'http://github.com/RobertAlbus/portfolio', 
    ['Angular 7', 'HTML5', 'AWS: Cloudfront, S3, Certificate Manager']),
    new Project('To-Do application', 
    'A basic to-do application. Uses local storage for persistence across sessions. ', 
    'http://todo.robertalbus.com',
    'http://github.com/RobertAlbus/to-do',
    ['Angular 7','HTML & CSS', 'AWS: Cloudfront, S3']),
    new Project('Event Bus', 
    'Exploring pub-sub relationship with Mediator pattern.', 
    '',
    'http://github.com/RobertAlbus/event_bus',
    ['Ruby']),
    new Project('Conway\'s Game of Life', 
    '0-player cellular automata. This was my first non-trivial application. \
    It has simple CLI output, but it\'s been partially muddled by Ruby\'s \
    implicit return. Moving forward I would fix that, and use a functional approach to DRY up \
    the code used for traversing the matrix of cells. ', 
    '',
    'http://github.com/RobertAlbus/gol_rb',
    ['Ruby'])
    ]
  }
  getProjects(): Project[] {
    return this.projectsList;
  }
}
