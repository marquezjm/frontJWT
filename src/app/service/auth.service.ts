import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { JwtDTO } from '../models/jwt-dto';
import { LoginUsuario } from '../models/login-usuario';
import { NuevoUsuario } from '../models/nuevo-usuario';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authURL=environment.authURL

  constructor(private httpClient: HttpClient) { }

  public nuevo(nuevoUsuario: NuevoUsuario){
    return this.httpClient.post(`${this.authURL}nuevo`,nuevoUsuario)
  }

  public login(loginUsuario: LoginUsuario){
    return this.httpClient.post<JwtDTO>(`${this.authURL}login`,loginUsuario)
  }
}
