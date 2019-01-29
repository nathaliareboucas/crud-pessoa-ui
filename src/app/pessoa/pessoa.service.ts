import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Filtro } from '../model/filtro';
import { Pessoa } from '../model/pessoa.model';

import { environment } from '../../environments/environment';
import { PESSOA_API } from '../app.api';

@Injectable({
  providedIn: 'root'
})
export class PessoaService {

  constructor(private http: HttpClient) { }

  pessoas(filtro: Filtro) {
    const params = new HttpParams()
      .set('page', filtro.pagina.toString())
      .set('size', filtro.pessoasPorPagina.toString())
      .set('nome', filtro.nome === undefined ? '' : filtro.nome)
      .set('cpf', filtro.cpf === undefined ? '' : filtro.cpf)

    console.log(filtro.nome)
    let resp = this.http.get(`${PESSOA_API}/pessoas`, { params: params })
    console.log(params)
    return resp
  }

}
