import { pool } from "../../db.ts";
import { BookStatus } from "../../library/models/library.models.ts";


// TODO: optimize into a single query
export const getRecommendationsForUser = async ({ owner, limit }: { owner: string, limit: number }) => {
    const categoriesScores: Record<string, number> = {}
    let result = []
    try {
        // fetch all categories from user's read books, order by date read
        const categoriesResult = await pool.query(`
            SELECT b.categories, ub.user_rating 
            FROM book b 
            JOIN user_book ub ON b.id = ub.book_id
            WHERE ub.user_id = $1 AND status = $2
            ORDER BY read_at
        `, [owner, BookStatus.READ]);

        if (categoriesResult.rows.length !== 0) {
            // create score for categories
            categoriesResult.rows.map((row) => {
                row.categories.length !== 0 && row.categories.map((category: string) => {
                    const categoryScore = categoriesScores[category]
                    if (categoryScore && row.user_rating !== undefined) {
                        categoriesScores[category] = categoryScore + parseInt(row.user_rating)
                    } else {
                        categoriesScores[category] = parseInt(row.user_rating)
                    }
                })
            })
        }
    } catch (err) {
        console.error(err);
        throw err;
    }

    try {
        // find similar books from scores
        const booksResult = await pool.query(`
            WITH categories_scores AS (
                SELECT key AS category, value::int AS score
                FROM jsonb_each_text($1::jsonb)
            )

            SELECT b.id, b.title, b.authors, b.thumbnail, SUM(cs.score) AS total_score
            FROM book b
            CROSS JOIN UNNEST(b.categories) AS unnest_categories
            JOIN categories_scores cs
            ON unnest_categories = cs.category
            WHERE b.id NOT IN (
                SELECT book_id FROM user_book WHERE user_id = $2
            )
            GROUP BY b.id
            ORDER BY total_score DESC
            LIMIT $3;
        `, [categoriesScores, owner, limit])
        result = booksResult.rows
    } catch (err) {
        console.error(err);
        throw err;
    }
    return result
};

export const getRecommendationsForBook = async ({ bookId, limit }: { bookId: string, limit: number }) => {
    const categoriesScores: Record<string, number> = {}
    let result = []
    try {
        // fetch categories for book
        const categoriesResult = await pool.query(`
            SELECT categories
            FROM book 
            WHERE id = $1
        `, [bookId]);

        // Give each category the same score
        if (categoriesResult.rows.length !== 0) {
            const row = categoriesResult.rows[0]
            row.categories.length !== 0 && row.categories.map((category: string) => {
                const categoryScore = categoriesScores[category]
                if (categoryScore && row.user_rating !== undefined) {
                    categoriesScores[category] = categoryScore + 1
                } else {
                    categoriesScores[category] = 1
                }
            })
        }
    } catch (err) {
        console.error(err);
        throw err;
    }

    try {
        // find similar books from categories
        const booksResult = await pool.query(`
            WITH categories_scores AS (
                SELECT key AS category, value::int AS score
                FROM jsonb_each_text($1::jsonb)
            )

            SELECT b.id, b.title, b.authors, b.thumbnail, SUM(cs.score) AS total_score
            FROM book b
            CROSS JOIN UNNEST(b.categories) AS unnest_categories
            JOIN categories_scores cs
            ON unnest_categories = cs.category
            WHERE b.id != $2
            GROUP BY b.id
            ORDER BY total_score DESC
            LIMIT $3;
        `, [categoriesScores, bookId, limit])
        result = booksResult.rows
    } catch (err) {
        console.error(err);
        throw err;
    }
    return result
};

export const getRecommendationsForShelf = async ({ owner, shelfId, limit }: { owner: string, shelfId: string, limit: number }) => {
    const categoriesScores: Record<string, number> = {}
    let result = []
    try {
        // fetch all categories of books in shelf that have been read, order by date read
        const categoriesResult = await pool.query(`
            SELECT b.categories, ub.user_rating 
            FROM user_book ub
            JOIN shelf_book sb ON sb.user_book_id = ub.id
            JOIN book b ON b.id = ub.book_id
            WHERE ub.user_id = $1 AND status = $2 AND sb.shelf_id = $3
            ORDER BY read_at
        `, [owner, BookStatus.READ, shelfId]);

        if (categoriesResult.rows.length !== 0) {
            // create score for categories
            categoriesResult.rows.map((row) => {
                row.categories.length !== 0 && row.categories.map((category: string) => {
                    const categoryScore = categoriesScores[category]
                    if (categoryScore && row.user_rating !== undefined) {
                        categoriesScores[category] = categoryScore + parseInt(row.user_rating)
                    } else {
                        categoriesScores[category] = parseInt(row.user_rating)
                    }
                })
            })
        }
    } catch (err) {
        console.error(err);
        throw err;
    }

    try {
        // find similar books from scores
        const booksResult = await pool.query(`
            WITH categories_scores AS (
                SELECT key AS category, value::int AS score
                FROM jsonb_each_text($1::jsonb)
            )

            SELECT b.id, b.title, b.authors, b.thumbnail, SUM(cs.score) AS total_score
            FROM book b
            CROSS JOIN UNNEST(b.categories) AS unnest_categories
            JOIN categories_scores cs
            ON unnest_categories = cs.category
            WHERE b.id NOT IN (
                SELECT ub.book_id FROM user_book ub 
                JOIN shelf_book sb ON sb.user_book_id = ub.id 
                WHERE user_id = $2 AND sb.shelf_id = $3
            )
            GROUP BY b.id
            ORDER BY total_score DESC
            LIMIT $4;
        `, [categoriesScores, owner, shelfId, limit])
        result = booksResult.rows
    } catch (err) {
        console.error(err);
        throw err;
    }
    return result
};
