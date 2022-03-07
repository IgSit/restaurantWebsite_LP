import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../../services/auth.service";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  modelForm !: FormGroup
  formErrors : Map<string, string>;
  validationMessages : Map<string, Map<string, string>>;
  error : string = ''
  showError : boolean = false

  constructor(private authService : AuthService, private formBuilder : FormBuilder) {
    this.formErrors = new Map([
      ['email', ''],
      ['nick', ''],
      ['password', ''],
    ]);
    this.validationMessages = new Map([
      ['nick', new Map([['required', 'nick is required']])],
      ['email', new Map([['required', 'email is required'], ['email', 'Incorrect mail syntax']])],
      ['password', new Map([['required', 'password is required']])]
    ]);
  }

  ngOnInit(): void {
    this.modelForm = this.formBuilder.group({
      email: ["", [Validators.required, Validators.email]],
      nick: ["", Validators.required],
      password: ["", Validators.required],
    })
  }

  onSubmit(form : FormGroup) : void {
    if (form.valid) {
      this.authService.signUp(form.value.nick, form.value.email, form.value.password)
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
