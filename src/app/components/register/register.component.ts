import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  form: FormGroup = new FormGroup({
    userfullname:new FormControl(''),
    username: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    contact: new FormControl(''),
    gender: new FormControl(''),
  });
  submitted = false;
  constructor(private formBuilder: FormBuilder,private authservice:AuthService, private _router : Router) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group(
      {
        userfullname:['', Validators.required],
        username: ['', Validators.required],
        email:['',Validators.required,
                Validators.pattern(/^[a-zA-Z0-9._%+-]@(gmail|yahoo)\.com$/),
                Validators.email,
        ], 
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(40),
            Validators.pattern(/^(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=\D*\d).{8,}$/),
          ],
        ],
        contact:['',Validators.required],
        gender:['',Validators.required],
      }
    );
  }

  get f(): { [key: string]: AbstractControl } {
    // console.log(this.form.controls);
    return this.form.controls;
  }

  onSubmit(){
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }
    console.log(JSON.stringify(this.form.value, null, 2));
    const { userfullname,username,email,password,contact,gender } = this.form.value;
    this.authservice.userregister(userfullname,username,email,password,contact,gender).subscribe(data=>{
      console.log("response :",data.body);
      console.log("status code:",data.status);
      if(data.status == 200){
        alert('Registration Successfull');
        this._router.navigate(['/login']);
      } else{
        alert("User Already exist ");
      }
    }, (error)=>{
      console.log(error);
      alert("User Already exist ");
    })
  };
}
