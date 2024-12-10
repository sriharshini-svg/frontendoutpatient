import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../../services/auth.service';
import { HeaderComponent } from '../header/header.component';
import { CommonModule } from '@angular/common';
import { FooterComponent } from '../../footer/footer.component';

@Component({
  selector: 'app-doctorslist',
  standalone: true,
  imports: [HeaderComponent,CommonModule,FooterComponent],
  templateUrl: './doctorslist.component.html',
  styleUrl: './doctorslist.component.css'
})
export class DoctorslistComponent {
  public userdata:any=[];
  public doctorList:any=[];
  constructor(private activatedRoute: ActivatedRoute,private _router : Router,private authService: AuthService) {
    this.userdata=localStorage.getItem("session");
    // console.log(this.userdata);
    this.userdata=JSON.parse(this.userdata) 
    
    this.authService.getDoctorsList().subscribe(data =>{
      console.log(data);
       this.doctorList=data.body;
    
    })
  };
  appointment(id:any){
    //this. imagesModal = true;
    this._router.navigate(['/create-appointment', id]);
  }
}
