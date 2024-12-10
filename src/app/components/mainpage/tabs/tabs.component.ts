import { Component } from '@angular/core';
import { RouterLink,Router } from '@angular/router';
@Component({
  selector: 'app-tabs',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './tabs.component.html',
  styleUrl: './tabs.component.css'
})
export class TabsComponent {
  constructor(private _router : Router){

  }
  navigate(routerpath: string){
    window.location.href=routerpath;
  }
}
