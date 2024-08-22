import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { PersonajesPuerto } from 'src/app/config/puertos/personajes-puerto';
import { personaje } from 'src/app/domain/personajes-domain/models/personajes.entity';

@Injectable({
  providedIn: 'root'
})
// Casos de uso para los personajes de la serie Rick and Morty.

export class PersonajesUsecase {

  constructor(private _personajesPuerto: PersonajesPuerto) { }

  // Método para obtener todos los personajes
  obtenerPersonajes(): Observable<personaje[]> {
    return this._personajesPuerto.obtenerPersonajes();
  }

  // Método para obtener un personaje por su id
  obtenerPersonajePorId(id: string): Observable<personaje> {
    return this._personajesPuerto.obtenerPersonajePorId(id);
  }

  // Método para obtener un personaje por su nombre
  obtenerPersonajePorNombre(nombre: string): Observable<personaje[]> {
    return this._personajesPuerto.obtenerPersonajePorNombre(nombre);
  }

}
