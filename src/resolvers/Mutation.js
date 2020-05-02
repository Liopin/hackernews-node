const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { APP_SECRET, getUserId } = require('../utils')

async function signup(parent, args, context, info){
    // encrypt password 
    const hashedPassword = await bcrypt.hash(args.password, 10)
    // store user in the db
    const {password, ...user} = await context.prisma.createUser({...args,password:hashedPassword})
    // generating a JWT 
    const token = jwt.sign({userId: user.id}, APP_SECRET)

    return{
        token,
        user,
    }
}

async function login(parent, args, context, info){
    // retrieving user by email 
    const {password, ...user} = await context.prisma.user({email: args.email})

    if(!user){
        throw new Error('No such user found')
    }

    // compare provided password with the one in the db
    const valid =  await bcrypt.compare(args.password, password)
    if(!valid){
        throw new Error('Invalid password')
    }

    const token = jwt.sign({userId: user.id}, APP_SECRET)

    return{
        token,
        user,
    }
}

function post(parent, args, context, info){
    const userId = getUserId(context)
    return context.prisma.createLink({
        url: args.url,
        description: args.description,
        postedBy: { connect: {id: userId}},
    })
}

module.exports = {
    signup,
    login,
    post,
}