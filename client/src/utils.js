import { jwtDecode } from 'jwt-decode'

export const checkToken = () => {
    const token = localStorage.getItem('token')
    if (!token) return false
    const decoded = jwtDecode(token)
    if (decoded.exp * 1000 < Date.now()) {
        localStorage.removeItem('token')
        return false
    }
    return true
}

export const formatAmount = (amount) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount)
}

export const formatDate = (date) => {
    return new Date(date).toLocaleDateString('fr-FR')
}