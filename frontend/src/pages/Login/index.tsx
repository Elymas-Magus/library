import {
  useState,
  ChangeEvent,
  useEffect,
} from 'react';
import { useNavigate } from 'react-router-dom';
import { handleLogin } from './../../components/auth/access';
import { XlButton } from '../../components/ui/CustomButton';

import logo from '../../assets/svg/bootstrap-logo.svg';
import '../../assets/css/Signin.css';
import ManipulatorToken from '../../untils/manipulate-token';

function initialState() {
  return {
    email: '',
    password: '',
  }
}

export default function Login({ token }: any) {
  const [ values, setValues ] = useState(initialState);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  }

  const navigate = useNavigate();
  const redirect = () => navigate('/');

  useEffect(() => {
    const token = ManipulatorToken.getToken();

    if (token && typeof token === 'string' && token !== '') {
      ManipulatorToken.getUser(token)
        .then(redirect)
        .catch(() => {
          console.warn("Você precisa logar para ter acesso ao conteúdo");
        })
    }
  }, [])


  return (
    <div>
      <main className="form-signin w-100">
        <form
          id="login_form"
          onSubmit={(e) => handleLogin(e, values, redirect)}
          className="mx-auto my-5 text-center"
          style={{ maxWidth: '300px' }}
        >
          <img
            className="mb-4 text-center"
            src={logo}
            alt="Bootstrap logo"
            width="72"
            height="57"
          />
          <h1 className="h3 mb-3 fw-normal">Please sign in</h1>

          <div className="form-floating">
            <input
              type="email"
              name="email"
              className="form-control"
              id="floatingInput"
              placeholder="name@example.com"
              onChange={onChange}
              value={values.email}
            />
            <label className="floatingInput">Email</label>
          </div>
          <div className="form-floating">
            <input
              type="password"
              name="password"
              className="form-control"
              id="floatingPassword"
              placeholder="Password"
              onChange={onChange}
              value={values.password}
            />
            <label>Senha</label>
          </div>

          <div className="checkbox mb-3">
            <label>
              <input type="checkbox" value="remember-me" /> Lembrar-me
            </label>
          </div>
          <XlButton
            type="submit"
          >
            Entrar
          </XlButton>
        </form>
      </main>
    </div>
  );
}
