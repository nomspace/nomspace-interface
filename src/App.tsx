import React from "react";
import { SideNav } from "src/components/SideNav";
import { Container, Grid } from "theme-ui";
import { Redirect, Route, Switch } from "react-router-dom";
import { Search } from "src/pages/Search";
import { SearchDetail } from "src/pages/SearchDetail";
import { Manage } from "src/pages/Manage";

const App: React.FC = () => {
  return (
    <Grid sx={{ gridTemplateColumns: "auto 1fr", gridGap: 54, my: 6, mx: 4 }}>
      <SideNav />
      <Container>
        <Switch>
          <Route exact path="/">
            <Redirect to="/search" />
          </Route>
          <Route exact path="/search">
            <Search />
          </Route>
          <Route path="/search/:name">
            <SearchDetail />
          </Route>
          <Route path="/manage">
            <Manage />
          </Route>
        </Switch>
      </Container>
    </Grid>
  );
};

export default App;
