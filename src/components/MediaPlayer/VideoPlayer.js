import React from 'react'
import PropTypes from 'prop-types'
import { Media, Player, controls } from 'react-media-player'
import classnames from 'classnames'
import PlayPause from './PlayPause'
import MuteUnmute from './MuteUnmute'
import Fullscreen from './Fullscreen'
import  './MediaPlayer.less'

const { CurrentTime, Progress, SeekBar, Duration, Volume } = controls

function VideoPlayer ({ src, autoPlay }) {
  return (
    <Media>
      {({ isFullscreen, playPause }) =>
        (<div
          className={classnames('media-player', { ['media-player--fullscreen']: isFullscreen })}
        >
          <Player
            autoPlay={autoPlay}
            src={src}
            onClick={() => playPause()}
          />
          <div className='media-controls'>
            <div className='media-control-group' >
              <PlayPause className={classnames('media-control', 'media-control--play-pause')} />
              <CurrentTime className={classnames('media-control', 'media-control--current-time')} />
            </div>
            <div className={classnames('media-control-group', 'media-control-group--seek')}>
              <Progress className={classnames('media-control', 'media-control--progress')} />
              <SeekBar className={classnames('media-control', 'media-control--seekbar')} />
            </div>
            <Duration className={classnames('media-control', 'media-control--duration')} />
            <div className={'media-control-group'} >
              <MuteUnmute className={classnames('media-control', 'media-control--mute-unmute')} />
              <Volume className={classnames('media-control', 'media-control--volume')} />
            </div>
            <div className={'media-control-group'} >
              <Fullscreen className={classnames('media-control', 'media-control--fullscreen')} />
            </div>
          </div>
        </div>)
      }
    </Media>
  )
}

VideoPlayer.propTypes = {
  src: PropTypes.string.isRequired,
  autoPlay: PropTypes.bool,
}

VideoPlayer.defaultProps = {
  autoPlay: true,
}

export default VideoPlayer
