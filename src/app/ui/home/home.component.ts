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

  // Arreglo de personajes
  personajes: personaje[] = [];

  // Variables para el paginador
  paginaActual: number = 1;
  personajesPorPagina: number = 10;
  totalPersonajes: number = 0;

  ngOnInit(): void {
  }

  // Método que obtiene los personajes de la API a través del puerto y los guarda en el cache
  async obtenerPersonajes(): Promise<personaje[]> {
      // Si no están en el cache, los obtiene de la API y los guarda en el cache
      const datos: any = await firstValueFrom(this.personajesUsecase.obtenerPersonajes());
      this.personajes = datos.body;
      this.totalPersonajes = this.personajes.length;
      return this.personajes;
  }

  // Método para obtener un personaje específico por su nombre
  async obtenerPersonajePorNombre(nombre: string): Promise<personaje[]> {
      // Si no está en el cache, lo obtiene de la API y lo guarda en el cache
      const datos: any = await firstValueFrom(this.personajesUsecase.obtenerPersonajePorNombre(nombre));
      this.personajes = datos.body;
      this.totalPersonajes = this.personajes.length;
      return this.personajes
  }

  // Método para obtener un personaje específico por su id
  async obtenerPersonajePorId(id: string): Promise<personaje[]> {
      const datos: any = await firstValueFrom(this.personajesUsecase.obtenerPersonajePorId(id));
      this.personajes = datos.body;
      return this.personajes
  }

  // Método para obtener los personajes de la página actual
  async obtenerPersonajesPagina(): Promise<personaje[]> {
    // Obtiene los personajes de la API
    this.personajes = await this.obtenerPersonajes();
    console.log(this.personajes, "2");
    // Calcula el índice de inicio y fin de los personajes de la página actual
    const indiceInicio = (this.paginaActual - 1) * this.personajesPorPagina;
    const indiceFin = indiceInicio + this.personajesPorPagina;
    // Devuelve los personajes de la página actual
    return this.personajes.slice(indiceInicio, indiceFin);
  }

  // Método para cambiar de página
  cambiarPagina(pagina: number): void {
    this.paginaActual = pagina;
    this.obtenerPersonajesPagina();
  }


}
