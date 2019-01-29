import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';


import { Pessoa } from '../../model/pessoa.model';
import { Telefone } from 'src/app/model/telefone.model';
import { PessoaService } from '../pessoa.service';

import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/components/common/api';

@Component({
  selector: 'app-pessoa-cadastro',
  templateUrl: './pessoa-cadastro.component.html',
  styleUrls: ['./pessoa-cadastro.component.css']
})
export class PessoaCadastroComponent implements OnInit {

  telefone: Telefone
  pessoa: Pessoa;

  constructor(private pessoaService: PessoaService,
    private route: ActivatedRoute,
    private messageService: MessageService) { }

  ngOnInit() {
    const idPessoa = this.route.snapshot.params['id'];

    if (idPessoa) {
      this.buscarPorId(idPessoa);
    }

    this.telefone = new Telefone();
    this.pessoa = new Pessoa();
  }

  buscarPorId(id: number) {
    this.pessoaService.buscarPorId(id)
      .subscribe(
        data => {
          this.pessoa = data['content']
        },
        (error) => {
          console.log(error.error.message) //erro => this.errorHandlerService.handle(erro));
        }
      );
  }

  adicionarTelefone() {
    this.pessoa.telefones.push(this.telefone);
    this.telefone = new Telefone();
  }

  deletarTelefone(posicao: number) {
    this.pessoa.telefones.splice(posicao, 1);
  }

  salvar(form: FormControl) {
    if (this.editando()) {
      //  this.atualizar(form);
    } else {
      this.cadastrar(form);
    }
  }

  cadastrar(form: FormControl) {
    this.pessoaService.salvar(this.pessoa)
      .subscribe(
        data => {
          this.messageService.add({ severity: 'success', detail: 'Salvo com sucesso.' });
          form.reset();
          this.pessoa = new Pessoa();
        },
        (error) => {
          console.error()
            // `Backend returned code ${error.status}, ` +
            // `body was: ${error.error}`);

          // this.messageService.add({ severity: 'error', detail: error.error.message });
        }
      );
  }



  editando() {
    return this.pessoa.id !== undefined;
  }

  validaCampos() {
    return this.pessoa.dataNascimento == undefined || this.pessoa.dataNascimento.toString().includes('_')
      || this.pessoa.cpf == undefined || this.pessoa.cpf.includes('_');
  }

  validaTelefone() {
    return this.telefone.ddd == undefined
      || this.telefone.numero == undefined
  }
}
