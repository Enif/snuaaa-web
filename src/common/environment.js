export const SERVER_URL = function(){
    if(process.env.NODE_ENV === 'production'){
        return 'http://52.78.161.191:8080/'
    }
    else if (process.env.NODE_ENV === 'development'){
        return 'http://localhost:8080/'
    }
    else if (process.env.NODE_ENV === 'test'){
        return 'http://localhost:8080/'
    }
    else {
        console.error('undefied ENV')
        return 'http://localhost:8080/'
    }
}()