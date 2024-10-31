import Photo from "../models/photoModels.js";

const createPhoto = (req, res) => {
    const photo = Photo.create(req.body);
    res.status(201).json({
        succeded: true,
        photo
    });
}

export {createPhoto};