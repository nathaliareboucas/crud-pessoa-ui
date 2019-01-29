import { Routes } from '@angular/router';
import { PessoaListagemComponent } from './pessoa/pessoa-listagem/pessoa-listagem.component';


export const ROUTES: Routes = [
    { path: '', component: PessoaListagemComponent },
    { path: 'pessoas', component: PessoaListagemComponent }
]
