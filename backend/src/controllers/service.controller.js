import ServiceService from "../services/service.service.js";
import { handleError } from "../utils/web/error.js";

export const GetAllServices = async (req, res) => {
    try {
        const category = req.query.category || "all";
        if (!(await ServiceService.validateCategory(category))) {
           return  res.status(400).json({message: "Categoria invalida"});
        }
        const services = await ServiceService.getAll(category);
        return res.status(200).json({services});
    } catch (error) {
        return handleError(res, error);
    }
};

export const GetServiceById = async (req, res) => {
    try {
        const serviceId = req.params.serviceId;
        const service = await ServiceService.getById(serviceId);
        if (!service) {
            return res.status(404).json({message: "Servicio no encontrado"});
        }
        return res.status(200).json({service});
    } catch (error) {
        return handleError(res, error);
    }
};

export const GetServicesByUser = async (req, res) => {
    try {
        const services = await ServiceService.getByUserId(req.userId);
        if (!services) {
            return res.status(404).json({message: "Servicios no encontrados"});
        }
        return res.status(200).json({services});
    } catch (error) {
        console.log(req.user)
        return handleError(res, error);
    }
};

export const Create = async (req, res) => {
    try {
        const {name, description, category, frequency, cost, type, duration, imageUrl} = req.body;
        const serviceData = {
            userId: req.userId,
            name: name,
            description: description,
            category: category,
            frequency: frequency,
            cost: cost,
            type: type,
            duration: duration,
            averageRating: 0,
            totalRating: 0,
            sumOfRatings: 0,
            imageUrl: imageUrl,
        };
        const service = await ServiceService.create(serviceData);
        return res.status(201).json({service});
    } catch (error) {
        return handleError(res, error);
    }
};

export const Update = async (req, res) => {
    const updates = Object.keys(req.body);
    if (!isValidUpdate(allowedUpdates, updates)) {
      return res.status(400).json({ error: "Invalid update" });
    }
    try {
        const serviceId = req.params.serviceId;
        const userId = req.userId;
        const service = await ServiceService.update(serviceId, userId, req.body);
        if (!service) {
            return res.status(404).json({message: "Servicio no encontrado"});
        }
        return res.status(200).json({service});
    } catch (error) {
        return handleError(res, error);
    }
};

export const Delete = async (req, res) => {
    try {
        const serviceId = req.params.serviceId;
        const userId = req.userId;
        const service = await ServiceService.delete(serviceId, userId);
        return res.status(204).json({service});
    } catch (error) {
        return handleError(res, error);
    }
};

export const GetTop3Services = async (req, res) => {
    try {
        const services = await ServiceService.getTop3();
        return res.status(200).json({services});
    } catch (error) {
        return handleError(res, error);
    }
}


const isValidUpdate = (allowedUpdates, updates) => {
    const isValidUpdate = updates.every((update) =>
      allowedUpdates.includes(update)
    );
    return isValidUpdate;
  };

const allowedUpdates = [
    "name",
    "description",
    "category",
    "frequency",
    "cost",
    "type",
    "duration",
    "isPublished",
    "imageUrl",
  ];