require("mocha");
const chai = require("chai");
const chaiHttp = require("chai-http");
const expect = chai.expect;
const sinon = require("sinon");

const { User } = require("../../database/models");

const app = require("../../api/app");

chai.use(chaiHttp);

describe("Rota de Login", () => {
  
  describe('metodo "POST"', () => {
    it("testa se é possivel realizar login com sucesso", async () => {
      sinon.stub(User, "findOne").resolves({
        "name": "john doe tester",
        "email": "johndoe@test.com",
        "role": "customer",
        "password": "e10adc3949ba59abbe56e057f20f883e"
      });

      const response = await chai.request(app).post("/login").send({
        email: 'johndoe@test.com',
        password: '123456'
      });

      expect(response).to.have.status(200);
      expect(response.body).to.have.property("user");
      expect(response.body.user).to.be.deep.eq({
        "name": "john doe tester",
        "email": "johndoe@test.com",
        "role": "customer"
      });
      expect(response.body).to.have.property("hasToken");

      expect(response.body.user).to.not.have.property("password");

      User.findOne.restore();
    });

    it("Testa erro da requisição com email incorreto", async () => {
      sinon.stub(User, "findOne").resolves(null);

      const response = await chai.request(app).post("/login").send({
        email: "teste@teste.com",
        password: "123456",
      });
      
      expect(response.statusCode).to.be.equal(404);
      expect(response.body).to.have.property('message');
      expect(response.body.message).to.equal('E-mail or password incorrect');

      User.findOne.restore();
    });

    it("Testa erro da requisição com senha inválidos", async () => {
      sinon.stub(User, "findOne").resolves({
        "name": "john doe tester",
        "email": "johndoe@test.com",
        "role": "customer",
        "password": "e10adc3949ba59abbe56e057f20f883e"
      });

      const response = await chai.request(app).post("/login").send({
        email: "johndoe@test.com",
        password: "teste22",
      });

      expect(response.statusCode).to.be.equal(409);
      expect(response.body).to.have.property('message');
      expect(response.body.message).to.equal('E-mail or password incorrect');

      User.findOne.restore();
    });
    
    it("Testa erro da requisição sem a propriedade email", async () => {
      const response = await chai.request(app).post("/login").send({
        password: "teste",
      });      
      
      expect(response.status).to.be.equal(400);
      expect(response.body).to.have.property('message');
      expect(response.body.message).to.equal('\"email\" is required');
    });

    it("Testa erro da requisição com propriedade email sendo um número", async () => {
      const response = await chai.request(app).post("/login").send({
        email: 1000,
        password: 'alllll@jjjjjj.com'
      });

      expect(response.statusCode).to.be.equal(400);
      expect(response.body).to.have.property('message');
      expect(response.body.message).to.equal("\"email\" must be a string");
    });
    
    it("Testa erro da requisição com email no padrão inválido", async () => {
      const response = await chai.request(app).post("/login").send({
        email: "johndotest.com",
        password: '123456'
      });
      expect(response.statusCode).to.be.equal(400);
      expect(response.body).to.have.property('message');
      expect(response.body.message).to.equal("\"email\" must be a valid email");
    });

    it("Testa erro da requisição sem a propriedade password", async () => {
      const response = await chai.request(app).post("/login").send({
        email: "teste@teste.com",
      });
      expect(response.statusCode).to.be.equal(400);
      expect(response.body).to.have.property('message');
      expect(response.body.message).to.equal('\"password\" is required');
    });
  });
});
