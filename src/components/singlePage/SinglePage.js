import React, { Component } from 'react';
import Navbar from "./Navbar";
import mainImg from "../../assets/images/mainimg.jpg";
import Slider from './Slider';
import Offers from "./Offers";
import About from "./About";
import Footer from "./Footer";
import Gallery from "./Gallery";
import "../../assets/css/singlePage.css";
import axios from "axios";
import EditUser from './EditUser';
import ListingMyCourses from './ListingMyCourses';
import AuthService from "../../services/authService";
import $ from "jquery"
import DetailsCourse from './DetailsCourse';

class SinglePage extends Component {
    state = {
        mainpage: [],
        currentUser: null,
        auth: new AuthService(),
        users: [],
        teachers: [],
        showEditUser: false,
        visibleDetailsCourse: false,
        currentCourse: null,
        courses: [],
        offers: [],
        videos: [],
        images: [],
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
    componentDidMount() {
        this.getInfo();
        this.getUsers();
        this.getTeachers();
        this.getCourses();
        this.getCoursesInOffer();
        this.getImages();
        this.getVideos();
    }

    openModalDetails = (id_course) => {
        let courses = this.state.courses;
        let courseSelected = courses.filter(course => (
            course.id_course === id_course
        ))

        this.setState({
            visibleDetailsCourse: true,
            currentCourse: courseSelected[0]
        })
    }

    closeModalDetails = () => {
        this.setState({
            visibleDetailsCourse: false,
            currentCourse: null
        })
    }
    getImages = () => {
        axios.get(process.env.REACT_APP_URL_BACKEND + "/api/image/list")
            .then(res => {
                this.setState({
                    images: res.data
                })
            })
    }

    getVideos = () => {
        axios.get(process.env.REACT_APP_URL_BACKEND + "/api/video/list")
            .then(res => {
                this.setState({
                    videos: res.data
                })
            })
    }

    getCourses = () => {
        axios.get(process.env.REACT_APP_URL_BACKEND + "/api/course/list")
            .then(res => {
                this.setState({
                    courses: res.data
                })
            })
    }

    getCoursesInOffer = () => {
        axios.get(process.env.REACT_APP_URL_BACKEND + "/api/course/list")
            .then(res => {
                let courses = res.data;

                let date = new Date();
                let day = date.getDate();
                let month = date.getMonth() + 1;
                let year = date.getFullYear();
                if (day <= 9) {
                    day = "-0" + day;
                } else {
                    day = "-" + day;
                }
                if (month <= 9) {
                    month = "-0" + month;
                } else {
                    month = "-" + month;
                }
                let today = year + month + day;

                let result = courses.filter(course => (
                    course.removed === false && course.inOffer === "Ahora" && today <= course.startDate
                ));
                this.setState({
                    offers: result
                })
            })
    }

    getInfo = () => {
        axios.get(process.env.REACT_APP_URL_BACKEND + "/api/mainpage/list")
            .then(res => {
                this.setState({
                    mainpage: res.data
                }, () => {
                    if (this.state.mainpage.length === 0) {

                        axios.post(process.env.REACT_APP_URL_BACKEND + `/api/mainpage/add`, this.state.defaultinfo)
                            .then(res => {
                                if (res.status === 200) {
                                    console.log("creado por defecto", res.data);

                                }
                            })
                    }
                })
            })
    }

    getUsers = () => {
        axios.get(process.env.REACT_APP_URL_BACKEND + "/api/user/list")
            .then(res => {
                this.setState({
                    users: res.data
                })
                if (this.state.auth.getUser())
                    this.getCurrentUser();
            })
    }
    getCurrentUser = () => {
        let userId = this.state.auth.getUser()._id;

        let users = this.state.users;
        let user = users.filter(u => (
            u._id === userId
        ))

        this.setState({
            currentUser: user[0]
        })
    }

    getTeachers = () => {
        axios.get(process.env.REACT_APP_URL_BACKEND + "/api/user/getTeachers")
            .then(res => {
                this.setState({
                    teachers: res.data
                })
            })
    }

    deleteUser = (id) => {

        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }

        if (this.state.auth.isLoggedIn()) {
            headers['token'] = this.state.auth.getToken();
        }
        axios.delete(process.env.REACT_APP_URL_BACKEND + `/api/user/remove?0=${id}`, { headers })
            .then(res => {
                if (res.status === 200) {
                    const users = [...this.state.users];

                    let result = users.filter(user => (
                        user._id !== id
                    ));
                    this.setState({
                        users: result
                    })
                }
            })
    }
    hideEditUserFn = () => {
        this.setState({
            showEditUser: false
        })
    }

    showEditUserFn = () => {
        let show = this.state.showEditUser;
        if (show) {
            this.setState({
                showEditUser: false
            })
        } else {
            this.setState({
                showEditUser: true
            }, () => {
                $("#edituser").ready(function () {
                    $("html, body").animate({
                        scrollTop: $('#edituser').offset().top - 90
                    }, 1000);
                });
            })
        }
    }

    removeStudent = (id, idStudent) => {
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }

        if (this.state.auth.isLoggedIn()) {
            headers['token'] = this.state.auth.getToken();
        }
        axios.put(process.env.REACT_APP_URL_BACKEND + `/api/course/removeStudent`, { id, idStudent }, { headers })
            .then(res => {
                if (res.status === 200) {
                    this.removetomycourses(id, idStudent);
                    this.getCourses();
                }
            })
    }

    addStudent = (id_course, student) => {
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }

        if (this.state.auth.isLoggedIn()) {
            headers['token'] = this.state.auth.getToken();
        }
        axios.put(process.env.REACT_APP_URL_BACKEND + "/api/course/addStudent", { id_course, student }, { headers })
            .then(res => {
                if (res.status === 200) {
                    this.getCourses();
                    this.addtomycourses(res.data._id, student._id);
                }
            })
    }
    addtomycourses = (courseId, userId) => {
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }

        if (this.state.auth.isLoggedIn()) {
            headers['token'] = this.state.auth.getToken();
        }
        axios.put(process.env.REACT_APP_URL_BACKEND + `/api/user/addtomycourses`, { courseId, userId }, { headers })
            .then(res => {
                if (res.status === 200) {
                    this.getUsers();
                }
            })
    }

    removetomycourses = (courseId, userId) => {
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }

        if (this.state.auth.isLoggedIn()) {
            headers['token'] = this.state.auth.getToken();
        }
        axios.put(process.env.REACT_APP_URL_BACKEND + `/api/user/removetomycourses`, { courseId, userId }, { headers })
            .then(res => {
                if (res.status === 200) {
                    this.getUsers();
                }
            })
    }

    render() {
        if (this.state.mainpage.length === 0) return null;

        return (
            <div className="App">
                <Navbar
                    showEditUserFn={this.showEditUserFn}
                    hideEditUserFn={this.hideEditUserFn}
                    showEditUser={this.state.showEditUser} />
                <Slider mainpage={this.state.mainpage} />
                <EditUser
                    showEditUser={this.state.showEditUser}
                    user={this.state.currentUser}
                    deleteUser={this.deleteUser}
                    getUsers={this.getUsers}
                    getTeachers={this.getTeachers}
                    showEditUserFn={this.showEditUserFn}
                />
                <About mainpage={this.state.mainpage} />
                <Gallery mainpage={this.state.mainpage} photos={this.state.images} videos={this.state.videos} />
                {this.state.currentUser !== null &&
                    [this.state.currentUser.role !== "Administrador" ?

                        <ListingMyCourses
                            mycourses={this.state.currentUser.course}
                            openModalDetails={this.openModalDetails}
                            removeStudent={this.removeStudent}
                        /> : null]

                }
                <DetailsCourse
                    course={this.state.currentCourse}
                    closeModalDetails={this.closeModalDetails}
                    visibleDetailsCourse={this.state.visibleDetailsCourse}
                    addStudent={this.addStudent}
                    removeStudent={this.removeStudent}
                    user={this.state.currentUser}
                />

                <Offers openModalDetails={this.openModalDetails} offers={this.state.offers} mainpage={this.state.mainpage} />
                <Footer />
            </div>
        );
    }
}

export default SinglePage;