import { Component } from '@angular/core';
import { HeaderComponent } from "../../user/header/header.component";
import { FooterComponent } from "../../footer/footer.component";
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../../services/auth.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-mybookings',
  standalone: true,
  imports: [HeaderComponent, FooterComponent,CommonModule],
  templateUrl: './mybookings.component.html',
  styleUrl: './mybookings.component.css'
})

export class MybookingsComponent {
  public userID:any;
  public bookingsList:any=[];
  public doctorList:any=[];
 constructor(private activatedRoute: ActivatedRoute,private _router : Router,private authservice: AuthService){
  if(this.activatedRoute.snapshot.paramMap.get('id')){
    this.userID=this.activatedRoute.snapshot.paramMap.get('id');
    console.log(this.userID);
  }
  this.authservice.getBookingList().subscribe(data =>{
    console.log(data);
    data.body.forEach((e:any)=>{
        if(e.patient == this.userID){
          this.bookingsList.push(e);
        }
    });
     
  console.log(this.bookingsList);
  },(error)=>{console.log(error);});
  this.authservice.getDoctorsList().subscribe(data =>{
    console.log(data);
     this.doctorList=data.body;
  
  },(error)=>{console.log(error);}) 
 }

 getDoctor(id: any): string | undefined{
  const user = this.doctorList.find((user: any) => user.doctorId === id);
  if (user) {
   return user.doctorName;
  }
 return undefined;
   }
   getDoctorFee(id: any): string | undefined{
    const user = this.doctorList.find((user: any) => user.doctorId === id);
    if (user) {
     return user.chargedPerVisit;
    }
   return undefined;
     }
     book_appointment(){
      this._router.navigate(['/doctorslist']);
     }
}
