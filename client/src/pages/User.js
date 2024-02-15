import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { userEdit, getAccounts } from "../redux/userSlice"
import Button from "../components/Button"
import AccountItem from "../components/AccountItem"

const User = () => {
  const [editForm, setEditForm] = useState(false)
  const [username, setUsername] = useState('')
  
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()

  const showEdit = (e) => {
    e.preventDefault()
    setEditForm(!editForm)
  }

  const handleChange = (e) => {
    setUsername(e.target.value)
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    const data = {
      userName: username
    }
    dispatch(userEdit(data)).then((res) => {
      if (res.payload) {
        setEditForm(false)
      }
    })
  }

  return (
    <main className="main bg-dark">
      <div className="header">
        {
          editForm ? (
            <>
              <h1>Edit user info</h1>
              <form className="edit-name">
                <div className="edit-name__row">
                  <label htmlFor="username">User name:</label>
                  <input type="text" id="username" name="username" defaultValue={user.profile.userName} onChange={e=>handleChange(e)} />
                </div>
                <div className="edit-name__row">
                  <label htmlFor="firstName">First name:</label>
                  <input type="text" id="firstName" name="firstName" defaultValue={user.profile.firstName} disabled />
                </div>
                <div className="edit-name__row">
                  <label htmlFor="lastName">Last name:</label>
                  <input type="text" id="lastName" name="lastName" defaultValue={user.profile.lastName} disabled />
                </div>
                <div className="edit-name__row">
                  <Button className={'edit-button'} click={e => handleSubmit(e)} text={'Save'} />
                  <Button className={'edit-button'} click={e => showEdit(e)} text={'Cancel'} />
                </div>
              </form>
            </>
          ) : (
            <>
              <h1>Welcome back<br />
                {user.profile.firstName} {user.profile.lastName}!
              </h1>
              <Button className={'edit-button'} click={e => showEdit(e)} text='Edit Name' />
            </>
          )
        }
      </div>
      <h2 className="sr-only">Accounts</h2>
      <AccountItem title={'Argent Bank Checking (x8349)'} amount={'$2,082.79'} description={'Available Balance'} />
      <AccountItem title={'Argent Bank Savings (x6712)'} amount={'$10,928.42'} description={'Available Balance'} />
      <AccountItem title={'Argent Bank Credit Card (x8349)'} amount={'$184.30'} description={'Current Balance'} />
      {
        user.accounts && user.accounts.map((account, index) => {
          return <AccountItem key={index} title={`Argent Bank ${account.accountType}`} amount={`$${account.balance}`} description={account.description} />
        })
      }
    </main>
  )
}

export default User