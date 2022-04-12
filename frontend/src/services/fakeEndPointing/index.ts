import LoginMock from '../mock/login.json';

type FakeEndPointsType = {
    [index: string]: Function;
}

type LoginObject = {
    [index: string]: string;
}

export type FakeServerResponse =  {
    status: Boolean;
    message: String;
    token?: String | undefined;
    data?: Object | undefined;
};

const getPromise = (url: string, init?: Object) => {
    const promisseCallback = (resolve: Function, reject: Function) => {
        fetch(url, init)
            .then(response => {
                if (!response.ok)
                {
                    throw new Error(
                        `Erro ao executar requisição, status ${response.status}`
                    );
                }

                return response.json();
            })
            .then(() => resolve())
            .catch(() => reject());
    }

    return new Promise<any>(promisseCallback); 
}

const FakeEndPoints: FakeEndPointsType = {
    '/login': function(request: LoginObject): FakeServerResponse {
        const email = request.email || '';
        const password = request.password || '';

        if (LoginMock.email !== email) {
            return { status: false, message: 'Email incorreto' };
        }
        if (LoginMock.password !== password) {
            return { status: false, message: 'Senha incorreta' };
        }

        return {
            status: false,
            message: 'Logado com sucesso!',
            token: 'fake-token'
        };
    }
};

export default
    function getEndPoint(endPoint: string, request: Object): FakeServerResponse {
        return FakeEndPoints[endPoint](request);
    }