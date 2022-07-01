import { Tecnico } from './../../../models/tecnico';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-tecnico-list',
  templateUrl: './tecnico-list.component.html',
  styleUrls: ['./tecnico-list.component.css']
})
export class TecnicoListComponent implements OnInit {
  
  ELEMENT_DATA: Tecnico [] = [
    {
      id: 1,
      nome: 'Thiago Zappiello', 
      cpf: '123.456.789-00',
      email: 'tzappiello@email.com',
      senha: '1234',
      perfis: ['0'],
      dataCriacao: '12/07/2022'
    }
  ];

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol', 'acoes'];
  dataSource = new MatTableDataSource<Tecnico>(this.ELEMENT_DATA);

  constructor() { }

  ngOnInit(): void {
  }

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

}

