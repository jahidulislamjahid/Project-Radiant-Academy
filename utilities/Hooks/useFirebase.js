
import { useEffect, useState } from "react";
import initializeFirebase from "../Firebase/firebase.init";
import { getAuth, createUserWithEmailAndPassword, FacebookAuthProvider, GithubAuthProvider, getIdToken, updateProfile, signInWithPopup, signOut, onAuthStateChanged, signInWithEmailAndPassword, GoogleAuthProvider } from "firebase/auth";
import { useRouter } from "next/router";
import toast from 'react-hot-toast';
import jwt_decode from "jwt-decode";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../redux/slices/userSlice";
import { removeAllFromCartlist } from "../redux/slices/courseSlice";

initializeFirebase();
const useFirebase = () => {
    const [user, setUser] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [authError, setAuthError] = useState('');
    const [admin, setAdmin] = useState(false);
    const allUser = useSelector((state) => state.users.usersList);
    const dispatch = useDispatch();

    const auth = getAuth();
    const googleProvider = new GoogleAuthProvider();
    const githubProvider = new GithubAuthProvider();
    const facebookProvider = new FacebookAuthProvider();
    const router = useRouter();

    const googleSignIn = () => {
        setIsLoading(true);
        signInWithPopup(auth, googleProvider)
            .then((result) => {
                // The signed-in user info.
                const user = result.user;

                const { displayName, email, photoURL, accessToken } = user;
                saveUser(email, displayName, photoURL, accessToken, 'POST');

                setAuthError('');
                localStorage.setItem('token', accessToken);

                const signedInUser = {
                    isSignedIn: true,
                    email: email,
                    photo: photoURL,
                    success: true,
                    name: displayName
                };
                localStorage.setItem('signedInUser', JSON.stringify(signedInUser));
                setUser(signedInUser);
                dispatch(fetchUsers());
                router.replace(`/`);
                toast.success("Successfully signed in!", {
                    position: "top-center"
                });
            })
            .catch((error) => {
                console.log(error);
                setAuthError(error.message)
            })
            .finally(() => setIsLoading(false))
    }
    const registerUser = (name, username, email, password) => {
        setIsLoading(true);
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                setAuthError('');
                console.log(userCredential);
                const { accessToken } = userCredential?.user
                console.log('token', accessToken);

                const userPic = 'https://i.ibb.co.com/TwS4rK9/2289-Sk-VNQSBGQU1-PIDEw-Mjgt-MTIy.png'
                const newUser = { email, displayName: name };
                saveUser(email, name, userPic, accessToken, 'POST');

                setUser(newUser);
                // save user to the database
                // saveUser(email, name, 'POST');
                // send name to firebase after creation
                updateProfile(auth.currentUser, {
                    displayName: name,
                    email: email
                }).then(() => {
                }).catch((error) => {
                });

            })
            .catch((error) => {
                setAuthError(error.message);
                console.log(error);
            })
            .finally(() => setIsLoading(false));
    }

    const githubSignIn = () => {
        setIsLoading(true);

        signInWithPopup(auth, githubProvider)
            .then((result) => {
                // The signed-in user info.
                const { accessToken, email, displayName, photoURL } = result?.user
                console.log(accessToken, email, displayName, photoURL);
                const signedInUser = {
                    isSignedIn: true,
                    email: email,
                };
                localStorage.setItem('signedInUser', JSON.stringify(signedInUser));

                // const user = result.user;                
                saveUser(email, displayName, photoURL, accessToken, 'POST');
                // setUser(user);
                router.replace('/');
                setAuthError('');
            })
            .catch((error) => {
                console.log(error.message);

                setAuthError(error.message)
            })

            .finally(() => setIsLoading(false))
    }

    const facebookSignIn = () => {
        setIsLoading(true);

        signInWithPopup(auth, facebookProvider)
            .then((result) => {

                // The signed-in user info.
                const user = result.user;
                setUser(user);
                router.replace('/profile');
                setAuthError('');
            })
            .catch((error) => {

                setAuthError(error.message)
            })
            .finally(() => setIsLoading(false))
    }

    const loginUser = (email, password) => {
        setIsLoading(true);

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                console.log(userCredential);
                const signedInUser = {
                    isSignedIn: true,
                    email: email,
                };
                localStorage.setItem('signedInUser', JSON.stringify(signedInUser));
                const signInUserData = JSON.parse(localStorage.getItem('signedInUser'));
                console.log(signInUserData);
                setUser(signInUserData)
                toast.success("Logged In")
                router.replace('/');
                setAuthError('');
            })
            .catch((error) => {
                setAuthError(error.message);
            })
            .finally(() => setIsLoading(false));
    }

    useEffect(() => {
        const unsubscribed = onAuthStateChanged(auth, (user) => {
            const token = localStorage.getItem('token');
            if (token) {
                const { name, email, picture } = jwt_decode(token);
                const decodedUser = {
                    isSignedIn: true,
                    email: email,
                    photo: picture,
                    success: true,
                    name: name
                }
                setUser(decodedUser);
            }
            else {
                setUser({})
            }
            setIsLoading(false);
        });

        return () => unsubscribed;
    }, [auth])

    const logout = () => {
        setIsLoading(true);
        signOut(auth).then((res) => {
            localStorage.removeItem('token');
            setUser({});
            router.push('/');
            dispatch(removeAllFromCartlist())
            localStorage.removeItem('signedInUser')
            toast.success("Successfully signed out!", {
                position: "top-center"
            });

        })
            .catch((error) => {
                // An error happened.
                console.log(error);
            })
            .finally(() => setIsLoading(false));
    }

    //database uploading
    const saveUser = (email, displayName, photoURL, accessToken, method) => {
        const alreadyUser = allUser.find(user => user.email === email && user.displayName === displayName);
        if (alreadyUser) {
            console.log('already user!');
        } else {
            // console.log(`${process.env.NEXT_PUBLIC_API}`);
            
            const role = 'user';
            const user = { email, displayName, photoURL, accessToken, role };
            fetch(`${process.env.NEXT_PUBLIC_API}/api/users`, {
                method: method,
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(user)
            })
                .then()
        }
    }

    return {
        user,
        admin,

        isLoading,
        authError,
        registerUser,
        loginUser,

        logout,
        googleSignIn,
        githubSignIn,
        facebookSignIn
    }

}
export default useFirebase;