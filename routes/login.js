import { jwtSchema } from "../schemas/post.js";

export default async (app, _, done) => {
  app.post("/login", { schema: jwtSchema }, async (req, reply) => {
    const { username, password } = req.body;
    
    if (username !== "admin" && password !== "admin") {
      return reply.status(401).send("Incorrect login or password!");  
    }  

    const token = await app.jwt.sign({username});
    reply.send(token); //only for tests

    //only for production:
    // reply
    // .setCookie('token', token, {
    //   domain: 'localhost',
    //   path: '/',
    //   secure: true, 
    //   httpOnly: true,
    //   sameSite: true
    // }
    // )
    // .redirect('/admin');

  });
  done();
};
