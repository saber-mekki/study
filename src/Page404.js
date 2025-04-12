import React from 'react'
import HeaderOne from './components/layouts/HeaderOne'

export default function Page404() {
    return (
        <>
            <HeaderOne />
            <div
                className="d-flex justify-content-center align-items-center bg-light"
                style={{ height: '82vh' }}
            >
                <div className="text-center user-select-none">
                    <h1 className="display-1 text-danger">404</h1>
                    <p className="h1">Sorry, the page you're looking for doesn't exist.</p>
                    <p className="h2">It might have been moved or deleted, or you may have mistyped the URL.</p>
                    <button
                        className="btn btn-primary mt-3"
                        onClick={() => window.location.href = "/#/home-one"}
                    >
                        Return to Accueil
                    </button>

                </div>
            </div>


        </>
    )
}
