require("mocha");
const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../../api/app");
const expect = chai.expect;

chai.use(chaiHttp);

describe("Rota de Login", () => {
  describe('metodo "POST"', () => {
    it("testa se é possivel realizar login com sucesso", async () => {
      const response = await chai.request(app).post("/login").send({
        email: "johndoe@test.com",
        password:
          "$2a$10$jAgEfROGhBUfFoyZ3zJFW.LREbApvhvxX9Ze61M8VUek/ouG5CDI6",
      });

      expect(response.status).to.be.equal(200);
      expect(response.body).to.be.a("object");
      expect(res.body).to.have.property("name");
      expect(res.body).to.have.property("email");
      expect(res.body).to.have.property("role");
      expect(res.body).to.have.property("token");
      expect(res.body).to.not.have.property("password");
    });

    it("Testa erro da requisição com usuário e senha inválidos", async () => {
      const response = await chai.request(app).post("/login").send({
        email: "teste@teste.com",
        password: "teste",
      });

      expect(response.status).to.be.equal(409);
      expect(response).to.throw();
    });

    it("Testa erro da requisição sem a propriedade email", async () => {
      const response = await chai.request(app).post("/login").send({
        password: "teste",
      });

      expect(response.status).to.be.equal(400);
      expect(response).to.throw();
    });

    it("Testa erro da requisição sem a propriedade password", async () => {
      const response = await chai.request(app).post("/login").send({
        email: "teste@teste.com",
      });

      expect(response.status).to.be.equal(400);
      expect(response).to.throw();
    });
  });
});
