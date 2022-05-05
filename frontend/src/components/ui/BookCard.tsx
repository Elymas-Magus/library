type BookProps = {
    capa?: string,
    title: string,
}

export default function BookCard({
    capa = "holder.js/100px225?theme=thumb&bg=55595c&fg=eceeef&text=Thumbnail",
    title
}: BookProps) {
    return (
        <div className="card mb-4 box-shadow">
            <img className="card-img-top" data-src={capa} alt="Card image cap" />
            <div className="card-body">
                <div className="card-title">{title}</div>
                <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                <div className="d-flex justify-content-between align-items-center">
                    <div className="btn-group">
                        <button type="button" className="btn btn-sm btn-outline-secondary">View</button>
                        <button type="button" className="btn btn-sm btn-outline-secondary">Edit</button>
                    </div>
                    <small className="text-muted">9 mins</small>
                </div>
            </div>
        </div>
    );
}