import { style } from '@mui/system';
import classNames from 'classnames';
import { MouseEvent, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ReactSVG } from 'react-svg'
import HomeIcon from '../../../assets/svg/home.svg';
import LibraryIcon from '../../../assets/svg/bookshelf.png';
import styles from './sidebar.module.scss';

export function Sidebar() {
    const SidebarRef = useRef(null);
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div>
            <div className="toggle-container">
                <button
                    type="button"
                    className="d-md-none ma-6"
                    id="btn-open-sidebar"
                >
                    // Icon
                </button>
            </div>
            <div
                className={styles['main-sidebar']}
            >
                <div
                    ref={SidebarRef}
                    className={classNames({
                        [styles['sidebar']]: true,
                        [styles['sidebar--open']]: isOpen,                        
                    })}
                    onMouseOver={() => setIsOpen(true)}
                    onMouseOut={() => setIsOpen(false)}
                >
                    <div className="toggle-container d-flex justify-end d-block d-lg-none">
                        <button
                            type="button"
                            className="my-6 mx-10"
                            id="btn-open-sidebar"
                        >
                            // Icon
                        </button>
                    </div>
                    <Link
                        to="/"
                        className={styles['navbrand']}
                        style={{ textDecoration:'none' }}
                    >
                        <span className={styles['text-logo']}>
                            <img src={LibraryIcon} alt="logo" /><br />
                            <span className="h3 text-white">Library</span>
                        </span>
                    </Link>
                    <span className={styles['custom-spacer']}></span>

                    <div className={`${styles['sidebar-item']} ${styles['sidebar-button-group']}`}>
                        <div className={styles['sidebar-item--icon']}>
                            <Link
                                to="/"
                                className={styles['sidebar-item--icon']}
                            >
                                <ReactSVG src={HomeIcon} />                                
                            </Link>
                        </div>
                        <div className={styles['sidebar-item--title']}>
                            <Link to="/" className={styles['sidebar-item--title']}>
                                Home
                            </Link>
                        </div>
                    </div>
                    <div className={`${styles['sidebar-item']} ${styles['sidebar-button-group']}`}>
                        <div className={styles['sidebar-item--icon']}>
                            <Link
                                to="/livros"
                                className={styles['sidebar-item--icon']}
                            >
                                <ReactSVG src={HomeIcon} />   
                            </Link>
                        </div>
                        <div className={styles['sidebar-item--title']}>
                            <Link to="/livros" className={styles['sidebar-item--title']}>
                                Livros
                            </Link>
                        </div>
                    </div>
                    <div className={`${styles['sidebar-item']} ${styles['sidebar-button-group']}`}>
                        <div className={styles['sidebar-item--icon']}>
                            <Link
                                to="/meus-alugueis"
                                className={styles['sidebar-item--icon']}
                            >
                                <ReactSVG src={HomeIcon} />  
                            </Link>
                        </div>
                        <div className={styles['sidebar-item--title']}>
                            <Link to="/meus-alugueis" className={styles['sidebar-item--title']}>
                                Meus alugueis
                            </Link>
                        </div>
                    </div>
                    <div className={styles['sidebar-footer']}>
                        <div className={styles['sidebar-download']}>
                            <div className={styles['sidebar-download--icons']}>
                                <div>
                                    // Icon
                                </div>
                                <div>
                                    // Icon
                                </div>
                            </div>
                            <div className={styles['sidebar-download--title']}>
                                Faça download no celular
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}