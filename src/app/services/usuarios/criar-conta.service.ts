import { Observable } from 'rxjs'
import { CriarContaRequestModel } from "src/app/models/usuarios/criar-conta.request.model";
import { CriarContaResponseModel } from "src/app/models/usuarios/criar-conta.response.model";
import { environment } from "src/environments/environment";
import { makeRequest } from "../commons/commons.service";

/*
    Função para realizar a chamada 
    de cadastro de usuários na API
*/
export function postCriarConta(request: CriarContaRequestModel): Observable<CriarContaResponseModel> {
    const config = {
        method: 'post',
        url: `${environment.apiUsuarios}/criar-conta`,
        data: request
    };

    return makeRequest<CriarContaResponseModel>(config);
}