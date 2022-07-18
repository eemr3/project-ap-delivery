require("mocha");
const chai = require("chai");
const chaiHttp = require("chai-http");
const expect = chai.expect;

const app = require("../../api/app");

chai.use(chaiHttp);

describe("Rota de Registro", () => {
  
  describe('metodo "POST"', () => {
    
    it("testa se é possivel registrar um usuário novo com sucesso", async () => {
      const response = await chai.request(app).post("/register").send({
        name: 'john doe tester',
        email: 'johndoe@test.com',
        password: '123456'
      });
      
      expect(response).to.have.status(201);
      expect(response.body.user).to.have.property("id");
      expect(response.body.user).to.have.property("name");
      expect(response.body.user).to.have.property("email");
      expect(response.body.user).to.have.property("role");
      expect(response.body).to.have.property("hasToken");
    });

    it("testa se é possivel registrar um usuário novo sem sucesso", async () => {
      const response = await chai.request(app).post("/register").send({
        name: 'john doe tester',
        email: 'johndoe@test.com',
        password: '123456'
      });

      expect(response).to.have.status(409);
      expect(response.body.message).to.equal("User already exists");
    });

    it("Testa erro da requisição com email inválido", async () => {
      const response = await chai.request(app).post("/register").send({
        name: 'john doe tester',
        email: 'johndoe.com',
        password: '123456'
      });
      
      expect(response.statusCode).to.be.equal(400);
      expect(response.body).to.have.property('message');
      expect(response.body.message).to.equal("\"email\" must be a valid email");
    });

    it("Testa erro da requisição com senha inválida", async () => {
      const response = await chai.request(app).post("/register").send({
        name: 'john doe tester',
        email: 'johndoe@gmail.com',
        password: '12345'
      });

      expect(response.statusCode).to.be.equal(400);
      expect(response.body).to.have.property('message');
      expect(response.body.message).to.equal("\"password\" length must be at least 6 characters long");
    });

    it("Testa erro da requisição com nome inválido", async () => {
      const response = await chai.request(app).post("/register").send({
        name: 'john doe',
        email: 'johndoe@gmail.com',
        password: '12345'
      });

      expect(response.statusCode).to.be.equal(400);
      expect(response.body).to.have.property('message');
      expect(response.body.message).to.equal("\"name\" length must be at least 12 characters long");
    });
    
    it("Testa erro da requisição sem a propriedade name", async () => {
      const response = await chai.request(app).post("/register").send({
        email: 'johndoe@gmail.com',
        password: '123456'
      });      
      
      expect(response.status).to.be.equal(400);
      expect(response.body).to.have.property('message');
      expect(response.body.message).to.equal('\"name\" is required');
    });

    it("Testa erro da requisição sem a propriedade email", async () => {
      const response = await chai.request(app).post("/register").send({
        name: 'john doe tester',
        password: '123456'
      });      
      
      expect(response.status).to.be.equal(400);
      expect(response.body).to.have.property('message');
      expect(response.body.message).to.equal('\"email\" is required');
    });

    it("Testa erro da requisição sem a propriedade password", async () => {
      const response = await chai.request(app).post("/register").send({
        name: 'john doe tester',
        email: 'johndoe@gmail.com'
      });      
      
      expect(response.status).to.be.equal(400);
      expect(response.body).to.have.property('message');
      expect(response.body.message).to.equal('\"password\" is required');
    });
  });
});
