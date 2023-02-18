import bcrypt from 'bcryptjs'

const users = [
    {
        name: 'John Doe',
        email: 'john@example.com',
        mobileNo: '+91852154697',
        password: bcrypt.hashSync('123456', 10),
    },
    {
        name: 'Jane Doe',
        email: 'jane@example.com',
        mobileNo: '+917584698741',
        password: bcrypt.hashSync('123456', 10),
    },
]

export default users
