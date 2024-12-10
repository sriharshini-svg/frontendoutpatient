import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../../services/auth.service';
import { HeaderComponent } from "../../admin/header/header.component";
import { FooterComponent } from '../../footer/footer.component';
@Component({
  selector: 'app-admindashboard',
  standalone: true,
  imports: [HeaderComponent,FooterComponent],
  templateUrl: './admindashboard.component.html',
  styleUrl: './admindashboard.component.css',
})
export class AdmindashboardComponent {
  public userList:any=[];
  public doctorList:any=[];
  public userdata:any=[];
  public bookingList:any=[];
  constructor(private activatedRoute: ActivatedRoute,private _router : Router,private authService: AuthService){
    this.userdata=localStorage.getItem("session");
    // console.log(this.userdata);
    this.userdata=JSON.parse(this.userdata) 
    this.authService.getDoctorsList().subscribe(data =>{
      console.log(data);
       this.doctorList=data.body;
    
    },(error)=>{console.log(error);}) 

    this.authService.getUserList().subscribe(data =>{
      console.log(data);
      data.body.forEach((e:any)=>{
        if(e.role == 'user'){
          this.userList.push(e);
        };
      });
    
    },(error)=>{console.log(error);})
    this.authService.getBookingList().subscribe(data =>{
      console.log(data);
       this.bookingList=data.body;
    
    },(error)=>{console.log(error);})
  };
    doctorsList(){
      this._router.navigate(['/totaldoctors']);
    }
    patientslist(){
      this._router.navigate(['/patientslist']);
    }
    bookingsList(){
      this._router.navigate(['/totalbookings']);
    }
   }