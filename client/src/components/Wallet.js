// import React, { useState, useEffect } from 'react';
// import './Wallet.css';
// import RetrieveBalance from './RetrieveBalance';
// import Transfer from './Transfer';
// import Pay from './Pay';
// import Withdraw from './Withdraw';
// import BuyAirtime from './BuyAirtime';

// const Wallet = () => {
//     const [userId, setUserId] = useState(null);
//     const [wallet, setWallet] = useState([]);
//     const [totalBalance, setTotalBalance] = useState(0);
//     const [newAccount, setNewAccount] = useState({
//         accountType: '',
//         accountDetails: {},
//         balance: 0,
//     });
//     const [loading, setLoading] = useState(false);
//     const [selectedAction, setSelectedAction] = useState(null); // New state to track selected action

//     // Retrieve userId from localStorage when the component mounts
//     useEffect(() => {
//         const user = JSON.parse(localStorage.getItem('user'));
//         if (user) {
//             setUserId(user.id);
//         }
//     }, []);

//     // Fetch wallet data
//     useEffect(() => {
//         if (userId) {
//             const fetchWallet = async () => {
//                 try {
//                     const response = await fetch(`http://localhost:5000/api/wallet/${userId}`);
//                     if (!response.ok) {
//                         throw new Error('Failed to fetch wallet');
//                     }
//                     const data = await response.json();
//                     setWallet(Array.isArray(data.accounts) ? data.accounts : []);
//                     setTotalBalance(data.totalBalance || 0);
//                 } catch (error) {
//                     console.error('Error fetching wallet:', error);
//                     setWallet([]);
//                 }
//             };
//             fetchWallet();
//         }
//     }, [userId]);

//     // Add a new account
//     const handleAddAccount = async () => {
//         setLoading(true);
//         try {
//             const response = await fetch(`http://localhost:5000/api/wallet/${userId}/add`, {
//                 method: 'POST',
//                 body: JSON.stringify(newAccount),
//                 headers: { 'Content-Type': 'application/json' },
//             });
//             const updatedWallet = await response.json();
//             setWallet(updatedWallet.accounts);
//             setTotalBalance(updatedWallet.totalBalance);
//         } catch (error) {
//             console.error('Error adding account:', error);
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <div className="wallet-container">
//             <h2>Your Wallet</h2>

//             {/* Add Account Form */}
//             <div className="add-account">
//                 <h3>Add Account</h3>
//                 <select
//                     value={newAccount.accountType}
//                     onChange={(e) => setNewAccount({ ...newAccount, accountType: e.target.value })}
//                 >
//                     <option value="">Select Account Type</option>
//                     <option value="Bank">Bank</option>
//                     <option value="Mobile Money">Mobile Money</option>
//                     <option value="PayPal">PayPal</option>
//                     <option value="Cash">Cash</option>
//                     <option value="Binance">Binance</option>
//                 </select>

//                 {newAccount.accountType === 'Bank' && (
//                     <div>
//                         <input
//                             type="text"
//                             placeholder="Bank Name"
//                             onChange={(e) =>
//                                 setNewAccount({ ...newAccount, accountDetails: { ...newAccount.accountDetails, bankName: e.target.value } })
//                             }
//                         />
//                         <input
//                             type="text"
//                             placeholder="Account Number"
//                             onChange={(e) =>
//                                 setNewAccount({ ...newAccount, accountDetails: { ...newAccount.accountDetails, accountNumber: e.target.value } })
//                             }
//                         />
//                     </div>
//                 )}
//                 {newAccount.accountType === 'Cash' && (
//                     <div>
//                         <input
//                             type="number"
//                             placeholder="Enter Cash Balance"
//                             onChange={(e) => setNewAccount({ ...newAccount, balance: parseFloat(e.target.value) })}
//                         />
//                     </div>
//                 )}

//                 {newAccount.accountType === 'Mobile Money' && (
//                     <div>
//                         <input
//                             type="text"
//                             placeholder="Money account"
//                             onChange={(e) =>
//                                 setNewAccount({ ...newAccount, accountDetails: { ...newAccount.accountDetails, moneyType: e.target.value } })
//                             }
//                         />
//                         <input
//                             type="text"
//                             placeholder="Mobile Number"
//                             onChange={(e) =>
//                                 setNewAccount({ ...newAccount, accountDetails: { ...newAccount.accountDetails, mobileNumber: e.target.value } })
//                             }
//                         />
//                     </div>
//                 )}
//                 {newAccount.accountType === 'PayPal' && (
//                     <input
//                         type="email"
//                         placeholder="PayPal Email"
//                         onChange={(e) =>
//                             setNewAccount({ ...newAccount, accountDetails: { ...newAccount.accountDetails, paypalEmail: e.target.value } })
//                         }
//                     />
//                 )}
//                 {newAccount.accountType === 'Binance' && (
//                     <input
//                         type="text"
//                         placeholder="Binance Account"
//                         onChange={(e) =>
//                             setNewAccount({ ...newAccount, accountDetails: { ...newAccount.accountDetails, binanceAccount: e.target.value } })
//                         }
//                     />
//                 )}

//                 <div>
//                     <button onClick={handleAddAccount} disabled={loading}>
//                         {loading ? 'Adding Account...' : 'Add Account'}
//                     </button>
//                 </div>
//             </div>

//             {/* Accounts List */}
//             <div className="accounts">
//                 <h3>Your Accounts</h3>
//                 {Array.isArray(wallet) && wallet.length === 0 ? (
//                     <p>No accounts added yet.</p>
//                 ) : (
//                     Array.isArray(wallet) &&
//                     wallet.map((account) => (
//                         <div key={account._id}>
//                             <h4>{account.accountType}</h4>
//                             <p>Balance: {account.balance}</p>
//                             {account.accountType === 'Bank' && (
//                                 <p>
//                                     Bank: {account.accountDetails?.bankName || 'N/A'}<br />
//                                     Account Number: {account.accountDetails?.accountNumber || 'N/A'}
//                                 </p>
//                             )}
//                             {account.accountType === 'Mobile Money' && (
//                                 <p>
//                                     Money Type: {account.accountDetails?.moneyType || 'N/A'}<br />
//                                     Account Number: {account.accountDetails?.mobileNumber || 'N/A'}
//                                 </p>
//                             )}
//                             <button onClick={() => setSelectedAction('RetrieveBalance')}>Retrieve Balance</button>
//                             <button onClick={() => setSelectedAction('Pay')}>Pay</button>
//                             <button onClick={() => setSelectedAction('Transfer')}>Transfer</button>
//                             <button onClick={() => setSelectedAction('Withdraw')}>Withdraw</button>
//                             <button onClick={() => setSelectedAction('BuyAirtime')}>Buy Airtime</button>
//                         </div>
//                     ))
//                 )}
//             </div>

//             {/* Total Balance */}
//             <div className="total-balance">
//                 <h3>Total Balance: {totalBalance}</h3>
//             </div>

//             {/* Render selected action component */}
//             {selectedAction === 'RetrieveBalance' && <RetrieveBalance accountId="123" userId={userId} />}
//             {selectedAction === 'Transfer' && <Transfer wallet={wallet} setWallet={setWallet} userId={userId} />}
//             {selectedAction === 'Pay' && <Pay wallet={wallet} setWallet={setWallet} userId={userId} />}
//             {selectedAction === 'Withdraw' && <Withdraw wallet={wallet} setWallet={setWallet} userId={userId} />}
//             {selectedAction === 'BuyAirtime' && <BuyAirtime wallet={wallet} setWallet={setWallet} userId={userId} />}
//         </div>
//     );
// };

// export default Wallet;
import React, { useState, useEffect } from 'react';
import './Wallet.css';
import RetrieveBalance from './RetrieveBalance';
import Transfer from './Transfer';
import Pay from './Pay';
import Withdraw from './Withdraw';
import BuyAirtime from './BuyAirtime';

const Wallet = () => {
    const [userId, setUserId] = useState(null);
    const [wallet, setWallet] = useState([]);
    const [totalBalance, setTotalBalance] = useState(0);
    const [newAccount, setNewAccount] = useState({
        accountType: '',
        accountDetails: {},
        balance: 0,
    });
    const [loading, setLoading] = useState(false);
    const [selectedAction, setSelectedAction] = useState(null);

    // Retrieve userId from localStorage when the component mounts
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            setUserId(user.id);
        }
    }, []);

    // Fetch wallet data and update total balance
    useEffect(() => {
        if (userId) {
            const fetchWallet = async () => {
                try {
                    const response = await fetch(`http://localhost:5000/api/wallet/${userId}`);
                    if (!response.ok) {
                        throw new Error('Failed to fetch wallet');
                    }
                    const data = await response.json();
                    setWallet(Array.isArray(data.accounts) ? data.accounts : []);
                    setTotalBalance(calculateTotalBalance(data.accounts));
                } catch (error) {
                    console.error('Error fetching wallet:', error);
                    setWallet([]);
                }
            };
            fetchWallet();
        }
    }, [userId]);

    // Helper function to calculate total balance
    const calculateTotalBalance = (accounts) => {
        return accounts.reduce((total, account) => total + account.balance, 0);
    };

    // Add a new account
    const handleAddAccount = async () => {
        setLoading(true);
        try {
            const response = await fetch(`http://localhost:5000/api/wallet/${userId}/add`, {
                method: 'POST',
                body: JSON.stringify(newAccount),
                headers: { 'Content-Type': 'application/json' },
            });
            const updatedWallet = await response.json();
            setWallet(updatedWallet.accounts);
            setTotalBalance(calculateTotalBalance(updatedWallet.accounts));
        } catch (error) {
            console.error('Error adding account:', error);
        } finally {
            setLoading(false);
        }
    };

    // Update total balance dynamically when wallet changes
    useEffect(() => {
        setTotalBalance(calculateTotalBalance(wallet));
    }, [wallet]);

    return (
        <div className="wallet-container">
            <h2>Your Wallet</h2>

            {/* Add Account Form */}
            <div className="add-account">
                <h3>Add Account</h3>
                <select
                    value={newAccount.accountType}
                    onChange={(e) => setNewAccount({ ...newAccount, accountType: e.target.value })}
                >
                    <option value="">Select Account Type</option>
                    <option value="Bank">Bank</option>
                    <option value="Mobile Money">Mobile Money</option>
                    <option value="PayPal">PayPal</option>
                    <option value="Cash">Cash</option>
                    <option value="Binance">Binance</option>
                </select>

                {newAccount.accountType === 'Bank' && (
                    <div>
                        <input
                            type="text"
                            placeholder="Bank Name"
                            onChange={(e) =>
                                setNewAccount({ ...newAccount, accountDetails: { ...newAccount.accountDetails, bankName: e.target.value } })
                            }
                        />
                        <input
                            type="text"
                            placeholder="Account Number"
                            onChange={(e) =>
                                setNewAccount({ ...newAccount, accountDetails: { ...newAccount.accountDetails, accountNumber: e.target.value } })
                            }
                        />
                    </div>
                )}
                {newAccount.accountType === 'Cash' && (
                    <div>
                        <input
                            type="number"
                            placeholder="Enter Cash Balance"
                            onChange={(e) => setNewAccount({ ...newAccount, balance: parseFloat(e.target.value) })}
                        />
                    </div>
                )}

                {newAccount.accountType === 'Mobile Money' && (
                    <div>
                        <input
                            type="text"
                            placeholder="Money account"
                            onChange={(e) =>
                                setNewAccount({ ...newAccount, accountDetails: { ...newAccount.accountDetails, moneyType: e.target.value } })
                            }
                        />
                        <input
                            type="text"
                            placeholder="Mobile Number"
                            onChange={(e) =>
                                setNewAccount({ ...newAccount, accountDetails: { ...newAccount.accountDetails, mobileNumber: e.target.value } })
                            }
                        />
                    </div>
                )}
                {newAccount.accountType === 'PayPal' && (
                    <input
                        type="email"
                        placeholder="PayPal Email"
                        onChange={(e) =>
                            setNewAccount({ ...newAccount, accountDetails: { ...newAccount.accountDetails, paypalEmail: e.target.value } })
                        }
                    />
                )}
                {newAccount.accountType === 'Binance' && (
                    <input
                        type="text"
                        placeholder="Binance Account"
                        onChange={(e) =>
                            setNewAccount({ ...newAccount, accountDetails: { ...newAccount.accountDetails, binanceAccount: e.target.value } })
                        }
                    />
                )}

                <div>
                    <button onClick={handleAddAccount} disabled={loading}>
                        {loading ? 'Adding Account...' : 'Add Account'}
                    </button>
                </div>
            </div>

            {/* Accounts List */}
            <div className="accounts">
                <h3>Your Accounts</h3>
                {Array.isArray(wallet) && wallet.length === 0 ? (
                    <p>No accounts added yet.</p>
                ) : (
                    Array.isArray(wallet) &&
                    wallet.map((account) => (
                        <div key={account._id}>
                            <h4>{account.accountType}</h4>
                            <p>Balance: {account.balance}</p>
                            {account.accountType === 'Bank' && (
                                <p>
                                    Bank: {account.accountDetails?.bankName || 'N/A'}<br />
                                    Account Number: {account.accountDetails?.accountNumber || 'N/A'}
                                </p>
                            )}
                            {account.accountType === 'Mobile Money' && (
                                <p>
                                    Money Type: {account.accountDetails?.moneyType || 'N/A'}<br />
                                    Account Number: {account.accountDetails?.mobileNumber || 'N/A'}
                                </p>
                            )}
                            <button onClick={() => setSelectedAction('RetrieveBalance')}>Retrieve Balance</button>
                            <button onClick={() => setSelectedAction('Pay')}>Pay</button>
                            <button onClick={() => setSelectedAction('Transfer')}>Transfer</button>
                            <button onClick={() => setSelectedAction('Withdraw')}>Withdraw</button>
                            <button onClick={() => setSelectedAction('BuyAirtime')}>Buy Airtime</button>
                        </div>
                    ))
                )}
            </div>

            {/* Total Balance */}
            <div className="total-balance">
                <h3>Total Balance: {totalBalance}</h3>
            </div>

            {/* Render selected action component */}
            {selectedAction === 'RetrieveBalance' && <RetrieveBalance accountId="123" userId={userId} />}
            {selectedAction === 'Transfer' && <Transfer wallet={wallet} setWallet={setWallet} userId={userId} />}
            {selectedAction === 'Pay' && <Pay wallet={wallet} setWallet={setWallet} userId={userId} />}
            {selectedAction === 'Withdraw' && <Withdraw wallet={wallet} setWallet={setWallet} userId={userId} />}
            {selectedAction === 'BuyAirtime' && <BuyAirtime wallet={wallet} setWallet={setWallet} userId={userId} />}
        </div>
    );
};

export default Wallet;
