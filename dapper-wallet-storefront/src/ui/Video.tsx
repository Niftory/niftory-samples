import { IconButton } from '@chakra-ui/button';
import { Box } from '@chakra-ui/layout';
import React, { useRef, useState } from 'react';
import { FaVolumeMute, FaVolumeUp } from 'react-icons/fa';

interface Props extends React.HTMLProps<HTMLVideoElement> {
  initialMute?: boolean
  hideMute?: boolean
}

export const Video = ({ initialMute = true, ...props }: Props) => {
  const videoRef = useRef<HTMLVideoElement>()
  const [videoLoaded, setVideoLoaded] = useState(false)
  const [muted, setMuted] = useState(initialMute)
  const onLoad = () => {
    setVideoLoaded(true)
  }
  return (
    <Box position="relative">
      {videoLoaded && (
        <IconButton
          background="rgba(0,0,0,0.7)"
          color="white"
          position="relative"
          top="12"
          left="2"
          zIndex={1}
          onClick={() => {
            setMuted(!muted)
            videoRef.current.muted = !muted
          }}
          aria-label="mute"
          icon={muted ? <FaVolumeMute /> : <FaVolumeUp />}
        />
      )}
      <video
        style={{
          height: "100%",
          width: "100%",
          objectFit: "scale-down",
        }}
        {...props}
        onPlay={onLoad}
        ref={videoRef}
        muted={initialMute}
      />
    </Box>
  )
}
