import { useState } from 'react';

import { AiOutlineClockCircle } from 'react-icons/ai'

const Note = () => {
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
          <span>Last edited</span>
        </div>
      </div>

      {/* Notes */}
      <div className="my-4 overflow-y-auto">
        <textarea
          className="w-full h-screen box-border px-8 py-6 bg-transparent text-text focus:outline-none resize-none leading-relaxed"
          placeholder="Start taking notes here"
        >
        </textarea>
      </div>
    </div>
  );
}

export default Note;
