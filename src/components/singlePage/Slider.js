import React, { Component } from 'react';

class Slider extends Component {
    render() {
        let { slider1, image1, slider2, image2, slider3, image3 } = this.props.mainpage[0];

        return (
            <div id="slider" className="carousel slide" data-ride="carousel">
                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <div className="carousel-caption slider-text">
                            <h1>{slider1}</h1>
                        </div>
                        <div className="carousel-caption mb-4 d-flex justify-content-center">
                            <div className="box">
                                <span></span>
                                <span></span>
                                <span></span>
                            </div>
                        </div>
                        <div className="bg-purple">
                            <img className="d-block w-100 slider-img" src={image1} alt="First slide" />
                        </div>
                    </div>
                    <div className="carousel-item">
                        <div className="carousel-caption slider-text">
                            <h1>{slider2}</h1>
                        </div>
                        <div className="carousel-caption mb-4 d-flex justify-content-center">
                            <div className="box">
                                <span></span>
                                <span></span>
                                <span></span>
                            </div>
                        </div>
                        <div className="bg-purple">
                            <img className="d-block w-100 slider-img" src={image2} alt="Second slide" />
                        </div>
                    </div>
                    <div className="carousel-item">
                        <div className="carousel-caption slider-text">
                            <h1>{slider3}</h1>
                        </div>
                        <div className="carousel-caption mb-4 d-flex justify-content-center">
                            <div className="box">
                                <span></span>
                                <span></span>
                                <span></span>
                            </div>
                        </div>
                        <div className="bg-purple">
                            <img className="d-block w-100 slider-img" src={image3} alt="Third slide" />
                        </div>
                    </div>
                </div>
                <a className="carousel-control-prev" href="#slider" role="button" data-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="sr-only">Previous</span>
                </a>
                <a className="carousel-control-next" href="#slider" role="button" data-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="sr-only">Next</span>
                </a>
            </div>
        );
    }
}

export default Slider;