import express from "express";

const router = express.Router();

// GetAll
router.get("/", (req, res) => { 
    res.send({ "TODO: Get All Services": "TODO: Get All Services" });
    }
);

// GetById
router.get("/:id", (req, res) => { 
    res.send({ "TODO: Get Service By Id": "TODO: Get Service By Id" });
    }
);

// Create
router.post("/", (req, res) => { 
    res.send({ "TODO: Create Service": "TODO: Create Service" });
    }
);

// Update
router.put("/:id", (req, res) => { 
    res.send({ "TODO: Update Service": "TODO: Update Service" });
    }
);

// Delete
router.delete("/:id", (req, res) => { 
    res.send({ "TODO: Delete Service": "TODO: Delete Service" });
    }
);

export default router;