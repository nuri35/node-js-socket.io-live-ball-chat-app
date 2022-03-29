import axios from "axios"
import { useEffect,useState } from "react"

const API = axios.create({baseURL:"http://localhost:5000"})




export const createPost = async (post)=> await API.post("/blogs",post,{withCredentials: true})//servera req.bdoy dıye karsılayacagı verıyı yolluyoruz

export const fetchSinglePost = async (id)=> await API.get(`/blogs/Post/${id}`,{withCredentials: true})