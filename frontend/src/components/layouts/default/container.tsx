import { ReactChild, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Footer } from '../footer/footer';
import { Header } from '../header/header';
import { Sidebar } from '../sidebar/sidebar';
import authContext, { UserData } from '../../../contexts/hooks/AuthContext';
import ManipulatorToken from '../../../untils/manipulate-token';
import styles from './container.module.scss';
import { setDefaultHeader } from '../../../Api';

type Props = {
    className: string,
    children: JSX.Element
        | JSX.Element[]
        | ReactChild
        | ReactChild[],
    CustomHeader?: JSX.Element
        | JSX.Element[]
        | ReactChild
        | ReactChild[],
    CustomFooter?: JSX.Element
        | JSX.Element[]
        | ReactChild
        | ReactChild[],
};
const initialState: UserData = {
    id: undefined,
    name: undefined,
    email: undefined,
};

function Container({
    className = '',
    children,
    CustomHeader = <Header />,
    CustomFooter = <Footer />
}: Props) {
    const navigate = useNavigate();
    const [authenticated, setAuthenticated] = useState(false);
    const [user, setUser] = useState(initialState);
    const goToLogin = () => navigate('/login');

    function checkUser() {
        const token = ManipulatorToken.getToken();

        if (! token || typeof token !== 'string' || token === '') {
            goToLogin();
        } else {
            ManipulatorToken.getUser(token)
                .then(response => {
                    setUser(response);
                    setAuthenticated(true);
                    setDefaultHeader({
                        Authorization: token,
                    })
                })
                .catch(() => goToLogin())
        }
    }

    useEffect(() => {
        checkUser();
    }, []);

    return (
        <authContext.Provider value={{ user, setUser, authenticated, setAuthenticated }}>
            <div> user is {`${user ? "" : "not"} ${user?.name}`} </div>
            <div>
                {CustomHeader}
                <Sidebar />
                <main className={`${className} ${styles['main-page']}`}>
                    {children}
                </main>
                {CustomFooter}
            </div>
        </authContext.Provider>
    );
}

export default Container;