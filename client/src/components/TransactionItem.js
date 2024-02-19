import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown, faPencil, faCheck, faXmark } from '@fortawesome/free-solid-svg-icons'
import { formatDate, formatAmount } from '../utils'

const TransactionItem = ({ transaction }) => {
    const [isDetail, setIsDetail] = useState(false)
    const [editNote, setEditNote] = useState(false)
    const [editCategory, setEditCategory] = useState(false)

    const categories = ['Food', 'Transport', 'Shopping', 'Bills', 'Others']

    const showDetail = (e) => {
        e.preventDefault()
        setIsDetail(!isDetail)
    }

    return (
        <div className='transaction'>
            <div className='transaction__header grid-template'>
                <p>{formatDate(transaction.createdAt)}</p>
                <p>{transaction.description}</p>
                <p>{formatAmount(transaction.amount)}</p>
                <p>{formatAmount(transaction.accountBalance)}</p>
                <button className='transaction-open-icon' onClick={e => showDetail(e)}>
                    <FontAwesomeIcon icon={faChevronDown} />
                </button>
            </div>
            <div className='transaction-detail'>
                <div className={`transaction-detail__column ${isDetail ? 'active' : 'inactive'}`}>
                    <p>Transaction Type</p>
                    <p>Category</p>
                    <p>Note</p>
                </div>
                <div className={`transaction-detail__column ${isDetail ? 'active' : 'inactive'}`}>
                    <p>{transaction.type}</p>
                    <div className='transaction-detail__row'>
                        {
                            editCategory ? (
                                <>
                                    <select defaultValue={transaction.category}>
                                        {
                                            categories.map((category, index) => {
                                                return (
                                                    <option key={index} value={category}>{category}</option>
                                                )
                                            })
                                        }
                                    </select>
                                    <button className='transaction-icon' onClick={e => setEditCategory(false)}>
                                        <FontAwesomeIcon icon={faCheck} />
                                    </button>
                                    <button className='transaction-icon' onClick={e => setEditCategory(false)}>
                                        <FontAwesomeIcon icon={faXmark} />
                                    </button>
                                </>
                            ) : (
                                <>
                                    <p>{transaction.category}</p>
                                    <button className='transaction-icon' onClick={e => setEditCategory(true)}>
                                        <FontAwesomeIcon icon={faPencil} />
                                    </button>
                                </>
                            )
                        }

                    </div>
                    <div className='transaction-detail__row'>
                        {
                            editNote ? (
                                <>
                                    <input type="text" value={transaction.note} />
                                    <button className='transaction-icon' onClick={e => setEditNote(false)}>
                                        <FontAwesomeIcon icon={faCheck} />
                                    </button>
                                    <button className='transaction-icon' onClick={e => setEditNote(false)}>
                                        <FontAwesomeIcon icon={faXmark} />
                                    </button>
                                </>
                            ) : (
                                <>
                                    <p>{transaction.note}</p>
                                    <button className='transaction-icon' onClick={e => setEditNote(true)}>
                                        <FontAwesomeIcon icon={faPencil} />
                                    </button>
                                </>
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TransactionItem