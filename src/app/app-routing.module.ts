import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotesPage } from './pages/notes/notes.page';

const routes: Routes = [
  {
    path: '',
    component: NotesPage
  },
  {
    path: '*',
    redirectTo: '',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
