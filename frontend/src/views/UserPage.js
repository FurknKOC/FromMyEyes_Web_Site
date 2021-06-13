
import React, {useState,useEffect} from "react";

// reactstrap components
import {
    Button,
    Label,
    FormGroup,
    Input,
    NavItem,
    NavLink,
    Nav,
    TabContent,
    TabPane,
    Container,
    Row,
    Col, Modal, Card, Table,
} from "reactstrap";

// core components
import ExamplesNavbar from "components/Navbars/ExamplesNavbar.js";
import ProfilePageHeader from "components/Headers/ProfilePageHeader.js";
import DemoFooter from "components/Footers/DemoFooter.js";
import axios from "axios";
import * as Paths from "../services/config";
import {useHistory} from "react-router-dom";
import IndexNavbar from "../components/Navbars/IndexNavbar";

function ProfilePage() {

    const emptyPost = {
        id: null,
        title: null,
        comment: null,
        photo: null,
        likeCount:null,
    };

    let emptyUser = {
        id: null,
        userName: null,
        userPassword: null,
        userRole: "user",
        profileImage: null,
        backgroundImage: null,
        status: 1,
    };

    const [photo, setPhoto] = useState(null);
    const [userName, setUserName] = useState(localStorage.getItem("username"));
    const [userAbout, setUserAbout] = useState();
    const [user, setUser] = useState(emptyUser);
    const [profileImage, setProfileImage] = useState("");
    const [backgroundImage, setBackgroundImage] = useState("");
    const [modal, setModal] = React.useState(false);
    const [posts, setPosts] = useState([]);
    const [control, setControl] = useState(false);

    console.log("usernameee?====",userName);


    const [activeTab, setActiveTab] = useState("1");

    const toggle = (tab) => {
        if (activeTab !== tab) {
            setActiveTab(tab);
        }
    };

    document.documentElement.classList.remove("nav-open");
    useEffect(() => {
        getUser();
        if (control === false) {
            getPosts();
            setControl(true);
        }
        document.body.classList.add("landing-page");
        return function cleanup() {
            document.body.classList.remove("landing-page");
        };
    });


    const getPosts = () => {
        const username = {
            userName : userName
        }

        axios.post(Paths.getUserPosts,username)
            .then(response => {
                setPosts(response.data.content);
            })
            .catch((err => {
                console.log("err :", err)
            }))

        console.log("empty = ", photo);
    }

    const getUser = () => {

        const username = {
            userName : userName
        }

        axios.post(Paths.getUser,username)
            .then(res => {
                user.id = res.data.id;
                user.userName = res.data.userName;
                user.userAbout = res.data.userAbout;
                user.userPassword = res.data.userPassword;
                user.profileImage = res.data.profileImage;
                user.backgroundImage = res.data.backgroundImage;
                setUserAbout(res.data.userAbout);
                console.log(res);
            })

    }

    const likePost = (postId) => {
        const likeRequest = {
            user: {
                userName: userName
            },
            post: {
                id: postId
            }
        }
        axios.post(Paths.like,likeRequest)
            .then(response => {
                console.log(response);
            })
            .catch((err => {
                console.log("err :", err)
            }))
    }

    const updateUser = () => {

        const insertUser = {
            id:user.id,
            userName: user.userName,
            userPassword: user.userPassword,
            userAbout: user.userAbout,
            userRole: "user",
            backgroundImage: user.backgroundImage,
            profileImage: profileImage,
            status: 1,
        };

        axios.post(Paths.updateUser,insertUser).then(res=> {
            console.log(res);
            console.log(res.data);
        })

        toggleModal();
        //window.location.reload();
        //history.push('/views/Login')
    }

    const toggleModal = () => {
        setModal(!modal);
    };

    const onInputChange = (e, name) => {
        const val = (e.target && e.target.value) || '';
        let _user = { ...user };
        _user[`${name}`] = val;

        setUser(_user);
    }

    const uploadProfileImage = async (e) => {
        const file = e.target.files[0];
        const base64 = await convertBase64(file);
        console.log(base64);
        user.profileImage = base64;
        console.log("aga bu ne ???",user.profileImage);
        setProfileImage(base64);
    };

    const uploadBackgroundImage = async (e) => {
        const file = e.target.files[0];
        const base64 = await convertBase64(file);
        console.log(base64);
        user.backgroundImage = base64;
        setBackgroundImage(base64);
    };

    const convertBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);

            fileReader.onload=() => {
                resolve(fileReader.result);
            };

            fileReader.onerror = (error) => {
                reject(error);
            };
        });
    };

    return (
        <>
            <IndexNavbar />
            <ProfilePageHeader />
            <div className="section profile-content">
                <Container>
                    <div className="owner">
                        <div className="avatar">
                            <img
                                alt="..."
                                className="img-circle img-no-padding img-responsive"
                                src={user.profileImage}
                            />
                        </div>
                        <div className="name">
                            <h4 className="title">
                                {user.userName}<br />
                            </h4>
                            <h6 className="description">Music Producer</h6>
                        </div>
                    </div>
                    <Row>
                        <Col className="ml-auto mr-auto text-center" md="6">
                            <p>
                                {user.userAbout}
                            </p>
                            <br />
                            <Button className="btn-round" color="default" onClick={toggleModal} outline>
                                <i className="fa fa-cog" /> Ayarlar
                            </Button>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="ml-auto mr-auto" md="8">
                            <Card className="page-carousel">
                                {console.log("posts===",posts)}
                                {posts ?
                                    posts.map((item) => {
                                        return (
                                            <>
                                                <blockquote className="blockquote">
                                                    <img src={item.photo} height="300px" />
                                                    <footer className="blockquote-footer">
                                                        <Table>
                                                            <tr>
                                                                <td>{item.user.userName}</td>
                                                                <td>Beğeni Sayısı: {item.likeCount}</td>
                                                            </tr>
                                                        </Table>
                                                        <cite title="source Title">{item.title}</cite>
                                                    </footer>
                                                    <p className="mb-0">
                                                        {item.comment}
                                                    </p>
                                                    <Col md="5">
                                                        <Button className="btn-link ml-1" color="info" type="button" onClick={((e) => likePost(item.id))}>
                                                            <i className="fa fa-heart mr-1" />
                                                            Beğen
                                                        </Button>
                                                        <Button className="btn-link ml-1" color="info" type="button">
                                                            Yorum Yap
                                                        </Button>
                                                    </Col>
                                                </blockquote>
                                            </>
                                        );
                                    }) : null}
                            </Card>
                        </Col>
                    </Row>
                    <br />
                    <div className="nav-tabs-navigation">
                        <div className="nav-tabs-wrapper">
                            <Nav role="tablist" tabs>
                                <NavItem>
                                    <NavLink
                                        className={activeTab === "1" ? "active" : ""}
                                        onClick={() => {
                                            toggle("1");
                                        }}
                                    >
                                        Follows
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink
                                        className={activeTab === "2" ? "active" : ""}
                                        onClick={() => {
                                            toggle("2");
                                        }}
                                    >
                                        Following
                                    </NavLink>
                                </NavItem>
                            </Nav>
                        </div>
                    </div>
                    {/* Tab panes */}
                    <TabContent className="following" activeTab={activeTab}>
                        <TabPane tabId="1" id="follows">
                            <Row>
                                <Col className="ml-auto mr-auto" md="6">
                                    <ul className="list-unstyled follows">
                                        <li>
                                            <Row>
                                                <Col className="ml-auto mr-auto" lg="2" md="4" xs="4">
                                                    <img
                                                        alt="..."
                                                        className="img-circle img-no-padding img-responsive"
                                                        src={require("assets/img/faces/clem-onojeghuo-2.jpg")}
                                                    />
                                                </Col>
                                                <Col className="ml-auto mr-auto" lg="7" md="4" xs="4">
                                                    <h6>
                                                        Flume <br />
                                                        <small>Musical Producer</small>
                                                    </h6>
                                                </Col>
                                                <Col className="ml-auto mr-auto" lg="3" md="4" xs="4">
                                                    <FormGroup check>
                                                        <Label check>
                                                            <Input
                                                                defaultChecked
                                                                defaultValue=""
                                                                type="checkbox"
                                                            />
                                                            <span className="form-check-sign" />
                                                        </Label>
                                                    </FormGroup>
                                                </Col>
                                            </Row>
                                        </li>
                                        <hr />
                                        <li>
                                            <Row>
                                                <Col className="mx-auto" lg="2" md="4" xs="4">
                                                    <img
                                                        alt="..."
                                                        className="img-circle img-no-padding img-responsive"
                                                        src={require("assets/img/faces/ayo-ogunseinde-2.jpg")}
                                                    />
                                                </Col>
                                                <Col lg="7" md="4" xs="4">
                                                    <h6>
                                                        Banks <br />
                                                        <small>Singer</small>
                                                    </h6>
                                                </Col>
                                                <Col lg="3" md="4" xs="4">
                                                    <FormGroup check>
                                                        <Label check>
                                                            <Input defaultValue="" type="checkbox" />
                                                            <span className="form-check-sign" />
                                                        </Label>
                                                    </FormGroup>
                                                </Col>
                                            </Row>
                                        </li>
                                    </ul>
                                </Col>
                            </Row>
                        </TabPane>
                        <TabPane className="text-center" tabId="2" id="following">
                            <h3 className="text-muted">Not following anyone yet :(</h3>
                            <Button className="btn-round" color="warning">
                                Find artists
                            </Button>
                        </TabPane>
                    </TabContent>
                </Container>
            </div>
            <DemoFooter />
            <Modal isOpen={modal} toggle={toggleModal}>
                <div className="modal-header">
                    <button
                        aria-label="Close"
                        className="close"
                        type="button"
                        onClick={toggleModal}
                    >
                        <span aria-hidden={true}>×</span>
                    </button>
                    <h5
                        className="modal-title text-center"
                        id="exampleModalLabel"
                    >
                        Ayarlar
                    </h5>
                </div>
                <div>

                </div>
                <div className="modal-body">
                    <div className="title">
                        <Row>
                            <Col sm="6">
                                <FormGroup>
                                    <small>Kullanıcı Adı</small>
                                    <Input id="userName" value={user.userName} onChange={(e) => onInputChange(e, 'userName')} placeholder="Kullanıcı Adı" type="text" />
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col sm="6">
                                <FormGroup>
                                    <small>Kullanıcı Hakkında</small>
                                    <Input id="userAbout" value={user.userAbout} onChange={(e) => onInputChange(e, 'userAbout')} placeholder="Kullanıcı Adı" type="text" />
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col sm="6">
                                <FormGroup>
                                    <small>Şifre</small>
                                    <Input id="userPassword" value={user.userPassword} onChange={(e) => onInputChange(e, 'userPassword')} placeholder="Şifre" type="password" />
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col sm="6">
                                <FormGroup>
                                    <small>Profil Fotoğrafı Seç</small>
                                    <Input
                                        type="file"
                                        onChange={(e)=>{
                                            uploadProfileImage(e);
                                        }}
                                    />
                                    <img src={profileImage} height="200px"/>
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col sm="6">
                                <FormGroup>
                                    <small>Kapak Fotoğrafı Seç</small>
                                    <Input
                                        type="file"
                                        onChange={(e)=>{
                                            uploadBackgroundImage(e);
                                        }}
                                    />
                                </FormGroup>
                            </Col>
                        </Row>
                    </div>
                </div>
                <div className="modal-footer">
                    <div className="left-side">
                        <Button className="btn-link" onClick={updateUser} color="primary" type="button">
                            Güncelle
                        </Button>
                    </div>
                    <div className="divider" />
                    <div className="right-side">
                        <Button
                            className="btn-link"
                            color="default"
                            type="button"
                            onClick={toggleModal}
                        >
                            Vazgeç
                        </Button>
                    </div>
                </div>
            </Modal>
        </>
    );
}

export default ProfilePage;
