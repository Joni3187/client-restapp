module.exports = {

    images:{
        domains: ["res.cloudinary.com"],
    },
    env: {
        "BASE_URL": process.env.BASE_URL,
        "DATABASE_URI": "mongodb+srv://Admin:ipartS187%40%21@cluster0.8yr08.mongodb.net/restapp-final?retryWrites=true&w=majority",
        "MONGODB_URL": "mongodb+srv://Admin:ipartS187%40%21@cluster0.8yr08.mongodb.net/restapp-final?retryWrites=true&w=majority",
        "NEXT_PUBLIC_API_URL": process.env.NEXT_PUBLIC_API_URL,
        "NEXT_PUBLIC_DATABASE_URL": "postgres://strapi:strapi@localhost:5432/strapi?synchroniz:rue"
    }
}