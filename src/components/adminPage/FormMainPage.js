import React, { Component } from 'react';
import exampleslide from "../../assets/images/exampleslide.gif";
import exampletext from "../../assets/images/exampleText.png";
import mainImg from "../../assets/images/mainimg.jpg";
import firebase from "firebase";
import axios from "axios";
import Swal from "sweetalert2";

class FormMainPage extends Component {
    state = {
        alert: null,
        mainpage: [],
        nameImg1: null,
        nameImg2: null,
        nameImg3: null,
        nameImg4: null,
        image1: null,
        image2: null,
        image3: null,
        image4: null,
        uploadValue1: 0,
        uploadValue2: 0,
        uploadValue3: 0,
        uploadValue4: 0,
        mainId: "123456789987654321",

        defaultinfo: {
            id_main: "123456789987654321",

            slider1: "Lorem ipsum dolor sit amet consect",
            image1: mainImg,
            nameImg1: "1",

            slider2: "Lorem ipsum dolor sit amet consect",
            image2: mainImg,
            nameImg2: "1",

            slider3: "Lorem ipsum dolor sit amet consect",
            image3: mainImg,
            nameImg3: "1",

            title1: "Lorem ipsum dolor",
            paragraaf1: "Lorem ipsum dolor sit amet consectetur adipiscing elit risus nascetur turpis molestie dapibus condi",

            title2: "Lorem ipsum dolor",
            paragraaf2: "Lorem ipsum dolor sit amet consectetur adipiscing elit risus nascetur turpis molestie dapibus condi",

            title3: "Lorem ipsum dolor",
            paragraaf3: "Lorem ipsum dolor sit amet consectetur adipiscing elit risus nascetur turpis molestie dapibus condi",

            aboutUs: "Lorem ipsum dolor sit amet consectetur adipiscing elit enim molestie, integer facilisi ligula vulputate nullam auctor pellentesque aenean hendrerit vestibulum, ornare etiam inceptos dictumst faucibus gravida viverra bibendum. Mi imperdiet fusce dui cursus diam est eu vestibulum, erat fermentum habitasse sem class dictum dictumst varius, nisi porta sollicitudin conubia sapien quam pharetra. Augue vitae eget nostra ornare nunc elementum suscipit condimentum, tincidunt malesuada mus taciti nam litora inceptos varius urna, natoque ad rutrum pellentesque erat gravida molestie. Nascetur facilisi at a tortor euismod elementum dictum, fringilla nec odio ornare vitae vivamus. Sodales ad risus lacus semper rhoncus, fermentum nec tortor metus conubia vel, parturient primis nulla taciti. Netus magna lectus diam ligula donec mattis volutpat, lobortis scelerisque parturient semper facilisis himenaeos, nunc curae dictumst rhoncus quisque rutrum. Ridiculus cursus placerat tellus fames per quisque suscipit, urna pharetra vehicula mauris nisi litora parturient, venenatis nostra ac feugiat aliquet gravida. Suscipit curae eu luctus enim morbi porta natoque habitasse feugiat eleifend, dictumst dui sociis vulputate massa magnis mattis vel condimentum nisi, ut tellus parturient malesuada id felis odio lobortis interdum. Mollis vivamus mi odio volutpat venenatis fames quam, mus tristique rhoncus potenti id facilisis eget, nullam commodo curabitur turpis erat senectus. Aliquet vivamus semper ultricies habitasse turpis class egestas torquent, sociis porta mauris est id varius sapien eu vulputate, ornare tristique euismod magna primis suspendisse convallis. Lacinia volutpat vivamus sodales viverra, egestas phasellus cras. Nisl dui consequat fames nec molestie porta leo metus, vitae neque massa ornare at sem praesent congue natoque, lobortis vehicula placerat luctus dictumst curabitur sociosqu. Tempus eleifend risus pharetra dapibus magna curae ad penatibus nullam duis torquent rutrum, bibendum justo sagittis morbi ante per placerat lectus congue diam cubilia. Cum torquent tincidunt ut integer lobortis curabitur aenean tempor venenatis aliquet, rhoncus cursus hac etiam a facilisi tellus eu sociis enim, eros phasellus neque vivamus aliquam rutrum vitae porta auctor. Luctus vitae vivamus interdum diam suspendisse aliquet fringilla, tellus magna pretium ornare varius donec aptent, non lacinia semper ultrices facilisi conubia. Ridiculus a gravida penatibus ultricies dis dictum ullamcorp",
            image4: mainImg,
            nameImg4: "1",

            paragraafCourses: "Lorem ipsum dolor sit amet consectetur adipiscing elit imperdiet, molestie sed sodales tempor laoreet nibh rhoncus, porttitor curabitur placerat praesent porta tellus convallis. Iaculis inceptos vitae libero id volutpat aenean magnis class sollicitu.",

            paragraafGallery: "Lorem ipsum dolor sit amet consectetur adipiscing elit imperdiet, molestie sed sodales tempor laoreet nibh rhoncus, porttitor curabitur placerat praesent porta tellus convallis. Iaculis inceptos vitae libero id volutpat aenean magnis class sollicitu."
        }
    }

    slider1Ref = React.createRef();
    image1Ref = React.createRef();
    nameImg1Ref = React.createRef();

    slider2Ref = React.createRef();
    image2Ref = React.createRef();
    nameImg2Ref = React.createRef();

    slider3Ref = React.createRef();
    image3Ref = React.createRef();
    nameImg3Ref = React.createRef();

    title1Ref = React.createRef();
    paragraaf1Ref = React.createRef();

    title2Ref = React.createRef();
    paragraaf2Ref = React.createRef();

    title3Ref = React.createRef();
    paragraaf3Ref = React.createRef();

    aboutUsRef = React.createRef();
    image4Ref = React.createRef();
    nameImg4Ref = React.createRef();

    paragraafCoursesRef = React.createRef();

    paragraafGalleryRef = React.createRef();


    resetPercentage1 = () => {
        if (this.state.image1 != null) {
            this.setState({
                uploadValue1: 0
            })
        }
    }
    upload1 = (event) => {
        const file = event.target.files[0];
        const name = (new Date()).getTime();
        const storageRef = firebase.storage().ref(`/photos/${name}`);
        const task = storageRef.put(file);
        task.on("state_changed", snapshot => {
            let percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            this.setState({
                uploadValue1: percentage,
                nameImg1: name
            })
        }, error => {
            console.log(error.message);
        }, () => {
            task.snapshot.ref.getDownloadURL().then((url) => {
                this.setState({
                    image1: url,
                })
            })
        });
    }


    resetPercentage2 = () => {
        if (this.state.image2 != null) {
            this.setState({
                uploadValue2: 0
            })
        }
    }
    upload2 = (event) => {
        const file = event.target.files[0];
        const name = (new Date()).getTime();
        const storageRef = firebase.storage().ref(`/photos/${name}`);
        const task = storageRef.put(file);
        task.on("state_changed", snapshot => {
            let percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            this.setState({
                uploadValue2: percentage,
                nameImg2: name
            })
        }, error => {
            console.log(error.message);
        }, () => {
            task.snapshot.ref.getDownloadURL().then((url) => {
                this.setState({
                    image2: url
                })
            })
        });
    }

    resetPercentage3 = () => {
        if (this.state.image3 != null) {
            this.setState({
                uploadValue3: 0
            })
        }
    }
    upload3 = (event) => {
        const file = event.target.files[0];
        const name = (new Date()).getTime();
        const storageRef = firebase.storage().ref(`/photos/${name}`);
        const task = storageRef.put(file);
        task.on("state_changed", snapshot => {
            let percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            this.setState({
                uploadValue3: percentage,
                nameImg3: name
            })
        }, error => {
            console.log(error.message);
        }, () => {
            task.snapshot.ref.getDownloadURL().then((url) => {
                this.setState({
                    image3: url
                })
            })
        });
    }

    resetPercentage4 = () => {
        if (this.state.image4 != null) {
            this.setState({
                uploadValue4: 0
            })
        }
    }
    upload4 = (event) => {
        const file = event.target.files[0];
        const name = (new Date()).getTime();
        const storageRef = firebase.storage().ref(`/photos/${name}`);
        const task = storageRef.put(file);
        task.on("state_changed", snapshot => {
            let percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            this.setState({
                uploadValue4: percentage,
                nameImg4: name
            })
        }, error => {
            console.log(error.message);
        }, () => {
            task.snapshot.ref.getDownloadURL().then((url) => {
                this.setState({
                    image4: url
                })
            })
        });
    }
    componentDidMount() {
        this.getInfo();
    }

    getInfo = () => {
        axios.get(process.env.REACT_APP_URL_BACKEND + "/api/mainpage/list")
            .then(res => {
                this.setState({
                    mainpage: res.data
                }, () => {
                    if (this.state.mainpage.length === 0) {
                        const headers = {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        }
                        axios.post(process.env.REACT_APP_URL_BACKEND + `/api/mainpage/add`, this.state.defaultinfo, { headers })
                            .then(res => {
                                if (res.status === 200) {
                                    console.log("creado por defecto", res.data);

                                }
                            })
                    }

                })
            })
    }

    saveValues = (e) => {
        e.preventDefault();
        let image1;
        let image2;
        let image3;
        let image4;
        let nameImg1;
        let nameImg2;
        let nameImg3;
        let nameImg4;

        if (this.state.image1 === null) {
            image1 = mainImg;
            nameImg1 = "1";
        } else {
            image1 = this.state.image1;
            nameImg1 = this.state.nameImg1;
            let lastnameImg = this.state.mainpage[0].nameImg1;
            console.log("antigu", lastnameImg);

            if (lastnameImg !== "1") {
                let storage = firebase.storage();
                let storageRef = storage.ref();
                let desertRef = storageRef.child(`photos/${lastnameImg}`);

                desertRef.delete().then(function () {
                }).catch(function (error) {
                });
            }
        }

        if (this.state.image2 === null) {
            image2 = mainImg;
            nameImg2 = "1";
        } else {
            image2 = this.state.image2;
            nameImg2 = this.state.nameImg2;
            let lastnameImg = this.state.mainpage[0].nameImg2;
            if (lastnameImg !== "1") {
                let storage = firebase.storage();
                let storageRef = storage.ref();
                let desertRef = storageRef.child(`photos/${lastnameImg}`);

                desertRef.delete().then(function () {
                }).catch(function (error) {
                });
            }
        }

        if (this.state.image3 === null) {
            image3 = mainImg;
            nameImg3 = "1";
        } else {
            image3 = this.state.image3;
            nameImg3 = this.state.nameImg3;
            let lastnameImg = this.state.mainpage[0].nameImg3;
            if (lastnameImg !== "1") {
                let storage = firebase.storage();
                let storageRef = storage.ref();
                let desertRef = storageRef.child(`photos/${lastnameImg}`);

                desertRef.delete().then(function () {
                }).catch(function (error) {
                });
            }
        }

        if (this.state.image4 === null) {
            image4 = mainImg;
            nameImg4 = "1";
        } else {
            image4 = this.state.image4;
            nameImg4 = this.state.nameImg4;
            let lastnameImg = this.state.mainpage[0].nameImg4;
            if (lastnameImg !== "1") {
                let storage = firebase.storage();
                let storageRef = storage.ref();
                let desertRef = storageRef.child(`photos/${lastnameImg}`);

                desertRef.delete().then(function () {
                }).catch(function (error) {
                });
            }
        }

        let mainpage = {
            id_main: this.state.mainId,

            slider1: this.slider1Ref.current.value,
            image1: image1,
            nameImg1: nameImg1,

            slider2: this.slider2Ref.current.value,
            image2: image2,
            nameImg2: nameImg2,

            slider3: this.slider3Ref.current.value,
            image3: image3,
            nameImg3: nameImg3,

            title1: this.title1Ref.current.value,
            paragraaf1: this.paragraaf1Ref.current.value,

            title2: this.title2Ref.current.value,
            paragraaf2: this.paragraaf2Ref.current.value,

            title3: this.title3Ref.current.value,
            paragraaf3: this.paragraaf3Ref.current.value,

            aboutUs: this.aboutUsRef.current.value,
            image4: image4,
            nameImg4: nameImg4,

            paragraafCourses: this.paragraafCoursesRef.current.value,

            paragraafGallery: this.paragraafGalleryRef.current.value
        }

        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }

        axios.put(process.env.REACT_APP_URL_BACKEND + `/api/mainpage/update`, mainpage, { headers })
            .then(res => {
                if (res.status === 200) {
                    Swal.fire(
                        'Página principal actualizada.',
                        'Se guardaron los cambios.',
                        'success'
                    )
                    this.getInfo();
                }
            })
    }

    readData = (e) => {
        const value = e.target.value;
        const name = e.target.name;

        if (name === "slide1" || name === "slide2" || name === "slide3") {
            if (value.length === 35) {

                this.showAlert("El texto es demasiado largo. Solo se permite 35 caracteres", "alert-danger", name);
            }
        }
        if (name === "title1" || name === "title2" || name === "title3") {
            if (value.length === 18) {

                this.showAlert("El texto es demasiado largo. Solo se permite 18 caracteres", "alert-danger", name);
            }
        }
        if (name === "paragraaf1" || name === "paragraaf2" || name === "paragraaf3") {
            if (value.length === 200) {

                this.showAlert("El texto es demasiado largo. Solo se permite 200 caracteres", "alert-danger", name);
            }
        }
        if (name === "aboutus") {
            if (value.length === 3000) {

                this.showAlert("El texto es demasiado largo. Solo se permite 3000 caracteres", "alert-danger", name);
            }
        }
        if (name === "courses" || name === "gallery") {
            if (value.length === 300) {
                this.showAlert("El texto es demasiado largo. Solo se permite 300 caracteres", "alert-danger", name);
            }
        }
    }

    showAlert = (msg, category, field) => {
        const alert = {
            msg: msg,
            category: category,
            field: field
        }
        this.setState({
            alert: alert
        })

        setTimeout(() => {
            this.setState({
                alert: null
            });
        }, 4000)
    }

    render() {

        if (this.state.mainpage.length === 0) return null;
        let {
            slider1,
            image1,
            slider2,
            image2,
            slider3,
            image3,
            title1,
            paragraaf1,
            title2,
            paragraaf2,
            title3,
            paragraaf3,
            aboutUs,
            image4,
            paragraafCourses,
            paragraafGallery
        } = this.state.mainpage[0];

        return (
            <div className="container font-Varela-13">
                <div className="table-wrapper">
                    <div class="table-title">
                        <div class="row">
                            <div class="col-sm-6">
                                <h2>Administrar <b>Página principal</b></h2>
                            </div>
                        </div>
                    </div>
                    <form className="my-4" onSubmit={this.saveValues}>
                        <div className="row">
                            <div className="col-12 d-flex justify-content-center">
                                <p className="h3">Slides</p>
                            </div>
                            <div className="col-12 d-flex justify-content-center">
                                <img className="mt-2" style={{ maxHeight: "200px", maxWidth: "450px", objectFit: "cover" }} id="img" src={exampleslide} alt="imagen" />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12">
                                {this.state.alert ? [(this.state.alert.field === "slide1" || this.state.alert.field === "slide2" || this.state.alert.field === "slide3") && <div className={`mt-2 alert ${this.state.alert.category}`} op="alert" >{this.state.alert.msg}</div>] : null}
                            </div>
                        </div>
                        <div className="row my-3 d-flex justify-content-around">
                            <div className="col-md-4">
                                <div class="form-group">
                                    <label htmlFor="slide1">Slide1-texto:</label>
                                    <input id="slide1" ref={this.slider1Ref} onChange={this.readData} name="slide1" maxLength="35" type="text" className="form-control" placeholder="Texto..." defaultValue={slider1} required />
                                </div>
                                <p>Seleccione una imagen:</p>
                                <input ref={this.image1Ref} id="image1" accept="image/*" onClick={this.resetPercentage1} onChange={this.upload1} name="image1" type="file" alt="imagen" />
                                <img className="mt-3" alt="imagen" style={{ height: "200px", maxWidth: "320px", objectFit: "cover" }} id="img" src={this.state.image1 != null ? this.state.image1 : image1} />
                                <br />
                                <div class="progress-bar-styles mt-4">
                                    <progress class="front-end-progress-bar" value={this.state.uploadValue1} max="100"></progress>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div class="form-group">
                                    <label htmlFor="slide2">Slide2-texto:</label>
                                    <input id="slide2" ref={this.slider2Ref} onChange={this.readData} name="slide2" maxLength="35" type="text" className="form-control" placeholder="Texto..." defaultValue={slider2} required />
                                </div>
                                <p>Seleccione una imagen:</p>
                                <input ref={this.image2Ref} id="image2" accept="image/*" onClick={this.resetPercentage2} onChange={this.upload2} name="image2" type="file" alt="imagen" />
                                <img className="mt-3" alt="imagen" style={{ height: "200px", maxWidth: "320px", objectFit: "cover" }} id="img" src={this.state.image2 != null ? this.state.image2 : image2} />
                                <br />
                                <div class="progress-bar-styles mt-4">
                                    <progress class="front-end-progress-bar" value={this.state.uploadValue2} max="100"></progress>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div class="form-group">
                                    <label htmlFor="slide3">Slide3-texto:</label>
                                    <input id="slide3" ref={this.slider3Ref} onChange={this.readData} name="slide3" maxLength="35" type="text" className="form-control" placeholder="Texto..." defaultValue={slider3} required />
                                </div>
                                <p>Seleccione una imagen:</p>
                                <input ref={this.image3Ref} id="image3" accept="image/*" onClick={this.resetPercentage3} onChange={this.upload3} name="image3" type="file" alt="imagen" />
                                <img className="mt-3" alt="imagen" style={{ height: "200px", maxWidth: "320px", objectFit: "cover" }} id="img" src={this.state.image3 != null ? this.state.image3 : image3} />
                                <br />
                                <div class="progress-bar-styles mt-4">
                                    <progress class="front-end-progress-bar" value={this.state.uploadValue3} max="100"></progress>
                                </div>
                            </div>
                        </div>


                        <div className="row">
                            <div className="col-12 d-flex justify-content-center">
                                <p className="h3 my-5">Acerca de nosotros</p>
                            </div>
                            <div className="col-12 d-flex justify-content-center">
                                <img className="mt-2" alt="imagen" style={{ maxHeight: "200px", maxWidth: "450px", objectFit: "cover" }} id="img" src={exampletext} />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12">
                                {this.state.alert ? [(this.state.alert.field === "title1" || this.state.alert.field === "title2" || this.state.alert.field === "title3") && <div className={`mt-2 alert ${this.state.alert.category}`} op="alert" >{this.state.alert.msg}</div>] : null}
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-12">
                                {this.state.alert ? [(this.state.alert.field === "paragraaf1" || this.state.alert.field === "paragraaf2" || this.state.alert.field === "paragraaf3") && <div className={`mt-2 alert ${this.state.alert.category}`} op="alert" >{this.state.alert.msg}</div>] : null}
                            </div>
                        </div>
                        <div className="row my-3 d-flex justify-content-around">
                            <div className="col-md-4">
                                <div class="form-group">
                                    <label htmlFor="title1">Ícono-iglesia-título:</label>
                                    <input ref={this.title1Ref} id="title1" onChange={this.readData} name="title1" maxLength="18" type="text" className="form-control" placeholder="Título..." defaultValue={title1} required />
                                </div>
                                <div class="form-group">
                                    <label htmlFor="paragraaf1">Descripción:</label>
                                    <textarea ref={this.paragraaf1Ref} onChange={this.readData} rows="3" id="paragraaf1" name="paragraaf1" maxLength="200" type="text" className="form-control" placeholder="Descripción..." defaultValue={paragraaf1} required />
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div class="form-group">
                                    <label htmlFor="title2">Ícono-cruz-título:</label>
                                    <input ref={this.title2Ref} onChange={this.readData} id="title2" name="title2" maxLength="18" type="text" className="form-control" placeholder="Título..." required defaultValue={title2} />
                                </div>
                                <div class="form-group">
                                    <label htmlFor="paragraaf2">Descripción:</label>
                                    <textarea ref={this.paragraaf2Ref} onChange={this.readData} rows="3" id="paragraaf2" name="paragraaf2" maxLength="200" type="text" className="form-control" placeholder="Descripción..." defaultValue={paragraaf2} required />
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div class="form-group">
                                    <label htmlFor="title3">Ícono-velas-título:</label>
                                    <input ref={this.title3Ref} id="title3" onChange={this.readData} name="title3" maxLength="18" type="text" className="form-control" placeholder="Título..." required defaultValue={title3} />
                                </div>
                                <div class="form-group">
                                    <label htmlFor="paragraaf3">Descripción:</label>
                                    <textarea ref={this.paragraaf3Ref} rows="3" onChange={this.readData} id="paragraaf3" name="paragraaf3" maxLength="200" type="text" className="form-control" placeholder="Descripción..." required defaultValue={paragraaf3} />
                                </div>
                            </div>
                        </div>

                        <div className="row my-5">
                            <div className="col-12">
                                <div class="form-group">
                                    <label htmlFor="aboutus">Acerca de nosotros:</label>
                                    <textarea ref={this.aboutUsRef} rows="10" onChange={this.readData} id="aboutus" name="aboutus" maxLength="3000" type="text" className="form-control" placeholder="Descripción..." defaultValue={aboutUs} required />
                                </div>
                                <div className="row">
                                    <div className="col-12">
                                        {this.state.alert ? [this.state.alert.field === "aboutus" && <div className={`mt-2 alert ${this.state.alert.category}`} op="alert" >{this.state.alert.msg}</div>] : null}
                                    </div>
                                </div>
                                <p>Seleccione una imagen:</p>
                                <input ref={this.image4Ref} id="image4" accept="image/*" onClick={this.resetPercentage4} onChange={this.upload4} name="image4" type="file" alt="imagen" />
                            </div>
                            <div className="col-md-4">
                                <img className="mt-3" alt="imagen" style={{ height: "200px", maxWidth: "320px", objectFit: "cover" }} id="img" src={this.state.image4 != null ? this.state.image4 : image4} />
                                <br />
                                <div class="progress-bar-styles mt-4">
                                    <progress class="front-end-progress-bar" value={this.state.uploadValue4} max="100"></progress>
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-12">
                                <div class="form-group">
                                    <p className="h4 text-center">Cursos</p>
                                    <div className="row">
                                        <div className="col-12">
                                            {this.state.alert ? [this.state.alert.field === "courses" && <div className={`mt-2 alert ${this.state.alert.category}`} op="alert" >{this.state.alert.msg}</div>] : null}
                                        </div>
                                    </div>
                                    <label htmlFor="courses">Descripción de cursos:</label>
                                    <textarea maxLength="300" onChange={this.readData} ref={this.paragraafCoursesRef} rows="3" id="courses" name="courses" type="text" className="form-control" placeholder="Descripción..." defaultValue={paragraafCourses} required />
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-12">
                                <div class="form-group">
                                    <p className="h4 text-center">Galeria</p>
                                    <div className="row">
                                        <div className="col-12">
                                            {this.state.alert ? [this.state.alert.field === "gallery" && <div className={`mt-2 alert ${this.state.alert.category}`} op="alert" >{this.state.alert.msg}</div>] : null}
                                        </div>
                                    </div>
                                    <label htmlFor="gallery">Descripción de galeria:</label>
                                    <textarea maxLength="300" onChange={this.readData} ref={this.paragraafGalleryRef} rows="3" id="gallery" name="gallery" type="text" className="form-control" placeholder="Descripción..." defaultValue={paragraafGallery} required />
                                </div>
                            </div>
                        </div>

                        <div className="mt-4 d-flex justify-content-center">
                            <button type="submit" class="btn btn-blue">Guardar</button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default FormMainPage;