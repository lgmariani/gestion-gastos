export interface Gasto {
    id: string;
    fecha: Date;
    pagador: number;
    valor: number;
    categoria: string | { value: string; label: string };
    titulo: string;
    repartirentre: number;
}

export interface NuevoGasto {
    fecha: Date;
    pagador: number;
    valor: number;
    categoria: string;
    titulo: string;
    repartirentre: number;
}
