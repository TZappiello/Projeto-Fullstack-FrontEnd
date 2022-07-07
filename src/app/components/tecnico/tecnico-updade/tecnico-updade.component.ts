import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Tecnico } from 'src/app/models/tecnico';
import { TecnicoService } from 'src/app/services/tecnico.service';

@Component({
  selector: 'app-tecnico-updade',
  templateUrl: './tecnico-updade.component.html',
  styleUrls: ['./tecnico-updade.component.css']
})
export class TecnicoUpdadeComponent implements OnInit {

  tecnico: Tecnico = {
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
    private service: TecnicoService,
    private toast: ToastrService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.tecnico.id = this.route.snapshot.paramMap.get('id');
    this.findById();
  }

  findById(): void{
    this.service.findById(this.tecnico.id).subscribe(resposta =>{
      resposta.perfis = [];
      this.tecnico = resposta;
    })
  }
  
  update(){
    this.service.update(this.tecnico).subscribe(() =>{
      this.toast.success('Técnico atualizado com sucesso', 'Atualização');
      this.router.navigate(['tecnicos']);
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
    
    if(this.tecnico.perfis.includes(perfil)){
      this.tecnico.perfis.splice(this.tecnico.perfis.indexOf(perfil), 1);
    } else {
      this.tecnico.perfis.push(perfil);
    }
  }
  
  validaCampos(): boolean{
    return this.nome.valid && this.cpf.valid 
        && this.email.valid && this.senha.valid;
  }
}