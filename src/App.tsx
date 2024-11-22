import "./styles/styles.css";
import FormComponent from "./components/FormComponent";
import { Container } from "react-bootstrap";

const App: React.FC = () => {
  return (
    <div className="App">
      <Container>
        <h1 className="mainHeader">TypeScript React Text to Speech Web API</h1>
        <FormComponent />
      </Container>
    </div>
  );
};

export default App;
