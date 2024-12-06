# TypeScript React Text-to-Speech Web API

## Overview

This is a React/TypeScript application that uses the Web Speech API to convert user-input text into speech. Users can type in a text prompt, select a voice, adjust the pitch and speed, and listen to the generated speech using the browser's built-in text-to-speech capabilities.

---

## Features

- **Text Input:** Allows users to type a word or phrase to be spoken.
- **Voice Selection:** Provides a list of available voices on the system to choose from.
- **Pitch Adjustment:** Lets users modify the pitch of the speech output.
- **Speed Adjustment:** Enables users to control the speech rate.
- **Playback Controls:** Includes play and pause buttons for speech playback.

---

## Technologies Used

- **React:** Front-end JavaScript library for building user interfaces.
- **TypeScript:** Strongly-typed programming language that builds on JavaScript.
- **Web Speech API:** Browser API for text-to-speech capabilities.
- **React-Bootstrap:** UI library for responsive components and styling.

---

## Getting Started

### Prerequisites

- Node.js and npm installed on your system.
- A modern web browser with support for the Web Speech API (e.g., Chrome, Edge).

---

### Installation

1. Clone the repository:

```bash
git clone https://github.com/your-username/text-to-speech-app.git
cd text-to-speech-app


```

2. Install dependencies:
   npm installed

3. Start the development server:
   npm Start

4. Open the app in your browser at:
   http://localhost:3000

## How to Use

1. **Enter Text:**
   Type a word or phrase in the text input field.

2. **Choose a Voice:**
   Select a voice from the dropdown list.

3. **Adjust Pitch and Speed:**

- Select a pitch value between `0.1` and `2.0` from the dropdown.
- Choose a speech rate value between `0.5` and `2.0`.

4. **Play Speech:**
   Click the "play" button to hear the text spoken aloud.

5. **Pause Speech:**
   Click the "pause" button to stop the playback.

---

## File Structure

```plaintext
src/
├── components/
│   └── FormComponent.tsx  # Main form component for user interaction
├── styles/
│   └── styles.css         # Application styles
├── App.tsx                # Main app component
├── index.tsx              # Application entry point
└── package.json           # Project dependencies and scripts
```
