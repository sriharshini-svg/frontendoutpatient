import { Component } from '@angular/core';
import { HeaderComponent } from "../../admin/header/header.component";
import { ActivatedRoute,Router } from '@angular/router';
import { AuthService } from '../../../../services/auth.service';
import { FooterComponent } from '../../footer/footer.component';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-totaldoctors',
  standalone: true,
  imports: [HeaderComponent,FooterComponent,CommonModule],
  templateUrl: './totaldoctors.component.html',
  styleUrl: './totaldoctors.component.css'
})
export class TotaldoctorsComponent {
  public doctorList:any=[];
  constructor(private activatedRoute: ActivatedRoute,private _router : Router,private authService: AuthService) {
   this.doctorData();
    
  };
  doctorData(){
    this.authService.getDoctorsList().subscribe(data =>{
      console.log(data);
       this.doctorList=data.body;
    
    },(error)=>{console.log(error);})
  }
  deleteDoctor(doctorId:any){
    let userConform= confirm("Do you want to delete this doctor?");
    if(userConform){
      this.authService.deleteDoctor(doctorId).subscribe(data =>{
        console.log(data);
        this.doctorData();
        alert("Doctor deleted successfully");
      },(error:any)=>{
        console.log(error);
        alert("Failed to delete doctor");
      })
    }
    else{
      console.log("User clicked cancel");
    };
  }
}
