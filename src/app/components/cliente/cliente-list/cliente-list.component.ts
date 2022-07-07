import { ClienteService } from '../../../services/cliente.service';
import { Cliente } from '../../../models/cliente';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-cliente-list',
  templateUrl: './cliente-list.component.html',
  styleUrls: ['./cliente-list.component.css']
})
export class ClienteListComponent implements OnInit {
  
  ELEMENT_DATA: Cliente [] = [];

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol', 'acoes'];
  dataSource = new MatTableDataSource<Cliente>(this.ELEMENT_DATA);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  
  constructor(
    private service: ClienteService
    ) { }

  ngOnInit(): void {
    this.findAll();
  }


  findAll(){
    this.service.findAll().subscribe(resposta =>{
        this.ELEMENT_DATA = resposta  
        this.dataSource = new MatTableDataSource<Cliente>(resposta);
        this.dataSource.paginator = this.paginator;
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}

