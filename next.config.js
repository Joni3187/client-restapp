module.exports = {

    images:{
        domains: ["res.cloudinary.com"],
    },
    env: {
        "NEXT_PUBLIC_API_URL": process.env.NEXT_PUBLIC_API_URL,
        "NEXT_PUBLIC_DATABASE_URL": process.env.NEXT_PUBLIC_DATABASE_URL
    }
}