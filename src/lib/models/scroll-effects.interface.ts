import { ElementRef } from '@angular/core';

export interface IScrollEffects {
	elemento: ElementRef;
	//efectoAlentrar: string[];
	//efectoAlSalir: string[];
	visible: boolean;
}

export interface ICollScroll {
	[nombre : string] : IScrollEffects;
}

