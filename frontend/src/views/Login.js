
import React, {useState} from "react";
import { useHistory } from 'react-router-dom'
import axios from "axios";
import * as Paths from "../services/config";
// reactstrap components
import {
    Button,
    Card,
    Form,
    Input,
    InputGroupAddon,
    InputGroupText,
    InputGroup,
    Container,
    Row,
    Col,
} from "reactstrap";

// core components


export const Login = (props) => {

    let emptyUser = {
        userName: null,
        userPassword: null,
    };

    const [user, setUser] = useState(emptyUser);
    const [userName, setUserName] = useState(emptyUser);
    const [userPassword, setUserPassword] = useState(emptyUser);
    let history = useHistory();

    const onLogin = () => {

        const getUser = {
            userName: user.userName,
            userPassword: user.userPassword,
        };

            axios.post(Paths.login, getUser)
                .then((res => {
                    console.log("res == ",res);
                    if (res.data !== "") {
                        localStorage.setItem("username", res.data.userName);
                        history.push('/index');
                    }
                }))
                .catch(err => {

                });

    }

    const onInputChange = (e, name) => {
        const val = (e.target && e.target.value) || '';
        let _user = { ...user };
        _user[`${name}`] = val;

        setUser(_user);
    }

    return (
        <>
            <div
                className="section section-image section-login"
                style={{
                    backgroundImage: "url(" + require("assets/img/login-image.jpg") + ")",
                }}
            >
                <Container>
                    <Row>
                        <Col className="mx-auto" lg="4" md="6">
                            <Card className="card-register">
                                <h3 className="title mx-auto">Hoş geldiniz</h3>
                                <div className="social-line text-center">
                                    <Button
                                        className="btn-neutral btn-just-icon mt-0"
                                        color="facebook"
                                        href="#pablo"
                                        onClick={(e) => e.preventDefault()}
                                    >
                                        <i className="fa fa-facebook-square" />
                                    </Button>
                                    <Button
                                        className="btn-neutral btn-just-icon mt-0 ml-1"
                                        color="google"
                                        href="#pablo"
                                        onClick={(e) => e.preventDefault()}
                                    >
                                        <i className="fa fa-google-plus" />
                                    </Button>
                                    <Button
                                        className="btn-neutral btn-just-icon mt-0 ml-1"
                                        color="twitter"
                                        href="#pablo"
                                        onClick={(e) => e.preventDefault()}
                                    >
                                        <i className="fa fa-twitter" />
                                    </Button>
                                </div>
                                <Form className="register-form">
                                    <label>Kullanıcı Adı</label>
                                    <InputGroup>
                                        <InputGroupAddon addonType="append">
                                            <InputGroupText>
                                                <i aria-hidden={true} className="fa fa-group" />
                                            </InputGroupText>
                                        </InputGroupAddon>
                                        <Input value={user.userName} onChange={(e) => onInputChange(e, 'userName')} placeholder="Kullanıcı Adı" type="text" />
                                    </InputGroup>
                                    <label>Password</label>
                                    <InputGroup className="form-group-no-border">
                                        <InputGroupAddon addonType="append">
                                            <InputGroupText>
                                                <i className="nc-icon nc-key-25" />
                                            </InputGroupText>
                                        </InputGroupAddon>
                                        <Input value={user.userPassword} onChange={(e) => onInputChange(e, 'userPassword')} placeholder="Şifre" type="password" />
                                    </InputGroup>
                                    <Button
                                        block
                                        className="btn-round"
                                        color="danger"
                                        type="button"
                                        onClick={(e) => onLogin()}
                                    >
                                        Giriş Yap
                                    </Button>
                                </Form>
                                <div className="forgot">
                                    <Button
                                        className="btn-link"
                                        color="danger"
                                        href="#pablo"
                                        onClick={(e) => e.preventDefault()}
                                    >
                                        Şifreni mi unuttun?
                                    </Button>
                                </div>
                            </Card>
                            <div className="col text-center">
                                <Button
                                    className="btn-round"
                                    outline
                                    color="neutral"
                                    onClick={(e) => history.push('/views/CreateUser')}
                                    size="lg"
                                    target="_blank"
                                >
                                    KAYIT OL!
                                </Button>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>{" "}
        </>
    );

}

export default Login;
