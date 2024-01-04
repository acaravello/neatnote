import { Component } from '@angular/core';
import { NotesService } from './services/notes.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  appPages = [ { id:"notes", title: 'All Notes', icon: 'newspaper' }, { id: 'trash', title: 'Trash', icon: 'trash' }];
  itemSelectedId: string = 'notes'

  constructor(private notesService: NotesService) {}

  onClickMenuItem(id: string) {
    const toggle = id === 'trash' ? false : true;
    this.notesService.toggleListSection(toggle);
    this.itemSelectedId = toggle ? 'notes' : 'trash';
  }
  
}
