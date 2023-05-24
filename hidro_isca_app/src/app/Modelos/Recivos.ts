export class Recivos{
    id:number;
    periodo_trimestral:number;
    anyo: number;
    MCCT: number;
    VPMCCT:number;
    usuario:any;
    estado:any;
    empresa:any;
    constructor(
        id: number,periodo_trimestral:number,anyo:number,MCCT:number,VPMCCT:number, usuario: any, estado: string, empresa: any,) {
        this.id = id
        this.periodo_trimestral= periodo_trimestral;
        this.anyo= anyo;
        this.MCCT= MCCT;
        this.VPMCCT=VPMCCT;
        this.estado = estado;
        this.usuario = usuario;
        this.empresa = empresa;
    }
}