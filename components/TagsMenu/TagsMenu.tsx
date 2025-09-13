'use client';

import css from './TagsMenu.module.css';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { getTags } from '@/lib/api/clientApi';
import { type Note } from '@/types/note';

export default function TagsMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const [allTags, setAllTags] = useState<Note['tag'][]>([]);

  useEffect(() => {
    getTags().then(data => setAllTags(data));
  }, []);

  return (
    <div className={css.menuContainer}>
      <button className={css.menuButton} onClick={toggle}>
        Notes ▾
      </button>
      {isOpen && (
        <ul className={css.menuList}>
          <li className={css.menuItem}>
            <Link
              href={`/notes/filter/all`}
              onClick={toggle}
              className={css.menuLink}
            >
              All notes
            </Link>
          </li>
          {allTags.map(tag => (
            <li key={tag} className={css.menuItem}>
              <Link
                href={`/notes/filter/${tag}`}
                onClick={toggle}
                className={css.menuLink}
              >
                {tag}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
