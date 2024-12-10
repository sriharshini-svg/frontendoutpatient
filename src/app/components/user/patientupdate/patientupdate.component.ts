import { Component } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from '../../footer/footer.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../../../services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-patientupdate',
  standalone: true,
  imports: [HeaderComponent,FooterComponent,ReactiveFormsModule, CommonModule],
  templateUrl: './patientupdate.component.html',
  styleUrl: './patientupdate.component.css'
})
export class PatientupdateComponent {
  userdata: any;
  form: FormGroup = new FormGroup({
    patientId: new FormControl(''),
    password: new FormControl(''),
    email: new FormControl(''),
    patientName: new FormControl(''),
    mobileNo: new FormControl(''),
    gender: new FormControl(''),
    });
    submitted = false;
    constructor(private formBuilder: FormBuilder, private authservice: AuthService,private _router : Router) {
      this.userdata=localStorage.getItem("session");
    // console.log(this.userdata);
    this.userdata=JSON.parse(this.userdata) 
    } 

    ngOnInit(): void {
      this.form = this.formBuilder.group(
        {
          patientId: [this.userdata.userName  || '', Validators.required],
          email:[this.userdata.email  || '',Validators.required],
          password:[this.userdata.password  || '',Validators.required],
          patientName:[this.userdata.fullName  || '',Validators.required],
          mobileNo:[this.userdata.contact  || '',Validators.required],
          gender:[this.userdata.gender  || '',Validators.required],
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
      const { patientId,patientName,email,mobileNo,gender,password } = this.form.value;
    this.authservice.userUpdate(patientName,patientId,email,mobileNo,gender,this.userdata.userId,password).subscribe(data=>{
      console.log("response :",data.body);
      console.log("status code:",data.status);
      if(data.status == 200 || data.status == 201){
        this.authservice.getUserdata(this.userdata.userId).subscribe(data =>{
          console.log(data);
          localStorage.removeItem("session");
          localStorage.setItem('session',JSON.stringify(data.body));
        
        },(error)=>{console.log(error);}) 
        alert('User updated Successfull');
        // this._router.navigate(['/userdashboard']);
         window.location.href= '/userdashboard';
      } else{
        alert("Something went wrong");
      }
    }, (error:any)=>{
      console.log(error);
      alert("Something went wrong");
    })
    };
      
}
