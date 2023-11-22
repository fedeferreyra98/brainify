import Service from "../models/service.model.js";

class ServiceRepository{

    async getAll(category){
        const query = category === "all" ? {} : {category};
        return await Service.find(query).lean();
    };

    async getByUserId(userId){
        return await Service.find({userId}).lean();
    };

    async create(serviceData){;
        return await Service.create(serviceData);
    }

    async getById(id){
        return await Service.findById(id).lean();
    }

    async update(id, userId, update){
      try {
        const Service = await findServiceAndCheckOwnership(id, userId);
        Object.keys(update).forEach((key) => (Service[key] = update[key]));
        await Service.save();
        return Service;
      } catch (error) {
        throw error;
      } 
    };
    
    async remove(id, userId){
      try {
        const Service = await findServiceAndCheckOwnership(id, userId);
        await Service.deleteOne();
      } catch (error) {
        throw error;
      };
    }

    async validateCategory(category){
        return category === "all" ||  checkCategory(category);
    }
}

    const findServiceAndCheckOwnership= async (serviceId, userId) => {
    const service = await Service.findById(serviceId);
    if (!service) {
      throw new Error("Servicio no encontrado");
    }
  
    if (service.userId.toString() !== userId) {
      throw new Error("El servicio no pertenece al usuario");
    }
  
    return service;
  };

    const checkCategory = (category) => {
    return ["programacion", "idiomas", "musica", "matematica"].includes(
      category
    );
  };

  export default new ServiceRepository();