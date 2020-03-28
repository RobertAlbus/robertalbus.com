import { Injectable } from '@angular/core';
import { registerMarkdownExtensionRules } from './markdownExtensionRules'

@Injectable({
  providedIn: 'root'
})
export class MarkdownService {

  constructor() {
    registerMarkdownExtensionRules()
  }
}
