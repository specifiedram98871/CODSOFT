
const checkAdmin = async (req, res, next) => {
    try {
        const user = req.user;
        // console.log(user.role);
        if (!user||user.role !== 'admin') {
            return res.status(401).json({ message: "Unauthorized" });
        }
        next(); 
    } catch (error) {
        console.log(error);
    }
}

export default checkAdmin;