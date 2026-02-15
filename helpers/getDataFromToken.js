import jwt from "jsonwebtoken";

export default function getDataFromToken(request) {
  
    try {
        const token = request.cookies.get("token")?.value ||"";
        const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
        return decoded.id;
    } catch (error) {
        throw new Error("Invalid token");
    }

}