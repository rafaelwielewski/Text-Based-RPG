export default function HomeLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex container justify-center w-full">
      <div className="">{children}</div>
    </div>
  );
}
