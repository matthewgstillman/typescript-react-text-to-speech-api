import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

interface FormData {
  name: string;
  language: string;
  voice: string;
}

const FormComponent = () => {
  const [searchTerm, setSearchTerm] = useState<FormData>({
    name: "",
    language: "en-US",
    voice: "",
  });
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);

  useEffect(() => {
    const loadVoices = () => {
      const availableVoices = window.speechSynthesis.getVoices();
      setVoices(availableVoices);
    };

    if (window.speechSynthesis.onvoiceschanged !== undefined) {
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }
    loadVoices();
  }, []);

  const speechSynthesis = (
    searchParameter: string,
    lang: string,
    voiceName: string
  ) => {
    if ("speechSynthesis" in window) {
      let msg = new SpeechSynthesisUtterance();
      msg.text = searchParameter;
      msg.lang = lang;
      msg.voice = voices.find((voice) => voice.name === voiceName) || voices[0]; // Set selected voice or fallback
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
    speechSynthesis(searchTerm.name, searchTerm.language, searchTerm.voice);
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
        <Form.Group className="mb-3" controlId="formBasicSelectLanguage">
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
        <Form.Group className="mb-3" controlId="formBasicSelectVoice">
          <Form.Label>Select Voice</Form.Label>
          <Form.Select
            name="voice"
            value={searchTerm.voice}
            onChange={handleChange}
          >
            {voices.map((voice, index) => (
              <option key={index} value={voice.name}>
                {voice.name} ({voice.lang})
              </option>
            ))}
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
