/*!

=========================================================
* Paper Kit React - v1.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/paper-kit-react

* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/paper-kit-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, {useState,useEffect} from "react";
// nodejs library that concatenates strings
import classnames from "classnames";
// reactstrap components
import {
  Button,
  Collapse,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  DropdownMenu,
  Nav,
  Container, Row, Col, FormGroup, Input, Modal, DropdownItem, DropdownToggle, UncontrolledDropdown,
} from "reactstrap";
import axios from "axios";
import * as Paths from "../../services/config";
import { useHistory } from 'react-router-dom'

function IndexNavbar() {

  let emptyPost = {
    likeCount: null,
    comment: null,
    photo: null,
    title: null,
    status: 1,
    user:{
      id: null,
      status: 1
    },
    category:{
      id:null,
      status:1
    }
  };

  let findEmptyUser = {
    userName:null
  };

  const [navbarColor, setNavbarColor] = React.useState("default");
  const [navbarCollapse, setNavbarCollapse] = React.useState(false);
  const [userName, setUserName] = useState(localStorage.getItem("findusername"));
  const [categoryName, setCategoryName] = useState(null);
  const [modal, setModal] = React.useState(false);
  const [postImage, setPostImage] = useState("");
  const [post, setPost] = useState(emptyPost);
  const [activeTab, setActiveTab] = useState("1");
  const [category, setCategory] = useState();
  const [user, setUser] = useState(findEmptyUser);
  const [categoryValues, setCategoryValues] = useState(null);
  const [categoryValue, setCategoryValue] = useState(null);
  let history = useHistory();

  const toggleNavbarCollapse = () => {
    setNavbarCollapse(!navbarCollapse);
    document.documentElement.classList.toggle("nav-open");
  };

  useEffect(() => {
    //getCategories();
    const updateNavbarColor = () => {
      if (
        document.documentElement.scrollTop > 299 ||
        document.body.scrollTop > 299
      ) {
        setNavbarColor("");
      } else if (
        document.documentElement.scrollTop < 300 ||
        document.body.scrollTop < 300
      ) {
        setNavbarColor("default");
      }
    };

    window.addEventListener("scroll", updateNavbarColor);

    return function cleanup() {
      window.removeEventListener("scroll", updateNavbarColor);
    };
  });
  const toggle = (tab) => {
    if (activeTab !== tab) {
      setActiveTab(tab);
    }
  };

  const getUser = () => {

    const username = {
      userName : userName
    }
    axios.post(Paths.getUser,username)
        .then(res => {
          console.log("user id = ", res.data.id);
          post.user.id = res.data.id;
          console.log(res);
        })

  }

  const getCategories = () => {
    axios.get(Paths.getCategories)
        .then(response => {
          console.log("response == ",response);
          const categoryDatas = []
          const category = response.content.filter(x => x.status === 1);
          setCategory(category);
          category.map((categoryItem, index) => {
            const categoryData = [{
              code: categoryItem.id, name: categoryItem.name
            }]
            categoryDatas.push(...categoryData)
          })
          setCategoryValues(categoryDatas)
        })
        .catch((err => {
          console.log("err :", err)
        }))
  }

  const onInputUserChange = (e, name) => {
    const val = (e.target && e.target.value) || '';
    let _user = { ...user };
    _user[`${name}`] = val;

    setUser(_user);
  }

  const onInputChange = (e, name) => {
    const val = (e.target && e.target.value) || '';
    let _post = { ...post };
    _post[`${name}`] = val;

    setPost(_post);
  }

  const onChangeCategory = (id,name) => {
    setCategoryName(name);
    post.category.id = id;
    console.log("category id = ", post.category.id);
  }

  const uploadPostImage = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertBase64(file);
    console.log(base64);
    post.photo = base64;
    setPostImage(base64);
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

  const toggleModal = () => {
    setModal(!modal);
    getUser();
    getCategories();
  };

  const findUser = () => {
    console.log("username ? = ",user.userName);
    const findUser = {

        userName: user.userName,

    };

    axios.post(Paths.getUser,findUser).then(res=> {
      if (res !== "") {
        console.log("responsee = ", res);
        localStorage.setItem("findusername", res.data.userName);
        history.push("/views/FindUserPage");
      }
    }).catch((err => {
      console.log("err = ",err);
    }))
  };

  const openProfilePage = () => {
   history.push('/views/UserPage');
  }

  const addPost = () => {

    const insertPost = {
      likeCount:0,
      comment: post.comment,
      photo: post.photo,
      title: post.title,
      status: 1,
      user:{
        id: post.user.id,
        status: 1
      },
      category:{
        id:post.category.id,
        status:1
      }
    };

    axios.post(Paths.addPost,insertPost).then(res=> {
      console.log(res);
      console.log(res.data);
    }).catch((err => {
      console.log("err = ",err);
    }))

    toggleModal();
    //history.push('/views/Login')
  }
  return (
    <Navbar className={classnames("fixed-top", navbarColor)} expand="lg">
      <Container>
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
              HOBİNİ PAYLAŞ
            </h5>
          </div>
          <div>

          </div>
        <div className="modal-body">
          <div className="title">
            <Row>
              <Col sm="6">
                <FormGroup>
                  <small>Başlık</small>
                  <Input id="title" value={post.title} onChange={(e) => onInputChange(e, 'title')} placeholder="Başlık" type="text" />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col sm="6">
                <FormGroup>
                  <small>Açıklama</small>
                  <Input id="about" value={post.comment} onChange={(e) => onInputChange(e, 'comment')} placeholder="Açıklama" type="text" />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col sm="6">
                <FormGroup>
                  <small>Kategori Seç</small>
                  <UncontrolledDropdown>
                    <DropdownToggle
                        aria-expanded={false}
                        aria-haspopup={true}
                        caret
                        color="default"
                        data-toggle="dropdown"
                        href="#pablo"
                        id="dropdownMenuButton"
                        nav
                        onClick={(e) => e.preventDefault()}
                        role="button"
                    >
                      {categoryName ? categoryName : "Kategori"}
                    </DropdownToggle>
                    <DropdownMenu
                        aria-labelledby="dropdownMenuButton"
                        className="dropdown-info"
                    >
                      <DropdownItem header tag="span">
                        Kategoriler
                      </DropdownItem>
                      <DropdownItem divider />
                      <DropdownItem
                          href="#pablo"
                          onClick={(e) => onChangeCategory(1,"Kitap")}
                      >
                        Kitap
                      </DropdownItem>
                      <DropdownItem divider />
                      <DropdownItem
                          href="#pablo"
                          onClick={(e) => onChangeCategory(2,"Oyun")}
                      >
                        Oyun
                      </DropdownItem>
                      <DropdownItem divider />
                      <DropdownItem
                          href="#pablo"
                          onClick={(e) => onChangeCategory(3,"Film")}
                      >
                        Film
                      </DropdownItem>
                      <DropdownItem divider />
                      <DropdownItem
                          href="#pablo"
                          onClick={(e) => onChangeCategory(4,"Gezi")}
                      >
                        Gezi
                      </DropdownItem>
                    </DropdownMenu>
                  </UncontrolledDropdown>
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col sm="6">
                <FormGroup>
                  <small>Hobi Fotoğrafı Seç</small>
                  <Input
                      type="file"
                      onChange={(e)=>{
                        uploadPostImage(e);
                      }}
                  />
                  <img src={post} height="200px"/>
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col sm="6">
                <Button color="primary" onClick={addPost} outline type="button" className="mr-1">
                  Paylaş
                </Button>
              </Col>
            </Row>
          </div>
        </div>
        </Modal>
        <div className="navbar-translate">
          <NavbarBrand
            data-placement="bottom"
            href="/index"
            target="_blank"
            title="Coded by Creative Tim"
          >
            From My Eyes
          </NavbarBrand>

          <button
            aria-expanded={navbarCollapse}
            className={classnames("navbar-toggler navbar-toggler", {
              toggled: navbarCollapse,
            })}
            onClick={toggleNavbarCollapse}
          >
            <span className="navbar-toggler-bar bar1" />
            <span className="navbar-toggler-bar bar2" />
            <span className="navbar-toggler-bar bar3" />
          </button>
        </div>
        <Collapse
          className="justify-content-end"
          navbar
          isOpen={navbarCollapse}
        >
          <Nav navbar>
            <NavItem>
              <Input id="userName" value={user.userName} onChange={(e) => onInputUserChange(e, 'userName')} placeholder="Kullanıcı Adı" type="text" />
            </NavItem>
            <NavItem>
              <Button className="btn-link ml-1" color="info" type="button" onClick={findUser}>
                ARA
              </Button>
            </NavItem>
            <NavItem>
              <NavLink
                data-placement="bottom"
                href="https://twitter.com/CreativeTim?ref=creativetim"
                target="_blank"
                title="Follow us on Twitter"
              >
                <i className="fa fa-twitter" />
                <p className="d-lg-none">Twitter</p>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                data-placement="bottom"
                href="https://www.instagram.com/CreativeTimOfficial?ref=creativetim"
                target="_blank"
                title="Follow us on Instagram"
              >
                <i className="fa fa-instagram" />
                <p className="d-lg-none">Instagram</p>
              </NavLink>
            </NavItem>
            <NavItem>
              <Button className="btn-link ml-1" color="info" type="button" onClick={toggleModal}>
                HOBİNİ PAYLAŞ
              </Button>
            </NavItem>
            <NavItem>
              <Button className="btn-link ml-1" color="info" type="button" onClick={openProfilePage}>
                PROFİL
              </Button>
            </NavItem>
          </Nav>
        </Collapse>
      </Container>
    </Navbar>

  );
}

export default IndexNavbar;
