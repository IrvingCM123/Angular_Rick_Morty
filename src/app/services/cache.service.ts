import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Cache_Service {

  // Métodos para guardar, obtener, actualizar y eliminar datos en el cache del navegador

  obtener_DatoLocal(indice: string): any {
    const valor = localStorage.getItem(indice);
    if (valor) {
      return JSON.parse(valor);
    } else {
      return null; // Si no existe el índice, devuelve null
    }
  }

  guardar_DatoLocal(indice: string, valor: any): void {
    const valorString = JSON.stringify(valor);
    localStorage.setItem(indice, valorString);
  }

  guardar_ArregloLocal(indice: string, valor: any): void {
    const arreglo_Local = JSON.parse(this.obtener_DatoLocal(indice)) || [];
    arreglo_Local.push(valor);
    this.guardar_DatoLocal(indice, JSON.stringify(arreglo_Local));
  }

  eliminar_DatoLocal(indice: string): void {
    localStorage.removeItem(indice);
  }

  actualizar_DatoLocal(indice: string, valor: any) {
    localStorage.setItem(indice, JSON.stringify(valor));
  }

  eliminarCacheNavegador() {
    if (caches && caches.keys) {
      caches.keys().then(function (keys) {
        keys.forEach(function (key) {
          caches.delete(key);
        });
      });
    }

    localStorage.clear();

    sessionStorage.clear();
  }

}
