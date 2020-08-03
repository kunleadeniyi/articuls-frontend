// const baseUrl = "http://localhost:3000/api"
const baseUrl = "https://articuls-backend.herokuapp.com/api"

function config () {
    let token 
    if (localStorage.token) {
        token = localStorage.token
    }

    if (!token) {
        return {
            baseUrl,
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            }
        }
    } else {
        return {
            baseUrl,
            headers: {
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    'auth-token': `${token}`,
                    // authorization: `Bearer ${token}`,
                }
            }
        }
    }
}

export default config