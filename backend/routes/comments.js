import express from "express";

const router = express.Router();

// GetAll
router.get("/", (req, res) => { 
    res.send({ "TODO: Get All Comments": "TODO: Get All Comments" });
    }
);

// GetById
router.get("/:id", (req, res) => { 
    res.send({ "TODO: Get Comment By Id": "TODO: Get Comment By Id" });
    }
);

// GetByHiringId
router.get("/hiring/:id", (req, res) => { 
    res.send({ "TODO: Get Comment By Hiring Id": "TODO: Get Comment By Hiring Id" });
    }
);

//GetByRatingRange
router.get("/rating/:min/:max", (req, res) => { 
    res.send({ "TODO: Get Comment By Rating Range": "TODO: Get Comment By Rating Range" });
    }
);

// Create
router.post("/", (req, res) => { 
    res.send({ "TODO: Create Comment": "TODO: Create Comment" });
    }
);

// Update
router.put("/:id", (req, res) => { 
    res.send({ "TODO: Update Comment": "TODO: Update Comment" });
    }
);

// Delete
router.delete("/:id", (req, res) => { 
    res.send({ "TODO: Delete Comment": "TODO: Delete Comment" });
    }
);

export default router;