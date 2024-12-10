import { Component } from '@angular/core';
import { HeaderComponent } from "../../admin/header/header.component";
import { FooterComponent } from "../../footer/footer.component";
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../../services/auth.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-totalbookings',
  standalone: true,
  imports: [HeaderComponent, FooterComponent,CommonModule],
  templateUrl: './totalbookings.component.html',
  styleUrl: './totalbookings.component.css'
})
export class TotalbookingsComponent {
  public bookingsList:any=[];
  public userList:any=[];
  public doctorList:any=[];
  constructor(private activatedRoute: ActivatedRoute,private _router : Router,private authService: AuthService) {
    this.bookingdata();
   
    this.authService.getDoctorsList().subscribe(data =>{
      console.log(data);
       this.doctorList=data.body;
    
    },(error)=>{console.log(error);}) 

    this.authService.getUserList().subscribe(data =>{
      console.log(data);
       this.userList=data.body;
    
    },(error)=>{console.log(error);})
  };
  getPatient(id: any): string | undefined {
    const user = this.userList.find((user: any) => user.userId === id);
    if (user) {
      return user.fullName ? user.fullName : user.userName;
    }
    return undefined;
  }
  bookingdata(){
    this.authService.getBookingList().subscribe(data =>{
      console.log(data);
       this.bookingsList=data.body;
    
    },(error)=>{console.log(error);});
  }
  getDoctor(id: any): string | undefined{
 const user = this.doctorList.find((user: any) => user.doctorId === id);
 if (user) {
   return user.doctorName;
 }
 return undefined;
  };
  deleteAppointment(appointmentID:any){
    let userConform= confirm("Do you want to delete this appointment?");
    if(userConform){
      this.authService.deleteAppointment(appointmentID).subscribe(data =>{
        console.log(data);
        this.bookingdata();
        alert("Appointment deleted successfully");
      },(error:any)=>{
        console.log(error);
        alert("Failed to delete appointment");
      })
    }
    else{
      console.log("User clicked cancel");
    };
  }
}
