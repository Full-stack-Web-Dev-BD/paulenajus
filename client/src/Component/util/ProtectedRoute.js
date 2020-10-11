import React, { useEffect } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { userState } from '../../recoilState'
import { useRecoilState } from 'recoil'
import jwtDecoder from 'jwt-decode'
const ProtectedRoute = ({ component: Component, ...rest }) => {

    const [user, setUser] = useRecoilState(userState)

    useEffect(() => {
        if (window.localStorage.getItem('car-app')) {
            let decoded = jwtDecoder(window.localStorage.getItem('car-app'))
            setUser(decoded)
        }
    }, [])

    return (
        <Route
            {...rest}
            render={
                props => {
                    if (localStorage.getItem('car-app')) {
                        return <Component {...props} />
                    } else {
                        return (
                            <Redirect
                                to={
                                    {
                                        pathname: "/login",
                                        state: {
                                            from: props.location
                                        }
                                    }
                                }
                            />
                        )
                    }
                }
            }
        />
    )
}

export default ProtectedRoute
