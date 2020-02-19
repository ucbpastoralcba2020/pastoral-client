import React, { Component } from 'react';
import Video from "./Video";
import $ from "jquery";

class Videos extends Component {

    state = {
        limit: 3
    }

    showVideos = () => {
        let videos = this.props.videos;
        if (videos.length === 0) return <p className="text-center h6 mt-4">No hay videos subidos</p>
        let videosToShow = videos.slice(0, this.state.limit);
        return (
            <div className="row">
                {Object.keys(videosToShow).map(video => (
                    <Video
                        key={video}
                        info={videosToShow[video]}
                        deleteVideo={this.props.deleteVideo}
                    />
                ))}
            </div>
        )
    }
    loadMore = () => {
        this.setState({
            limit: this.state.limit + 3
        })
    }

    showLittle = () => {
        this.setState({
            limit: 3
        },()=>{
            $("#gallery-videos").ready(function () {
                $("html, body").animate({
                    scrollTop: $('#gallery-videos').offset().top -105
                }, 1000);
            });
        })
    }

    render() {
        return (
            <div className="container text-white font-Varela-13">
                <div className="row">
                    <div className="col-sm-6">
                        <h2>Videos<b> Subidos</b></h2>
                    </div>
                </div>
                {this.showVideos()}
                {this.props.videos &&
                    [this.props.videos.length > 3 &&
                        [this.state.limit <= this.props.videos.length ?
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
        );
    }
}

export default Videos;