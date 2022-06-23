const LinkToVideoId = function(video_link) {
  let video_id = video_link.split('v=')[1];
  if (video_id){
    let ampersandPosition = video_id.indexOf('&');
    if (ampersandPosition != -1) {
      video_id = video_id.substring(0, ampersandPosition);
    }
  } else {
    video_id = video_link.slice(-11,video_link.length);
  }

  return video_id;
}

export default LinkToVideoId;