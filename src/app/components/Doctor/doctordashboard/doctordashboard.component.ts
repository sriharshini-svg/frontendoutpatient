import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../../services/auth.service';
import { HeaderComponent } from "../../Doctor/header/header.component";
import { FooterComponent } from "../../footer/footer.component";
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-doctordashboard',
  standalone: true,
  imports: [HeaderComponent, FooterComponent,CommonModule],
  templateUrl: './doctordashboard.component.html',
  styleUrl: './doctordashboard.component.css'
})
export class DoctordashboardComponent {
  public bookingList:any=[];
  public userdata:any=[];
  constructor(private activatedRoute: ActivatedRoute,private authService: AuthService, private _router: Router) {

    this.userdata=localStorage.getItem("session");
    // console.log(this.userdata);
    this.userdata=JSON.parse(this.userdata);
    this.authService.getBookingList().subscribe(data =>{
      console.log(data);
      data.body.forEach((e:any)=>{
        if(e.doctor==this.userdata.doctorId){
          this.bookingList.push(data.body);
        }
      });
       
    
    },(error)=>{console.log(error);})
  };
    appointments(){
      this._router.navigate(['/appointments']);
    };
    doctorupdate(){
      this._router.navigate(['/doctorupdate']);
    };
    
}
