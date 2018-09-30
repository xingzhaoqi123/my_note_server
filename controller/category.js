const { Router } = require("express");
const router = Router();
const categoryModel = require("../model/category");
router.get("/category", (req, res) => {
    categoryModel.find().then(data => {
        res.json({
            code: 200,
            data,
            count:data.length
        });
    });
});
router.get("/category/:id", (req, res) => {
    let { id } = req.params;
    categoryModel.findById(id).then(data => {
        res.json({
            code: 200,
            data
        });
    });
});
router.post("/category", async (req, res, next) => {
    let { name } = req.body;
    try {
        if (name) {
            const data = await categoryModel.create({ name });
            res.json({
                code: 200,
                msg: "创建分类成功",
                data
            });
        } else {
            res.json({
                code: 400,
                msg: "请填写分类名称"
            });
        }
    } catch (err) {
        next(err);
    }
});
module.exports = router;
