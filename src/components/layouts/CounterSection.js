import React, {Component} from "react";

class CounterSection extends Component {
    render() {
        return (
            <section className="pt-60 pb-40 bg-gray">
                <div className="container text-center">
                    <div className="row justify-content-center">
                        <div className="col-xl-3 col-lg-4 mb-30">
                            <h2 className="text-xl text-tertiary"><span className="jsCounter">650</span>K+</h2>
                            <p className="h5 font-weight-600">Online Courses</p>
                        </div>
                        <div className="col-xl-4 col-lg-4 mb-30">
                            <h2 className="text-xl text-primary"><span className="jsCounter">35</span>K+</h2>
                            <p className="h5 font-weight-600">Certified People </p>
                        </div>
                        <div className="col-xl-3 col-lg-4 mb-30">
                            <h2 className="text-xl text-secondary"><span className="jsCounter">700</span>K+</h2>
                            <p className="h5 font-weight-600">Lifetime Access</p>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

export default CounterSection;