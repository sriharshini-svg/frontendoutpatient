import { Component ,OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../../services/auth.service';
@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [],
  providers: [AuthService],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})
export class HomepageComponent {

  constructor(private activatedRoute: ActivatedRoute,private _router : Router) { }

  ngOnInit(): void 
  {
  
  }
  navigateToDoc(){
  this._router.navigate(['/doc-register'])
  }
  navigateToUserRegister(){
    this._router.navigate(['/register']);
  }
  navigate()
  {
    this._router.navigate(['/login']);
  }
}
