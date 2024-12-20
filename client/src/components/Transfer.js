// import React, { useState } from 'react';

// const Transfer = ({ wallet, setWallet, userId }) => {
//     const [fromAccount, setFromAccount] = useState('');
//     const [toAccount, setToAccount] = useState('');
//     const [amount, setAmount] = useState('');
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState(null);

//     const handleTransfer = async () => {
//         if (fromAccount === toAccount) {
//             setError("Cannot transfer to the same account");
//             return;
//         }

//         setLoading(true);
//         setError(null);

//         try {
//             const response = await fetch(`http://localhost:5000/api/wallet/${userId}/transfer`, {
//                 method: 'POST',
//                 body: JSON.stringify({ fromAccount, toAccount, amount }),
//                 headers: { 'Content-Type': 'application/json' },
//             });

//             if (!response.ok) {
//                 throw new Error('Transfer failed');
//             }

//             const updatedWallet = await response.json();
//             setWallet(updatedWallet.accounts);
//         } catch (error) {
//             setError(error.message);
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <div>
//             <select onChange={(e) => setFromAccount(e.target.value)} value={fromAccount}>
//                 <option value="">Select From Account</option>
//                 {wallet.map((account) => (
//                     <option key={account._id} value={account._id}>
//                         {account.accountType} - Balance: {account.balance}
//                     </option>
//                 ))}
//             </select>

//             <select onChange={(e) => setToAccount(e.target.value)} value={toAccount}>
//                 <option value="">Select To Account</option>
//                 {wallet.map((account) => (
//                     <option key={account._id} value={account._id}>
//                         {account.accountType} - Balance: {account.balance}
//                     </option>
//                 ))}
//             </select>

//             <input
//                 type="number"
//                 placeholder="Amount"
//                 value={amount}
//                 onChange={(e) => setAmount(e.target.value)}
//             />

//             <button onClick={handleTransfer} disabled={loading}>
//                 {loading ? 'Transferring...' : 'Transfer'}
//             </button>

//             {error && <p>{error}</p>}
//         </div>
//     );
// };

// export default Transfer;
import React, { useState } from 'react';

const Transfer = ({ wallet, setWallet, userId }) => {
    const [fromAccount, setFromAccount] = useState('');
    const [toAccount, setToAccount] = useState('');
    const [amount, setAmount] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleTransfer = async () => {
        if (fromAccount === toAccount) {
            setError("Cannot transfer to the same account");
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const response = await fetch(`http://localhost:5000/api/wallet/${userId}/transfer`, {
                method: 'POST',
                body: JSON.stringify({ fromAccount, toAccount, amount }),
                headers: { 'Content-Type': 'application/json' },
            });

            if (!response.ok) {
                throw new Error('Transfer failed');
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
                <option value="">Select From Account</option>
                {wallet.map((account) => (
                    <option key={account._id} value={account._id}>
                        {account.accountType} - Balance: {account.balance}
                    </option>
                ))}
            </select>

            <select onChange={(e) => setToAccount(e.target.value)} value={toAccount}>
                <option value="">Select To Account</option>
                {wallet.map((account) => (
                    <option key={account._id} value={account._id}>
                        {account.accountType} - Balance: {account.balance}
                    </option>
                ))}
            </select>

            <input
                type="number"
                placeholder="Amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
            />

            <button onClick={handleTransfer} disabled={loading}>
                {loading ? 'Transferring...' : 'Transfer'}
            </button>

            {error && <p>{error}</p>}
        </div>
    );
};

export default Transfer;
