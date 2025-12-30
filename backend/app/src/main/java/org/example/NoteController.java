package org.example;

import org.springframework.web.bind.annotation.*;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.List;

@RestController
@RequestMapping("/api/notes")
public class NoteController {

  private final NoteService noteService;

  public NoteController(NoteService noteService) {
    this.noteService = noteService;
  }

  @PostMapping
  public ResponseEntity<Note> createNote(@RequestBody Note note) {
    Note created = noteService.createNote(note);
    return ResponseEntity.status(HttpStatus.CREATED).body(created);
  }

  @GetMapping("/{id}")
  public ResponseEntity<Note> getNoteById(@PathVariable String id) {
    Note note = noteService.getNote(id);

    if (note == null) {
      return ResponseEntity.notFound().build();
    }

    return ResponseEntity.ok(note);
  } 

  @GetMapping
  public ResponseEntity<List<Note>> getAllNotes() {
    List<Note> notes = noteService.getAllNotes();
    return ResponseEntity.ok(notes);
  }

  @PutMapping("/{id}")
  public ResponseEntity<Note> updateNote(@PathVariable String id, @RequestBody Note note) {
    Note updated = noteService.updateNote(id, note);

    if (updated == null) {
      return ResponseEntity.notFound().build();
    }

    return ResponseEntity.ok(updated);
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<Void> deleteNote(@PathVariable String id) {
    noteService.deleteNote(id);
    return ResponseEntity.noContent().build();
  }
}
