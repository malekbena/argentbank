import { useState, useEffect } from 'react';
import axios from 'axios'
import Button from './Button'
import TransactionItem from './TransactionItem';
import { formatAmount } from '../utils';
import { useSelector } from 'react-redux';


const AccountItem = ({ account }) => {
    const [transactions, setTransactions] = useState([])
    const [isTransaction, setIsTransaction] = useState(false)
    const user = useSelector(state => state.user)
    const api = process.env.REACT_APP_API_URL

    useEffect(() => {
        (async () => {
            const res = await axios.post(`${api}/api/v1/transaction/transactions`,
                { accountId: account._id },
                {
                    headers: {
                        'Authorization': `Bearer ${user.token}`,
                        'contentType': 'application/json'
                    }
                }
                )
            setTransactions(res.data.body)
        })()
    }, [account, user.token, api])

    const showTransactions = (e) => {
        e.preventDefault()
        setIsTransaction(!isTransaction)
    }

    const updateTransactions = async (data) => {
        const res = await axios.patch(`${api}/api/v1/transaction/update`, data,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                }
            })
        setTransactions((prevState) => prevState.map((transaction) => {
            if (transaction._id === res.data.body._id) {
                return res.data.body
            }
            return transaction
        }))
        return res
    }



    return (
        <section className="account">
            <div className='account-card-header'>
                <div className="account-content-wrapper">
                    <h3 className="account-title">
                        {`Argent Bank ${account.accountType}`} {`(${account.accountNumber})`}
                    </h3>
                    <p className="account-amount"> {formatAmount(account.balance)} </p>
                    <p className="account-amount-description"> {account.description} </p>
                </div>
                <div className="account-content-wrapper cta">
                    <Button className={'classic-button transaction-button'} text={`${isTransaction ? ' Close' : 'View'} transactions`} click={e => showTransactions(e)} />
                </div>
            </div>
            {
                transactions.length === 0 ? (
                    <div className={`transactions ${isTransaction ? 'active' : 'inactive'}`}>
                        <p>No transactions</p>
                    </div>
                ) :

                    <div className={`transactions ${isTransaction ? 'active' : 'inactive'}`}>
                        <div className='transactions-header grid-template'>
                            <p>Date</p>
                            <p>Description</p>
                            <p>Amount</p>
                            <p>Balance</p>
                        </div>
                        {
                            transactions.map((transaction, index) => {
                                return (
                                    <TransactionItem key={index} transaction={transaction} updateTransactions={updateTransactions} />
                                )
                            })
                        }
                    </div>
            }
        </section>
    );
}

export default AccountItem