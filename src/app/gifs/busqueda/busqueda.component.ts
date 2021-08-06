import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styleUrls: ['./busqueda.component.css']
})
export class BusquedaComponent implements OnInit {

  constructor( private gifsService: GifsService) { }

  ngOnInit(): void {
  }

  @ViewChild('txtBuscar') txtBuscar!:ElementRef<HTMLInputElement>;
  buscar(){

    let valor = this.txtBuscar.nativeElement.value;

    if(valor.trim().length <= 2){return}


   this.gifsService.buscarGifs(valor);
    this.txtBuscar.nativeElement.value = '';
  }

}
