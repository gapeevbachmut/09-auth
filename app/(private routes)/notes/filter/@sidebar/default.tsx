import SidebarNotes from '@/components/SidebarNotes/SidebarNotes';
import { getTags } from '@/lib/api/clientApi';
// import Link from 'next/link';

export default async function NotesSidebar() {
  const tags = await getTags(); // або статично ['Todo','Work','Personal','Meeting','Shopping']

  return (
    <aside>
      <SidebarNotes tags={tags} />
    </aside>
  );
}
