import React, { Component } from 'react';
import church from "../../assets/images/icon-church.png"
import cross from "../../assets/images/icon-cross.png"
import candles from "../../assets/images/icon-candles.png"

class About extends Component {
    render() {
        if (this.props.mainpage.length === 0) return null;
        let {            
            title1,
            paragraaf1,
            title2,
            paragraaf2,
            title3,
            paragraaf3,
            aboutUs,
            image4           
        } = this.props.mainpage[0];

        return (
            <section id="about" className="py-5" style={{ paddingTop: "50px" }}>
                <div className="container mb-4">
                    <div className="row about-summary" >
                        <div className="col-md-4">
                            <div className="circle-icon">
                                <img alt="imagen" className="text-primary" src={church} style={{ width: "45px", height: "77px" }} />
                            </div>
                            <h2 className="circle-icon-title text-center">{title1}</h2>
                            <p className="circle-icon-description text-center">{paragraaf1}</p>
                        </div>
                        <div className="col-md-4">
                            <div className="circle-icon">
                                <img alt="imagen" className="text-primary" src={cross} style={{ width: "45px", height: "77px" }} />
                            </div>
                            <h2 className="circle-icon-title text-center">{title2}</h2>
                            <p className="circle-icon-description text-center">{paragraaf2}</p>
                        </div>
                        <div className="col-md-4">
                            <div className="circle-icon">
                                <img alt="imagen" className="text-primary" src={candles} style={{ width: "45px", height: "77px" }} />
                            </div>
                            <h2 className="circle-icon-title text-center">{title3}</h2>
                            <p className="circle-icon-description text-center">{paragraaf3}</p>
                        </div>
                    </div>
                </div>
                <div className="container-diagonal-cut-right">
                    <img alt="imagen" className="img-effect-cut-rigth" src={image4}></img>
                    <div className="section-title">
                        Quienes somos
                    </div>
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col-md-12 mt-4">
                            <pre style={{ overflow: "hidden", whiteSpace: "pre-wrap", textAlign: "justify" }}>{aboutUs}</pre>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

export default About;