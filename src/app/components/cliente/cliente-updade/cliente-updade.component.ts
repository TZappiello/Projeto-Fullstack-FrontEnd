import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Cliente } from 'src/app/models/cliente';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-cliente-updade',
  templateUrl: './cliente-updade.component.html',
  styleUrls: ['./cliente-updade.component.css']
})
export class ClienteUpdadeComponent implements OnInit {

  cliente: Cliente = {
    id:'',
    nome: '',
    cpf: '',
    email:'',
    senha:'',
    perfis:[],
    dataCriacao:''
  }

  nome: FormControl = new FormControl(null, Validators.minLength(3));
  cpf: FormControl = new FormControl(null, Validators.required);
  email: FormControl = new FormControl(null, Validators.email);
  senha: FormControl = new FormControl(null, Validators.minLength(3));

  constructor(
    private service: ClienteService,
    private toast: ToastrService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.cliente.id = this.route.snapshot.paramMap.get('id');
    this.findById();
  }

  findById(): void{
    this.service.findById(this.cliente.id).subscribe(resposta =>{
      resposta.perfis = [];
      this.cliente = resposta;
    })
  }
  
  update(){
    this.service.update(this.cliente).subscribe(() =>{
      this.toast.success('Cliente atualizado com sucesso', 'Atualização');
      this.router.navigate(['clientes']);
    }, ex =>{
      console.log(ex)
      if(ex.error.erros){
        ex.error.erros.forEach(element => {
          this.toast.error(element.message);
        });
      } else {
        this.toast.error(ex.error.message);
      }
    }) 
  }

  addPerfil(perfil: any):void {
    
    if(this.cliente.perfis.includes(perfil)){
      this.cliente.perfis.splice(this.cliente.perfis.indexOf(perfil), 1);
    } else {
      this.cliente.perfis.push(perfil);
    }
  }
  
  validaCampos(): boolean{
    return this.nome.valid && this.cpf.valid 
        && this.email.valid && this.senha.valid;
  }
}