import { Component, OnInit, ViewChild } from '@angular/core';

import { LazyLoadEvent, ConfirmationService } from 'primeng/components/common/api';
import { MessageService } from 'primeng/components/common/messageservice';

import { PessoaService } from '../pessoa.service';
import { Pessoa } from '../../model/pessoa.model';
import { Filtro } from '../../model/filtro';
// import { ErrorHandlerService } from '../../core/error-handler.service';

@Component({
  selector: 'app-pessoa-listagem',
  templateUrl: './pessoa-listagem.component.html',
  styleUrls: ['./pessoa-listagem.component.css']
})
export class PessoaListagemComponent implements OnInit {

  filtro = new Filtro();
  pessoas = Array<Pessoa>();
  qtdRegistros = 0;
  @ViewChild('tabela') tabela;

  constructor(private pessoaService: PessoaService) { }

  ngOnInit() {
  }

  pesquisar(pagina = 0) {
    this.filtro.pagina = pagina;
    this.pessoaService.pessoas(this.filtro)
      .subscribe(
        data => {
          this.pessoas = data['content']
          this.qtdRegistros = data['totalElements']
        },
        (error) =>{
          console.log(error.error.message);
        });
  }

  loadPessoaLazy(event: LazyLoadEvent) {
    const paginaAtual = event.first / event.rows;
    this.pesquisar(paginaAtual);
  }

}
