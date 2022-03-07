import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Rate} from "../dish-review/rate";
import {User} from "../../users/user";

@Component({
  selector: 'app-add-dish-review',
  templateUrl: './add-dish-review.component.html',
  styleUrls: ['./add-dish-review.component.css']
})
export class AddDishReviewComponent implements OnInit {
  modelForm !: FormGroup;
  formErrors : Map<string, string>;
  validationMessages : Map<string, Map<string, string>>;
  @Input() user !: User
  @Output() addReviewEmitter : EventEmitter<Rate> = new EventEmitter<Rate>()

  constructor(private formBuilder : FormBuilder) {
    this.formErrors = new Map([
      ['name', ''],
      ['body', ''],
      ['date', ''],
    ]);
    this.validationMessages = new Map([
      ['name', new Map([['required', 'topic is required']])],
      ['body', new Map([['required', 'review body is required'], ['minlength', 'minimum length is 50'],
                              ['maxlength', 'maxlength is 500']])],
      ['date', new Map([])],
    ]);
  }

  ngOnInit(): void {
    this.modelForm = this.formBuilder.group({
      name: ["", Validators.required],
      body: ["", [Validators.required, Validators.minLength(50), Validators.maxLength(500)]],
      date: [""]
    })
  }

  onSubmit(form: FormGroup) {
    const newRate: Rate = {
      name: form.value.name,
      nick: this.user.nick,
      body: form.value.body,
      date: form.value.date,
    }
    if (form.valid) {
      this.addReviewEmitter.emit(newRate)
      this.modelForm.reset()
      this.formErrors.forEach((_:string, key:string) => {this.formErrors.set(key, '')})
    }
    else {
      this.checkValidity('ignore-dirty');
    }
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
