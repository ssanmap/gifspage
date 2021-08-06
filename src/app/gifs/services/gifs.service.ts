import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, GifsResponse } from '../interfaces/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apiKey: string = 'KOiAcsPGBeUhvPOkOFxfBDEGnw26OJMg';
  private servicioUrl: string = 'https://api.giphy.com/v1/stickers';
  private _historial: string[] = [];
  public resultados: Gif[] = [];

  get historial() {

       return [...this._historial];
  }

  buscarGifs(query: string){

    query = query.trim().toLowerCase();

      if (!this._historial.includes(query)) {
        this._historial.unshift(query);
        this._historial = this._historial.splice(0,10);

        localStorage.setItem('historial', JSON.stringify(this._historial));
      }

      const params = new HttpParams()
          .set('api_key', this.apiKey)
          .set('limit', '10')
          .set ('q', query);

      this.http.get<GifsResponse>(`${this.servicioUrl}/search`, {params})
          .subscribe((resp) =>{
            console.log(resp.data);
            this.resultados = resp.data;
            localStorage.setItem('resultados', JSON.stringify(this.resultados));
          }
          )


  }

  constructor(private http: HttpClient) {

    // if (localStorage.getItem('historial')) {
    //   this._historial = JSON.parse(localStorage.getItem('historial')!);
    // }
    this._historial = JSON.parse(localStorage.getItem('historial')! ) || [];
    this.resultados = JSON.parse(localStorage.getItem('resultados')! ) || [];

  }
}
