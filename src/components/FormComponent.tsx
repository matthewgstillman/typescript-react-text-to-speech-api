import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

interface FormData {
  name: string;
  language: string;
}

const FormComponent = () => {
  const [searchTerm, setSearchTerm] = useState<FormData>({
    name: "",
    language: "en-US",
  });

  const speechSynthesis = (searchParameter: string, lang: string) => {
    if ("speechSynthesis" in window) {
      let msg = new SpeechSynthesisUtterance();
      msg.text = searchParameter;
      msg.lang = lang;
      window.speechSynthesis.speak(msg);
    } else {
      alert("Sorry, your browser doesn't support text to speech!");
    }
  };

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = event.target;
    setSearchTerm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(`Search Term about to be submitted: ${searchTerm.name}`);
    speechSynthesis(searchTerm.name, searchTerm.language);
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
        <Form.Group className="mb-3" controlId="formBasicSelect">
          <Form.Label>Select Language</Form.Label>
          <Form.Select
            name="language"
            value={searchTerm.language}
            onChange={handleChange}
          >
            <option value="en-US">English (US)</option>
            <option value="en-GB">English (UK)</option>
            <option value="es-ES">Spanish (Spain)</option>
            <option value="fr-FR">French</option>
            <option value="de-DE">German</option>
          </Form.Select>
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
      {searchTerm.name ? (
        <div className="searchTermContainer">
          <h4>{searchTerm.name}</h4>
        </div>
      ) : null}
    </>
  );
};

export default FormComponent;
