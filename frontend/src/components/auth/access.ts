import React, { SyntheticEvent } from "react";
import { NavigateFunction, useNavigate } from 'react-router-dom';

import Api from '../../Api';
import ManipulatorToken from '../../untils/manipulate-token';
import SessionHelper from "../../untils/session-helper";

export type LoginFormData = {
    email: string,
    password: string,
}

export function handleLogin(e: SyntheticEvent, form: LoginFormData, callback: Function) {
    e.preventDefault();
    
    Api.post('/auth/login', form)
        .then(response => {
            const { token } = response.data;

            if (!token || token == '' || token ==  []) {
                throw new Error("Token inválido")
            }

            ManipulatorToken.saveToken(token);

            callback();
        })
        .catch(error => {
            console.error(error);
            
        });
}

export function handleLogout(e: SyntheticEvent, callback: Function) {
    e.preventDefault();
    const tokenKey = 'access-token';
    const token = SessionHelper.getDecodedItem(tokenKey);

    if (!token) { return }

    Api.post('/auth/logout')
        .then(response => {
            SessionHelper.remove(tokenKey);
            console.log(response.data.message);

            callback();
        })
        .catch(console.error);
}