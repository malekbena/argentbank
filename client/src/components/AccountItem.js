import { useState, useEffect } from 'react';
import axios from 'axios'
import Button from './Button'

const AccountItem = ({ account, token }) => {
    const [isOpen, setIsOpen] = useState(false)
    const [transactions, setTransactions] = useState([])

    useEffect(() => {
        axios.post('http://localhost:3001/api/v1/transaction/transactions',
            { accountId: account._id },
            {
                headers: {
                    contentType: 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            }
        ).then((res) => {
            setTransactions(res.data.body)
        })
    }, [account, token])

    let formattedBalance = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(account.balance)

    const dateFormatted = (date) => {
        return new Date(date).toLocaleDateString()
    }

    return (
        <section className="account">
            <div className='account-card-header'>
                <div className="account-content-wrapper">
                    <h3 className="account-title"> {`Argent Bank ${account.accountType}`} </h3>
                    <p className="account-amount"> {formattedBalance} </p>
                    <p className="account-amount-description"> {account.description} </p>
                </div>
                <div className="account-content-wrapper cta">
                    <Button className={'classic-button transaction-button'} text='View transactions' />
                </div>
            </div>
            <div className='transactions'>
                <div className='transactions-header grid-template'>
                    <p>Date</p>
                    <p>Description</p>
                    <p>Amount</p>
                    <p>Balance</p>
                </div>
                {
                    transactions.map((transaction, index) => {
                        return (
                            <div key={index} className='transaction grid-template'>
                                <p>{dateFormatted(transaction.createdAt)}</p>
                                <p>{transaction.description}</p>
                                <p>{transaction.amount}</p>
                                <p>{transaction.accountBalance}</p>
                            </div>
                        )
                    })
                }
            </div>
        </section>
    );
}

export default AccountItem