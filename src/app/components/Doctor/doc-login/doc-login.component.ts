import { Component } from '@angular/core';
import { TabsComponent } from "../../mainpage/tabs/tabs.component";
import { RouterLink } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../../services/auth.service';
@Component({
  selector: 'app-doc-login',
  standalone: true,
  imports: [RouterLink,CommonModule,ReactiveFormsModule,TabsComponent],
  templateUrl: './doc-login.component.html',
  styleUrl: './doc-login.component.css'
})
export class DocLoginComponent {
  public userdata:any=[];
  public data='';
  form1: FormGroup = new FormGroup({
    username1: new FormControl(''),
    password1: new FormControl(''),
  });
  submitted = false;
  constructor(private formBuilder: FormBuilder,private activatedRoute: ActivatedRoute,private _router : Router,private authservice:AuthService) {}
  ngOnInit(): void {
    // console.log(this.data);
    this.form1 = this.formBuilder.group(
      {
        username1: ['', Validators.required],
        password1: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(40),
          ],
        ],
      }
    );
  }
  navigate(){
      this._router.navigate(['/doctordashboard']);
  }
  get f(): { [key: string]: AbstractControl } {
    // console.log(this.form.controls);
    return this.form1.controls;
  }

  onSubmit(){
    this.submitted = true;
    
    if (this.form1.invalid) {
      return;
    }

    // console.log(JSON.stringify(this.form.value, null, 2));
    const { username1, password1 } = this.form1.value;
    this.authservice.doclogin(username1, password1).subscribe(data =>{
     console.log(data);
     console.log("response :",data.body);
     console.log("status :",data.status);
     localStorage.setItem('session',JSON.stringify(data.body));
        
          this._router.navigate(['/doctor']);
        
        
    },(error: any) => {
      console.log(error);
      alert('Invalid credentials');
    })
  }
}
