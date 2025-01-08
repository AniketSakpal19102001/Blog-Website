function BaseLayout({
  componentLeft: ComponentLeft,
  componentRight: ComponentRight,
}) {
  return (
    <>
      <div className="flex md:mx-auto min-h-screen  w-full md:w-4/5">
        <div className="w-full md:w-4/6 px-6 py-4 flex flex-col relative md:pr-10 border-r">
          <ComponentLeft />
        </div>
        <div className="hidden md:block w-full md:w-2/6 px-6 py-4 md:pl-10">
          <ComponentRight />
        </div>
      </div>
    </>
  );
}

export default BaseLayout;
