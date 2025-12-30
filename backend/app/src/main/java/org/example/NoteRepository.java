package org.example;

import software.amazon.awssdk.enhanced.dynamodb.DynamoDbEnhancedClient;
import software.amazon.awssdk.enhanced.dynamodb.DynamoDbTable;
import software.amazon.awssdk.enhanced.dynamodb.TableSchema;
import software.amazon.awssdk.enhanced.dynamodb.Key;

import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.stream.Collectors;

@Repository
public class NoteRepository {
  
  private final DynamoDbTable<Note> noteTable;

  public NoteRepository(DynamoDbEnhancedClient enhancedClient) {
    this.noteTable = enhancedClient.table("notes", TableSchema.fromBean(Note.class));
  }

  //retrieves all notes in table
  public List<Note> findAll() {
    return noteTable.scan().items().stream().collect(Collectors.toList());
  } 

  //retrieve individual note
  public Note findById(String id) {
    Key key = Key.builder().partitionValue(id).build();
    return noteTable.getItem(key);
  }

  //save a note
  public Note save(Note note) {
    noteTable.putItem(note);
    return note;
  }

  //delete a note
  public void delete(String id) {
    Key key = Key.builder().partitionValue(id).build();
    noteTable.deleteItem(key);
  }
}
