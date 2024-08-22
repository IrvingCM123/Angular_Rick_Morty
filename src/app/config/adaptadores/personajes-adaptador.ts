import { Observable } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";

import { PersonajesPuerto } from "src/app/config/puertos/personajes-puerto";
import { personaje } from "src/app/domain/personajes-domain/models/personajes.entity";

@Injectable({
  providedIn: 'root'
})
// Adaptador que se encarga de obtener los personajes de la serie Rick and Morty.
export class PersonajesAdaptador extends PersonajesPuerto {

  api_url = environment.url + "/productosid/"

  constructor(private _http: HttpClient) {
    super();
  }

  // Método para obtener todos los personajes
  obtenerPersonajes(): Observable<personaje[]> {
    return this._http.get<personaje[]>(`${this.api_url}/Obtener_Personajes`);
  }

  // Método para obtener un personaje por su id
  obtenerPersonajePorId(id: number): Observable<personaje> {
    return this._http.get<personaje>(`${this.api_url}/Obtener_Personaje_ID/?id=${id}`);
  }

  // Método para obtener un personaje por su nombre
  obtenerPersonajePorNombre(nombre: string): Observable<personaje[]> {
    return this._http.get<personaje[]>(`${this.api_url}/Obtener_Personaje_Nombre/?name=${nombre}`);
  }

}
