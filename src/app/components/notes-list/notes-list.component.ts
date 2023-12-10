import { Component } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { NotesService } from "src/app/services/notes.service";

@Component({
    standalone: true,
    selector: 'app-notes-list',
    styleUrl: './notes-list.component.scss',
    templateUrl: './notes-list.component.html',
    imports: [IonicModule]
})

export class NotesListComponent {

    sectionTitle: string = 'All Notes';

    constructor(notesService: NotesService) {
        const showAllNotes = notesService.getMenuSectionVisible();
        if(!showAllNotes) this.sectionTitle = 'Trash'
    }

}