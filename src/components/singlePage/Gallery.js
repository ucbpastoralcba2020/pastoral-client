import React, { Component } from 'react';
import Images from './Images';
import Videos from './Videos';


class Gallery extends Component {
    
    render() {
        if (this.props.mainpage.length === 0) return null;

        let {            
            paragraafGallery
        } = this.props.mainpage[0];
        return (
            <section id="gallery" className="bg-purple pb-4">
                <div className="container text-dark">
                    <h2 className="text-center section-title-courses">RECUERDOS</h2>
                    <p className="text-center courses-description">{paragraafGallery}</p>
                   <div id="gallery-images" className="row">
                        <Images photos={this.props.photos} />
                   </div>
                    <div id="gallery-videos" className="row mt-4">
                        <Videos videos={this.props.videos}/>
                    </div>
                </div>
            </section>
        );
    }
}

export default Gallery;