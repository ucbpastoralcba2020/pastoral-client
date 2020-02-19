import React, { Component } from 'react';
import Navbar from "./Navbar";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Courses from "./Course/Courses";
import DetailsCourse from "./Course/DetailsCourse";
import AddCourse from "./Course/AddCourse";
import EditCourse from "./Course/EditCourse";
import EditUser from "./User/EditUser";
import Users from "./User/Users";
import axios from "axios";
import Images from "./Gallery/Images";
import AddImage from "./Gallery/AddImage";
import Videos from "./Gallery/Videos";
import AddVideo from "./Gallery/AddVideo";
import AuthService from '../../services/authService';
import Swal from 'sweetalert2';
import ListingStudents from './Course/ListingStudents';
import ListingMyCourses from './User/ListingMyCourses';
import FormMainPage from './FormMainPage';



class AdminPage extends Component {
    state = {
        users: [],
        teachers: [],
        courses: [],
        allcourses: [],
        images: [],
        videos: [],
        auth: new AuthService(),
        valueSearching: "",
        currentUser: null
    }

    componentDidMount() {
        this.getUsers();
        this.getCourses();
        this.getTeachers();
        this.getImages();
        this.getVideos();
        this.getAllCourses();
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

    addVideo = (video) => {
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }

        if (this.state.auth.isLoggedIn()) {
            headers['token'] = this.state.auth.getToken();
        }
        axios.post(process.env.REACT_APP_URL_BACKEND + "/api/video/add", video, { headers })
            .then(res => {
                if (res.status === 200) {
                    Swal.fire(
                        'Video agregado.',
                        'Ahora ya puedes verlo.',
                        'success'
                    )
                    this.setState(prevState => ({
                        videos: [video, ...prevState.videos]
                    }))
                }
            })
    }

    addImage = (img) => {
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }

        if (this.state.auth.isLoggedIn()) {
            headers['token'] = this.state.auth.getToken();
        }

        axios.post(process.env.REACT_APP_URL_BACKEND + "/api/image/add", img, { headers })
            .then(res => {
                if (res.status === 200) {
                    Swal.fire(
                        'Imagen agregada.',
                        'Ahora ya puedes verla.',
                        'success'
                    )
                    this.setState(prevState => ({
                        images: [img, ...prevState.images]
                    }))
                }
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

    getCourses = () => {
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
                    course.removed === false && course.endDate > today
                ));
                this.setState({
                    courses: result
                })
            })
    }

    getAllCourses = () => {
        axios.get(process.env.REACT_APP_URL_BACKEND + "/api/course/list")
            .then(res => {
                this.setState({
                    allcourses: res.data
                })
            })
    }

    addCourse = (course, teacherId) => {
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }

        if (this.state.auth.isLoggedIn()) {
            headers['token'] = this.state.auth.getToken();
        }
        axios.post(process.env.REACT_APP_URL_BACKEND + "/api/course/add", course, { headers })
            .then(res => {

                if (res.status === 200) {
                    Swal.fire(
                        'Curso agregado.',
                        'Ahora ya puedes verlo.',
                        'success'
                    )
                    this.getCourses();
                    this.addtomycourses(res.data._id, teacherId);
                }
            })
    }

    editCourse = (newCourse) => {
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }

        if (this.state.auth.isLoggedIn()) {
            headers['token'] = this.state.auth.getToken();
        }
        axios.put(process.env.REACT_APP_URL_BACKEND + `/api/course/update`, newCourse, { headers })
            .then(res => {
                if (res.status === 200) {
                    Swal.fire(
                        'Curso actualizado.',
                        'Se guardaron los cambios.',
                        'success'
                    )
                    this.getCourses();
                }
            })
    }

    deleteCourse = (course) => {
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
        let id = course.id_course;

        if (this.state.auth.isLoggedIn()) {
            headers['token'] = this.state.auth.getToken();
        }
        axios.put(process.env.REACT_APP_URL_BACKEND + `/api/course/remove`, course, headers)
            .then(res => {
                if (res.status === 200) {
                    const courses = [...this.state.courses];

                    let result = courses.filter(course => (
                        course.id_course !== id
                    ));
                    this.setState({
                        courses: result
                    })
                }
            })
    }

    getUsers = () => {
        axios.get(process.env.REACT_APP_URL_BACKEND + "/api/user/list")
            .then(res => {
                this.setState({
                    users: res.data
                })
                this.getCurrentUser();
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

    deleteVideo = (id) => {
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }

        if (this.state.auth.isLoggedIn()) {
            headers['token'] = this.state.auth.getToken();
        }
        axios.delete(process.env.REACT_APP_URL_BACKEND + `/api/video/remove?0=${id}`, { headers })
            .then(res => {
                if (res.status === 200) {
                    const videos = [...this.state.videos];

                    let result = videos.filter(video => (
                        video.id_video !== id
                    ));
                    this.setState({
                        videos: result
                    })
                }
            })
    }

    deleteImage = (id) => {
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }

        if (this.state.auth.isLoggedIn()) {
            headers['token'] = this.state.auth.getToken();
        }
        axios.delete(process.env.REACT_APP_URL_BACKEND + `/api/image/remove?0=${id}`, { headers })
            .then(res => {
                if (res.status === 200) {
                    const images = [...this.state.images];

                    let result = images.filter(img => (
                        img.id_image !== id
                    ));
                    this.setState({
                        images: result
                    })
                }
            })
    }

    searchUsers = (value) => {
        if (value.length > 1) {
            this.setState({
                valueSearching: value
            })
        } else {
            this.setState({
                valueSearching: ""
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
        let users = [...this.state.users];
        let valueSearching = this.state.valueSearching;
        let result;

        if (valueSearching !== "") {
            result = users.filter(user => (
                // user.name.toLowerCase().indexOf(valueSearching.toLowerCase()) !== -1 por nombre
                user.idCard.indexOf(valueSearching) !== -1 //por ci
            ))
        } else {
            result = users;
        }

        return (

            <BrowserRouter>
                <Navbar onAuthChange={this.props.onAuthChange} />
                <Switch>

                    <Route exact path="/" render={() => {
                        return (
                            <Courses
                                courses={this.state.courses}
                                deleteCourse={this.deleteCourse}
                                teachers={this.state.teachers}
                            />
                        )
                    }} />
                    <Route exact path="/formmainpage" render={() => {
                        return (
                            <FormMainPage
                            />
                        )
                    }} />

                    <Route exact path="/students" render={(props) => {
                        let students = props.location.students;
                        let idCourse = props.location.id;
                        return (
                            <ListingStudents
                                students={students}
                                idCourse={idCourse}
                                removeStudent={this.removeStudent}
                                searchUsers={this.searchUsers}
                            />
                        )
                    }} />

                    {this.state.currentUser !== null &&
                        <Route exact path="/mycourses" render={() => {
                            return (
                                <ListingMyCourses
                                    mycourses={this.state.currentUser.course}
                                />
                            )
                        }} />
                    }

                    <Route exact path="/course/:courseId" render={(props) => {
                        let idCourse = props.location.pathname.replace("/course/", "");

                        if (this.state.courses.length !== 0) {
                            const courses = this.state.courses;
                            let filter_course;
                            filter_course = courses.filter(course => (
                                course.id_course === idCourse
                            ))

                            return (

                                <DetailsCourse
                                    course={filter_course[0]}
                                />
                            )
                        }
                    }} />
                    <Route exact path="/mycourse/:courseId" render={(props) => {
                        let idCourse = props.location.pathname.replace("/mycourse/", "");

                        if (this.state.courses.length !== 0) {
                            const courses = this.state.allcourses;
                            let filter_course;
                            filter_course = courses.filter(course => (
                                course.id_course === idCourse
                            ))

                            return (

                                <DetailsCourse
                                    course={filter_course[0]}
                                />
                            )
                        }
                    }} />
                    <Route exact path="/add-course" render={() => {
                        return (
                            <AddCourse
                                addCourse={this.addCourse}
                                teachers={this.state.teachers}
                            />
                        )
                    }} />


                    <Route exact path="/edit-course/:courseId" render={(props) => {
                        let idCourse = props.location.pathname.replace("/edit-course/", "");
                        const courses = this.state.courses;
                        let filter_course;
                        filter_course = courses.filter(course => (
                            course.id_course === idCourse
                        ))

                        return (
                            <EditCourse
                                editCourse={this.editCourse}
                                course={filter_course[0]}
                                teachers={this.state.teachers}
                                removetomycourses={this.removetomycourses}
                                addtomycourses={this.addtomycourses}
                            />
                        )
                    }} />

                    <Route exact path="/users" render={() => {
                        return (
                            <Users
                                users={result}
                                searchUsers={this.searchUsers}
                            />
                        )
                    }} />

                    <Route exact path="/edit-user/:userId" render={(props) => {
                        let idUser = props.location.pathname.replace("/edit-user/", "");
                        const users = this.state.users;
                        let filter_user;
                        filter_user = users.filter(user => (
                            user._id === idUser
                        ))

                        return (
                            <EditUser
                                deleteUser={this.deleteUser}
                                user={filter_user[0]}
                                getUsers={this.getUsers}
                                getTeachers={this.getTeachers}
                                onAuthChange={this.props.onAuthChange}
                            />
                        )
                    }} />

                    <Route exact path="/images" render={() => {
                        return (
                            <Images
                                photos={this.state.images}
                                deleteImage={this.deleteImage}
                            />
                        )
                    }} />

                    <Route exact path="/add-image" render={() => {
                        return (
                            <AddImage
                                addImage={this.addImage}
                            />
                        )
                    }} />

                    <Route exact path="/videos" render={() => {
                        return (
                            <Videos
                                videos={this.state.videos}
                                deleteVideo={this.deleteVideo}
                            />
                        )
                    }} />

                    <Route exact path="/add-video" render={() => {
                        return (
                            <AddVideo
                                addVideo={this.addVideo}
                            />
                        )
                    }} />


                </Switch>
            </BrowserRouter>

        );
    }
}

export default AdminPage;        