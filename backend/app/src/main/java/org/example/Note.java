package org.example;

public class Note {
  // members
  private String noteId;
  private String title;
  private String content;
  private Long createdAt;
  private Long updatedAt;
  
  // constructors
  public Note() {
  }
  
  public Note(String noteId, String title, String content, Long createdAt, Long updatedAt) {
    this.noteId = noteId;
    this.title = title;
    this.content = content;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
  
  // getter methods
  public String getNoteId() {
    return noteId;
  }
  
  public String getTitle() {
    return title;
  }
  
  public String getContent() {
    return content;
  }
  
  public Long getCreatedAt() {
    return createdAt;
  }
  
  public Long getUpdatedAt() {
    return updatedAt;
  }
  
  // setter methods
  public void setNoteId(String noteId) {
    this.noteId = noteId;
  }
  
  public void setTitle(String title) {
    this.title = title;
  }
  
  public void setContent(String content) {
    this.content = content;
  }
  
  public void setCreatedAt(Long createdAt) {
    this.createdAt = createdAt;
  }
  
  public void setUpdatedAt(Long updatedAt) {
    this.updatedAt = updatedAt;
  }
}
