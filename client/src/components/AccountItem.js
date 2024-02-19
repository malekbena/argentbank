import { useState, useEffect } from 'react';
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown, faPencil } from '@fortawesome/free-solid-svg-icons'
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

    const formatAmount = (amount) => {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount)
    }

    const dateFormatted = (date) => {
        return new Date(date).toLocaleDateString('fr-FR')
    }

    return (
        <section className="account">
            <div className='account-card-header'>
                <div className="account-content-wrapper">
                    <h3 className="account-title"> {`Argent Bank ${account.accountType}`} </h3>
                    <p className="account-amount"> {formatAmount(account.balance)} </p>
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
                                <p>{formatAmount(transaction.amount)}</p>
                                <p>{formatAmount(transaction.accountBalance)}</p>
                                <button className='transaction-open-icon'>
                                    <FontAwesomeIcon icon={faChevronDown} />
                                </button>
                                <div className=''>
                                    <p>Transaction Type</p>
                                    <p>Category</p>
                                    <p>Note</p>
                                </div>
                                <div>
                                    <p>{transaction.type}</p>
                                    <p>
                                        {transaction.category}
                                        <button className='transaction-icon'>
                                            <FontAwesomeIcon icon={faPencil} />
                                        </button>
                                    </p>
                                    <p>
                                        {transaction.note}
                                        <button className='transaction-icon'>
                                            <FontAwesomeIcon icon={faPencil} />
                                        </button>
                                    </p>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </section>
    );
}

export default AccountItem