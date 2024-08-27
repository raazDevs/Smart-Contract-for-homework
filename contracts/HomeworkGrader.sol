// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;


contract HomeworkGrader {
    address public owner;
    uint256 public rewardMultiplier;  // Multiplier for reward calculation

    struct Submission {
        address student;
        string answer;
        uint256 timestamp;
        uint256 grade;  // Store the grade given to the submission
    }

    mapping(address => Submission) public submissions;

    event HomeworkSubmitted(address indexed student, string answer);
    event HomeworkGraded(address indexed student, uint256 grade, uint256 reward);
    event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);
    event FundsWithdrawn(address indexed owner, uint256 amount);

    constructor(uint256 _rewardMultiplier) {
        owner = msg.sender;
        rewardMultiplier = _rewardMultiplier;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can perform this action");
        _;
    }

    // Function for students to submit their homework
    function submitHomework(string memory _answer) public {
        require(bytes(_answer).length > 0, "Answer cannot be empty");
        require(submissions[msg.sender].grade == 0, "You have already submitted and been graded");

        submissions[msg.sender] = Submission(msg.sender, _answer, block.timestamp, 0);
        emit HomeworkSubmitted(msg.sender, _answer);
    }

    // Function for the owner to grade the homework and specify the student address for reward
    function gradeHomework(address _student, uint256 _grade) public onlyOwner {
        require(submissions[_student].student == _student, "No submission from this student");
        require(_grade <= 100, "Grade must be between 0 and 100");
        require(submissions[_student].grade == 0, "Homework has already been graded");

        submissions[_student].grade = _grade;

        // Calculate reward based on the grade and multiplier
        uint256 reward = _grade * rewardMultiplier * 1 ether / 100;

        // Emit the grading and reward event
        emit HomeworkGraded(_student, _grade, reward);

        // Transfer the reward to the specified student's address
        require(address(this).balance >= reward, "Not enough balance in contract to reward");
        payable(_student).transfer(reward);
    }

    // Function to view a student's submission details
    function getSubmission(address _student) public view returns (string memory, uint256, uint256) {
        Submission memory sub = submissions[_student];
        return (sub.answer, sub.grade, sub.timestamp);
    }

    // Function to transfer ownership to another address
    function transferOwnership(address newOwner) public onlyOwner {
        require(newOwner != address(0), "New owner cannot be the zero address");
        emit OwnershipTransferred(owner, newOwner);
        owner = newOwner;
    }

    // Function to withdraw funds from the contract
    function withdrawFunds(uint256 amount) public onlyOwner {
        require(amount <= address(this).balance, "Insufficient balance in contract");
        payable(owner).transfer(amount);
        emit FundsWithdrawn(owner, amount);
    }

    // Function to check the contract's balance
    function contractBalance() public view returns (uint256) {
        return address(this).balance;
    }

    // Function to receive Ether, necessary for the contract to be able to send rewards
    receive() external payable {}
}
