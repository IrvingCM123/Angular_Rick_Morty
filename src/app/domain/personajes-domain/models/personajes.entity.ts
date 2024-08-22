// estructura de los personajes de la serie Rick and Morty.
export class personaje {
  id!: number;
  name!: string;
  status!: string;
  species!: string;
  type!: string
  gender!: string;
  origin!: origin;
  location!: location;
  image!: string;
  episode!: string[];
  url!: string;
  created!: string;
}

// Clase auxiliar para definir la estructura de los atributos origin.
class origin {
  name!: string;
  url!: string;
}

// Clase auxiliar para definir la estructura de los atributos location.
class location {
  name!: string;
  url!: string;
}
