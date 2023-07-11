/*
    Modelo de dados para criação da
    conta do usuário
*/
export class CriarContaResponseModel {
    id: string = '';
    nome: string = '';
    email: string = '';
    dataHoraCriacao: Date | null = null;
}