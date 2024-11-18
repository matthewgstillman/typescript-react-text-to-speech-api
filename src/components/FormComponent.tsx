import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

interface FormData {
  name: string;
}

const FormComponent = () => {
  const [searchTerm, setSearchTerm] = useState<FormData>({ name: "" });

  const speechSynthesis = (searchParameter: string) => {
    if ("speechSynthesis" in window) {
      let msg = new SpeechSynthesisUtterance();
      msg.text = searchParameter;
      window.speechSynthesis.speak(msg);
    } else {
      alert("Sorry, your browser doesn't support text to speech!");
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm({ name: event.target.value });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(`Search Term about to be submitted: ${searchTerm.name}`);
    speechSynthesis(searchTerm.name);
  };

  return (
    <>
      <h6 className="formComponentMainHeader">
        Enter a word or phrase you would like to be spoken by Text to Speech in
        the form below
      </h6>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicText">
          <Form.Control
            type="text"
            placeholder="Enter text"
            name="name"
            value={searchTerm.name}
            onChange={handleChange}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
      {searchTerm.name ? (
        <div className="searchTermContainer">
          <h4>{searchTerm.name}</h4>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default FormComponent;
