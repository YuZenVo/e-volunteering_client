import React, { useState } from "react"
import { registerUser } from "../server_api/authApiFunctions.js"
import { Link } from "react-router-dom"

const Registration = () => {
    const [registration, setRegistration] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: ""
    })

    const [errorMessage, setErrorMessage] = useState("")
    const [successMessage, setSuccessMessage] = useState("")

    const handleInputChange = (e) => {
        setRegistration({ ...registration, [e.target.name]: e.target.value })
    }

    const handleRegistration = async (e) => {
        e.preventDefault()
        try {
            const result = await registerUser(registration)
            setSuccessMessage(result)
            setErrorMessage("")
            setRegistration({ firstName: "", lastName: "", email: "", password: "" })
        } catch (error) {
            setSuccessMessage("")
            setErrorMessage(`Registration error : ${error.message}`)
        }
        setTimeout(() => {
            setErrorMessage("")
            setSuccessMessage("")
        }, 5000)
    }

    return (
        <section className="container col-6 mt-5 mb-5">
            {errorMessage && <p className="alert alert-danger">{errorMessage}</p>}
            {successMessage && <p className="alert alert-success">{successMessage}</p>}

            <h2>Реєстрація</h2>
            <form onSubmit={handleRegistration}>
                <div className="mb-3 row">
                    <label htmlFor="firstName" className="col-sm-2 col-form-label">
                        Ім'я
                    </label>
                    <div className="col-sm-10">
                        <input
                            id="firstName"
                            name="firstName"
                            type="text"
                            className="form-control"
                            value={registration.firstName}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>

                <div className="mb-3 row">
                    <label htmlFor="lastName" className="col-sm-2 col-form-label">
                        Прізвище
                    </label>
                    <div className="col-sm-10">
                        <input
                            id="lastName"
                            name="lastName"
                            type="text"
                            className="form-control"
                            value={registration.lastName}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>

                <div className="mb-3 row">
                    <label htmlFor="email" className="col-sm-2 col-form-label">
                        Електронна пошта
                    </label>
                    <div className="col-sm-10">
                        <input
                            id="email"
                            name="email"
                            type="email"
                            className="form-control"
                            value={registration.email}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>

                <div className="mb-3 row">
                    <label htmlFor="password" className="col-sm-2 col-form-label">
                        Пароль
                    </label>
                    <div className="col-sm-10">
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            name="password"
                            value={registration.password}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>
                <div className="mb-3">
                    <button type="submit" className="btn btn-hotel" style={{ marginRight: "10px" }}>
                        Зареєструватися
                    </button>
                    <span style={{ marginLeft: "10px" }}>
						Вже маєте обліковий запис? <Link to={"/login"}>Вхід</Link>
					</span>
                </div>
            </form>
        </section>
    )
}

export default Registration