import { useState } from 'react';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isShowPassword, setIsShowPassword] = useState(false);

    return (
        <>
            <div className="login-container col-12 col-sm-6 col-md-4">
                <h1 className="title">Login</h1>
                <div className="text-label">Email or username</div>
                <input
                    className="login-input"
                    placeholder="Email or username"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <div className="wrap-input-password">
                    <input
                        type={isShowPassword ? 'text' : 'password'}
                        className="login-input"
                        placeholder="Password..."
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <i
                        className={isShowPassword ? 'fa-solid fa-eye' : 'fa-solid fa-eye-slash'}
                        onClick={() => setIsShowPassword(!isShowPassword)}
                    ></i>
                </div>
                <button
                    className={email && password ? 'btn active' : 'btn'}
                    disabled={email && password ? false : true}
                >
                    Login
                </button>
                <div className="text-center mt-3 back">
                    <i className="fa-solid fa-angles-left"></i>Go back
                </div>
            </div>
        </>
    );
}

export default Login;
