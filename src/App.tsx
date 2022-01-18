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
import { GlobalNom } from "hooks/useNom";

// TODO: REMOVE AFTER BETA
import { BetaModal } from "components/Modal/BetaModal";

const App: React.FC = () => {
  React.useEffect(() => {
    Modal.setAppElement("body");
  });

  // TODO: REMOVE AFTER BETA
  const [betaVerified, setBetaVerified] = React.useState(false);

  return (
    <>
      <Container
        sx={{ maxWidth: "100%", width: "100%", height: "100vh" }}
        variant="containers.scroll"
      >
        <Container sx={{ height: "100%" }}>
          {/* <Header /> */}
          <Switch>
            <Route exact path="/">
              <Search />
            </Route>
            <Route exact path="/stats">
              <Stats />
            </Route>
            <Route path="/:name">
              <GlobalNom.Provider>
                {/* TODO: REMOVE AFTER BETA */}
                {!betaVerified ? (
                  <BetaModal setBetaVerified={setBetaVerified} />
                ) : (
                  <Switch>
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
                )}
              </GlobalNom.Provider>
            </Route>
          </Switch>
        </Container>
        <Footer />
        <ToastContainer
          enableMultiContainer
          // style={{ background: "var(--theme-ui-colors-background)" }}
          toastClassName="toast-body"
          bodyClassName="toast-body"
        />
      </Container>
    </>
  );
};

export default App;
