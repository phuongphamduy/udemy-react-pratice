import { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { loginUser } from '../services/UserService';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isShowPassword, setIsShowPassword] = useState(false);
    const [loadingApi, setLoadingApi] = useState(false);
    const { loginContext } = useContext(UserContext);

    const handleLogin = async () => {
        if (!email || !password) {
            toast.error('Email and password is required');
            return;
        }
        setLoadingApi(true);
        let res = await loginUser(email.trim(), password);
        if (res && res.token) {
            loginContext(email, res.token);
            navigate('/');
        } else if (res && res.status === 400) {
            toast.error(res.data.error);
        }
        setLoadingApi(false);
    };

    const handleGoBack = () => {
        navigate('/');
    };

    const handleOnKeyDown = (e) => {
        if (e && e.key === 'Enter') {
            handleLogin();
        }
    };

    return (
        <>
            <div className="login-container col-12 col-sm-6 col-md-4">
                <h1 className="title">Login</h1>
                <div className="text-label">Email or username eve.holt@reqres.in</div>
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
                        onKeyDown={(e) => handleOnKeyDown(e)}
                    />
                    <i
                        className={isShowPassword ? 'fa-solid fa-eye' : 'fa-solid fa-eye-slash'}
                        onClick={() => setIsShowPassword(!isShowPassword)}
                    ></i>
                </div>
                <button
                    className={email && password ? 'btn active' : 'btn'}
                    disabled={email && password ? false : true}
                    onClick={() => handleLogin()}
                >
                    {loadingApi && <i className="fas fa-spinner fa-spin"></i>} &nbsp;Login
                </button>
                <div className="text-center mt-3 back" onClick={() => handleGoBack()}>
                    <i className="fa-solid fa-angles-left"></i>Go back
                </div>
            </div>
        </>
    );
}

export default Login;
