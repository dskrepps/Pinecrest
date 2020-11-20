
/*
 *  ListItem.vue and SingleItem.vue get an item's image and description from the Reddit API
 */


import axios from 'axios';

export default async function fetchRedditData( item, state ) {
	try {
    
    state.loading = true;
    
    const response = await axios.get( item.descUrl + '.json?raw_json=1' );
    
    let postData = response.data[0].data.children[0].data;
    let commentData = response.data[1].data.children[0].data;
    
    
    let preview = postData.preview?.images[0].resolutions[5].url;
    
    // Data structure is different for galleries
    // We'll just get the first image
    if( !preview ) {
      // The image order is in gallery_data,
      // but the preview urls themselves are in media_metadata
      let mediaId = postData.gallery_data.items[0].media_id;
      preview = postData.media_metadata[mediaId].p[5].u;
    }
    
    
    state.post = {
      imgSrc: preview,
      url: postData.permalink,
      // postUser: postData.author,
      // date: postData.created,
    };
    
    state.desc = {
      body: commentData.body_html,
    };
    
    state.loading = false;
    state.loadingFailed = false;
    
  } catch (error) {
    console.log(error);
    state.loadingFailed = true;
    state.loading = false;
  }
	
};
