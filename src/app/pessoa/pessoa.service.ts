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

  buscarPorId(id: number) {    
    return this.http.get(`${PESSOA_API}/pessoas/${id}`)
  }
  
  salvar(pessoa: Pessoa) {
    return this.http.post(`${PESSOA_API}/pessoas`, pessoa)
  }

  atualizar(pessoa: Pessoa) {
    const params = new HttpParams().set('id', pessoa.id.toString())
    return this.http.put(`${PESSOA_API}/pessoas`, { params: params })      
  }

  deletar(id: number) {    
    return this.http.delete(`${PESSOA_API}/pessoas/${id}`)     
  }


}
