import { useState } from "react";
import { useNavigate } from "react-router-dom";
import authContext, { UserData } from '../../contexts/hooks/AuthContext';
import ManipulatorToken from "../../untils/manipulate-token";

export type ProviderProps = {
    children: JSX.Element
        | JSX.Element[]
        | React.ReactChild
        | React.ReactChild[],
}

export default function AuthProvider({ children }: ProviderProps) {
    const navigate = useNavigate();
    const [authenticated, setAuthenticated] = useState(false);
    const initialState: UserData = {
        id: undefined,
        name: undefined,
        email: undefined,
    };
    const [user, setUser] = useState(initialState);

    const token = ManipulatorToken.getToken();

    if (token && typeof token === 'string') {
        ManipulatorToken.getUser(token)
            .then(user => {
                navigate('/');
            })
            .catch(error => {
                console.warn("Você previsa entrar para ter acesso ao conteúdo");
            })
    }

    return (
        <authContext.Provider value={{ user, setUser, authenticated, setAuthenticated }}>
            <div> user is {`${authenticated ? "" : "not"} authenticated`} </div>
            {children}
        </authContext.Provider>
    )
}