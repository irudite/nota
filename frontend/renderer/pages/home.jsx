import { useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import Sidebar from '../components/sidebar.jsx'
import Note from '../components/note.jsx'

export default function HomePage() {
  const [selectedNote, setSelectedNote] = useState(null);

  return (
    <div className="flex">
      <Sidebar setSelectedNote={setSelectedNote}></Sidebar>
      <Note selectedNote={selectedNote}></Note>
    </div>
  )
}
