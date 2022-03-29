import React,{useState,useEffect} from "react";
import SimpleSnackbar from "./alert"
import MenuItem from '@mui/material/MenuItem';
import {useForm,Controller} from "react-hook-form"
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Select from '@mui/material/Select';

import App from "../App"
import { useDispatch,useSelector } from "react-redux";
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import * as yup from "yup"
import {yupResolver} from "@hookform/resolvers/yup"
import TextField from '@mui/material/TextField';
import CustomImageList from "./image"
import { DialogActions } from "@mui/material";
import { Input  } from "@mui/material";
const tags = ["Sport","Programming","Health","Science","Culturel","Technology","Business","Politics","Foods","Other","Self-improvement"]
import PositionedSnackbar from "./PositionedSnackbar"
import {createPost} from "../actions/post"

import EDITOR_JS_TOOLS from "../editor/editor.js"
import EditorJs from '@natterstefan/react-editor-js'
import Paragraph from "antd/lib/skeleton/Paragraph";
import data from "@iconify/icons-eva/bell-fill";
import jsonToHtml from "./jsonToHtml"

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="left" ref={ref} {...props} />;
});

const postSchema = yup.object().shape({
  title:yup.string().min(4).required(),
  Subtitle:yup.string().min(15).max(30).required(),
  tag:yup.mixed().oneOf(tags)

}).required();

const AddPostForm =({open,handleClose})=>{
  const dispatch = useDispatch()

 


  const { register,trigger, handleSubmit,control, formState:{ errors }, resetField } = useForm({
    resolver: yupResolver(postSchema)
  });

   let editor = null
  

 const data =  ()=>{
    return {
      articleHtml: ""
    }
  }

   const outputHtml = (objarticle)=>{
  
    let article = data()

    objarticle.map(obj=>{

      switch (obj.type) {
       
        case "paragraph":
          
          article.articleHtml += jsonToHtml.makeParagraph(obj)
           break;


          case "list":
          
           article.articleHtml += jsonToHtml.makeList(obj)
            break;

            case "header":
          
              article.articleHtml += jsonToHtml.makeHeader(obj)
               break;

              case "simpleImage":
               
                 article.articleHtml +=  jsonToHtml.makeİmage(obj)
                break;

                case "quote":
               
                  article.articleHtml +=  jsonToHtml.makeQuote(obj)
                 break;

                  case "raw":
                    article.articleHtml +=  `<div class="ce-block">
                    <div class="ce-block__content">
                    <div class="ce-code">
                    <code>${obj.data.html}</code>
                    </div>
                    </div>
                    `
                    break;

                    case "code":
         
                 article.articleHtml += jsonToHtml.makeCode(obj)
                  
                      break;
      
        default:
          return ""
          break;
      }


    })

    
return article.articleHtml

      }
    


  const onSave = async () => {
  
    try {

      const outputData = await editor.save()
      
      

     if(outputData.blocks.length > 0){
 const convert =   await outputHtml(outputData.blocks)
return convert
     }else{
      setMessage("Invalid Data")
       handleClicks()
      
     }
     
    } catch (e) {
      console.log('Saving failed: ', e)
    }
  }
  
  

  const reMessage = useSelector(state => state.posts.posts)
  const [errMessage] = reMessage

  const onSubmit = async(data)=>{
   const valueEdıtor = await onSave()
    data.content = valueEdıtor

  dispatch(createPost({...data}))

    resetField("title");
    resetField("Subtitle");
  }


  useEffect(() => {

    if(errMessage){
      setMessage(errMessage.message)
      handleClicks()
    }

  }, [errMessage])

  


  const [message,setMessage] = useState("") 
  const [opens, setOpens] = React.useState(false);

  const handleClicks = (data) => {
    
    setOpens(true);
  };

  const handleCloses = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpens(false);
  };


    return(

<div>
    
    
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
    
          <Toolbar >
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
            “It’s not over until you win.”
            </Typography>
            <DialogActions>
          
            </DialogActions>
          </Toolbar>
          
        
         
          <CustomImageList/>

         
          <Typography  sx={{position:"absolute",left:730,bottom:440}}  variant="h7" align="right"  >
          Add or change tags so readers know what your story is about
          
            </Typography>
          
         <form noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
        
         <Controller

          name="tag"
          id="tag"
          control={control}
          defaultValue={tags[0]}
        
         
          
          render={({ field }) => (
            <Select {...field}  variant="standard"  style={{ width: 410,margin:30,left:700,bottom:250}} >
             {tags.map((tag,index) =>(
             <MenuItem key={index} value={tag}>
             {tag}
             </MenuItem>
             ))}
            </Select>
          )}
       
       
        />
       
       <div className="formInputs"   >
       <Input
      style={{ width: 300,left:600,bottom:100}}
          
         
          variant="standard"
          placeholder="Write a Prewiev title"
          id="title"
          name="title"
          {...register('title')}
          error={errors.title ? true : false}
              onKeyUp={() =>{
                trigger("title")
              }}

              
        />
    
   {errors.title && (<small  className="text-danger"   style={{position:"absolute",bottom:90,right:450}} >{errors.title.message}</small>)}
   
       <Input
         style={{ width: 300,left:600,bottom:100}}
          id="Subtitle"
          name="Subtitle"
          
          {...register('Subtitle')}
          variant="standard"
          placeholder="Write a Prewiev Subtitle"
          error={errors.Subtitle ? true : false}
          onKeyUp={() =>{
            trigger("Subtitle")
          }}
        />
            {errors.Subtitle && (<small className="text-danger"   style={{position:"absolute",bottom:90,right:150}}>{errors.Subtitle.message}</small>)}
            </div>
            <Button size="small"  type="submit" style={{bottom:520,left:1170}} variant="contained" color="success">
              Publish
          </Button>
           </form>
           {/* {
             success ? <PositionedSnackbar message={message} /> : ""
           } */}
       
        <Typography    variant="h9"  sx={{width:350,position:"absolute",left:140,top:380}} >
        Note: Changes here will affect how your story appears in public places like Medium’s homepage and in subscribers’ inboxes — not the contents of the story itself.
          
            </Typography>
         
      </Dialog>
      

<EditorJs   
  editorInstance={editorInstance => {
    editor = editorInstance
  }}
tools={EDITOR_JS_TOOLS}
placeholder="Tell your story"

/>
<SimpleSnackbar   opens={opens} handleCloses={handleCloses} message={message} />
    </div>

    ) 
}

export default AddPostForm