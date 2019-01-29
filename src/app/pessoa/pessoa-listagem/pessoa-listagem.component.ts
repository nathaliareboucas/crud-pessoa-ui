import { Component, OnInit, ViewChild } from '@angular/core';

import { LazyLoadEvent, ConfirmationService } from 'primeng/components/common/api';
import { MessageService } from 'primeng/components/common/messageservice';

import { PessoaService } from '../pessoa.service';
import { Pessoa } from '../../model/pessoa.model';
import { Filtro } from '../../model/filtro';
import { Observable } from 'rxjs'
import { map } from 'rxjs/operator/map'

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

  constructor(private pessoaService: PessoaService,
              private messageService: MessageService,
              private confirmationService: ConfirmationService,) { }

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
          this.messageService.add({ severity: 'error', detail: 'Erro ao ao pesquisar.' });
        }); 
  }

  loadPessoaLazy(event: LazyLoadEvent) {
    const paginaAtual = event.first / event.rows;
    this.pesquisar(paginaAtual);
  }

  deletar(pessoa: Pessoa) {
    this.pessoaService.deletar(pessoa.id)
      .subscribe(
        () => {
          let indice = this.pessoas.indexOf(pessoa);
          this.pessoas.splice(indice, 1);

          if (this.tabela.first !== 0) {
              this.pesquisar();
          }
          this.messageService.add({ severity: 'success', detail: 'Pessoa removida com sucesso.' });
        },
         (erro) => {
          this.messageService.add({ severity: 'error', detail: 'Erro ao remover a pessoa.' });
         }
      )       
  }

  confirmacaoDelete(pessoa: Pessoa) {
    this.confirmationService.confirm({
      message: 'Deseja realmente deletar esta pessoa?',
      accept: () => {
        this.deletar(pessoa);
      }
    });
  }

}
