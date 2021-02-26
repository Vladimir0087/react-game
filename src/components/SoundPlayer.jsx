import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import VolumeDown from '@material-ui/icons/VolumeDown';
import VolumeUp from '@material-ui/icons/VolumeUp';
import VolumeOffIcon from '@material-ui/icons/VolumeOff';

const useStyles = makeStyles({
  root: {
    width: 250,
    background: '#222222',
    color: 'white'
  },
});

export default function SoundPlayer(props) {
  const classes = useStyles();
  const [value, setValue] = useState(30);

  const handleChange = (event, newValue) => {
    // document.addEventListener('touchstart', handler, {passive: true});
    setValue(newValue);
  };

  props.clickSound.volume = value / 100;

  const onClick = () => {
    if (props.soundOn) {
      props.soundOnOff(false)
      props.clickSound.play()
    } else props.soundOnOff(true)
  }

  const styles= {fontSize: '30px', color: '#ff5e5e', cursor: 'pointer' }

  const btn = props.soundOn ? <VolumeUp style={styles} onClick={onClick} /> :
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