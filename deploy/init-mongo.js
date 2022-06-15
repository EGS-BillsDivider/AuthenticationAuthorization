db.createUser(
    {
        user: "miguel",
        pwd: "miguel",
        roles: [
            {
                role: "readWrite",
                db: "db"
            }
        ]
    }
);
db.createCollection("users");