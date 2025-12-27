package org.example;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/notes")
public class NoteController {
  @GetMapping
  public List<Note> get_notes() {
    List<Note> notes = List.of(
        new Note("1", "Test Note", "This is my first real project", 122625L, 122722L),
        new Note("2", "me in the", "PLease work", 111L, 222L)
    );

    return notes;
  }
}
