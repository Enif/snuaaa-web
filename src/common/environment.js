export const SERVER_URL = function(){
    if(process.env.NODE_ENV === 'production'){
        return 'http://52.78.161.191/'
    }
    else if (process.env.NODE_ENV === 'development'){
        // return 'http://localhost:8080/'
        return 'http://192.168.123.103:8080/'
    }
    else if (process.env.NODE_ENV === 'test'){
        return 'http://localhost:8080/'
    }
    else {
        console.error('undefied ENV')
        return 'http://localhost:8080/'
    }
}()