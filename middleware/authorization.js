export const authentication = (req,res,next) =>{
  const token = req.headers.authorization
  console.log(process.env.TOKEN)
  if(!token || token != process.env.TOKEN) return res.status(403).json({message:"Access denied"})

  next()

}
