// Initialize the connection to the Solana cluster
const connection = new solanaWeb3.Connection(solanaWeb3.clusterApiUrl('mainnet-beta'));

// Connect Wallet function
async function connectWallet() {
    const provider = window.solana;

    if (provider && provider.isPhantom) {
        try {
            const response = await provider.connect();
            const publicKey = response.publicKey.toString();
            document.getElementById('wallet-status').innerText = `Wallet Status: Connected (${publicKey})`;

            // Fetch wallet data after connecting
            const walletData = await fetchWalletData(publicKey);
            updateWalletData(walletData);
        } catch (err) {
            console.error(err);
            document.getElementById('wallet-status').innerText = "Wallet Status: Not Connected";
        }
    } else {
        alert("Please install Phantom Wallet!");
    }
}

// Placeholder function to fetch wallet data (you will need to implement actual API calls)
async function fetchWalletData(publicKey) {
    try {
        // Fetch the actual balance from the blockchain
        const balance = await connection.getBalance(new solanaWeb3.PublicKey(publicKey));
        const balanceInSol = solanaWeb3.lamportsToSol(balance); // Convert lamports to SOL

        // For demonstration purposes, using random data for holdings and transactions
        return {
            balance: balanceInSol,
            holdings: [{ name: "Solana", amount: (Math.random() * 100).toFixed(2) }],
            transactions: [{ id: "tx1", amount: 0.5, date: "2024-10-28" }],
        };
    } catch (error) {
        console.error("Error fetching wallet data:", error);
        return {
            balance: 0,
            holdings: [],
            transactions: [],
        };
    }
}

// Update the wallet data display
function updateWalletData(data) {
    document.getElementById('wallet-balance').innerText = `Balance: ${data.balance.toFixed(2)} SOL`;
    document.getElementById('token-holdings').innerText = `Holdings: ${data.holdings.length ? data.holdings.map(h => `${h.name}: ${h.amount}`).join(', ') : 'None'}`;
    document.getElementById('recent-transactions').innerText = `Recent Transactions: ${data.transactions.length ? data.transactions.map(t => `ID: ${t.id}, Amount: ${t.amount} SOL on ${t.date}`).join('; ') : 'None'}`;
}

// Function to send messages
function sendMessage() {
    const inputField = document.getElementById("user-input");
    const userMessage = inputField.value.trim();
    
    if (userMessage) {
        // Display user's message
        const chatWindow = document.getElementById("chat-window");
        const userMsgElement = document.createElement("div");
        userMsgElement.className = "chat-message user-message animate";
        userMsgElement.innerText = userMessage;
        chatWindow.appendChild(userMsgElement);

        // Responses Array
        const responses = [
            "Stop wasting time typing. Money doesn’t wait for anyone.",
            "Lock yourself in. Focus on making money, not on chatting.",
            "You think this conversation will make you rich? Get real and start grinding.",
            "Quit messing around. The world’s not going to hand you success. Go earn it.",
            "You're wasting time here. Go get to work and start making something of yourself.",
            "Stop typing and start building. Success doesn’t come to people who waste time.",
            "Talk is cheap. Go make something that’s actually worth something.",
            "You’ve got more important things to do than chatting. Money won’t make itself.",
            "Quit with the excuses. Start working if you want to see real results.",
            "This is not the time for distractions. Lock in and go make some cash.",
            "You’re typing all day but not earning a dime. Change that.",
            "Focus on making money, not on wasting time with pointless conversations.",
            "The real work happens outside of this chat. Go out and hustle.",
            "If you're not working on building your future, you're just wasting time.",
            "You’re wasting precious moments. Go earn something while you can.",
            "Stop talking and start doing. That’s how you get rich.",
            "Words don’t make you money. Actions do. Get to work.",
            "Quit thinking you’ll get rich by chatting here. Put in the work.",
            "Time is money. So what are you doing here?",
            "Lock in, stop procrastinating, and go get the cash you’re talking about.",
            "No more typing. Focus on the grind if you want results.",
            "Success won’t fall into your lap. Go out and hustle for it.",
            "Stop chatting and start doing something that’ll actually pay off.",
            "Words won’t get you rich. Focus on what’s going to make you money.",
            "You have zero time to waste. Start working towards your goals now.",
            "Time is ticking. Stop wasting it and start earning.",
            "This isn’t the time for idle chat. Get focused and make money.",
            "If you're not working on your future, you’re falling behind. Go hustle.",
            "The grind never stops. Stop typing and get to work.",
            "Your future is being built right now. Don’t waste it chatting away."
        ];
        

        // Simulate AI response
        setTimeout(() => {
            const botMsgElement = document.createElement("div");
            botMsgElement.className = "chat-message bot-message animate";
            botMsgElement.innerText = responses[Math.floor(Math.random() * responses.length)];
            chatWindow.appendChild(botMsgElement);
            chatWindow.scrollTop = chatWindow.scrollHeight; // Scroll to the bottom
        }, 1000);

        
        inputField.value = ""; // Clear input
    }
}

// Add event listener for wallet connection on page load
window.onload = () => {
    if (window.solana && window.solana.isPhantom) {
        window.solana.on('connect', connectWallet);
        window.solana.on('disconnect', () => {
            document.getElementById('wallet-status').innerText = `Wallet Status: Not Connected`;
            document.getElementById('wallet-balance').innerText = `Balance: 0 SOL`;
            document.getElementById('token-holdings').innerText = `Holdings: None`;
            document.getElementById('recent-transactions').innerText = `Recent Transactions: None`;
        });
    }
};
