import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  title: string[] = ['hello@', 'Robert Albus', '.com']
  links = {github: 'http://github.com/RobertAlbus', twitter: 'http://twitter.com/albusrobert'}
  constructor() { }

  ngOnInit() {
  }

}
