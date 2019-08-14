import React from 'react'

function Navbar () {
    return (
        <nav className="navbar bg-primary">
            <a className="navbar-brand text-light" href="#">Clicky Game</a>
            <p>Click an image to begin!</p>
            <p>Score: 0 | Total Score: 0</p>
        </nav>
    )
}

export default Navbar;