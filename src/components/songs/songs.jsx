
import { useState } from 'react';
import {storage,songs,trends} from '../../config';
import './songs.css';
const Songs = ()=>{
    const [song,setSong] = useState({});
    const [data,setData] = useState({});
    const [trend,setTrend] = useState(false);
    const [url,setUrl] = useState("");
    const handleSong = (e)=>{
        setSong({...song,[e.target.name]:e.target.files[0]});
    }

    const uploadSong=(e)=>{
        e.preventDefault();
        setUrl("getting link...")
        storage.ref(`/Songs/${song.song.name}`).put(song.song)
        .on("state_changed",alert("success"),alert,()=>{
            storage.ref(`/Songs`).child(song.song.name).getDownloadURL()
            .then((url)=>{
                setUrl(url);
            })
        });
    }

    const handleDataChange = (e)=>{
        let name = e.target.name;
        let value = e.target.value;
        setData({...data,[name]:value});
    }
    const uploadData = (e)=>{
        e.preventDefault();
        let urls = null;

        if(trend)
        urls = trends;
        else
        urls = songs;
        
        fetch(urls,{
            method:"POST",
            headers:{
                'Content-Type':'Application/json',
            },
            body:JSON.stringify({
                url:url,
                poster:data.poster,
                singer:data.singer,
                title:data.title,
                category:data.category,
                premium:data.premium
            })
        })
        alert("uploaded successfully");
    }   

    return <div className='form'>
       <div>
       <h1>RelaxBuddy Admin</h1>
        <form className='songForm' action="">
            <input type="file" placeholder='select song' name='song' onChange={handleSong}/>
            <button onClick={uploadSong}>UPLOAD</button>
        </form>

        <form className='uploadForm' onSubmit={uploadData}>
            <input type="url" onChange={handleDataChange} placeholder='song url' value={url} name='url'/> <br />
            <input type="text" onChange={handleDataChange} name='poster' placeholder='copy image address of youtube...' required /><br />
            <input type="text" onChange={handleDataChange} name='singer' placeholder='singer name...' required /><br />
            <input type="text" onChange={handleDataChange} name='title' placeholder='song name...' required /><br />
            <input type="text" onChange={handleDataChange} name='category' placeholder='Category: Ex:- Hindi,English,Romance' required /><br />
            <input type="text" onChange={handleDataChange} name='premium' placeholder='only true or false in small' required /><br />
            <input type="checkbox" onChange={(e)=>setTrend(e.target.checked)} name='trending' /> <label htmlFor="trending">is Trending</label><br />
            <input type={'submit'} value='UPLOAD' className='button' />
        </form>
       </div>
    </div>
}
export default Songs;