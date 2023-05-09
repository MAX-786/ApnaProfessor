/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { signInWithPopup } from 'firebase/auth'
import { auth, provider } from '../../firebase'
import { useDispatch, useSelector } from 'react-redux';
import { login, logout, selectUser } from '../../features/userSlice';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Auth = () => {

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const dispatch = useDispatch();
    const user = useSelector(selectUser);
    const navigate = useNavigate();

    useEffect( () => {
        auth.onAuthStateChanged((authUser) => {
            if (authUser) {
                // POST to add user to userDB
                const userData = {
                    name : authUser.displayName,
                    uid : authUser.uid,
                    photo : authUser.photoURL
                }
                axios.post('http://localhost:8080/api/user' , userData).then((res, err) => {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log(res);
                        dispatch(login(res.data));
                    }
                });

                
            } else {
                console.log("logout");
                dispatch(logout());
            }
        })
    },[loading, dispatch]);
    // console.log(user);
    const handleSignInWithGoogle = () => {
        setLoading(true);
        signInWithPopup(auth,provider).then((res) => {
            setLoading(false);
            navigate("/");
            
        }).catch((err) => {
            setError(err.message);
            setLoading(false);
        });
    }

    return ( 
        <div className='auth-wrapper'>
            <div className='auth-container'>
                <div className='auth'>
                    {loading && <h1>SigningIn...</h1>}
                    <button className="login-with-google" disabled={loading || user} onClick={handleSignInWithGoogle}>Login with Goolge</button>
                </div>
            </div>
            { error && <div className="error">{error}</div>}
        </div>
    )
}

export default Auth