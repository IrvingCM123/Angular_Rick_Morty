import { Observable } from "rxjs";
import { personaje } from "src/app/domain/personajes-domain/models/personajes.entity";

// Puerto que se encarga de obtener los personajes de la serie Rick and Morty.
export abstract class PersonajesPuerto {

  // Método para obtener todos los personajes
  abstract obtenerPersonajes(): Observable<personaje[]>;

  // Método para obtener un personaje por su id
  abstract obtenerPersonajePorId(id: string): Observable<personaje>;

  // Método para obtener un personaje por su nombre
  abstract obtenerPersonajePorNombre(nombre: string): Observable<personaje[]>;

}
