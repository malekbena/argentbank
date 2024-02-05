import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { userLogin, getProfile } from '../redux/userSlice'
import { useNavigate } from 'react-router-dom'
import Button from '../components/Button'

const Signin = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        let user = {
            email: username,
            password: password
        }
        dispatch(userLogin(user)).then((res) => {
            if (res.payload) {
                dispatch(getProfile(res.payload.token)).then((res) => {
                    if (res.payload) {
                        navigate('/user')
                    }
                })
            }
        })

    }

    return (
        <main className="main bg-dark">
            <section className="sign-in-content">
                <i className="fa fa-user-circle sign-in-icon"></i>
                <h1>Sign In</h1>
                <form>
                    <div className="input-wrapper">
                        <label htmlFor="username">Username</label>
                        <input type="text" id="username" onChange={e => setUsername(e.target.value)} />
                    </div>
                    <div className="input-wrapper">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" onChange={e => setPassword(e.target.value)} />
                    </div>
                    <div className="input-remember">
                        <input type="checkbox" id="remember-me" />
                        <label htmlFor="remember-me">Remember me</label>
                    </div>
                    <Button className={'classic-button'} click={e=>handleSubmit(e)} text='Sign In' />
                </form>
            </section>
        </main>
    )
}


export default Signin