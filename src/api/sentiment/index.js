import axios from 'axios'

export const getArticles = (requestData) => {
  return axios(
    {
      method: 'post',
      url: '/articles',
      headers: {
        'Content-type': 'application/json;charset=utf-8'
      },
      data: requestData,
      transformRequest: [function (data) {
        data['publication_at'] = [Math.floor(new Date(data['publication_at'][0]).getTime() / 1000),
          Math.floor(new Date(data['publication_at'][1]).getTime() / 1000)]
        return JSON.stringify(data)
      }]
    }
  )
}

export const getReviews = (seriesId) => {
  return axios({
    method: 'get',
    url: `reviews/${seriesId}`
  }
  )
}
