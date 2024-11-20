import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";

interface FormData {
  name: string;
  voice: string;
}

const FormComponent = () => {
  const [searchTerm, setSearchTerm] = useState<FormData>({
    name: "",
    voice: "",
  });
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);

  useEffect(() => {
    const loadVoices = () => {
      let voicesList = window.speechSynthesis.getVoices();
      if (voicesList.length === 0) {
        setTimeout(() => {
          voicesList = window.speechSynthesis.getVoices();
          setVoices(voicesList);
        }, 100);
      } else {
        setVoices(voicesList);
      }
    };

    if (window.speechSynthesis.onvoiceschanged !== undefined) {
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }
    loadVoices();
  }, []);

  const speechSynthesis = (searchParameter: string, voiceName: string) => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      let msg = new SpeechSynthesisUtterance();
      msg.text = searchParameter;
      msg.voice = voices.find((voice) => voice.name === voiceName) || voices[0];
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

  const playSpeech = () => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      let msg = new SpeechSynthesisUtterance();
      msg.text = searchTerm.name;
      msg.voice =
        voices.find((voice) => voice.name === searchTerm.voice) || voices[0];
      window.speechSynthesis.speak(msg);
    } else {
      alert("Sorry, your browser doesn't support text to speech!");
    }
  };

  const pauseSpeech = () => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.pause();
    } else {
      alert("Sorry, your browser doesn't support text to speech!");
    }
  };

  return (
    <>
      <h6 className="formComponentMainHeader">
        Enter a word or phrase below to be spoken using text-to-speech. Use the
        play button to hear the term and the pause button to stop it.
      </h6>
      <Form>
        <Form.Group className="mb-3" controlId="formBasicText">
          <Form.Label>Text</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter term"
            name="name"
            value={searchTerm.name}
            onChange={handleChange}
          />
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
      </Form>
      <div className="controlsContainer">
        <img
          src={`${process.env.PUBLIC_URL}/play-button.svg`}
          alt="Click to play speech"
          className="playButton"
          onClick={playSpeech}
        />
        <img
          src={`${process.env.PUBLIC_URL}/pause-button.svg`}
          alt="Click to pause speech"
          className="pauseButton"
          onClick={pauseSpeech}
        />
      </div>
      {searchTerm.name ? (
        <div className="searchTermContainer">
          <h4>{searchTerm.name}</h4>
        </div>
      ) : null}
    </>
  );
};

export default FormComponent;
