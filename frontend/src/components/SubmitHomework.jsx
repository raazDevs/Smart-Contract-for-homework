import React, { useState } from 'react';
import Web3 from 'web3';
import { contractABI, contractAddress } from '../config';

function SubmitHomework() {
    const [answer, setAnswer] = useState('');

    const submitHomework = async () => {
        if (window.ethereum) {
            const web3 = new Web3(window.ethereum);
            await window.ethereum.enable();
            const contract = new web3.eth.Contract(contractABI, contractAddress);
            const accounts = await web3.eth.getAccounts();

            try {
                await contract.methods.submitHomework(answer).send({ from: accounts[0] });
                alert('Homework submitted successfully!');
            } catch (error) {
                console.error(error);
            }
        } else {
            alert('Please install MetaMask!');
        }
    };

    return (
        <div className="section">
            <h2>Submit Homework</h2>
            <textarea
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                placeholder="Enter your homework answer..."
            />
            <button onClick={submitHomework}>Submit Homework</button>
        </div>
    );
}

export default SubmitHomework;
