const db = require('./client')
const bcrypt = require('bcrypt');
const SALT_COUNT = 10;

const createUser = async({ name, email, password }) => {
    const hashedPassword = await bcrypt.hash(password, SALT_COUNT);
    try {
        const { rows: [user ] } = await db.query(`
        INSERT INTO users(name, email, password)
        VALUES($1, $2, $3)
        ON CONFLICT (email) DO NOTHING
        RETURNING *`, [name, email, hashedPassword]);

        return user;
    } catch (err) {
        throw err;
    }
}

const getUser = async({email, password}) => {
    if(!email || !password) {
        return;
    }
    try {
        const user = await getUserByEmail(email);
        if(!user) return;
        const hashedPassword = user.password;
        const passwordsMatch = await bcrypt.compare(password, hashedPassword);
        if(!passwordsMatch) return;
        delete user.password;
        return user;
    } catch (err) {
        throw err;
    }
}

const getUserById = async(id) => {
    try {
        const { rows: [ user ] } = await db.query(`
        SELECT * FROM users WHERE id=${id};`);

        if (!user) {
            throw {
                name: "UserNotFoundError",
                message: "A user with that id does not exist"
            }
        }

        return user;
    } catch (err) {
        throw err
    }
}

const getAllUsers = async () => {
    try {
        const { rows } = await db.query(`
        SELECT *
        FROM users`);
        
        return rows;
    } catch (err) {
        throw err
    }
}

const getUserByEmail = async(email) => {
    try {
        const { rows: [ user ] } = await db.query(`
        SELECT * 
        FROM users
        WHERE email=$1;`, [ email ]);

        if(!user) {
            return;
        }
        return user;
    } catch (err) {
        throw err;
    }
}

const getAllCommentsByUser = async(id) => {
    try {
        const { rows: [userComments] } = await client.query(`
        SELECT * FROM comments
        WHERE user_id=$1
        `,[id])

        return userComments
    } catch(err) {
        throw err
    }
}

const getAllReviewsByUser = async(id) => {
    try {
        const { rows: [userReviews] } = await client.query(`
        SELECT * FROM reviews
        WHERE user_id=$1
        `, [id])

        return userReviews
    } catch(err) {
        throw err
    }
}
  

module.exports = {
    createUser,
    getUser,
    getUserById,
    getUserByEmail,
    getAllUsers,
    getAllCommentsByUser,
    getAllReviewsByUser
};