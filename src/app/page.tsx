import Layouts from "@/components/Layouts";
import HomePage from "./home/page";

export default function Home() {
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen gap-16">
      <Layouts isHeader={true} isFooter={true}>
        <HomePage />
      </Layouts>
    </div>
  );
}
