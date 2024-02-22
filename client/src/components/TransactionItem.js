import { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown, faPencil, faCheck, faXmark } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { formatDate, formatAmount } from '../utils'

const TransactionItem = ({ transaction }) => {
    const [isDetail, setIsDetail] = useState(false)
    const [editNote, setEditNote] = useState(false)
    const [editCategory, setEditCategory] = useState(false)
    const [category, setCategory] = useState(transaction.category)
    const [note, setNote] = useState(transaction.note)
    const [message, setMessage] = useState('')

    const categories = ['Food', 'Transport', 'Shopping', 'Bills', 'Others']
    const user = useSelector(state => state.user)

    useEffect(() => {
        if (message !== '') {
            setTimeout(() => {
                setMessage('')
            }, 3000)
        }
    }, [message])

    const showDetail = (e) => {
        e.preventDefault()
        setIsDetail(!isDetail)
    }
    const handleChange = (e, setState) => {
        setState(e.target.value)
    }
    const closeForm = (e, setState) => {
        e.preventDefault()
        setState(false)
        setCategory(transaction.category)
        setNote(transaction.note)
    }
    const send = (e, data) => {
        e.preventDefault()
        if (category === transaction.category && note === transaction.note) {
            return
        }
        if (category === '' || note === '') {
            return
        }
        if (data === category) {
            let data = {
                userId: transaction.userId,
                accountId: transaction.accountId,
                transactionId: transaction._id,
                category: category
            }
            sendRequest(e, data)
        }
        if (data === note) {
            let data = {
                userId: transaction.userId,
                accountId: transaction.accountId,
                transactionId: transaction._id,
                note: note
            }
            sendRequest(e, data)
        }
    }

    const sendRequest = (e, data) => {
        e.preventDefault()
        let modifiedField = data.category ? 'category' : 'note'

        axios.patch(`http://localhost:3001/api/v1/transaction/update`, data,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                }
            }
        ).then((res) => {
            if (res.status === 200) {
                if (modifiedField === 'category') {
                    transaction.category = category
                    setEditCategory(false)
                    setMessage('Catégorie modifiée avec succès')
                } else {
                    transaction.note = note
                    setEditNote(false)
                    setMessage('Note modifiée avec succès')
                }
            } else {
                setMessage('Erreur lors de la modification de la transaction')
                if (modifiedField === 'category') {
                    closeForm(e, setEditCategory)
                }else{
                    closeForm(e, setEditNote)
                }
            }
        })
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
            {message !== '' && <p className='transaction__message'>{message}</p>}
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
                                    <select defaultValue={transaction.category} onChange={e => handleChange(e, setCategory)}>
                                        {
                                            categories.map((category, index) => {
                                                return (
                                                    <option key={index} value={category}>{category}</option>
                                                )
                                            })
                                        }
                                    </select>
                                    <button className='transaction-icon' onClick={e => send(e, category)}>
                                        <FontAwesomeIcon icon={faCheck} />
                                    </button>
                                    <button className='transaction-icon' onClick={e => closeForm(e, setEditCategory)}>
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
                                    <input type="text" defaultValue={transaction.note} onChange={e => handleChange(e, setNote)} />
                                    <button className='transaction-icon' onClick={e => send(e, note)}>
                                        <FontAwesomeIcon icon={faCheck} />
                                    </button>
                                    <button className='transaction-icon' onClick={e => closeForm(e, setEditNote)}>
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