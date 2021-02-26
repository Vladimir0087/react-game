import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import VolumeDown from '@material-ui/icons/VolumeDown';
import VolumeUp from '@material-ui/icons/VolumeUp';
import VolumeOffIcon from '@material-ui/icons/VolumeOff';
import music from '../assets/music.mp3';

const useStyles = makeStyles({
  root: {
    width: 250,
    background: '#222222',
    color: 'white'
  },
});

const clickMusic = new Audio(music)
clickMusic.loop = true

export default function MusicPlayer (props) {
  const classes = useStyles();
  const [value, setValue] = useState(30);
  const [musicOn, setMusicOn] = useState(false);

  // const clickMusic = new Audio(music)
  // clickMusic.loop = true

  const handleChange = (event, newValue) => {
    // document.addEventListener('touchstart', handler, {passive: true});
    // clickMusic.addEventListener("touchstart", handleChange, {passive: true});
    setValue(newValue);
  };

  // clickMusic.addEventListener('touchstart', handleChange, true);

  clickMusic.volume = value / 100;

  const onClick = () => {
    if (props.soundOn) props.clickSound.play()
    setMusicOn((s) => !s)
  }

  musicOn ? clickMusic.play() : clickMusic.pause()

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
          <Slider value={value} onChange={handleChange} aria-labelledby="continuous-slider" />
        </Grid>
        <Grid item>
          <VolumeUp />
        </Grid>
      </Grid>
    </div>
  );
}