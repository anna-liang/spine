import { pool } from "../../db.ts";
import { BookStatus } from "../../library/models/library.models.ts";


// TODO: optimize into a single query
export const getRecommendationsForUser = async ({ owner, limit }: { owner: string, limit: number }) => {
    const categoriesScores: Record<string, number> = {}
    let result = []
    try {
        // fetch all user's read books, order by date read
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
            GROUP BY b.id
            ORDER BY total_score DESC
            LIMIT $2;
        `, [categoriesScores, limit])
        result = booksResult.rows
    } catch (err) {
        console.error(err);
        throw err;
    }
    return result
};

export const getRecommendationsForBook = async ({ bookId }: { bookId: string }) => {
    try {
        return []
    } catch (err) {
        console.error(err);
        throw err;
    }
};

export const getRecommendationsForShelf = async ({ shelfId }: { shelfId: string }) => {
    try {
        return []
    } catch (err) {
        console.error(err);
        throw err;
    }
};
