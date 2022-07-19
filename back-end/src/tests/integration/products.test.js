require("mocha");
const chai = require("chai");
const chaiHttp = require("chai-http");
const expect = chai.expect;

const app = require("../../api/app");

chai.use(chaiHttp);

describe("Rota de Produtos", () => {
  let administratorToken;
  let customerToken;

  it('consegue logar como adminitrador', async () => {
    const response = await chai.request(app).post("/login").send({
      email: 'adm@deliveryapp.com',
      password: '--adm2@21!!--'
    });

    administratorToken = response.body.hasToken;
  });

  it('consegue logar como customer', async () => {
    const response = await chai.request(app).post("/login").send({
      email: 'zebirita@email.com',
      password: '$#zebirita#$'
    });

    customerToken = response.body.hasToken;
  });
  
  describe('metodo "POST" em /', async () => {

    it("testa se é possivel criar um produto como administrador com sucesso", async () => {
      const response = await chai
        .request(app)
        .post("/products")
        .set("Authorization", administratorToken)
        .send({
          name: 'Tequila',
          price: 40,
          urlImage: 'baseImage.jpg'
        });
      
      expect(response).to.have.status(201);
      expect(response.body).to.have.property("id");
      expect(response.body).to.have.property("name");
      expect(response.body).to.have.property("price");
      expect(response.body).to.have.property("urlImage");
    });

    it("testa se não é possivel criar um produto como administrador com nome existente", async () => {
      const response = await chai
        .request(app)
        .post("/products")
        .set("Authorization", administratorToken)
        .send({
          name: 'Heineken 600ml',
          price: 40,
          urlImage: 'baseImage.jpg'
        });

        console.log(response.body);
      
      expect(response).to.have.status(409);
      expect(response.body.message).to.eq("Product with this name already exists");

    });

    it("testa se é possivel criar um produto como customer sem sucesso", async () => {
      const response = await chai
        .request(app)
        .post("/products")
        .set("Authorization", customerToken)
        .send({
          name: 'Tequila',
          price: 40,
          urlImage: 'baseImage.jpg'
        });
      
      expect(response).to.have.status(401);
      expect(response.body.message).to.eq("Unauthorized");
    });

    it("testa se é possivel criar um produto sem o token sem sucesso", async () => {
      const response = await chai
        .request(app)
        .post("/products")
        .set("Authorization", 'token-errado')
        .send({
          name: 'Tequila',
          price: 40,
          urlImage: 'baseImage.jpg'
        });
      
      expect(response).to.have.status(401);
      expect(response.body.message).to.eq("Unauthorized");
    });

    describe('testa validação da criação do produto como administrador', () => {
      it("testa não enviando name", async () => {
        const response = await chai
          .request(app)
          .post("/products")
          .set("Authorization", administratorToken)
          .send({
            price: 40,
            urlImage: 'baseImage.jpg'
          });
        
        expect(response).to.have.status(400);
        expect(response.body.message).to.eq('"name" is required');
      });

      it("testa não enviando price", async () => {
        const response = await chai
          .request(app)
          .post("/products")
          .set("Authorization", administratorToken)
          .send({
            name: "Tequila",
            urlImage: 'baseImage.jpg'
          });
      
        expect(response).to.have.status(400);
        expect(response.body.message).to.eq('"price" is required');
      });

      it("testa enviando price como string", async () => {
        const response = await chai
          .request(app)
          .post("/products")
          .set("Authorization", administratorToken)
          .send({
            name: "Tequila",
            price: "40,0",
            urlImage: 'baseImage.jpg'
          });
      
        expect(response).to.have.status(400);
        expect(response.body.message).to.eq('"price" must be a number');
      });

      it("testa não enviando urlImage", async () => {
        const response = await chai
        .request(app)
        .post("/products")
        .set("Authorization", administratorToken)
        .send({
          name: "Tequila",
          price: 40
        });
      
      expect(response).to.have.status(400);
      expect(response.body.message).to.eq('"urlImage" is required');
      });

    });
  });

  describe('método GET em /', () => {
    it("testa se é possivel buscar todos os produtos como customer com sucesso", async () => {
      const response = await chai
        .request(app)
        .get("/products")
        .set("Authorization", customerToken);
      
        expect(response).to.have.status(200);
        expect(response.body).to.be.an("array");

        response.body.forEach((product) => {
          expect(product).to.have.property("id");
          expect(product).to.have.property("name");
          expect(product).to.have.property("price");
          expect(product).to.have.property("urlImage");
        })
    });
  });

  describe('método GET em /:id', () => {
    it("testa se é possivel buscar um produto como customer com sucesso", async () => {
      const response = await chai
        .request(app)
        .get("/products/1")
        .set("Authorization", customerToken);
      
        expect(response).to.have.status(200);
        expect(response.body).to.have.property("id");
        expect(response.body).to.have.property("name");
        expect(response.body).to.have.property("price");
        expect(response.body).to.have.property("urlImage");
    });
  });

  describe('método PUT em /:id', () => {
    it("testa se é possivel atualizar um produto como administrator com sucesso", async () => {
      const response = await chai
        .request(app)
        .put("/products/1")
        .set("Authorization", administratorToken)
        .send({
          name: "Tequila",
          price: 40,
          urlImage: "baseImage.jpg"
        });
      
        expect(response).to.have.status(200);
        expect(response.body).to.have.property("id");
        expect(response.body).to.have.property("name");
        expect(response.body).to.have.property("price");
        expect(response.body).to.have.property("urlImage");
    });

    it("testa se é possivel atualizar um produto como customer sem sucesso", async () => {
      const response = await chai
        .request(app)
        .put("/products/1")
        .set("Authorization", customerToken)
        .send({
          name: "Tequila",
          price: 40,
          urlImage: "baseImage.jpg"
        });
      
        expect(response).to.have.status(401);
        expect(response.body.message).to.eq("Unauthorized");
    });

    describe('testa validação da atualização do produto como administrador', () => {
      it("testa não enviando name", async () => {
        const response = await chai
          .request(app)
          .put("/products/1")
          .set("Authorization", administratorToken)
          .send({
            price: 40,
            urlImage: 'baseImage.jpg'
          });
        
        expect(response).to.have.status(400);
        expect(response.body.message).to.eq('"name" is required');
      });

      it("testa não enviando price", async () => {
        const response = await chai
          .request(app)
          .put("/products/1")
          .set("Authorization", administratorToken)
          .send({
            name: "Tequila",
            urlImage: 'baseImage.jpg'
          });
      
        expect(response).to.have.status(400);
        expect(response.body.message).to.eq('"price" is required');
      });

      it("testa enviando price como string", async () => {
        const response = await chai
          .request(app)
          .put("/products/1")
          .set("Authorization", administratorToken)
          .send({
            name: "Tequila",
            price: "40,0",
            urlImage: 'baseImage.jpg'
          });
      
        expect(response).to.have.status(400);
        expect(response.body.message).to.eq('"price" must be a number');
      });

      it("testa não enviando urlImage", async () => {
        const response = await chai
        .request(app)
        .put("/products/1")
        .set("Authorization", administratorToken)
        .send({
          name: "Tequila",
          price: 40
        });
      
      expect(response).to.have.status(400);
      expect(response.body.message).to.eq('"urlImage" is required');
      });

      it("testa enviando um id não existente", async () => {
        const response = await chai
        .request(app)
        .put("/products/100")
        .set("Authorization", administratorToken)
        .send({
          name: "Tequila",
          price: 40,
          urlImage: "baseImage.jpg"
        });
      
      expect(response).to.have.status(404);
      expect(response.body.message).to.eq('Not Found');
      });
    });
  });

  describe('método DELETE em /:id', () => {
    it("testa se não é possivel deletar um produto como customer", async () => {
      const response = await chai
        .request(app)
        .delete("/products/1")
        .set("Authorization", customerToken);
      
        expect(response).to.have.status(401);
        expect(response.body.message).to.eq("Unauthorized");
    });

    it("testa se é possivel deletar um produto como administrator", async () => {
      const response = await chai
        .request(app)
        .delete("/products/1")
        .set("Authorization", administratorToken);
      
        expect(response).to.have.status(200);
        expect(response.body.message).to.eq("Deleted");
    });

    it("testa se não é possivel deletar um produto como administrator que não existe", async () => {
      const response = await chai
        .request(app)
        .delete("/products/100")
        .set("Authorization", administratorToken);
      
        expect(response).to.have.status(404);
        expect(response.body.message).to.eq("Not Found");
    });
  });
});


