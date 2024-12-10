import { Component } from '@angular/core';
import { HeaderComponent } from "../../user/header/header.component";
import { FooterComponent } from '../../footer/footer.component';
import { ActivatedRoute,Router } from '@angular/router';
import { AuthService } from '../../../../services/auth.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-availdates',
  standalone: true,
  imports: [HeaderComponent,FooterComponent,CommonModule],
  templateUrl: './availdates.component.html',
  styleUrl: './availdates.component.css'
})
export class AvaildatesComponent {
  public userdata:any=[];
  public doctorList:any=[];
  constructor(private activatedRoute: ActivatedRoute,private _router : Router,private authService: AuthService) {
    this.userdata=localStorage.getItem("session");
    // console.log(this.userdata);
    this.userdata=JSON.parse(this.userdata) 
    
    this.authService.getAvailDatesList().subscribe(data =>{
      console.log(data);
       this.doctorList=data.body;
    
    })
  };
}
