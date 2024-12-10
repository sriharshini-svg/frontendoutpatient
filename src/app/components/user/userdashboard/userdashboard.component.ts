import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../../services/auth.service';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../../footer/footer.component';
@Component({
  selector: 'app-userdashboard',
  standalone: true,
  imports: [HeaderComponent,FooterComponent],
  templateUrl: './userdashboard.component.html',
  styleUrl: './userdashboard.component.css'
})
export class UserdashboardComponent {
  public userdata:any=[];
  constructor(private activatedRoute: ActivatedRoute,private _router : Router,private authService: AuthService) {
    this.userdata=localStorage.getItem("session");
    // console.log(this.userdata);
    this.userdata=JSON.parse(this.userdata) }
  doclist(){
    this._router.navigate(['/doctorslist']);
  }
  myappointment(userid:any){
    this._router.navigate(['/mybookings',userid]);
  }
  availdate(){
    this._router.navigate(['/availdates']);
  };
}