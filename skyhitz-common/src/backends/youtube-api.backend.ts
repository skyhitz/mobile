const key = 'AIzaSyCDa0BdgiroUvn0kSYIDpmojTO2u-Xtt7M';

export class YoutubeApi {
  googleApiUrl = 'https://www.googleapis.com/youtube/v3';
  async relatedVideoIds(relatedToVideoId: string): Promise<string[]> {
    let url = `${this.googleApiUrl}/search?part=snippet&relatedToVideoId=${relatedToVideoId}&type=video&key=${key}&videoCategoryId=10`;
    return fetch(url)
      .then((res) => res.json())
      .then(({items}) => {
        if (!items) {
          return [];
        }
        let videoIds = items.map((item: any) => item.id.videoId);
        return videoIds;
      });
  }
}

export const youtubeApiBackend = new YoutubeApi();