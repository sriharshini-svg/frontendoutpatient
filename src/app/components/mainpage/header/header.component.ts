import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

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
