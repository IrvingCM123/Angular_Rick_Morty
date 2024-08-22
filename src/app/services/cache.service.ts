import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Cache_Service {

  obtener_DatoLocal(indice: string): any {
    return localStorage.getItem(indice);
  }

  guardar_DatoLocal(indice: string, valor: any): void {
    const valorString = JSON.stringify(valor);
    localStorage.setItem(indice, valorString);
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
