import {
  Component,
  OnInit,
  Inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators } from '@angular/forms'

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  form: FormGroup;

  constructor(@Inject(FormBuilder) fb: FormBuilder) {
    this.form = fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      message: ['', Validators.required]
    })
  }
  ngOnInit() {
  }
  onSubmit(form){
    console.log(form)
  } //fill out

}
