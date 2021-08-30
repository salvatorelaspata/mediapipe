import './App.css';
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import Home from './pages/Home';
import NavBar from './components/NavBar';
import MediaPipe from './pages/MediaPipe';

function App() {
    return (
        <Router>
            <NavBar />
            <div>
                <Switch>
                    <Route path="/about">
                        <div>/about</div>
                    </Route>
                    <Route path="/mediapipe">
                        <MediaPipe />
                    </Route>
                    <Route exact path="/">
                        <Home />
                    </Route>
                    <Route path="*">
                        <div>404</div>
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}

export default App;
