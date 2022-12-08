import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginUsuario } from '../models/login-usuario';
import { AuthService } from '../service/auth.service';
import { TokenService } from '../service/token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginUsuario: LoginUsuario
  nombreUsuario: string
  password:string
  errorMsj:string

  constructor(private tokenService:TokenService,private authService:AuthService,private router:Router,private toastr: ToastrService) { }

  ngOnInit() {
    
  }

  onLogin(){
    this.loginUsuario=new LoginUsuario(this.nombreUsuario,this.password)
    this.authService.login(this.loginUsuario).subscribe(data=>{
      this.tokenService.setToken(data.token)
      this.router.navigate(['/'])
    },err=>{
      this.errorMsj=err.error.message
      console.log(err.error.message)
      this.toastr.error(this.errorMsj, 'Fail', {
        timeOut: 3000,  positionClass: 'toast-top-center',
      });

    })
  }

}
