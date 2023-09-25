export class login{
    email: string = "";
    password: string = "";
}

export class register{
    name: string = "";
    cpf: string = "";
    telefone: string = "";
    email: string = "";
    password: string = "";
    confirmPassword: string = "";
}

export class compartimento{
    descricao: string = "";
    largura!: number | null;
    comprimento!: number | null;
    andar_compartimento!: number | null ;
    edificio_id: string = "";
}

export class editCompartimento{
    descricao?: string = "";
    largura?: number | null;
    comprimento?: number | null;
    andar_compartimento?: number | null ;
    edificio_id?: string = "";
}

export class createQuadro{
    quadro_descricao: string = "";
    tipo_qgbt: string = "";
    tamanho_qgbt: string = "";
    quantidade_circuito!: number;
    monofasico!: number;
    bifasico!: number;
    trifasico!: number;
    disjuntor_principal: string = "";
    polos: string = "";
    possui_dps: string = "";
    quantidade_dps: string = "";
    tipo_dps: string = "";
    compartimento_id: string = "";
    dps_tipo_id: string = ""
}

export class editQuadro{
    quadro_descricao?: string = "";
    tipo_qgbt?: string = "";
    tamanho_qgbt?: string = "";
    quantidade_circuito?: number;
    monofasico?: number;
    bifasico?: number;
    trifasico?: number;
    disjuntor_principal?: string = "";
    polos?: string = "";
    possui_dps?: string = "";
    quantidade_dps?: string = "";
    tipo_dps?: string = "";
    dps_tipo_id: string = ""
}

export class item{
    descricao: string = "";
    quantidade!: number | null;
    compartimento_id: string = "";
    tipoItem_id: string = "";
}

export class createDPS{
    classe: string = "";
    corrente: string = "";
    tensao: string = "";
    quadro_id: string = "";
}