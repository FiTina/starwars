import React from "react";

export default function Navbar() {
    return (
        <header className="App-header">
            <nav className="navbar navbar-expand-lg header-nav">
                <div className="container d-flex flex-row justify-content-between align-items-center w-100">

                    {/* Left side links (Desktop only) */}
                    <ul className="navbar-nav d-none d-lg-flex flex-row gap-3">
                        <li className="nav-item"><a className="nav-link" href="#">Upcoming</a></li>
                        <li className="nav-item"><a className="nav-link" href="#">Legacy</a></li>
                    </ul>

                    {/* Logo */}
                    <a className="navbar-brand mx-lg-auto" href="#">
                        <img src="/sw-logo.png" alt="Logo" className="nav-logo"/>
                    </a>

                    {/* Right side links (Desktop only) */}
                    <ul className="navbar-nav d-none d-lg-flex flex-row gap-3">
                        <li className="nav-item"><a className="nav-link" href="#">Merch</a></li>
                        <li className="nav-item"><a className="nav-link" href="#">About</a></li>
                    </ul>

                    {/* Mobile menu button */}
                    <button
                        className="navbar-toggler d-lg-none"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarNav"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                </div>

                {/* Mobile menu (Hidden on large screens) */}
                <div className="collapse navbar-collapse d-lg-none text-center" id="navbarNav">
                    <ul className="navbar-nav w-100">
                        <li className="nav-item"><a className="nav-link" href="#">Upcoming</a></li>
                        <li className="nav-item"><a className="nav-link" href="#">Legacy</a></li>
                        <li className="nav-item"><a className="nav-link" href="#">Merch</a></li>
                        <li className="nav-item"><a className="nav-link" href="#">About</a></li>
                    </ul>
                </div>

            </nav>
        </header>
    );
}