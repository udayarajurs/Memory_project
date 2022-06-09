import jwt from 'jsonwebtoken';

// wants to like a post
// click the like button => auth middleware (next) => like controller...

const auth = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const isCustomAuth = token.length < 500;

        let decodedData;

        if(token && isCustomAuth){
            decodedData = jwt.verify(token, 'test');

            req.userID = decodedData?.id;
        }else { // we have issue withe google auth token ID
            decodedData = jwt.decode(token)
            req.userID = decodedData?.sub;
        }
        next();
    } catch (error) {
        console.log(error);
    }
}

export default auth;