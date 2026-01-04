import { useState, useEffect } from 'react';
import axios from 'axios';

import { AiOutlineClockCircle } from 'react-icons/ai'

const Note = ({selectedNote}) => {

  const [note, setNote] = useState(null);

  const getNote = async () => {
    try {
      if (!selectedNote) {
        throw new Error("No id to retrieve note.");
      }

      const response = await axios.get(`http://localhost:8080/api/notes/${selectedNote}`);
      setNote(response.data);
    }
    catch (error) {
      console.error(error);
    }
  }


  const updateTitle = async (event) => {
    try {
      const response = await axios.put(`http://localhost:8080/api/notes/${selectedNote}`, {
        title: event.target.value,
        content: note.content
      });
      
    }
    catch (error) {
      console.error(error);
    }
  }

  const updateContent = async (event) => {
    try {
      const response = await axios.put(`http://localhost:8080/api/notes/${selectedNote}`, {
        title: note.title,
        content: event.target.value
      });
      
    }
    catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getNote();
  })

  const parseTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const today = new Date();
    const yesterday = new Date();
  
    yesterday.setDate(yesterday.getDate() - 1);

    if (yesterday.toDateString() == date.toDateString()) {
      return "Yesterday";
    }
    else if (today.toDateString() == date.toDateString()) {
      return "Today " + date.toLocaleTimeString();
    }

    return date.toDateString();
  }

  if (!note) {
    return (
      <div className="w-full ml-72 p-12 bg-editor">
        {/* Header | Title | Metadata */}
        <div className="px-8 py-6 border-b border-border">
          <input
            type="text"
            placeholder="Note title..."
            className="w-full text-3xl text-muted font-serif font-semibold bg-transparent text-foreground placeholder:text-muted-foreground/50 focus:outline-none"
          />
          <div className="text-text flex items-center gap-2 mt-3 text-xs text-muted-foreground/70">
            <AiOutlineClockCircle className="h-3 w-3" />
            <span>Last edited: N/A</span>
          </div>
        </div>

        {/* Notes */}
        <div className="my-4 overflow-y-auto">
          <textarea
            className="w-full h-screen box-border px-8 py-6 bg-transparent text-text focus:outline-none resize-none leading-relaxed"
            placeholder="There are no notes selected. Please select one or create one if there's none."
          >
          </textarea>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full ml-72 p-12 bg-editor">
      {/* Header | Title | Metadata */}
      <div className="px-8 py-6 border-b border-border">
        <input
          type="text"
          onChange={updateTitle}
          value={note.title}
          className="w-full text-3xl text-muted font-serif font-semibold bg-transparent text-foreground placeholder:text-muted-foreground/50 focus:outline-none"
        />
        <div className="text-text flex items-center gap-2 mt-3 text-xs text-muted-foreground/70">
          <AiOutlineClockCircle className="h-3 w-3" />
          <span>Last edited: {parseTimestamp(note.updatedAt)}</span>
        </div>
      </div>

      {/* Notes */}
      <div className="my-4 overflow-y-auto">
        <textarea
          className="w-full h-screen box-border px-8 py-6 bg-transparent text-text focus:outline-none resize-none leading-relaxed"
          placeholder="Start taking your notes here."
          onChange={updateContent}
        >
          {note.content}
        </textarea>
      </div>
    </div>
  );
}

export default Note;
