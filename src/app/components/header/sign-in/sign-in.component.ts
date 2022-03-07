import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  modelForm !: FormGroup
  formErrors : Map<string, string>;
  validationMessages : Map<string, Map<string, string>>;
  error : string = ''
  showError : boolean = false

  constructor(private authService : AuthService, private formBuilder : FormBuilder, private router : Router) {
    this.formErrors = new Map([
      ['email', ''],
      ['password', '']
    ]);
    this.validationMessages = new Map([
      ['email', new Map([['required', 'email is required']])],
      ['password', new Map([['required', 'password is required']])]
    ]);
  }

  ngOnInit(): void {
    this.modelForm = this.formBuilder.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", Validators.required],
    })
  }

  onSubmit(form : FormGroup) : void {
    if (form.valid) {
      this.authService.signIn(form.value.email, form.value.password)
      this.modelForm.reset()
      this.formErrors.forEach((_:string, key:string) => {this.formErrors.set(key, '')})
      this.showError = false
    }
    else this.checkValidity('ignore-dirty')
  }

  checkValidity(mode:string) {
    const form = this.modelForm;
    for (let [key, ] of this.formErrors) {
      this.formErrors.set(key, '');
      let control = form.get(key);
      const modeControl = mode =='check-dirty' ? control?.dirty : true;

      if (control && modeControl && !control.valid) {
        const validationMessages = this.validationMessages.get(key);
        for (const key1 in control.errors) {
          this.formErrors.set(key, validationMessages?.get(key1) + ' ')
        }
      }
    }
  }

}
