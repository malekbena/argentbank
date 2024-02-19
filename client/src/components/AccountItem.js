import { useState, useEffect } from 'react';
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown, faPencil } from '@fortawesome/free-solid-svg-icons'
import Button from './Button'
import TransactionItem from './TransactionItem';
import { formatAmount, formatDate } from '../utils';


const AccountItem = ({ account, token }) => {
    const [transactions, setTransactions] = useState([])
    const [isTransaction, setIsTransaction] = useState(false)

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

    const showTransactions = (e) => {
        e.preventDefault()
        setIsTransaction(!isTransaction)
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
                    <Button className={'classic-button transaction-button'} text='View transactions' click={e => showTransactions(e)} />
                </div>
            </div>
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
                            <TransactionItem key={index} transaction={transaction} />
                        )
                    })
                }
            </div>
        </section>
    );
}

export default AccountItem