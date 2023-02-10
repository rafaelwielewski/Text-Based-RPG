export default function LoginLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <div className="">
      <div className="bg-darkest h-full flex grid grid-cols-12 justify-items-center justify-center">
        <span className="flex col-span-12 text-primary text-title font-title">
          Writtem Kingdom
        </span>
        <div className="flex col-span-12 w-200 h-auto bg-secondary border-8 border-black items-center justify-center">
          {children}
        </div>
          <div className="py-8"></div>
      </div>
      </div>
    </section>
  );
}
