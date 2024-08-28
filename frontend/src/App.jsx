import React from 'react';
import SubmitHomework from './components/SubmitHomework';
import GradeHomework from './components/GradeHomework';
import CheckSubmission from './components/CheckSubmission';
import ConnectWallet from './components/ConnectWallet'; // Import the ConnectWallet component
import './App.css';

function App() {
    return (
      <div className="App">
      <h1>Homework Grader</h1> {/* Heading is placed here, above the Connect Wallet component */}
      <ConnectWallet /> {/* Connect Wallet button is below the heading */}
      <SubmitHomework />
      <GradeHomework />
      <CheckSubmission />
  </div>
  
    );
}

export default App;
