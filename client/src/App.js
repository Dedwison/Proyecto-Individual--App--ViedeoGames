import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import LandingPage from "./componets/LandingPage";
import CreateVideogame from "./componets/CreateVideogame";
import Detail from "./componets/Detail";
import Home from "./componets/Home";
import axios from "axios";
axios.defaults.baseURL = "https://amused-spiders-production.up.railway.app/";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route path="/home" component={Home} />
          <Route path="/create" component={CreateVideogame} />
          <Route path="/videogames/:id" component={Detail} />
        </Switch>
        {/* <h1>Henry Videogames</h1> */}
      </div>
    </BrowserRouter>
  );
}

export default App;
