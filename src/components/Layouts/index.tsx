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
      {children}
      {isFooter && <Footer />}
    </>
  );
};

export default Layouts;
