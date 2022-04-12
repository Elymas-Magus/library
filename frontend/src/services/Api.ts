import getEndPoint, { FakeServerResponse } from './fakeEndPointing';

const FakeApi = {
    post,
    get,
};

export function get(url: string, data?: Object): FakeServerResponse {
    return getEndPoint(url, data || {});    
};

// Promise<any>
export function post(url: string, data?: Object): FakeServerResponse {
    return getEndPoint(url, data || {});
};

export default FakeApi;