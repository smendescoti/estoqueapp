/*
    Modelo de dados para capturar
    a resposta da autenticação
*/
export class AutenticarResponseModel {
    id: string = '';
    nome: string = '';
    email: string = '';
    accessToken: string = '';
    dataHoraAcesso: Date | null = null;
    dataHoraExpiracao: Date | null = null;
}