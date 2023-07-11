/*
    Modelo de dados para a requisição
    de criação de conta do usuário
*/
export class CriarContaRequestModel {
    constructor(
        public nome: string,
        public email: string,
        public senha: string,
        public senhaConfirmacao: string
    ) {

    }
}