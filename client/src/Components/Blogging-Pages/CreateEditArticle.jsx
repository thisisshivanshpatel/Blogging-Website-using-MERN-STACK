import React, { useEffect, useState } from 'react'
import {Formik,Field,ErrorMessage, Form} from 'formik'
import * as Yup from "yup";
import { FaArrowLeft } from "react-icons/fa";
import { useHistory } from 'react-router-dom';
import { Modal } from 'react-bootstrap';
import CustomLoadingAnimation from '../CustomLoadingAnimation';
import { createNewArticle, editArticle, getArticleByTitle } from '../../Axios/api';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';


const CreateEditArticle = () => {
    const history=useHistory();
    const [defaultDetails,setDefaultDetails]=useState({
        title:"",
        description:"",
        content:""
    })

    const params=useParams();
    const {edit,slug}=params;

    const ArticleSchema = Yup.object().shape({
        title: Yup.string().min(2,"Atleast two words are required").max(80,"title length should be less than or equal to 80").required(),
        description: Yup.string()
          .min(8, "Atleast Eight words are required")
          .max(200, "Too Long")
          .required(),
        content:Yup.string().required()
    });
    
    const [Loading,SetLoading]=useState(false);
    const [values,SetValues]=useState();
    const [show,setShow]=useState();
    const [id,setId]=useState();

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const CreateArticle=async()=>{
        try {
          SetLoading(true);
        const request={
          title:values.title,
          description:values.description,
          content:values.content,
        } 
        const resp=await createNewArticle(request);
    
        toast.success(resp?.data?.message, {
          position: "top-center",
          theme: "colored",
        });

        setTimeout(() => {
          history.push("/article/blogs")
        },2000);
        } catch (error) {
          toast.error("something went wrong", {
            position: "top-center",
            theme: "colored",
          });
        }
        finally
        {
           SetLoading(false);
        }
    }


  const getArticle=async(slug)=>
  {
      try {
        SetLoading(true);

         const resp=await getArticleByTitle(slug);
        
         setDefaultDetails({
          title:resp?.data.title,
          description:resp?.data.description,
          content:resp?.data.content
         })
         setId(resp?.data._id);
        } catch (error) {
          console.log(error);
        }
        finally
        {
        SetLoading(false);
      }
  }

  const EditArticle=async()=>{
      try {
        const request={
          title:values.title,
          description:values.description,
          content:values.content,
        } 
         console.log(id);
         console.log(request);
        const resp=await editArticle(id,request);

        toast.success(resp?.data?.message, {
          position: "top-center",
          theme: "colored",
        });

        setTimeout(() => {
          history.push("/article/blogs")
        },2000);
        
      } catch (error) {
        toast.error("something went wrong", {
          position: "top-center",
          theme: "colored",
        });
      }
      finally
      {
        SetLoading(false)
      }
  }


  useEffect(()=>{
    if (edit) {
       getArticle(slug);
    }
  },[edit,slug])


    return (
        <>
        <div className="container">
        <span
        style={{ cursor: "pointer" }}
        className="fw-bold font-monospace text-secondary my-2"
        onClick={() => history.goBack()}
      >
        <FaArrowLeft /> Go Back
      </span>
        </div>
      
        <h1 className="text-center my-2 title text-white">{edit?"Edit Article":"Create a New Article"}</h1>

     

         <Formik
        enableReinitialize
        initialValues={defaultDetails}
        validationSchema={ArticleSchema}
        onSubmit={(values) => {
         SetValues(values);
         handleShow();
        }}
      >
        <Form className="container d-flex flex-column">
          <div className="mt-5 mb-3">
            <label className="form-label fw-bold">Title</label>
            <Field name="title" type="text" className="form-control" />
            <ErrorMessage
              name="title"
              render={(msg) => <div className="text-danger">{msg}</div>}
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-bold">Description</label>
            <Field name="description" as="textarea" className="form-control" />
            <ErrorMessage
              name="description"
              render={(msg) => <div className="text-danger">{msg}</div>}
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-bold">Content</label>
            <Field name="content" as="textarea" rows="5" cols="5" className="form-control" />
            <ErrorMessage
              name="content"
              render={(msg) => <div className="text-danger">{msg}</div>}
            />
          </div>

          <button type="submit" className="btn btn-success my-5">
            {edit?"Edit":"Create"}
          </button>
        </Form>
      </Formik>



      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title className="text-success">{edit?"Edit Article":"Submit Article"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to {edit?"Edit":"Submit"} this Article</Modal.Body>
        <Modal.Footer>
          <button className="btn btn-secondary" onClick={handleClose}>
            Cancel
          </button>
          <button
            className="btn btn-primary"
            onClick={() => {
             edit?EditArticle():CreateArticle();
              handleClose();
            }}
          >
            {edit?"Edit":"Submit"}
          </button>
        </Modal.Footer>
      </Modal>

      <CustomLoadingAnimation isLoading={Loading}/>
        </>
    )
}

export default CreateEditArticle
