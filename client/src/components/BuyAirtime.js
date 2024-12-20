import React, { useState } from 'react';

const BuyAirtime = ({ wallet, setWallet, userId }) => {
    const [fromAccount, setFromAccount] = useState('');
    const [amount, setAmount] = useState('');
    const [mobileNumber, setMobileNumber] = useState(''); // State for mobile number
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleBuyAirtime = async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch(`http://localhost:5000/api/wallet/${userId}/buyAirtime`, {
                method: 'POST',
                body: JSON.stringify({ fromAccount, amount, mobileNumber }), // Include mobile number in payload
                headers: { 'Content-Type': 'application/json' },
            });

            if (!response.ok) {
                throw new Error('Airtime purchase failed');
            }

            const updatedWallet = await response.json();
            setWallet(updatedWallet.accounts);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <select onChange={(e) => setFromAccount(e.target.value)} value={fromAccount}>
                <option value="">Select Account</option>
                {wallet.map((account) => (
                    <option key={account._id} value={account._id}>
                        {account.accountType} - Balance: {account.balance}
                    </option>
                ))}
            </select>

            <input
                type="text"
                placeholder="Mobile Number"
                value={mobileNumber}
                onChange={(e) => setMobileNumber(e.target.value)} // Update mobileNumber state
            />
            <input
                type="number"
                placeholder="Airtime Amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
            />
            <button onClick={handleBuyAirtime} disabled={loading}>
                {loading ? 'Purchasing Airtime...' : 'Buy Airtime'}
            </button>

            {error && <p>{error}</p>}
        </div>
    );
};

export default BuyAirtime;
