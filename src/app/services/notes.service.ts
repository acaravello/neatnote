import { Injectable } from "@angular/core";

@Injectable({providedIn: 'root'})

export class NotesService {

    showAllNotesNotTrash: boolean = true;

    toggleListSection(showAllNotes: boolean) {
        this.showAllNotesNotTrash = showAllNotes
    }

    getMenuSectionVisible() {
        return this.showAllNotesNotTrash;
    }
}

