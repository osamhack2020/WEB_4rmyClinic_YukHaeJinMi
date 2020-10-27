import React from 'react';
import { ROOT } from "../_lib/endpoint";
import defaultProfileImg from '../assets/profile.png';

type ProfileIconProps = {
  imgUri?: string,
  size?: number,
  borderRadius?: number
}

export function ProfileIcon(props: ProfileIconProps) {
  let src;
  if (props.imgUri?.indexOf("data:") === 0) {
    src = props.imgUri;
  }
  else {
    src = props.imgUri ? ROOT + props.imgUri : defaultProfileImg;
  }
  const radius = props.size ? props.size : 36;
  const R = (radius * 2).toString() + "px";
  const r = props.borderRadius ? props.borderRadius : (radius).toString() + "px";
  return (
    <img style={{ width: R, height: R, borderRadius: r }} src={src} alt="profile" />
  )
}