import "./Home.css"
import React, { useEffect, useState } from 'react'
import {BsPlusLg} from "react-icons/bs";
import {OverlayTrigger,Tooltip} from "react-bootstrap"
import { useHistory } from "react-router-dom";
import CustomLoadingAnimation from "../Components/CustomLoadingAnimation"
import { deleteArticle, getArticles } from "../Axios/api";
import { toast } from "react-toastify";
import {RiDeleteBinLine } from "react-icons/ri";
import {Modal} from "react-bootstrap";

const Home = () => {
  const history=useHistory();
  const [Loading,setLoading]=useState(false);
  const [Articles,SetArticles]=useState([]);
  const [id,setId]=useState("");

  const [show,setShow]=useState();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const getAllArticles=async()=>{
     try {
        setLoading(true);

        const resp=await getArticles();
        SetArticles(resp.data);
     } catch (error) {
        console.log(error);
     }
     finally
     {
        setLoading(false);
     }
  }
  
 const EditArticle=(slug)=>{
     const edit=true;
     history.push(`/article/${edit}/${slug}`)
 }

 const ViewArticle=(slug)=>{
    history.push(`/article/${slug}`)
 }

  const DeleteArticle=async()=>{
      try {
        setLoading(true);
        
        const resp=await deleteArticle(id);

        toast.success(resp?.data?.message, {
          position: "top-center",
          theme: "colored",
        });

        setTimeout(()=>{
           window.location.reload();
        },2000)
      } catch (error) {
         toast.error("something went wrong", {
            position: "top-center",
            theme: "colored",
          });
      }
      finally
      {
        setLoading(false);
      }
  }

  useEffect(()=>{
     getAllArticles();
  },[])

    return (
        <>
        <h1 className="text-center title">Blogging website</h1>
        
        <div className="container">       
        <OverlayTrigger
      placement="right"
      overlay={
        <Tooltip id={`tooltip-right`}>
          Create a new Article
        </Tooltip>
      }
    >
     <button className="btn btn-primary" onClick={()=>history.push("/article/new")}><BsPlusLg/></button>
    </OverlayTrigger>
        </div>

  {Articles.map((ele,ind)=>{
    return(
     <div className="container my-5" key={ind} >
     <div className="card" style={{borderRadius:"16px",outlineStyle:"solid",outlineColor:"skyblue"}}>
     <h5 className="card-header">{ele.title}</h5>
     <div className="card-body">
       <h5 className="text-secondary">Published At {new Date(ele.createdAt).toLocaleDateString('en-In', { weekday:"long", year:"numeric", month:"short", day:"numeric"})}</h5>
       <p className="card-text">{ele.description}</p>
       <button className="btn btn-primary" onClick={()=>ViewArticle(ele.slug)}>Read More</button> <button className="btn btn-secondary" onClick={()=>EditArticle(ele.slug)}>Edit</button> <button className="btn btn-danger" onClick={()=>{setId(ele._id);handleShow();}}><RiDeleteBinLine/></button>
     </div>
     </div>

{ !Articles&&
     <div className="container bg-dark my-5" style={{borderRadius:"17px"}}>
  <h1 className="text-center text-white fontslab">No Articles found ....</h1>
   </div>
  }
     </div>
    )
  })
    
  }

<CustomLoadingAnimation isLoading={Loading} />

       <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title className="text-danger">Delete Article</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to Delete this Article</Modal.Body>
        <Modal.Footer>
          <button className="btn btn-secondary" onClick={handleClose}>
            Cancel
          </button>
          <button
            className="btn btn-danger"
            onClick={() => {
              DeleteArticle();
              handleClose();
            }}
          >
            Submit
          </button>
        </Modal.Footer>
      </Modal>
        </>
    )
}

export default Home
