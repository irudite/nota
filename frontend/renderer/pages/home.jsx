import React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import Sidebar from '../components/sidebar.jsx'
import Note from '../components/note.jsx'

export default function HomePage() {
  return (
    <div className="flex">
      <Sidebar></Sidebar>
      <Note></Note>
    </div>
  )
}
