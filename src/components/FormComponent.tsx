import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";

interface FormData {
  name: string;
  voice: string;
  pitch: number;
}

const FormComponent: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<FormData>({
    name: "",
    voice: "",
    pitch: 1,
  });
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [errors, setErrors] = useState<string>("");

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
      if (searchTerm.name.length > 0) {
        window.speechSynthesis.cancel();
        let msg = new SpeechSynthesisUtterance();
        msg.text = searchTerm.name;
        msg.voice =
          voices.find((voice) => voice.name === searchTerm.voice) || voices[0];
        msg.pitch = searchTerm.pitch;
        window.speechSynthesis.speak(msg);
        setErrors("");
      } else {
        setErrors(
          "Error - please add a term for the text-to-speech api to speak"
        );
      }
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
        {errors ? <h6 className="errorText">{errors}</h6> : ""}
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
        <Form.Group className="mb-3" controlId="formBasicSelectPitch">
          <Form.Label>Select Pitch</Form.Label>
          <Form.Select
            name="pitch"
            value={searchTerm.pitch.toString()}
            onChange={handleChange}
          >
            <option value="0.1">0.1</option>
            <option value="0.2">0.2</option>
            <option value="0.3">0.3</option>
            <option value="0.4">0.4</option>
            <option value="0.5">0.5</option>
            <option value="0.6">0.6</option>
            <option value="0.7">0.7</option>
            <option value="0.8">0.8</option>
            <option value="0.9">0.9</option>
            <option value="1.0">1.0</option>
            <option value="1.1">1.1</option>
            <option value="1.2">1.2</option>
            <option value="1.3">1.3</option>
            <option value="1.4">1.4</option>
            <option value="1.5">1.5</option>
            <option value="1.6">1.6</option>
            <option value="1.7">1.7</option>
            <option value="1.8">1.8</option>
            <option value="1.9">1.9</option>
            <option value="2.0">2.0</option>
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
          <p>
            <i>"{searchTerm.name}"</i>
          </p>
          <h6>
            Press the <em>play</em> button to speak this word or phrase
          </h6>
        </div>
      ) : null}
    </>
  );
};

export default FormComponent;
