import React, { useState } from 'react';

const RetrieveBalance = ({ accountId, userId }) => {
    const [balance, setBalance] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchBalance = async () => {
        setLoading(true);
        setError(null);
        try {
            const bankResponse = await fetch(`http://localhost:5000/api/bank/${userId}/balance`);
            const mpesaResponse = await fetch(`http://localhost:5000/api/mpesa/${accountId}/balance`);

            if (!bankResponse.ok || !mpesaResponse.ok) {
                throw new Error('Failed to retrieve balances');
            }

            const bankData = await bankResponse.json();
            const mpesaData = await mpesaResponse.json();

            setBalance({
                bankBalance: bankData.balance,
                mpesaBalance: mpesaData.balance,
            });
        } catch (error) {
            setError('Error fetching balance');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <button onClick={fetchBalance} disabled={loading}>
                {loading ? 'Fetching Balance...' : 'Retrieve Balance'}
            </button>
            {error && <p>{error}</p>}
            {balance && (
                <div>
                    <p>Bank Balance: {balance.bankBalance}</p>
                    <p>MPESA Balance: {balance.mpesaBalance}</p>
                </div>
            )}
        </div>
    );
};

export default RetrieveBalance;
