import React, { Component } from 'react';
import ReactPlayer from 'react-player';
import defaultImg from "../../assets/images/videoDefault.jpg";
import $ from "jquery";

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

    render() {

        return (
            <div className="col-md-4 mt-5 moreBox">
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
                </div>
            </div>
        );
    }
}

export default Video;