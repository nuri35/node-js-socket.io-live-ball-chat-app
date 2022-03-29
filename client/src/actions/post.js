import * as types from "./types"
import * as api from "../api/index"
import axios from "axios"
import React,{useState,useEffect} from 'react'



export const createPost = (post) => async(dispatch)=>{

    try{
        const {data} = await api.createPost(post)
        dispatch({
            type:types.CREATE_POST,
            payload:data
        })
      
       }catch(err){
           console.log("hey burdayım hata var" + err)
       }
    


}



export const fetchSinglePost = (id) => async(dispatch)=>{

    try{
        const {data} = await api.fetchSinglePost(id)
        dispatch({
            type:types.FETCH_SINGLE_POST,
            payload:data,
            withCredentials:true
        })
       }catch(err){
           console.log(err)
       }
    


}




export  const searchPost =  (query,pageNumber) =>{


    const [loading,setLoading] = useState(true)
    const [error,setError] = useState(false)
    const [blogs,setBlogs] = useState([])
    const [hasMore,setHasMore] = useState(false)
    const [userInfo,setuserInfo] = useState()

    useEffect(()=>{
        setBlogs([])
    },[query])

  useEffect(()=>{
    setLoading(true)
    setError(false)
    let cancel 
   axios({
       method:"GET",
       url:"http://localhost:5000/blogs/search",
       params:{q:query,page:pageNumber},
       withCredentials:true,
       cancelToken:new axios.CancelToken(c=>cancel = c)

   }).then(res=>{

       setBlogs(prevBlog =>{
           return  [...new Set([...prevBlog,...res.data.searcharticles.map(b =>b)])]
       })
       setHasMore(res.data.searcharticles.length) 
       setLoading(false)
       setuserInfo(res.data.userInfo)
    

   }).catch(err=>{
       if(axios.isCancel(err)) return
       setError(true)
   })

  return () => cancel()
  },[query,pageNumber])

return {loading,error,blogs,hasMore,userInfo}
}

