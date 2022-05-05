import { Component } from 'react';
import './footer.module.scss';

type Props = {
    className: string,
    children: JSX.Element
        | JSX.Element[]
        | React.ReactChild
        | React.ReactChild[],
};

export function Footer() {
    return (
        <div className="footer-page">
            Footer
        </div>
    );
}

// export default PageStructure;