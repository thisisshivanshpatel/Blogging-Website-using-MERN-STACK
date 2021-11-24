import React, { useEffect, useState } from 'react'
import { FaArrowLeft } from 'react-icons/fa';
import { useParams,useHistory } from 'react-router-dom';
import { getArticleByTitle } from '../../Axios/api';
import CustomLoadingAnimation from '../CustomLoadingAnimation';

const ReadArticle = () => {
    const [Loading,setLoading]=useState(false);
    const [Article,setArticle]=useState({});
    const history=useHistory();
    const params=useParams();
    const {slug}=params;

    const GetArticle=async(slug)=>{
        try {
           setLoading(true);
           const resp=await getArticleByTitle(slug);

           setArticle({title:resp?.data.title,description:resp?.data.description,content:resp?.data.content,createdAt:resp?.data.createdAt});
        } catch (error) {
           console.log(error);
        }
        finally
        {
           setLoading(false)
        }
    }

    useEffect(()=>{
        if (slug) {
         GetArticle(slug);           
        }
    },[slug])

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

            <h1 className="display-5 text-center fontslab">{Article.title}</h1>
            <h4 className="text-start text-secondary my-3">Published At  {new Date(Article.createdAt).toLocaleDateString('en-In', { weekday:"long", year:"numeric", month:"short", day:"numeric"})}</h4>
            <h5 className="my-5 text-start fontslab">Description: {Article.description}</h5>
            <h5 className="my-5 text-start fontslab">{Article.content}</h5>
            </div>
            <CustomLoadingAnimation isLoading={Loading}/>
        </>
    )
}

export default ReadArticle
