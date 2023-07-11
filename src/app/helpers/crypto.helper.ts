import * as CryptoJS from "crypto-js";
import { environment } from "src/environments/environment";

/*
    Função para criptografar valores
*/
export function encrypt(data: string): string {
    return CryptoJS.AES.encrypt
        (data, environment.chaveCriptografia).toString();
}

/*
    Função para descriptografar valores
*/
export function decrypt(data: string): string {
    return CryptoJS.AES.decrypt
        (data, environment.chaveCriptografia)
        .toString(CryptoJS.enc.Utf8);
}