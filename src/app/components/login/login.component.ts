import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Credenciais } from 'src/app/models/credenciais';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  credenciais: Credenciais = {
    email: '',
    senha: ''
  }

  email = new FormControl(null, Validators.email);
  senha = new FormControl(null, Validators.minLength(3));

  constructor(private toast: ToastrService) { }

  ngOnInit(): void {
  }

  logar(){
    this.toast.error('Usuário e/ou senha inválidos!', 'Login');
    this.credenciais.email = '';
    this.credenciais.senha = '';
  }

  validarCampos():boolean{
    if(this.email.valid && this.senha.valid){
      return true;
    }
    return false;
  }

}
