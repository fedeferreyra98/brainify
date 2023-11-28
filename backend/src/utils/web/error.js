export const handleError = (response, error) => {
    console.log(error);
    if (error.message === "Service not found") {
        return response.status(404).json({message: error.message});
        }
    else if (error.message === "Service does not belong to user") {
        return response.status(403).json({message: error.message});
        }
    else if (error.kind === "ObjectId") {
        return response.status(400).json({message: "Id Format not valid"});
        }
    else {
        console.log(error);
        return response.status(500).json({message: "Internal Server Error"});
    }
}