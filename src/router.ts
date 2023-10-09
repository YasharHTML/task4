import { Router } from "express";
import {
    createNews,
    deleteNews,
    getNews,
    getNewsById,
    updateNews,
} from "./fake_dao";
const router = Router();

router.get("/", (req, res) => {
    try {
        const page = +(req.query.page ?? "0");
        const size = +(req.query.size ?? "20");

        const news = getNews(page, size);

        res.json(news);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error });
    }
});

router.get("/:id", (req, res) => {
    try {
        const id = +req.params.id;

        const news = getNewsById(id);

        if (!news) return res.status(404).json({});
        res.json(news);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error });
    }
});

router.post("/", (req, res) => {
    try {
        const { title, text } = req.body;

        if (!title || !text)
            return res.status(400).json({ error: "Bad Input" });

        const news = createNews({ title, text });

        res.json(news);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error });
    }
});

router.put("/:id", (req, res) => {
    try {
        const id = +req.params.id;
        const { title, text } = req.body;

        const news = updateNews(id, { text, title });
        if (!news) return res.status(404).json({});

        res.json(news);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error });
    }
});

router.delete("/:id", (req, res) => {
    try {
        const id = +req.params.id;

        const news = deleteNews(id);

        if (!news) return res.status(404).json({});
        res.json(news);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error });
    }
});

export { router };
