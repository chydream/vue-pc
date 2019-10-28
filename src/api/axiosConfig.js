export const saveAuthorityDetails = params => {
  return new Promise((resolve, reject) => {
    axios({
      url: baseUrl + '/userRole/saveAuthorityDetails',
      method: 'post',
      headers: {
        'Content-Type': 'application/json; charset=utf-8' 
        // application/x-www-form-urlencoded
      },
      data: params
    }).then(res => {
      resolve(res.data)
    })
  })
}