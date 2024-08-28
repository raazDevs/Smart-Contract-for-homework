import React, { useState } from 'react';
import Web3 from 'web3';
import { contractABI, contractAddress } from '../config';

function CheckSubmission() {
    const [studentAddress, setStudentAddress] = useState('');
    const [submissionResult, setSubmissionResult] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const checkSubmission = async () => {
        if (!Web3.utils.isAddress(studentAddress)) {
            setError('Invalid Ethereum address');
            return;
        }

        setError('');
        setLoading(true);

        if (window.ethereum) {
            const web3 = new Web3(window.ethereum);

            try {
                // Request account access if needed
                await window.ethereum.enable();

                const contract = new web3.eth.Contract(contractABI, contractAddress);

                // Call the getSubmission method
                const result = await contract.methods.getSubmission(studentAddress).call();

                // Display the result
                setSubmissionResult(`Answer: ${result[0]}\nGrade: ${result[1]}\nTimestamp: ${new Date(result[2] * 1000).toLocaleString()}`);
            } catch (error) {
                console.error('Error fetching submission:', error);
                setError('Failed to fetch submission. Make sure the address is correct and try again.');
            }
        } else {
            alert('Please install MetaMask!');
        }

        setLoading(false);
    };

    return (
        <div className="section">
            <h2>Check Submission</h2>
            <input
                type="text"
                value={studentAddress}
                onChange={(e) => setStudentAddress(e.target.value)}
                placeholder="Student Address"
            />
            <button onClick={checkSubmission} disabled={loading}>
                {loading ? 'Checking...' : 'Check Submission'}
            </button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {submissionResult && <pre>{submissionResult}</pre>}
        </div>
    );
}

export default CheckSubmission;
