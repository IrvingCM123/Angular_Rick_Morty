import { Component, OnInit } from '@angular/core';
import { PersonajesUsecase } from 'src/app/domain/personajes-domain/usercase/personajes-usecase';
import { personaje } from 'src/app/domain/personajes-domain/models/personajes.entity';
import { Cache_Service } from 'src/app/services/cache.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(
    private personajesUsecase: PersonajesUsecase,
    private cacheService: Cache_Service
  ) {}

  // Arreglo de personajes
  personajes: personaje[] = [];

  // Variables para el paginador
  personajesPagina: personaje[] = [];
  paginaActual: number = 1;
  personajesPorPagina: number = 10;
  totalPersonajes: number = 0;
  totalPaginas: number = 0;

  cargando: boolean = false;

  ngOnInit(): void {}

  // Método que obtiene los personajes de la API a través del puerto y los guarda en el cache
  async obtenerPersonajes(): Promise<personaje[]> {
    const datos: any = await firstValueFrom(
      this.personajesUsecase.obtenerPersonajes()
    );
    this.personajes = datos.body;
    this.totalPersonajes = this.personajes.length;
    this.totalPaginas = Math.ceil(
      this.totalPersonajes / this.personajesPorPagina
    ); // Calcular el total de páginas
    return this.personajes;
  }

  // Método para obtener un personaje específico por su nombre
  async obtenerPersonajePorNombre(nombre: string): Promise<personaje[]> {
    this.cargando = true;
    try {
      // Si no está en el cache, lo obtiene de la API y lo guarda en el cache
      const datos: any = await firstValueFrom(
        this.personajesUsecase.obtenerPersonajePorNombre(nombre)
      );
      this.personajes = datos.body;

      // Calcular el índice de inicio y fin para la paginación
      const indiceInicio = (this.paginaActual - 1) * this.personajesPorPagina;
      const indiceFin = indiceInicio + this.personajesPorPagina;

      // Actualizar los personajes de la página actual
      this.personajesPagina = this.personajes.slice(indiceInicio, indiceFin);
    } catch (error) {
      console.error('Error al obtener el personaje', error);
    } finally {
      this.cargando = false;
      return this.personajes;
    }
  }

  // Método para obtener un personaje específico por su id
  async obtenerPersonajePorId(id: string): Promise<personaje[]> {
    this.cargando = true;

    try {
      const datos: any = await firstValueFrom(
        this.personajesUsecase.obtenerPersonajePorId(id)
      );
      this.personajes = datos.body;

      // Calcular el índice de inicio y fin para la paginación
      const indiceInicio = (this.paginaActual - 1) * this.personajesPorPagina;
      const indiceFin = indiceInicio + this.personajesPorPagina;

      // Actualizar los personajes de la página actual
      this.personajesPagina = this.personajes.slice(indiceInicio, indiceFin);
    } catch (error) {
      console.error('Error al obtener el personaje', error);
    } finally {
      this.cargando = false;
      return this.personajes;
    }
  }

  async obtenerPersonajesPagina(): Promise<void> {
    this.cargando = true;
    try {
      await this.obtenerPersonajes();

      // Calcular el índice de inicio y fin para la paginación
      const indiceInicio = (this.paginaActual - 1) * this.personajesPorPagina;
      const indiceFin = indiceInicio + this.personajesPorPagina;

      // Actualizar los personajes de la página actual
      this.personajesPagina = this.personajes.slice(indiceInicio, indiceFin);
    } catch (error) {
      console.error('Error al obtener los personajes', error);
    } finally {
      this.cargando = false;
    }
  }

  cambiarPagina(pagina: number): void {
    if (pagina > 0 && pagina <= this.totalPaginas) {
      this.paginaActual = pagina;
      this.obtenerPersonajesPagina(); // Actualizar los personajes de la página actual
    }
  }
}
