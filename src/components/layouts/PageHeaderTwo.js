import React, {Component} from "react";
import {Link} from "react-router-dom";

class PageHeaderTwo extends Component {
    render() {
        return (
            <section className="py-80 bg-gray">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <h2 className="section-title font-weight-bold mb-20">{this.props.title}</h2>
                            <nav aria-label="breadcrumb">
                                <ol className="breadcrumb bg-transparent p-0 font-weight-600 mb-0">
                                    <li className="breadcrumb-item active" aria-current="page">
                                        <Link
                                            to={'/'}
                                            className="text-primary initiate-scripts">
                                            Home</Link>
                                    </li>
                                    <li className="breadcrumb-item">{this.props.title}</li>
                                </ol>
                            </nav>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

export default PageHeaderTwo;