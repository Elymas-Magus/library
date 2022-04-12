import {
  useState,
  SyntheticEvent
} from 'react';
import FakeApi from '../../services/Api';
import logo from '../../assets/svg/bootstrap-logo.svg';
import '../../assets/css/Signin.css';
import { FakeServerResponse } from '../../services/fakeEndPointing';

export function Login() {
  const [ email, setEmail ] = useState("");
  const [ password, setPassword ] = useState("");

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    
    var response: FakeServerResponse;
    var form = {
      email: email,
      password: password
    };

    response = FakeApi.post('/login', form);

    if (response.status) {
      console.log('sucess');
    } else {
      console.error('error');
    }
  }

  return (
    <main className="form-signin w-100">
      <form
        onSubmit={handleSubmit}
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
            className="form-control"
            id="floatingInput"
            placeholder="name@example.com"
            onChange={(e) => setEmail(e.target.value)}
          />
          <label className="floatingInput">Email</label>
        </div>
        <div className="form-floating">
          <input
            type="password"
            className="form-control"
            id="floatingPassword"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <label>Senha</label>
        </div>

        <div className="checkbox mb-3">
          <label>
            <input type="checkbox" value="remember-me" /> Lembrar-me
          </label>
        </div>
        <button className="w-100 btn btn-lg btn-primary" type="submit">
          Entrar
        </button>
      </form>
    </main>
  );
}
