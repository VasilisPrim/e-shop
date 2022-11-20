function errorHandler(error,req,res,next){
    console.log(error);
    res.status(500).render("common/500.ejs");
}

module.exports = errorHandler;