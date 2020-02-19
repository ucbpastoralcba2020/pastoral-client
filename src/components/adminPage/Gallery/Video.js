import React, { Component } from 'react';
import ReactPlayer from 'react-player';
import defaultImg from "../../../assets/images/defaultImgVideo.png";
import firebase from "firebase";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import $ from "jquery";
import Swal from 'sweetalert2';

class Video extends Component {
    componentDidMount() {
        this.theSameSize();
    }

    theSameSize = () => {
        $(document).ready(function () {
            var heights = $(".video").map(function () {
                return $(this).height();
            }).get(),

                maxHeight = Math.max.apply(null, heights);

            $(".video").height(maxHeight);
        });
    }

    confirmDelete = () => {
        const { id_video } = this.props.info;
        
        Swal.fire({
            title: '¿Estas seguro(a) de eliminar este video?',
            text: "Esta acción no podras revertirla",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            cancelButtonText: "Cancelar",
            confirmButtonText: 'Si, eliminar!'
        }).then((result) => {
            if (result.value) {
                this.props.deleteVideo(id_video);

                var storage = firebase.storage();
                var storageRef = storage.ref();
                var desertRef = storageRef.child(`videos/${id_video}`);

                desertRef.delete().then(function () {
                }).catch(function (error) {
                });
                Swal.fire(
                    'Eliminado!',
                    'El video se eliminó.',
                    'success'
                )
            }
        })
    }

    render() {

        return (
            <div className="col-md-4 mt-5">
                <div className="bg-white shadow video borderRad d-flex flex-column">
                    <div className='player-wrapper m-1'>
                        <ReactPlayer
                            url={this.props.info.src}
                            className='react-player'
                            controls={true}
                            light={defaultImg}
                            width='100%'
                            height='100%'
                        />
                    </div>
                    <p className="text-dark mx-2 mt-2 text-justify">{this.props.info.caption}</p>
                    <div className="text-right mt-auto">
                        <button type="button" className="btn reduce-padding btn-warning" onClick={this.confirmDelete}><FontAwesomeIcon className="delete-video-icon" icon={faTrashAlt} />Eliminar</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default Video;