import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import Articleroutes from "./routes/Articleroutes";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route
            exact
            path="/"
            render={() => {
              return <Redirect to="/article" />;
            }}
          />

          <Articleroutes />
        </Switch>
      </Router>

      <ToastContainer position="top-center" hideProgressBar={true} />
    </>
  );
}

export default App;
