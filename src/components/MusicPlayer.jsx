import React, { useState, useEffect, useMemo } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import VolumeDown from '@material-ui/icons/VolumeDown';
import VolumeUp from '@material-ui/icons/VolumeUp';
import VolumeOffIcon from '@material-ui/icons/VolumeOff';
import music from '../assets/music.mp3';
import music2 from '../assets/music2.mp3';
import music3 from '../assets/music3.mp3';

const useStyles = makeStyles({
  root: {
    width: 250,
    background: 'rgba(255, 255, 255, 0)',
    color: 'white'
  },
});

export default function MusicPlayer (props) {

  const classes = useStyles();
  const [valueMusic, setValueMusic] = useState(localStorage.getItem('valueMusic') ? JSON.parse(localStorage.getItem('valueMusic')) : 30);
  const [musicOn, setMusicOn] = useState(false);

  let track = music
  if(props.musicSong === 0) track = music
  if(props.musicSong === 1) track = music2
  if(props.musicSong === 2) track = music3

  const clickMusic = useMemo(() => new Audio(track), [track])
  clickMusic.loop = true

  const handleChange = (event, newValue) => {
    setValueMusic(newValue);
    localStorage.setItem('valueMusic', JSON.stringify(newValue));
  };

  clickMusic.volume = valueMusic / 100;

  const onClick = () => {
    if (props.soundOn) props.clickSound.play()
    setMusicOn((s) => !s)
  }

useEffect(() => {
    musicOn ? clickMusic.play() : clickMusic.pause()
    return () => clickMusic.pause()
}, [musicOn, clickMusic])

  const styles= {fontSize: '30px', color: '#ff5e5e', cursor: 'pointer' }

  const btn = musicOn ? <VolumeUp style={styles} onClick={onClick} /> :
    <VolumeOffIcon style={styles} onClick={onClick} />

  return (
    <div className={classes.root}>
      <Typography id="continuous-slider" gutterBottom>
        { props.name }
      </Typography>
      <Grid container spacing={2}>
        <Grid item style={{marginRight: '10px'}}>
          { btn }
        </Grid>
        <Grid item>
          <VolumeDown />
        </Grid>
        <Grid item xs>
          <Slider value={valueMusic} onChange={handleChange} aria-labelledby="continuous-slider" />
        </Grid>
        <Grid item>
          <VolumeUp />
        </Grid>
      </Grid>
    </div>
  );
}