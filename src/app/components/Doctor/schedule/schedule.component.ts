import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from '../../footer/footer.component';
import { AuthService } from '../../../../services/auth.service';
import { ActivatedRoute, Route } from '@angular/router';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-schedule',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, HeaderComponent,FooterComponent],
  providers:[DatePipe],
  templateUrl: './schedule.component.html',
  styleUrl: './schedule.component.css'
})
export class ScheduleComponent {
  public todayDate:any ;
  form: FormGroup = new FormGroup({
    doctorId: new FormControl(''),
    fromDate: new FormControl(''),
    endDate: new FormControl(''),
  });
  submitted = false;
  userdata:any;

  constructor(private formBuilder: FormBuilder, private authservice: AuthService, private activatedroute: ActivatedRoute,private datePipe : DatePipe) {
    this.todayDate=this.datePipe.transform(new Date(), 'yyyy-MM-dd');
    this.userdata=localStorage.getItem("session");
    // console.log(this.userdata);
    this.userdata=JSON.parse(this.userdata);
  } 
  ngOnInit(): void {
    this.form = this.formBuilder.group(
      {
        doctorId:[this.userdata.doctorId || '',Validators.required],
        fromDate:['',Validators.required],
        endDate:['',Validators.required],
      }
    );
  }

  get f(): { [key: string]: AbstractControl } {
    console.log(this.form.controls);
    return this.form.controls;
  }
  onSubmit(){
    this.submitted = true;
    console.log(this.form.invalid);
    console.log( this.form.value);
    if (this.form.invalid) {
      return;
    }
   
    const { fromDate,endDate} = this.form.value;
    
    this.authservice.docShedule(this.userdata.doctorId,fromDate,endDate).subscribe(data=>{
      console.log("response :",data.body);
      console.log("status code:",data.status);
      if(data.status == 200 || data.status == 201){
        alert('Dates updated Successfull');
        // this.router.navigate(['/login']);
       window.location.href= '/doctor';
      } else{
        alert("Something went wrong");
      };
    }, (error:any)=>{
      console.log(error);
      alert("Something went wrong");
    })
  }
  };

