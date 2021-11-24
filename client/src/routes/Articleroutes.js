import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import CreateEditArticle from "../Components/Blogging-Pages/CreateEditArticle";
import ReadArticle from "../Components/Blogging-Pages/ReadArticle";
import Home from "../Components/Home";

const Articleroutes = () => {
  return (
    <>
      <Router>
        <Switch>
          <Route
            exact
            path="/article"
            render={() => {
              return <Redirect to="/article/blogs" />;
            }}
          />
          <Route path="/article/blogs" component={Home} />
          <Route path="/article/new" component={CreateEditArticle} />
          <Route path="/article/:edit/:slug" component={CreateEditArticle} />
          <Route path="/article/:slug" component={ReadArticle} />
        </Switch>
      </Router>
    </>
  );
};

export default Articleroutes;
