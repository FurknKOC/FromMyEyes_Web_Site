
import React,  { useState, useEffect, useRef } from "react";

// reactstrap components

// core components
import IndexNavbar from "components/Navbars/IndexNavbar.js";
import IndexHeader from "components/Headers/IndexHeader.js";
import DemoFooter from "components/Footers/DemoFooter.js";
import UserService from "../services/UserService";

// index sections
import SectionButtons from "views/index-sections/SectionButtons.js";
import SectionNavbars from "views/index-sections/SectionNavbars.js";
import SectionNavigation from "views/index-sections/SectionNavigation.js";
import SectionProgress from "views/index-sections/SectionProgress.js";
import SectionNotifications from "views/index-sections/SectionNotifications.js";
import SectionTypography from "views/index-sections/SectionTypography.js";
import SectionJavaScript from "views/index-sections/SectionJavaScript.js";
import SectionCarousel from "views/index-sections/SectionCarousel.js";
import SectionNucleoIcons from "views/index-sections/SectionNucleoIcons.js";
import SectionDark from "views/index-sections/SectionDark.js";
import SectionLogin from "views/index-sections/SectionLogin.js";
import SectionExamples from "views/index-sections/SectionExamples.js";
import SectionDownload from "views/index-sections/SectionDownload.js";
import Login from "./Login";
import {
    Button,
    Col,
    Container,
    FormGroup,
    Input,
    Nav, Navbar,
    NavbarBrand,
    NavItem, NavLink,
    Row,
    UncontrolledCollapse
} from "reactstrap";
import axios from "axios";
import * as Paths from "../services/config";
import {useHistory} from "react-router-dom";

export const CreateUser = () => {

    let history = useHistory();

    let emptyUser = {
        userName: null,
        userPassword: null,
        userRole: "user",
        backgroundImage: null,
        profileImage: null,
        status: 1,
    };

    const [user, setUser] = useState(emptyUser);
    const toast = useRef(null);

    const saveUser = () => {

        const insertUser = {

            userName: user.userName,
            userPassword: user.userPassword,
            userRole: "user",
            backgroundImage: null,
            profileImage: null,
            status: 1,
        };

        axios.post(Paths.createUser,insertUser).then(res=> {
            console.log(res);
            console.log(res.data);
        })
        history.push('/views/Login')
    }

    const onInputChange = (e, name) => {
        const val = (e.target && e.target.value) || '';
        let _user = { ...user };
        _user[`${name}`] = val;

        setUser(_user);
    }

    return (
        <>
            <IndexNavbar></IndexNavbar>
            <div className="section section-buttons">
                <Container>
                    <div className="title">
                        <h2>Kayıt Ol!</h2>
                    </div>
                    <div id="buttons">
                        <div className="title">
                            <h3>
                                <small>Kullanıcı Adı</small>
                            </h3>
                            <Row>
                                <Col sm="3">
                                    <FormGroup>
                                        <Input id="userName" value={user.userName} onChange={(e) => onInputChange(e, 'userName')} placeholder="Kullanıcı Adı" type="text" />
                                    </FormGroup>
                                </Col>
                            </Row>
                            <h3>
                                <small>Şifre</small>
                            </h3>
                            <Row>
                                <Col sm="3">
                                    <FormGroup>
                                        <Input id="userPassword" value={user.userPassword} onChange={(e) => onInputChange(e, 'userPassword')} placeholder="Şifre" type="password" />
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col sm="3">
                                    <Button color="primary" onClick={saveUser} outline type="button" className="mr-1">
                                        Kayıt Ol
                                    </Button>
                                </Col>
                            </Row>
                        </div>

                    </div>
                </Container>
            </div>
            <DemoFooter/>
        </>
    );
}

export default CreateUser;
