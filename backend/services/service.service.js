import ServiceRepository from "../repositories/service.repository.js";

class ServiceService {
    async getAll(category) {
        return ServiceRepository.getAll(category);
    };

    async getById(serviceId) {
        return ServiceRepository.getById(serviceId);
    };

    async getByUserId(userId) {
        return ServiceRepository.getByUserId(userId);
    }

    async create(service) {
        return ServiceRepository.create(service);
    };

    async update(serviceId, service) {
        return ServiceRepository.update(serviceId, service);
    };

    async delete(serviceId) {
        return ServiceRepository.delete(serviceId);
    };
}

export default ServiceService;