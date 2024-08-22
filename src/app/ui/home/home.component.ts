import { Component, OnInit } from '@angular/core';
import { PersonajesUsecase } from 'src/app/domain/personajes-domain/usercase/personajes-usecase';
import { personaje } from 'src/app/domain/personajes-domain/models/personajes.entity';
import { Cache_Service } from 'src/app/services/cache.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    private personajesUsecase: PersonajesUsecase,
    private cacheService: Cache_Service,
  ) { }

  personajes: personaje[] = [];
  personaje!: personaje;

  ngOnInit(): void {
  }

  // Método que obtiene los personajes de la API a través del puerto y los guarda en el cache
  async obtenerPersonajes(): Promise<personaje[]> {

    // Si los personajes ya están en el cache, los devuelve
    if (this.cacheService.obtener_DatoLocal("personajes")) {
      return this.cacheService.obtener_DatoLocal("personajes");
    } else {
      // Si no están en el cache, los obtiene de la API y los guarda en el cache
      this.personajes = await firstValueFrom(this.personajesUsecase.obtenerPersonajes());
      this.cacheService.guardar_ArregloLocal("personajes", this.personajes);
      return this.personajes;
    }
  }

  // Método para obtener un personaje específico por su nombre
  async obtenerPersonajePorNombre(nombre: string): Promise<personaje> {
    // Si el personaje ya está en el cache, lo devuelve
    if (this.cacheService.obtener_DatoLocal(nombre)) {
      return this.cacheService.obtener_DatoLocal(nombre);
    } else {
      // Si no está en el cache, lo obtiene de la API y lo guarda en el cache
      this.personajes = await firstValueFrom(this.personajesUsecase.obtenerPersonajePorNombre(nombre));
      this.cacheService.guardar_DatoLocal(nombre, this.personaje);
      return this.personaje
    }
  }

  // Método para obtener un personaje específico por su id
  async obtenerPersonajePorId(id: number): Promise<personaje> {
    // Si el personaje ya está en el cache, lo devuelve
    if (this.cacheService.obtener_DatoLocal(id.toString())) {
      return this.cacheService.obtener_DatoLocal(id.toString());
    } else {
      // Si no está en el cache, lo obtiene de la API y lo guarda en el cache
      this.personaje = await firstValueFrom(this.personajesUsecase.obtenerPersonajePorId(id));
      this.cacheService.guardar_DatoLocal(id.toString(), this.personaje);
      return this.personaje
    }
  }

}
