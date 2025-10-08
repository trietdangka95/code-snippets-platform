import Header from "../HeaderPage";
import Footer from "../FooterPage";

const Layouts = ({
  children,
  isHeader,
  isFooter,
}: {
  children: React.ReactNode;
  isHeader: boolean;
  isFooter: boolean;
}) => {
  return (
    <>
      {isHeader && <Header />}
      <div className="">
        {children}
        {isFooter && <Footer />}
      </div>
    </>
  );
};

export default Layouts;
