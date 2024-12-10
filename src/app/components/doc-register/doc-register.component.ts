import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
@Component({
  selector: 'app-doctor-registration',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './doc-register.component.html',
  styleUrl: './doc-register.component.css'
})
export class DoctorRegistrationComponent {
  form: FormGroup = new FormGroup({
    fullname: new FormControl(''),
    username:new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    specialization:new FormControl(''),
    experience:new FormControl(''),
    place: new FormControl(''),
    gender: new FormControl(''),
  });
  submitted = false;
  constructor(private formBuilder: FormBuilder,private activatedRoute: ActivatedRoute,private _router : Router,private authservice:AuthService) { }
  ngOnInit(): void {
    this.form = this.formBuilder.group(
      {
        fullname: ['', Validators.required],
        username:['',Validators.required],
        email:['',Validators.required],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(40),
          ],
        ],
        specialization:['',Validators.required],
        experience:['',Validators.required],
        place:['',Validators.required],
        gender:['',Validators.required],
      }
      
    );
  }
  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }
  onSubmit(){
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }
    console.log(JSON.stringify(this.form.value, null, 2));
    const { fullname,username,email,password,specialization,experience,place} = this.form.value;
    this.authservice.docregister(fullname,username,email,password,specialization,experience,place).subscribe(data=>{
      console.log("response :",data.body);
      console.log("status code:",data.status);
      if(data.status == 200 || data.status == 201){
        alert('Doctor Registration Successfull');
        this._router.navigate(['/login']);
      } else{
        alert("Doctor Already exist ");
      }
    }, (error)=>{
      console.log(error);
      alert("Doctor Already exist ");
    })
  }
}
