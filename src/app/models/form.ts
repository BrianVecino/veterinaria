export interface Form {
    fecha:string;
    hora: string;
    nombre:string;
    dueno: string;
    razon: 'vacunacion' | 'medicacion' | 'otros';
    confirmar:boolean;
}
