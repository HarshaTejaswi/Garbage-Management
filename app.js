// Import Web3.js library
const Web3 = require('web3');

// Connect to a local Ethereum node
const web3 = new Web3('http://localhost:8000'); // Update with your Ethereum node URL

// Import the compiled GarbageToken contract ABI and contract address
const GarbageToken = require('./build/contracts/GarbageToken.json'); // Update with your contract path
const contractAddress = '0xA057aB5c6fD2CFE25E3EbB0ca0DD16d7FA19475E'; // Update with your contract address

// Create a new instance of the GarbageToken contract
const garbageToken = new web3.eth.Contract(GarbageToken.abi, contractAddress);

// Function to update user points
async function updateUserPoints() {
  try {
    // Get the current account (you can change this as needed)
    const accounts = await web3.eth.getAccounts();
    const account = accounts[0];

    // Call the 'getUserPoints' function of the contract
    const userPoints = await garbageToken.methods.getUserPoints(account).call();

    // Display user points
    document.querySelector('#userPoints').textContent = userPoints;
  } catch (error) {
    // Handle errors, e.g., display an error message
    alert('Error updating user points: ' + error.message);
  }
}

// Function to dispose garbage
async function disposeGarbage() {
  try {
    // Get the current account (you can change this as needed)
    const accounts = await web3.eth.getAccounts();
    const account = accounts[0];

    // Call the 'dispose' function of the contract
    await garbageToken.methods.dispose().send({
      from: account,
    });

    // Display a success message
    alert('Garbage disposed successfully!');

    // Update user points after disposal
    updateUserPoints();
  } catch (error) {
    // Handle errors, e.g., display an error message
    alert('Error disposing garbage: ' + error.message);
  }
}

// Add a click event listener to the "Dispose Garbage" button
document.querySelector('#disposeButton').addEventListener('click', disposeGarbage);

// Call updateUserPoints to initialize user points
updateUserPoints();