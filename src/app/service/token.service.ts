import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

const TOKEN_KEY = 'AuthToken'

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  roles:Array<string> = []

  constructor(private router:Router) { }

  public setToken(token:string){
    window.localStorage.removeItem(TOKEN_KEY)
    window.localStorage.setItem(TOKEN_KEY,token)
  }

  public getToken(){
    return localStorage.getItem(TOKEN_KEY)
  }

  public isLogged(){
    if(this.getToken()){
      return true
    }
    return false
  }

  public getUserName(){
    if(!this.isLogged()){
      return null
    }
    const token = this.getToken()
    const payload = token.split('.')[1]
    const payloadDecoded = atob(payload)
    const values = JSON.parse(payloadDecoded)
    const userName = values.sub
    return userName
  }

  public isAdmin(){
    if(!this.isLogged()){
      return false
    }
    const token = this.getToken()
    const payload = token.split('.')[1]
    const payloadDecoded = atob(payload)
    const values = JSON.parse(payloadDecoded)
    const roles = values.roles
    if(roles.indexOf('ROLE_ADMIN')<0){
      return false
    }
    return true
  }
  


  public logOut(){
    window.localStorage.clear()
    this.router.navigate(['/'])
  }
}
