import { Response, Request } from 'express';
import { db } from '../database/database';

export const getAllBooks = (req: Request, res: Response) => {
    const query = `SELECT * FROM books;`;
    db.query(query, (err, data) => {
        if (err) {
            return res.status(404).json({
                success: false,
                message: "Cannot connect to batabase"
            });
        };
        return res.status(200).json(data);
    });
};

export const getBookByTitle = (colName: string, req: Request, res: Response) => {
    const title = req.params.btitle;
    const query = `SELECT * FROM books WHERE ${db.escapeId(colName)} LIKE ${db.escape(`%${title}%`)}`;
    db.query(query, (err, data) => {
        if (err) {
            return res.status(404).send("No book found");
        }
        return res.status(200).json(data);
    });
};

export const addNewBook = (req: Request, res: Response) => {
    const query = 'INSERT INTO books(`title`,`desc`,`cover`,`price`) VALUES (?)';
    const values = [
        req.body.title,
        req.body.desc,
        req.body.cover,
        req.body.price,
    ];
    db.query(query, [values], (err, data) => {
        if (err) {
            return res.status(404).json({
                success: false,
                message: "Cannot connect to batabase"
            });
        }
        return res.status(200).json(data);
    });
};

export const updateBook = (req: Request, res: Response) => {
    const bookId = req.params.id;
    const {
        title, desc, cover, price
    } = req.body;
    const query = `UPDATE books SET title = ${db.escape(`${title}`)}, books.desc = ${db.escape(`${desc}`)}, cover = ${db.escape(`${cover}`)}, price = ${db.escape(price)} WHERE id = ${bookId}`;
    db.query(query, (err, data) => {
        if (err) {
            return res.status(404).json({
                success: false,
                message: err
            });
        }
        return res.status(200).json(data);
    });
};

export const deleteBook = (req: Request, res: Response) => {
    const bookId = req.params.id;
    const query = `DELETE from books WHERE id = ${bookId}`;
    db.query(query, (err, data) => {
        if (err) {
            return res.status(404).json({
                success: false,
                message: err
            });
        }
        return res.status(200).json(data);
    });
};
