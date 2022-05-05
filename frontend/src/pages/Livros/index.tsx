import Container from "../../components/layouts/default/container";
import Table from '@mui/material/Table';
import BookCard from "../../components/ui/BookCard";
import { useEffect, useState } from "react";
import { authApi } from "../../Api";

type Book = {
    id: number,
    title: string,
    userId: number,
}

export default function Livros() {
    const Api = authApi();
    const [livros, setLivros] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        Api.get('/').then(response => {
            setLivros(response.data.livros || []);
        })
        .catch(error => { 
            console.error(error);
            setLivros([]);
            setError('Erro ao carregar livros');
        })
    }, []);

    return (
        <Container className="page-livros">
            <div>
                <div className="px-5 py-4">Livros</div>

                <div className="album py-5 bg-light">
                    <div className="container">
                        <div className="row">
                            {
                                livros.map((livro: Book) => (
                                    <div className="col-md-4">
                                        <BookCard title={livro.title || ''} />
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    )
}