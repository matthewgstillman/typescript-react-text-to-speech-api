import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const FormComponent = () => {
  if ("speechSynthesis" in window) {
    let msg = new SpeechSynthesisUtterance();
    msg.text = "original message";
    window.speechSynthesis.speak(msg);
  } else {
    alert("Sorry, your browser doesn't support text to speech!");
  }
  return (
    <Form>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>
          Type in a word you want the the Text To Speech editor to speak:
        </Form.Label>
        <Form.Control type="email" placeholder="Enter email" />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};

export default FormComponent;
