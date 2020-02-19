import React, { Component } from 'react';
import Gallery from 'react-grid-gallery';
import $ from "jquery";

class Images extends Component {

    state = {
        currentImage: 0,
        limit: 8
    }

    onCurrentImageChange = (index) => {
        this.setState({ currentImage: index });
    }

    loadMore = () => {
        this.setState({
            limit: this.state.limit + 8
        })
    }

    showLittle = () => {
        this.setState({
            limit: 8
        }, () => {
            $("#gallery-images").ready(function () {
                $("html, body").animate({
                    scrollTop: $('#gallery-images').offset().top - 105
                }, 1000);
            });
        })
    }
    showImages = (imagesToShow) => {
        return (
            <Gallery
                enableLightbox={true}
                enableImageSelection={false}
                currentImageWillChange={this.onCurrentImageChange}
                images={imagesToShow}
            />
        )
    }

    render() {
        if (!this.props.photos) return null;
        const images = this.props.photos;

        let imagesToShow = images.slice(0, this.state.limit);
        return (

            <React.Fragment>
                <div className="container image-gallery text-white font-Varela-13">

                    <div className="row mb-5">
                        <div className="col-sm-6">
                            <h2>Imagenes <b>Subidas</b></h2>
                        </div>
                    </div>
                    {images.length === 0 &&
                        <p className="text-center h6 mt-4 pb-4">No hay fotos subidas.</p>
                    }
                    {this.showImages(imagesToShow)}

                </div>
                <div className="container">
                    {this.props.photos &&
                        [this.props.photos.length > 8 &&
                            [this.state.limit <= this.props.photos.length ?
                                <div className="d-flex justify-content-center mt-4">
                                    <button className="btn btn-warning" onClick={this.loadMore}>Cargar más</button>
                                </div>
                                :
                                <div className="d-flex justify-content-center">
                                    <button className="btn btn-warning" onClick={this.showLittle}>Mostrar menos</button>
                                </div>
                            ]
                        ]
                    }
                </div>
            </React.Fragment>
        );
    }
}

export default Images;