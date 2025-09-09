type Props = {
  children: React.ReactNode;
};

export default function NotesLayout({ children }: Props) {
  return (
    <section>
      <div>{children}</div>
    </section>
  );
}
