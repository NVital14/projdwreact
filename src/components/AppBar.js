import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';

function AppBar() {


    return (
        <nav className="navbar navbar-expand-sm navbar-toggleable-sm navbar-light custom-navbar">
            <div className="container-fluid">
                <a className="navbar-brand" id="title">My Favorite Things</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target=".navbar-collapse"
                    aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="navbar-collapse collapse d-sm-inline-flex justify-content-between">
                    <ul className="navbar-nav flex-grow-1">

                        <li className="nav-item">
                            <a className="nav-link text-light">
                                <strong>Categorias</strong>

                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link text-light"> <strong>As Minhas Reviews</strong></a>

                        </li>

                    </ul>
                </div>
            </div>
        </nav>

    );
}

export default AppBar;