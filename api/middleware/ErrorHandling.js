function errorHandling(err,res){
    if(err){
        const status = err.status || 500;
        res.status(status).json({
            status: status,
            err: "AN HAS ERROR OCCURRED!"
        });
    } 
};

module.exports = {errorHandling};