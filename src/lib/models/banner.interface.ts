import { IContenidoBanner } from './contenido-banner.interface';
export interface IBanner {
	codigo: string;
	contenido: IContenidoBanner[],
	velocidad: number; // microsegundos
	}