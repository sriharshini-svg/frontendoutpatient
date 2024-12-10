import { Component } from '@angular/core';
// import { NgModule } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { TabsComponent } from '../tabs/tabs.component';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../../services/auth.service';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, CommonModule, ReactiveFormsModule, TabsComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  public userdata: any = [];
  public data = '';
  form: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });
  submitted = false;
  constructor(private formBuilder: FormBuilder, private activatedRoute: ActivatedRoute, private _router: Router, private authservice: AuthService) { }
  ngOnInit(): void {
    // console.log(this.data);
    this.form = this.formBuilder.group(
      {
        username: ['', Validators.required],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(40),
          ],
        ],
      }
    );
  }
  navigate() {
    this._router.navigate(['/doctordashboard']);
  }
  get f(): { [key: string]: AbstractControl } {
    // console.log(this.form.controls);
    return this.form.controls;
  }

  onSubmit() {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    // console.log(JSON.stringify(this.form.value, null, 2));
    const { username, password } = this.form.value;
    this.authservice.login(username, password).subscribe(data => {
      console.log(data);
      console.log("response :", data.body);
      console.log("status :", data.status);
      localStorage.setItem('session', JSON.stringify(data.body));
      if (data.body.role == "user") {
        this._router.navigate(['/userdashboard']);
      } else if (data.body.role == "doctor") {
        this._router.navigate(['/doctor']);
      }
      else if (data.body.role == "admin") {
        this._router.navigate(['/admindashboard']);
      }

    }, (error: any) => {
      console.log(error);
      alert('Invalid credentials');
    })
  }
}