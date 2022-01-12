import React from "react";
import { Container } from "theme-ui";
import { Route, Switch, useLocation } from "react-router-dom";
import { Search } from "src/pages/Search";
import { SearchDetail } from "src/pages/SearchDetail";
import { Reserve } from "src/pages/Reserve";
import { Extend } from "src/pages/Extend";
import { Request } from "src/pages/Request";
import { Header } from "src/components/Header";
import Modal from "react-modal";
import { Footer } from "src/components/Footer";
import { ToastContainer } from "react-toastify";
import { Stats } from "./pages/Stats";
import { NomstronautView } from "./pages/Nomstronaut";
import background from "src/images/stars.jpeg";

const App: React.FC = () => {
  React.useEffect(() => {
    Modal.setAppElement("body");
  });
  const location = useLocation();

  return (
    <Container sx={{ 
      maxWidth: "100%",
       width: "auto", 
       backgroundImage: location.pathname === '/nomstronaut/nomstronaut' && `url(${background})`}}>
      <Container sx={{ py: 6, px: [4, "15%"] }}>
        <Header />
        <Switch>
          <Route exact path="/">
            <Search />
          </Route>
          <Route exact path="/stats">
            <Stats />
          </Route>
          <Route exact path="/:name">
            <SearchDetail />
          </Route>
          <Route exact path="/nomstronaut/nomstronaut">
            <NomstronautView />
          </Route>
          <Route exact path="/:name/reserve">
            <Reserve />
          </Route>
          <Route exact path="/:name/request">
            <Request />
          </Route>
          <Route exact path="/:name/extend">
            <Extend />
          </Route>
        </Switch>
      </Container>
      <Footer />
      <ToastContainer
        style={{ background: "var(--theme-ui-colors-background)" }}
        toastClassName="toast-body"
        bodyClassName="toast-body"
      />
    </Container>
  );
};

export default App;
