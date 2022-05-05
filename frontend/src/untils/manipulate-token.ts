import axios from '../Api';
import constants from "../configs/constants";
import SessionHelper from "./session-helper";

const ManipulatorToken = {
    async getUserPromisse(token: string) {
        token = token ? token : this.getToken();
        const configs = {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        };

        return await axios.post(
            '/auth/check-user', {}, configs
        );
    },
    async getUser(token: string) {
        token = token ? token : this.getToken();
        const response = await this.getUserPromisse(token);

        return response?.data;
    },
    saveToken(accessToken: string) {
        SessionHelper.setItem('access-token', accessToken);
        axios.defaults.headers
            .common['Authorization'] = `Bearer ${accessToken}`;
    },
    async validateToken(accessToken :string) {
        return !! (await this.getUser(accessToken));
    },
    getToken() {
        return SessionHelper.getItem('access-token');
    }
}

export default ManipulatorToken;