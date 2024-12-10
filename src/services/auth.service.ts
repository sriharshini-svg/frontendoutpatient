
import { Injectable } from '@angular/core';
import { HttpClient,HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient,private _router : Router) { }
  private usersUrl:string ='http://localhost:8001/';
  getUsers(): Observable<any> {
    return this.http.get<any>(this.usersUrl);
  }
  login(username: string, password: string): Observable<HttpResponse<any>> {
    var inputpayload={userName:username,password:password};
    return this.http.post(this.usersUrl+"login",inputpayload,{observe:'response'});
  }
  doclogin(username: string, password: string): Observable<HttpResponse<any>> {
    var inputpayload={email:username,password:password};
    return this.http.post(this.usersUrl+"doctorlogin",inputpayload,{observe:'response'});
  }
  userregister(userfullname:string,username:string,email:string,password:string,contact:string,gender:string):Observable<HttpResponse<any>> {
    var inputpayload={userName:username,role:"user",password:password,email:email,contact:contact,gender:gender,fullName:userfullname,};
    return this.http.post(this.usersUrl+"registeruser",inputpayload,{observe:'response'});
    
  }
  userUpdate(userfullname:string,username:string,email:string,contact:string,gender:string,userId:string,password:string):Observable<HttpResponse<any>> {
    var inputpayload={userName:username,email:email,contact:contact,gender:gender,fullName:userfullname,userId:userId,password:password,role:"user"};
    return this.http.put(this.usersUrl+"user/"+userId,inputpayload,{observe:'response'});
    
  }
  adminUpdate(userfullname:string,username:string,email:string,contact:string,gender:string,userId:string,password:string):Observable<HttpResponse<any>> {
    var inputpayload={userName:username,email:email,contact:contact,gender:gender,fullName:userfullname,userId:userId,password:password,role:"admin"};
    return this.http.put(this.usersUrl+"user/"+userId,inputpayload,{observe:'response'});
    
  }
  logout() {
    const confirmation = window.confirm('Are you sure you want to logout?');
    if (confirmation) {
      localStorage.removeItem('session');
      this._router.navigateByUrl('homepage');
    }else{
      
    }
  }
  isLoggedIn(): boolean {
    return !!localStorage.getItem('session');
  }
  getDoctorsList():Observable<HttpResponse<any>>{
    return this.http.get(this.usersUrl+"doctor",{observe:'response'});
  }
  getAvailDatesList():Observable<HttpResponse<any>>{
    return this.http.get(this.usersUrl+"availdates",{observe:'response'});
  }
  getUserList():Observable<HttpResponse<any>>{
    return this.http.get(this.usersUrl+"user",{observe:'response'});
  }
  getBookingList():Observable<HttpResponse<any>>{
    return this.http.get(this.usersUrl+"appointment",{observe:'response'});
  };
  getDoctorInfo(id:string):Observable<HttpResponse<any>>{
    return this.http.get(this.usersUrl+"doctor/"+id,{observe:'response'});
  };
  getUserdata(id:string):Observable<HttpResponse<any>>{
    return this.http.get(this.usersUrl+"user/"+id,{observe:'response'});
  };
  deleteUser(id:string):Observable<HttpResponse<any>>{
    return this.http.delete(this.usersUrl+"user/"+id,{observe:'response'});
  }deleteAppointment(id:string):Observable<HttpResponse<any>>{
    return this.http.delete(this.usersUrl+"appointment/"+id,{observe:'response'});
  }
  deleteDoctor(id:string):Observable<HttpResponse<any>>{
    return this.http.delete(this.usersUrl+"doctor/"+id,{observe:'response'});
  }
  doctorslist(){
    var doctorList:any=[];
    return this.http.get<any[]>(this.usersUrl).pipe(
      map(users => {
         users.forEach(user => {
            if(user.role == "doctor"){
              doctorList.push(user);
            }
         });
        //  console.log(users);
         return doctorList;
       
      })
    )
  }
  patientslist(){
    var doctorList:any=[];
    return this.http.get<any[]>(this.usersUrl).pipe(
      map(users => {
         users.forEach(user => {
            if(user.role == "patient"){
              doctorList.push(user);
            }
         });
        //  console.log(users);
         return doctorList;
       
      })
    )
  }
  getPatientsList(){
    var doctorList:any=[];
    return this.http.get<any[]>(this.usersUrl).pipe(
      map(users => {
         users.forEach(user => {
            if(user.role == "patient"){
              doctorList.push(user);
            }
         });
        //  console.log(users);
         return doctorList;
      })
    )
  }
  
  docregister(fulname:string,username:string,email:string,password:string,specialization:string,experience:string,place:string):Observable<HttpResponse<any>> {
    var inputpayload={doctorName:fulname,speciality:specialization,location:place,hospitalName:'Test Hospital',mobileNo:'999999999',email:email,password:password,chargedPerVisit:'500'};
    
    return this.http.post(this.usersUrl+"registerdoctor",inputpayload,{observe:'response'});
  }
  docUpdate(fulname:string,username:string,email:string,password:string,specialization:string,experience:string,place:string,doctorId:string):Observable<HttpResponse<any>> {
    var inputpayload={doctorName:fulname,speciality:specialization,location:place,hospitalName:'Test Hospital',mobileNo:'999999999',email:email,password:password,chargedPerVisit:'500',doctorId:doctorId};
    
    return this.http.put(this.usersUrl+"doctor",inputpayload,{observe:'response'});
  }
  docShedule(doctorId:string,fromDate:string,endDate:string):Observable<HttpResponse<any>> {
    var inputpayload={"doctor": {
        "doctorId":doctorId},fromDate:fromDate,endDate:endDate};
    
    return this.http.put(this.usersUrl+"availdates",inputpayload,{observe:'response'});
  }
  bookSlots(Date:string,status:string,Problem:string,doctorID:any,userId:string):Observable<HttpResponse<any>> {
    var inputpayload={patient:userId,doctor:parseInt(doctorID),appointmentDate:Date,appointmentStatus:status,remark:Problem};
    
    return this.http.post(this.usersUrl+"newappointment",inputpayload,{observe:'response'});
  }
  
}