import { Request, Response, Router } from "express";
import {
    addNewBook,
    deleteBook,
    getAllBooks,
    getBookByTitle,
    updateBook
} from "../controllers/helper";

const router = Router();

router.get('/books', async (req: Request, res: Response) => {
    try {
        await getAllBooks(req, res);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.get('/getbook/:btitle', async (req: Request, res: Response) => {
    try {
        await getBookByTitle('title', req, res);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.post('/addbook', async (req: Request, res: Response) => {
    try {
        await addNewBook(req, res);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.put('/book/:id', async (req: Request, res: Response) => {
    try {
        await updateBook(req, res);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.delete('/book/:id', async (req: Request, res: Response) => {
    try {
        await deleteBook(req, res);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

export default router;