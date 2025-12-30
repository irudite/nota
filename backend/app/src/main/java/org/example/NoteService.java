package org.example;

import org.springframework.stereotype.Service;
import java.util.List;
import java.util.UUID;
import java.time.Instant;

@Service
public class NoteService {

  private final NoteRepository noteRepository;

  public NoteService(NoteRepository noteRepository) {
    this.noteRepository = noteRepository;
  }

  //provides service to create note
  public Note createNote(Note note) {
    note.setNoteId(UUID.randomUUID().toString());
    note.setCreatedAt(Instant.now().toEpochMilli());
    note.setUpdatedAt(Instant.now().toEpochMilli());
    return noteRepository.save(note);
  }

  //service to retreive a single note
  public Note getNote(String id) {
    return noteRepository.findById(id);
  }

  //service to retrieve table of notes
  public List<Note> getAllNotes() {
    return noteRepository.findAll();
  }

  //service to update note
  public Note updateNote(String id, Note note) {
    Note existing = noteRepository.findById(id);

    if (existing != null) {
      note.setNoteId(id);
      note.setCreatedAt(existing.getCreatedAt());
      note.setUpdatedAt(Instant.now().toEpochMilli());
      return noteRepository.save(note);
    }

    return null;
  }

  //service to delete note
  public void deleteNote(String id) {
    noteRepository.delete(id);
  }
}
