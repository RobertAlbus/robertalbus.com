import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { AboutComponent } from './about/about.component';
import { ProjectsComponent } from './projects/projects.component';
import { ContactComponent } from './contact/contact.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NavComponent } from './header/nav/nav.component'

const routes: Routes = [
  { path: '', component: AboutComponent },
  { path: 'about', redirectTo: '' },
  { path: 'projects', component: ProjectsComponent },
  { path: 'contact', component: ContactComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AboutComponent,
    ProjectsComponent,
    ContactComponent,
    NavComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
