import { Component } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { NoteDetailComponent } from "src/app/components/note-detail/note-detail.component";
import { NotesListComponent } from "src/app/components/notes-list/notes-list.component";

@Component({
    standalone: true,
    selector: 'app-notes',
    styleUrl: './notes.page.scss',
    templateUrl: './notes.page.html',
    imports: [IonicModule, NotesListComponent, NoteDetailComponent]
})

export class NotesPage {

}