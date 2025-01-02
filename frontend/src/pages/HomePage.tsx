import { SearchBox } from "../components/SearchBox";

export default function HomePage() {
  return (
    <>
      <div className="container mx-auto flex justify-center items-center flex-col space-y-4">
        <h1 className="font-bold mt-8 text-4xl text-[--primary-color]">
          Welcome to a Simple Todo App
        </h1>
        <h3 className="font-semibold pt-8 text-3xl">TODO List</h3>
        <SearchBox />
      </div>
    </>
  );
}
