export const LoginCall = async (credentials, dispatch) => {
  dispatch({type: 'LoginStart'})
  try {
      const res = await fetch(`http://localhost:8800/api/user/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });
    const result = await res.json();
    console.log(result)
    result==='user not found'? dispatch({type: 'LoginFailed', payload: result }) : 
    dispatch({type: 'LoginSuccess', payload: result })
    localStorage.setItem('username',result.username)
  } catch (err) {
    dispatch({type: 'LoginFailed', payload: err }) 
  }
};
