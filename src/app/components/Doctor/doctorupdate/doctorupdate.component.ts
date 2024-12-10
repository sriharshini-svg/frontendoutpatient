import { Component } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from "../../footer/footer.component";
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder,AbstractControl,FormGroup,FormControl,Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-doctorupdate',
  standalone: true,
  imports: [HeaderComponent, FooterComponent,ReactiveFormsModule,CommonModule],
  templateUrl: './doctorupdate.component.html',
  styleUrl: './doctorupdate.component.css'
})
export class DoctorupdateComponent {
form: FormGroup=new FormGroup({
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
 userdata: any;
constructor(private formBuilder: FormBuilder,private activatedRoute: ActivatedRoute,private _router : Router,private authservice:AuthService) { 
  this.userdata=localStorage.getItem("session");
    // console.log(this.userdata);
    this.userdata=JSON.parse(this.userdata);
}
ngOnInit(): void {
  this.form = this.formBuilder.group(
    {
      fullname: [this.userdata.doctorName || '', Validators.required],
      username:[this.userdata.doctorName || '',Validators.required],
      email:[ this.userdata.email || '',Validators.required],
      password: [this.userdata.password || 
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(40),
        ],
      ],
      specialization:[this.userdata.speciality || '',Validators.required],
      experience:[ '10',Validators.required],
      place:[this.userdata.location || '',Validators.required],
      gender:['male',Validators.required],
    }
    
  );
}
get f(): { [key: string]: AbstractControl } {
  return this.form.controls;
}
onSubmit(){

  this.submitted = true;
  console.log(this.form.invalid);
  // console.log( this.form.value);
  if (this.form.invalid) {
    return;
  }
 
  const { fullname,username,email,password,specialization,experience,place} = this.form.value;
  
  this.authservice.docUpdate(fullname,username,email,password,specialization,experience,place,this.userdata.doctorId).subscribe(data=>{
    console.log("response :",data.body);
    console.log("status code:",data.status);
    if(data.status == 200 || data.status == 201){
       this.authservice.getDoctorInfo(this.userdata.doctorId).subscribe(data =>{
        console.log(data);
        localStorage.removeItem("session");
        localStorage.setItem('session',JSON.stringify(data.body));
      
      },(error)=>{console.log(error);})

     
      alert('Profile updated Successfull');
      // this._router.navigate(['/login']);
     window.location.href= '/doctor';
    } else{
      alert("Something went wrong");
    };
  }, (error:any)=>{
    console.log(error);
    alert("Something went wrong");
  })
}
}
