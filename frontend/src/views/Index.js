
import React, {useState,useEffect} from "react";


// reactstrap components

// core components
import IndexNavbar from "components/Navbars/IndexNavbar.js";
import IndexHeader from "components/Headers/IndexHeader.js";
import DemoFooter from "components/Footers/DemoFooter.js";

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
import {
  Alert,
  Button,
  Card,
  Carousel,
  CarouselCaption,
  CarouselIndicators,
  CarouselItem,
  Col,
  Container, FormGroup, Input, Modal,
  Row, Table
} from "reactstrap";
import axios from "axios";
import * as Paths from "../services/config";


const items = [
  {
    src: require("assets/img/soroush-karimi.jpg"),
    altText: "Somewhere",
    caption: "Somewhere",
  },
  {
    src: require("assets/img/federico-beccari.jpg"),
    altText: "Somewhere else",
    caption: "Somewhere else",
  },
  {
    src: require("assets/img/joshua-stannard.jpg"),
    altText: "Here it is",
    caption: "Here it is",
  },
];
function Index() {
  document.documentElement.classList.remove("nav-open");

  const emptyPost = {
    id: null,
    title: null,
    comment: null,
    photo: null,
    likeCount:null,
  };
  const emptyComment = {
    id: null,
    comment: null,
    likeCount:0,
    user:{
      userName:null
    },
    post:{
      id:null
    }
  };

  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [photo, setPhoto] = useState(null);
  const [userName, setUserName] = useState(localStorage.getItem("username"));
  const [posts, setPosts] = useState([]);
  const [comment, setComment] = useState(emptyComment);
  const [control, setControl] = useState(false);
  const [modal, setModal] = useState(false);
  const [yorumControl, setYorumControl] = useState(false);

  useEffect(() => {
    if (control === false) {
      getPosts();
      setControl(true);
    }

    document.body.classList.add("index");
    return function cleanup() {
      document.body.classList.remove("index");
    };
  });

  const likePost = (postId) => {
    const likeRequest = {
        user:{
          userName:userName
        },
        post:{
          id:postId
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

  const addComment = () => {

    const insertComment = {
      id:comment.id,
      comment:comment.comment,
      likeCount:comment.likeCount,
      user:{
        userName:userName
      },
      post:{
        id:comment.post.id
      }
    }

    axios.post(Paths.comment,insertComment)
        .then(response => {
          console.log(response);
        })
        .catch((err => {
          console.log("err :", err)
        }))
  }

  const toggleModal = (postId) => {
    comment.post.id = postId;
    setModal(!modal);
  };

  const getPosts = () => {

    axios.get(Paths.getAllPosts)
        .then(response => {
          setPosts(response.data.content);
        })
        .catch((err => {
          console.log("err :", err)
        }))

    console.log("empty = ", photo);
  }

  const onInputChange = (e, name) => {
    const val = (e.target && e.target.value) || '';
    let _comment = { ...comment };
    _comment[`${name}`] = val;

    setComment(_comment);
  }

  const onYorum = () => {
   setYorumControl(!yorumControl);
  }

  return (
    <>
      <IndexNavbar />
      {/*<IndexHeader />*/}
      <Button className="btn-link ml-1" color="info" type="button">
        HOBİNİ PAYLAŞ
      </Button>
      <div className="main">
          <div className="section pt-o" id="carousel">
            <Container>
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
                                 <Button className="btn-link ml-1" color="info" type="button" onClick={((e) => toggleModal(item.id))}>
                                   Yorum Yap
                                 </Button>
                               </Col>
                             </blockquote>
                             {item.comments.length > 0 ? <Button className="btn-link ml-1" color="info" type="button" onClick={onYorum}>
                               Yorumları göster
                             </Button>
                                 : null}
                             {yorumControl ?
                                 <div id="notifications">
                               <Alert color="info">
                                 <Container>
                                   <hr/>
                                   {(item.comments).map((x) => {
                                     return(
                                         <span>Kişi:  {x.user.userName} | Yorum:  {x.comment} <br/><hr/></span>
                                     );
                                   })}
                                 </Container>
                               </Alert>
                                   <Button className="btn-link ml-1" color="info" type="button" onClick={onYorum}>
                                     Yorumları Gizle
                                   </Button>
                             </div>
                                 : null}
                           </>
                       );
                    }) : null}
                  </Card>
                </Col>
              </Row>
            </Container>
          </div>{" "}
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
              Yorum Yap
            </h5>
          </div>
          <div>

          </div>
          <div className="modal-body">
            <div className="title">
              <Row>
                <Col sm="6">
                  <FormGroup>
                    <small>Yorum</small>
                    <Input id="comment" value={comment.comment} onChange={(e) => onInputChange(e, 'comment')} placeholder="Yorum" type="text" />
                  </FormGroup>
                </Col>
              </Row>
            </div>
          </div>
          <div className="modal-footer">
            <div className="left-side">
              <Button className="btn-link" onClick={addComment} color="primary" type="button">
                Yorum Yap
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
        <DemoFooter />
      </div>
    </>
  );
}

export default Index;
