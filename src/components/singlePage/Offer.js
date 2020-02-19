import React, { Component } from 'react';

class Offer extends Component {
    render() {
        const { id_course, name, headline, teacher, startDate, quota, image, enrolled_students } = this.props.info;
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
            <div className="d-flex justify-content-center align-items-stretch font-Varela-14">
                <div className="card mb-4" style={{ width: "22rem", border: "solid 2px rgba(0, 0, 0, 0.125)" }}>
                    <img src={image} className="card-img-top" alt="..." />
                    <div className='card-date bg-default'>Inicio: {formatDate}</div>
                    <div className="card-body d-flex flex-column">
                        <p className="card-title mx-auto mt-4">{name}</p>
                        <p className="card-text text-justify">{headline}</p>
                        <p className="card-text text-justify"><strong>Instructor: </strong> {teacher.name + " " + teacher.firstSurname + " " + teacher.secondSurname}</p>
                        <p className="card-text text-justify"><strong>Inscritos: </strong>{enrolled_students.length + "/" + quota}</p>
                        <div className="d-flex justify-content-center mt-auto">
                            <button type="button" onClick={()=>this.props.openModalDetails(id_course)} className="btn btn-default">Ver más</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Offer;