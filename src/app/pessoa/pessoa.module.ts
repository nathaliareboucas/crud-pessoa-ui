import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {MessagesModule} from 'primeng/components/messages/messages';
import { PanelModule } from 'primeng/components/panel/panel';
import { InputTextModule } from 'primeng/components/inputtext/inputtext';
import { InputMaskModule } from 'primeng/components/inputmask/inputmask';
import { ButtonModule } from 'primeng/components/button/button';
import { TableModule } from 'primeng/components/table/table';
import { TooltipModule } from 'primeng/components/tooltip/tooltip';
import { PessoaListagemComponent } from './pessoa-listagem/pessoa-listagem.component';
import { PessoaCadastroComponent } from './pessoa-cadastro/pessoa-cadastro.component';
import {GrowlModule} from 'primeng/components/growl/growl'
import {MessageService} from 'primeng/components/common/messageservice';
import { ConfirmDialogModule } from 'primeng/components/confirmdialog/confirmdialog';
import { ConfirmationService } from 'primeng/components/common/api';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    BrowserAnimationsModule,

    MessagesModule,
    PanelModule,
    InputTextModule,
    InputMaskModule,
    ButtonModule,
    TableModule,
    TooltipModule,
    ConfirmDialogModule,
    GrowlModule
  ],
  declarations: [PessoaListagemComponent, PessoaCadastroComponent],
  exports: [PessoaListagemComponent],
  providers: [
    MessageService, ConfirmationService
  ]
})
export class PessoaModule { }
