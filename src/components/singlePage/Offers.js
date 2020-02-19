import React, { Component } from 'react';
import $ from 'jquery';
import AuthService from '../../services/authService';
import Offer from "./Offer";
import Slider from "react-slick";

class Offers extends Component {
    state = {
        auth: new AuthService(),
        settings: {
            dots: false,
            infinite: false,
            speed: 500,
            slidesToShow: 2,
            slidesToScroll: 1,
            responsive: [{ breakpoint: 768, settings: { slidesToShow: 1 } }, { breakpoint: 1024, settings: { slidesToShow: 1 } }]
        }
    }

    showCourses = () => {
        const offers = this.props.offers;
        if (offers.length === 0) return <p className="text-center text-white h6 mt-4">No hay cursos que mostrar.</p>
        if (offers.length === 1) {
            let { id_course, name, headline, teacher, startDate, quota, image, enrolled_students } = offers[0];
            let date = new Date(startDate);
            let months = [
                "Ene",
                "Feb",
                "Mar",
                "Abr",
                "May",
                "Jun",
                "Jul",
                "Ago",
                "Sep",
                "Oct",
                "Nov",
                "Dic"
            ];
            let day = date.getDate();
            let month = months[date.getMonth()];
            let formatDate = day + " de " + month;
            return (
                <div className="container">
                    <div className="d-flex justify-content-center align-items-stretch font-Varela-14">
                        <div class="card mb-4" style={{ width: "22rem", border: "solid 2px rgba(0, 0, 0, 0.125)" }}>
                            <img src={image} class="card-img-top" alt="..." />
                            <div class='card-date bg-default'>Inicio: {formatDate}</div>
                            <div class="card-body d-flex flex-column">
                                <p class="card-title mx-auto mt-4">{name}</p>
                                <p class="card-text text-justify">{headline}</p>
                                <p class="card-text text-justify"><strong>Instructor: </strong> {teacher.name + " " + teacher.firstSurname + " " + teacher.secondSurname}</p>
                                <p class="card-text text-justify"><strong>Inscritos: </strong>{enrolled_students.length + "/" + quota}</p>
                                <div className="d-flex justify-content-center mt-auto">
                                    <button type="button" onClick={()=>this.props.openModalDetails(id_course)} className="btn btn-default">Ver más</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
        return (
            <div className="container">
                <Slider {...this.state.settings}>
                    {Object.keys(offers).map(course => (
                        <Offer
                            key={course}
                            info={offers[course]}
                            openModalDetails={this.props.openModalDetails}
                        />
                    ))}
                </Slider>
            </div>
        )
    }
    componentDidMount() {
        this.fullSizeCards();
        this.hoverEffectImage();
    }
    hoverEffectImage() {
        $(".card").mouseenter(function () {
            $(".card-img-top", this).addClass('opacity');
            $(this).addClass('card-shadow');

        }).mouseleave(function () {
            $(".card-img-top", this).removeClass('opacity');
            $(this).removeClass('card-shadow');
        });
    }

    fullSizeCards() {
        $(document).ready(function () {
            var heights = $(".card").map(function () {
                return $(this).height();
            }).get(),

                maxHeight = Math.max.apply(null, heights);

            $(".card").height(maxHeight);
        });
    }
    render() {
        if (this.props.mainpage.length === 0) return null;

        let {
            paragraafCourses
        } = this.props.mainpage[0];

        return (
            <section id="offers" className="offers bg-purple pb-4 shadow-top">
                <div className="container">
                    <h2 className="section-title-courses"><span>CURSOS</span></h2>
                    <p className="courses-description">{paragraafCourses}</p>
                </div>
                {this.showCourses()}
            </section>
        );
    }
}

export default Offers;