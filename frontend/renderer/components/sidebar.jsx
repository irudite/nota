import { useEffect, useState, useRef } from 'react';
import axios from 'axios';

import { BsSearch } from 'react-icons/bs';
import { AiFillFolderOpen } from 'react-icons/ai';
import { AiOutlineClockCircle } from 'react-icons/ai'
import { FaTrash } from "react-icons/fa";

const Sidebar = ({setSelectedNote}) => {

  const [notes, setNotes] = useState([]);
  const [filtered, setFiltered] = useState(notes);
  const inputRef = useRef(null);

  const getNotes = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/notes'); 
      setNotes(response.data);
      setFiltered(response.data);
    }
    catch (error) {
      console.error("Error fetching notes: ", error);  
    }
  }

  useEffect(() => {
    getNotes();
  })

  const addNote = async () => {
    const title = ""
    const content = ""

    await axios.post('http://localhost:8080/api/notes', {
      title,
      content
    });
  }

  const deleteNote = async (id) => {
    try {
      if (!id) {
        throw new Error("No id was passed to delete a note.");
      }

      await axios.delete(`http://localhost:8080/api/notes/${id}`); 
    }
    catch (error) {
      console.error(error);
    }
  }

  const searchNote = (event) => {
    inputRef.current.value = event.target.value;
    const filteredNotes = notes.filter((note) => note.title.toLowerCase().includes(inputRef.current.value.toLowerCase()));
    setFiltered(filteredNotes);
  }

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
  
  return (
    <aside className="fixed border w-72 h-screen bg-sidebar border-border flex flex-col p-4">
      <div className="border border-border rounded-xl p-8">
        {/* Logo */}
        <div>
          <h1 className="text-3xl font-bold font-serif flex flex-row text-muted"> <AiFillFolderOpen className="my-1 mx-2 text-accent"></AiFillFolderOpen> Nota </h1>
        </div>

        {/* Searchbar */}
        <div className="relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted">
              <BsSearch></BsSearch>
            </span>
            <input className="border-2 focus:outline-none w-full p-1 pl-10 rounded-lg text-muted bg-editor border-border" type="text" name="searchbar" placeholder="Search notes" 
            ref={inputRef} onChange={searchNote}/>
        </div>
      </div>

      {/* List */}
      <div className="my-8 overflow-y-auto">
        <button className="rounded-lg w-full bg-accent border-border p-2 px-6 hover:opacity-90 active:scale-[0.98]" onClick={addNote}> + New Note </button>
        <div className="my-4">
          {filtered.sort((a, b) => b.updatedAt - a.updatedAt).map((note) => {
            return (
              <a onClick={() => setSelectedNote(note.noteId)}>
                <div className="my-2 p-2 border rounded-lg border-border bg-editor" key={note.noteId}>
                  <h3 className="text-muted font-serif">{note.title}</h3>
                  <div className="text-text flex items-center gap-2 mt-3 text-xs text-muted-foreground/70">
                    <AiOutlineClockCircle/>
                    <span className="text-sm text-text font-serif"> Last edited: {parseTimestamp(note.updatedAt)}</span>
                    <a onClick={() => {
                      if (notes.length === 1) {
                        setSelectedNote(null)
                      }
                      deleteNote(note.noteId)
                    }}>
                      <FaTrash className="hover:text-red-400"/>
                    </a>
                  </div>
                </div>
              </a>
            )
          })}
        </div>
      </div>

      <footer className="absolute bottom-0 py-2 w-full">
        <label className="text-muted"> {notes.length} Notes </label>
      </footer>
    </aside>
  )
}

export default Sidebar;
