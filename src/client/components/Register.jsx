import { useState } from "react"

export default function Register( {setToken} ) {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState ("")
    const [successMessage, setSuccessMessage] = useState("")
    const [error, setError] = useState(null)

    async function handleSubmit(e) {
        e.preventDefault()
        try {
            const response = await fetch(
                "http://localhost:3000/api/users/register", // Double check API endpoint here
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        name,
                        email,
                        password,
                    }),
                }
            );
            const result = await response.json()
            console.log("Register Result ", result)
            setToken(result.token)
            setSuccessMessage(result.message)
            setName("")
            setEmail("")
            setPassword("")
        } catch (error) {
            setError(error.message)
            console.log(error)
        }
    }

    return (
        <div className = "signup-form">
            <h2 className = "form-header">Sign Up!</h2>
            {successMessage && <p>{successMessage}</p>}
            {error && <p>{error}</p>}
            <form onSubmit = {handleSubmit}>
                <label className = "form-item">
                    Username
                    <input value = {name} onChange={(e) => setName(e.target.value)} />
                </label>
                <label className = "form-item">
                    Email
                    <input type = "email" value = {email} onChange={(e) => setEmail(e.target.value)} />
                </label>
                <label className = "form-item">
                    Password
                    <input type = "password" value = {password} onChange={(e) => setPassword(e.target.value)} />
                </label>
                <button className = "form-button">Register</button>
            </form>
        </div>
    )

}