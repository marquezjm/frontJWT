import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NuevoUsuario } from '../models/nuevo-usuario';
import { AuthService } from '../service/auth.service';
import { TokenService } from '../service/token.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {


  nuevoUsuario: NuevoUsuario
  nombreUsuario: string
  nombre:string
  email:string
  password:string
  errorMsj:string

  constructor(private tokenService:TokenService,private authService:AuthService,private router:Router,private toastr:ToastrService) { }

  ngOnInit() {
    
  }

  onRegister(){
    this.nuevoUsuario=new NuevoUsuario(this.nombre,this.nombreUsuario,this.email,this.password)
    this.authService.nuevo(this.nuevoUsuario).subscribe(data=>{

      this.toastr.success('Cuenta Creada','OK',{
        timeOut:3000,positionClass: 'toast-top-center'
      })

      this.router.navigate(['/login'])
    },err=>{
      this.errorMsj=err.error.mensaje
      console.log(err)
      this.toastr.error(this.errorMsj,'Fail',{
        timeOut:3000,positionClass: 'toast-top-center'
      })

    })
  }

}
