import React, { Component } from 'react';
import { Link } from "react-router-dom";
import Video from "./Video";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

class Videos extends Component {


    showVideos = () => {
        const videos = this.props.videos;
        if (videos.length === 0) return <p className="text-center h6 mt-4">No hay videos que mostrar. Agrege un video.</p>
        return (
            <div className="row">
                {Object.keys(videos).map(video => (
                    <Video
                        key={video}
                        info={videos[video]}
                        deleteVideo={this.props.deleteVideo}
                    />
                ))}
            </div>
        )
    }

    render() {
        return (
            <div className="container font-Varela-13">
                <div className="table-wrapper">
                    <div class="table-title">
                        <div class="row">
                            <div class="col-sm-6">
                                <h2>Administrar <b>Videos</b></h2>
                            </div>
                            <div className="col-sm-6 text-right">
                                <Link className="btn reduce-padding btn-default" to={"/add-video"}><FontAwesomeIcon className="add-icon align-middle" icon={faPlus} />Agregar un video</Link>
                            </div>
                        </div>
                    </div>
                    {this.showVideos()}
                </div>
            </div>
        );
    }
}

export default Videos;