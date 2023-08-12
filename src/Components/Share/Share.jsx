import React, { useContext, useRef, useState } from 'react'
import "./share.css"
import { Cancel, EmojiEmotionsRounded, LabelRounded, LocationOnRounded, PhotoLibraryRounded } from '@mui/icons-material'
import { AuthContext } from '../../Context/AuthContext'

function Share() {
  const { user } = useContext(AuthContext)
  const [file, setFile] = useState(null)
  const description = useRef()
  const handleSubmit = async (e)=>{
    e.preventDefault()
    const newPost = {
      userid: user._id,
      username: user.username,
      description:  description.current.value
    }
    if(file){
      const Data = new FormData()
      Data.append('file',file)
      try {
        const res = await fetch('http://localhost:8800/api/uploadimg',{
          method: 'POST',
          body: Data
        })
        const result = await res.json()
        newPost.img = result.filename
      } catch (error) {
        console.log(error)
      }  
    }
    try {
      const res = await fetch('http://localhost:8800/api/posts/createpost',{
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newPost)
      })
      const result = await res.json();
      window.location.reload()
    } catch (error) {
      console.log(error)
    }
  }
  const PF = process.env.REACT_APP_PF
  return (
    <form className='share' onSubmit={handleSubmit}>
      <div className="share-top">
        <img className='share-img' src={user.profile?PF+user.profile:PF+'noAvatar.jpeg'} alt="" />
        <input className='share-input' ref={description} placeholder="What's on your mind?" type="text" />
      </div>
      <hr className='share-hr'/>
      {file && (
        <div className="post-img-container">
          <img src={URL.createObjectURL(file)} alt="img.." className="post-img"/>
          <Cancel className='post-img-cancel' onClick={()=>setFile(null)} />
        </div>
      )}
      <div className="share-bottom">
        <label htmlFor='file' className='share-item'>
            <PhotoLibraryRounded htmlColor='tomato' className='share-item-img'/>
            <span className="share-item-text">Photo or Video</span>
            <input type="file" id='file' accept='.png,.jpeg,.jpg' onChange={(e)=>setFile(e.target.files[0])} style={{display: 'none'}}/>
        </label>
        <div className='share-item'>
            <LabelRounded htmlColor='blue' className='share-item-img'/>
            <span className="share-item-text">Tag</span>
        </div>
        <div className='share-item'>
            <LocationOnRounded htmlColor='green' className='share-item-img'/>
            <span className="share-item-text">Location</span>
        </div>
        <div className='share-item'>
            <EmojiEmotionsRounded htmlColor='goldenrod' className='share-item-img'/>
            <span className="share-item-text">feelings</span>
        </div>
        <button type='submit' className='share-btn'>
            Share
        </button>
      </div>
    </form>
  )
}

export default Share
