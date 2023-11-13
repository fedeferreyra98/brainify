import express from "express";

const router = express.Router();


// GetAll
router.get("/", (req, res) => { 
    res.send({ "TODO: Get All Providers": "TODO: Get All Providers" });
    }
);

// GetById
router.get("/:id", (req, res) => { 
    res.send({ "TODO: Get Provider By Id": "TODO: Get Provider By Id" });
    }
);

// Create
router.post("/", (req, res) => { 
    res.send({ "TODO: Create Provider": "TODO: Create Provider" });
    }
);

// Update
router.put("/:id", (req, res) => { 
    res.send({ "TODO: Update Provider": "TODO: Update Provider" });
    }
);

// Delete
router.delete("/:id", (req, res) => { 
    res.send({ "TODO: Delete Provider": "TODO: Delete Provider" });
    }
);

export default router;