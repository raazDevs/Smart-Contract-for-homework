import React, { useState } from 'react';
import Web3 from 'web3';
import { contractABI, contractAddress } from '../config';

function GradeHomework() {
    const [studentAddress, setStudentAddress] = useState('');
    const [grade, setGrade] = useState('');
    const [feedback, setFeedback] = useState(''); // Added feedback for success/error

    const gradeHomework = async () => {
        // Check if MetaMask is installed
        if (!window.ethereum) {
            alert('Please install MetaMask!');
            return;
        }

        // Validate input fields
        if (!studentAddress || !Web3.utils.isAddress(studentAddress)) {
            setFeedback('Invalid student address.');
            return;
        }

        if (grade < 0 || grade > 100 || isNaN(grade)) {
            setFeedback('Please enter a valid grade between 0 and 100.');
            return;
        }

        const web3 = new Web3(window.ethereum);

        try {
            await window.ethereum.request({ method: 'eth_requestAccounts' }); // Request MetaMask accounts
            const contract = new web3.eth.Contract(contractABI, contractAddress); // Instantiate contract
            const accounts = await web3.eth.getAccounts(); // Fetch user accounts

            // Send the transaction to grade homework
            await contract.methods.gradeHomework(studentAddress, grade).send({ from: accounts[0] });
            setFeedback('Homework graded successfully!');
        } catch (error) {
            console.error("Error grading homework: ", error);
            setFeedback('An error occurred while grading homework. Check the console for more details.');
        }
    };

    return (
        <div className="section">
            <h2>Grade Homework</h2>
            <input
                type="text"
                value={studentAddress}
                onChange={(e) => setStudentAddress(e.target.value)}
                placeholder="Student Address"
            />
            <input
                type="number"
                value={grade}
                onChange={(e) => setGrade(e.target.value)}
                placeholder="Grade (0-100)"
            />
            <button onClick={gradeHomework}>Grade Homework</button>
            {feedback && <p>{feedback}</p>} {/* Display feedback for success or error */}
        </div>
    );
}

export default GradeHomework;
