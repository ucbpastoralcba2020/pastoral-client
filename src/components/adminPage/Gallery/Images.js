import React, { Component } from 'react';
import Gallery from 'react-grid-gallery';
import { Link } from "react-router-dom";
import firebase from "firebase";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';

class Images extends Component {

    state = {
        currentImage: 0,
    }

    deleteImage = () => {
        let images = this.props.photos;

        let index = this.state.currentImage;

        if (images.length !== 0) {
            if (index === images.length - 1) {
                index--;
                this.setState({
                    currentImage: index
                })
            }
            const { id_image } = images[this.state.currentImage];

            Swal.fire({
                title: '¿Estas seguro(a) de eliminar esta imagen?',
                text: "Esta acción no podras revertirla",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                cancelButtonText: "Cancelar",
                confirmButtonText: 'Si, eliminar!'
            }).then((result) => {
                if (result.value) {

                    this.props.deleteImage(id_image);

                    var storage = firebase.storage();
                    var storageRef = storage.ref();
                    var desertRef = storageRef.child(`photos/${id_image}`);

                    desertRef.delete().then(function () {
                    }).catch(function (error) {
                    });
                    Swal.fire(
                        'Eliminada!',
                        'La imagen se eliminó.',
                        'success'
                    )
                }
            })

        }
        if (images.length === 0) {
            this.setState({
                currentImage: 0
            })
        }
    }

    onCurrentImageChange = (index) => {
        this.setState({ currentImage: index });
    }
    render() {
        const images = this.props.photos;
        return (

            <div className="container image-gallery font-Varela-13">
                <div className="table-wrapper pb-0">
                    <div class="table-title">
                        <div class="row">
                            <div class="col-sm-6">
                                <h2>Administrar <b>Imagenes</b></h2>
                            </div>
                            <div className="col-sm-6 text-right">
                                <Link className="btn reduce-padding btn-default" to={"/add-image"}><FontAwesomeIcon className="add-icon align-middle" icon={faPlus} />Agregar una imagen</Link>
                            </div>
                        </div>
                    </div>
                    {images.length === 0 &&
                        <p className="text-center h6 mt-4 pb-4">No hay imagenes que mostrar. Agrege una imagen.</p>
                    }
                </div>
                <Gallery
                    enableLightbox={true}
                    enableImageSelection={false}
                    currentImageWillChange={this.onCurrentImageChange}
                    customControls={[<button key="deleteImage" onClick={this.deleteImage}>Eliminar</button>]}
                    images={this.props.photos}
                />

            </div>
        );
    }
}

export default Images;