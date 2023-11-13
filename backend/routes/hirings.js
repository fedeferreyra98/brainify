import express from "express";

const router = express.Router();

// GetAll
router.get("/", (req, res) => { 
    res.send({ "TODO: Get All Hirings": "TODO: Get All Hirings" });
    }
);

// GetById
router.get("/:id", (req, res) => { 
    res.send({ "TODO: Get Hiring By Id": "TODO: Get Hiring By Id" });
    }
);

// Create
router.post("/", (req, res) => { 
    res.send({ "TODO: Create Hiring": "TODO: Create Hiring" });
    }
);

// Update
router.put("/:id", (req, res) => { 
    res.send({ "TODO: Update Hiring": "TODO: Update Hiring" });
    }
);

// Delete
router.delete("/:id", (req, res) => { 
    res.send({ "TODO: Delete Hiring": "TODO: Delete Hiring" });
    }
);

export default router;