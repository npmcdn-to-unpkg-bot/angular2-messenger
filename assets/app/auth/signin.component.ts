import {Component, OnInit} from "angular2/core";
import {FormBuilder, ControlGroup, Validators, Control} from "angular2/common";
import {User} from "./user";
import {AuthService} from "./auth.service";
import {Router} from "angular2/router";
import {ErrorService} from '../errors/error.service';

@Component({
  selector: 'my-signin',
  template: `
    <section class="col-md-8 col-md-offset-2">
        <form [ngFormModel]="myForm" (ngSubmit)="onSubmit()">
            <div class="form-group">
                <label for="email">Mail</label>
                <input [ngFormControl]="myForm.find('email')" type="email" id="email" class="form-control">
            </div>
            <div class="form-group">
                <label for="password">Password</label>
                <input [ngFormControl]="myForm.find('password')" type="password" id="password" class="form-control">
            </div>
            <button type="submit" class="btn btn-primary" [disabled]="!myForm.valid">Sign In</button>
        </form>
    </section>
  `
})
export class SigninComponent {
  myForm: ControlGroup;

  constructor(private _fb: FormBuilder, private _authService: AuthService, private _router: Router, private _errorService: ErrorService) {}

  onSubmit() {
      const user = new User(this.myForm.value.email, this.myForm.value.password);
      this._authService.signin(user)
        .subscribe(
          data => {
            localStorage.setItem('token', data.obj);
            localStorage.setItem('userId', data.userId);
            this._router.navigateByUrl('/')
          },
          error => this._errorService.handleError(error)
        );
  }

  ngOnInit() {
      this.myForm = this._fb.group({
          email: ['', Validators.compose([
              Validators.required,
              this.isEmail
          ])],
          password: ['', Validators.required]
      });
  }

  private isEmail(control: Control): {[s: String]: Boolean} {
    if (!control.value.match("^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$")) {
        return {invalidMail: true};
    }
  }
}
