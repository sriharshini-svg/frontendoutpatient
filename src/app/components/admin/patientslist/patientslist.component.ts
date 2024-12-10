import { Component } from '@angular/core';
import { HeaderComponent } from "../../admin/header/header.component";
import { FooterComponent } from "../../footer/footer.component";
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../../services/auth.service';

@Component({
  selector: 'app-patientslist',
  standalone: true,
  imports: [HeaderComponent, FooterComponent,CommonModule],
  templateUrl: './patientslist.component.html',
  styleUrl: './patientslist.component.css'
})
export class PatientslistComponent {
  public userList:any=[];
  public patientList:any=[];
  constructor(private activatedRoute: ActivatedRoute,private _router : Router,private authService: AuthService) {
    this.authService.getUserList().subscribe(data =>{
      console.log(data);
       this.userList=data.body;
    
    },(error)=>{console.log(error);})
  };
  deleteUser(id:any){
    let userConform= confirm("Do you want to delete this user");
    if(userConform){
      this.authService.deleteUser(id).subscribe(data =>{
        console.log(data);
        this.getUserdata();
        alert("User deleted successfully");
      },(error:any)=>{
        console.log(error);
        alert("Failed to delete user");
      })
    }
    else{
      console.log("User clicked cancel");
    };
     
  };
  getUserdata(){
    this.authService.getUserList().subscribe(data =>{
      console.log(data);
       this.userList=data.body;
    
    },(error)=>{console.log(error);})
  };
}
