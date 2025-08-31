import { Container } from "@/components/container";
import Footer from "@/components/footer";
import Header from "@/components/header";
import { Outlet } from "react-router";

const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen gradient-bg">
      <Header />
      <Container className="flex-grow py-8">
        <main className="flex-grow animate-fade-in">
          <Outlet />
        </main>
      </Container>

      {/* footer */}
      <Footer />
    </div>
  );
};

export default MainLayout;