import axios, { AxiosResponse } from "axios";
import { Observable } from "rxjs";

//função para gerar a requisição para a API
export function makeRequest<T>(config: any): Observable<T> {
    return new Observable<T>(observer => {
        axios(config)
            .then(response => handleResponse(observer, response))
            .catch(error => handleError(observer, error));
    })
}

//função para capturar o retorno de sucesso da API
function handleResponse<T>(observer: any, response: AxiosResponse<T>) {
    observer.next(response.data);
    observer.complete();
}

//função para capturar o retorno de erro da API
function handleError(observer: any, error: any) {
    observer.error(error);
}
