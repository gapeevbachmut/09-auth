import SidebarNotes from '@/components/SidebarNotes/SidebarNotes';
import { getTagsServer } from '@/lib/api/serverApi';

export default async function NotesSidebar() {
  const tags = await getTagsServer(); // або статично ['Todo','Work','Personal','Meeting','Shopping']

  return (
    <aside>
      <SidebarNotes tags={tags} />
    </aside>
  );
}
