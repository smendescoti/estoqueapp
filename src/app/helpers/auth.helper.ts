import { AutenticarResponseModel } from "../models/usuarios/autenticar.response.model";
import { decrypt, encrypt } from "./crypto.helper";

const key = 'auth_estoque';

//função para autenticar o usuário
export function login(model: AutenticarResponseModel): void {
    let data = encrypt(JSON.stringify(model));
    localStorage.setItem(key, data);
}

//função para retornar os dados do usuário autenticado
export function getData(): AutenticarResponseModel | null {
    let auth = localStorage.getItem(key) as string | null;
    if (auth != null) {
        let data = decrypt(auth);
        if (data != null)
            return JSON.parse(data) as AutenticarResponseModel;
    }

    return null;
}

//função que verifique se o usuário está autenticado
export function isAuthenticated(): boolean {
    //capturar os dados do usuário
    let data = getData();
    //verificar se o retorno não é vazio
    if (data != null) {
        let dataAtual = new Date();
        let dataExpiracao = new Date(data.dataHoraExpiracao as Date);
        return dataAtual <= dataExpiracao;
    }

    return false;
}

//função para apagar os dados da local storage
export function logout(): void {
    localStorage.removeItem(key);
}