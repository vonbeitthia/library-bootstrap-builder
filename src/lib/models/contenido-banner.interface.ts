export interface IContenidoBanner {
	imagen: string;
	transicion: {
		tipo: string;
		velocidad:  1 | 2 | 3 | 4 | 5; //segundos
	};
	titulo?: { texto: string; color: string };
	subtitulo?: { texto: string; color: string };
	botones?: { texto: string; color: string; enlace: string }[];
	posicion: { horizontal :  'center' | 'flex-start' | 'flex-end',
							vertical: 'flex-start' | 'center'| 'flex-end',
							color: string},
}
