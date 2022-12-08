import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginUsuario } from '../models/login-usuario';
import { AuthService } from '../service/auth.service';
import { TokenService } from '../service/token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  isLogged=false
  isLoginFail=false
  loginUsuario: LoginUsuario
  nombreUsuario: string
  password:string
  roles:string[]=[]
  errorMsj:string

  constructor(private tokenService:TokenService,private authService:AuthService,private router:Router) { }

  ngOnInit() {
    if(this.tokenService.getToken()){
      this.isLogged=true
      this.isLoginFail=false
      this.roles= this.tokenService.getAuthorities()
    }
  }

  onLogin(){
    this.loginUsuario=new LoginUsuario(this.nombreUsuario,this.password)
    this.authService.login(this.loginUsuario).subscribe(data=>{
      this.isLogged=true
      this.isLoginFail=false

      this.tokenService.setToken(data.token)
      this.tokenService.setUserName(data.nombreUsuario)
      this.tokenService.setAuthorities(data.authorities)
      this.roles=data.authorities
      this.router.navigate(['/'])
    },err=>{
      this.isLogged=false
      this.isLoginFail=true
      this.errorMsj=err.error.message
      console.log(err.error.message)
      
    })
  }

}
