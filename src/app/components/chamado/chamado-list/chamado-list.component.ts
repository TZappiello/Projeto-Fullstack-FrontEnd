import { Chamado } from './../../../models/chamado';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Cliente } from 'src/app/models/cliente';
import { ChamadoService } from 'src/app/services/chamado.service';

@Component({
  selector: 'app-chamado-list',
  templateUrl: './chamado-list.component.html',
  styleUrls: ['./chamado-list.component.css']
})
export class ChamadoListComponent implements OnInit {

  ELEMENT_DATA: Chamado [] = []
  FILTRO_DADOS: Chamado [] = []

  displayedColumns: string[] = ['id', 'titulo', 'cliente', 'tecnico', 'dataAbertura', 'prioridade', 'status', 'acoes'];
  dataSource = new MatTableDataSource<Chamado>(this.ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;
 


  constructor(
    private service: ChamadoService
  ) { }

  ngOnInit(): void {
    this.findAll();
  }

    findAll(): void {
      this.service.findAll().subscribe(resposta =>{
        this.ELEMENT_DATA = resposta;
        this.dataSource = new MatTableDataSource<Chamado>(resposta);
        this.dataSource.paginator = this.paginator;
      })
    }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  retornaStatus(status: any): string{
    if(status == '0'){
      return "ABERTO"
    } else if (status == '1'){
      return "EM ANDAMENTO"
    } else {
      return "ENCERRADO"
    }
  }

  retornaPrioridade(prioridade: any): string{
    if(prioridade == '0'){
      return "BAIXA"
    } else if (prioridade == '1'){
      return "MÉDIA"
    } else {
      return "ALTA"
    }
  }

  ordernarPorStatus(status: any): void{
    let lista: Chamado[] = [];
    this.ELEMENT_DATA.forEach(element => {
      if(element.status = status){
        lista.push(element)
      }
    });
    this.FILTRO_DADOS = lista;
    this.dataSource = new MatTableDataSource<Chamado>(lista);
    this.dataSource.paginator = this.paginator;
  }
}
