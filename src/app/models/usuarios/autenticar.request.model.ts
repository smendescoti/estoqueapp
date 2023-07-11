/*
    Modelo de dados para a requisição
    de autenticação de conta do usuário
*/
export class AutenticarRequestModel {
    constructor(
        public email: string,
        public senha: string
    ) {

    }
}