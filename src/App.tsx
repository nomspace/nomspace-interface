import React from "react";
import { Container } from "theme-ui";
import { Route, Switch } from "react-router-dom";
import { Search } from "pages/Search";
import { SearchDetail } from "pages/SearchDetail";
import { Extend } from "pages/Extend";
import Modal from "react-modal";
import { Footer } from "components/Footer";
import { ToastContainer } from "react-toastify";
import { Stats } from "./pages/Stats";
import { Manage } from "pages/Manage";

const App: React.FC = () => {
  React.useEffect(() => {
    Modal.setAppElement("body");
  });

  return (
    <Container sx={{ maxWidth: "100%", width: "100%" }}>
      <Container>
        {/* <Header /> */}
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
          <Route exact path="/:name/manage">
            <Manage />
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
