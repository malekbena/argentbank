import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown, faPencil } from '@fortawesome/free-solid-svg-icons'
import { formatDate, formatAmount } from '../utils'

const TransactionItem = ({ transaction }) => {
    const [isDetail, setIsDetail] = useState(false)

    const showDetail = (e) => {
        e.preventDefault()
        setIsDetail(!isDetail)
    }
    return (
        <div className='transaction grid-template'>
        <p>{formatDate(transaction.createdAt)}</p>
        <p>{transaction.description}</p>
        <p>{formatAmount(transaction.amount)}</p>
        <p>{formatAmount(transaction.accountBalance)}</p>
        <button className='transaction-open-icon' onClick={e=>showDetail(e)}>
            <FontAwesomeIcon icon={faChevronDown} />
        </button>
        <div className={isDetail ? 'active' : 'inactive'}>
            <p>Transaction Type</p>
            <p>Category</p>
            <p>Note</p>
        </div>
        <div className={isDetail ? 'active' : 'inactive'}>
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
}

export default TransactionItem