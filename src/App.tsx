import React from 'react';
import './styles/styles.css';

const App = () => {
  if ('speechSynthesis' in window) {
    var msg = new SpeechSynthesisUtterance();
    msg.text = "original message";
    window.speechSynthesis.speak(msg);
   }else{
     alert("Sorry, your browser doesn't support text to speech!");
   }

  return (
    <div className="App">
      <h1>TypeScript React Text to Speech Web API</h1>
    </div>
  );
}

export default App;
