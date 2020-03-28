import { Component } from '@angular/core';
import { MarkdownService } from './services/markdown/markdown.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'portfolio-site';

  constructor(markdownService: MarkdownService){

  }
}
