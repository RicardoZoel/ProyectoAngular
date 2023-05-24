export class Consumo {
    id: number;
    mes: number;
    anyo: number;
    MCC: number;
    VPMCCT:number;
    usuario:any;
    contador:any;
    agua:any;
    empresa:any;

    constructor(
      id: number,mes:number,anyo:number,MCC:number,VPMCCT:number, contador: string, usuario: any, empresa: any,agua:any) {
      this.id = id
      this.mes= mes;
      this.anyo= anyo;
      this.MCC= MCC;
      this.VPMCCT=VPMCCT;
      this.contador = contador;
      this.usuario = usuario;
      this.empresa = empresa;
      this.agua=agua;
    }
  }
  