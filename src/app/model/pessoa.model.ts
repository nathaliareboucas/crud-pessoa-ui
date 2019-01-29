import { Telefone } from "./telefone.model";

export class Pessoa {
    id: number;
    nome: string;
    cpf: string;
    email: string;
    dataNascimento: Date;
    telefones: Telefone[] = [];
    idade?: number;
    quantidadeTelefones?: number;
}
