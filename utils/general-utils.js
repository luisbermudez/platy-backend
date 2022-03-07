const jwt = require('jsonwebtoken');

exports.createJWT = (user) => {
    return jwt.sign(
        {
            userId: user._id,
            name: user.name,
            email: user.email
        },
        process.env.SECRET,
        { algorithm: "HS256", expiresIn: "6h" }
    ).split('.');
};

exports.clearRes = (data) => {
    const {passwordHash, __v, updatedAt, isActive, createdAt, ...cleared} = data;
    return cleared;
}