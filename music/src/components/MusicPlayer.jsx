import { Paper,Box } from '@material-ui/core';
import React, {useState, useEffect} from 'react';
import playerStyle from '../styles/playerStyle';
import ReactPlayer from 'react-player'
import { Typography } from '@material-ui/core';
import logo from './logo.jpg'
import { getAll, getOne } from '../services/MusicService';
const MusicPlayer = ({link})=>{
    const player = playerStyle();    
    const [today, setToday] = useState({});
    useEffect(()=> {
        getAll().then(data => {
            let _idList = data.map(d=>d.id);
            let randomMusic = _idList[Math.floor( Math.random() * _idList.length)];
            return randomMusic;            
        }).then((randomMusic)=>{
            getOne(randomMusic).then((data)=> {                
                setToday(data);                                        
            });
        });
    },[]) 
    return(
        <Paper className={player.root}>
            <img style={{width : '45%', height : '100%'}} src={logo}/>
            <ReactPlayer width="100%" height="100%" url={link ? link : today.link}/>            
        </Paper>
    )
}

export default MusicPlayer;