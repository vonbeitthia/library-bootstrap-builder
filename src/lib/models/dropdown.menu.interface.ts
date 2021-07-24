export interface IDropDown {
	nombre : string;
	icono? : string;
	rol?: string[];
	enlace?: string;
	codigo: string;
	openState?: boolean;
	closeState?: boolean;
	contenido?:
		{
			item: string,
			enlace: string,
			icono?: string;
			rol?: string[];
			openState?: boolean;
		}[]
}