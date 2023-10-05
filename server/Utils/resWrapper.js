//sending the response from server by wrapping it in some extra data to better handle response at frontend
const success=(statusCode,result)=>{
    return {
        status:'ok',
        statusCode,
        result
    }
}

const error=(statusCode,message)=>{
    return {
        status:'error',
        statusCode,
        message
    }
}

module.exports={
    success,
    error
}