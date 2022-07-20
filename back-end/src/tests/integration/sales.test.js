require("mocha");
const chai = require("chai");
const chaiHttp = require("chai-http");
const expect = chai.expect;

const app = require("../../api/app");

chai.use(chaiHttp);

describe("Rota de Vendas", () => {
  let sellerToken;
  let customerToken;

  it('consegue logar como vendedor', async () => {
    const response = await chai.request(app).post("/login").send({
      email: 'fulana@deliveryapp.com',
      password: 'fulana@123'
    });

    sellerToken = response.body.hasToken;
  });

  it('consegue logar como customer', async () => {
    const response = await chai.request(app).post("/login").send({
      email: 'zebirita@email.com',
      password: '$#zebirita#$'
    });

    customerToken = response.body.hasToken;
  });

  describe('método POST em /', async () => {
    it('testa se é possível criar uma venda como cliente com sucesso', async () => {
      const response = await chai
      .request(app)
      .post("/sales")
      .set("Authorization", customerToken)
      .send({
        products: [
          { id: 3, quantity: 20 },
          { id: 2, quantity: 2 },
        ],
        sellerId: 2,
        deliveryAddress: 'Rua sem saída',
        deliveryNumber: 0,
        totalPrice: 48,
      });

      expect(response.status).to.eq(201);
      expect(response.body).to.have.property('id');
      expect(response.body).to.have.property('saleDate');
      expect(response.body).to.have.property('userId');
      expect(response.body).to.have.property('sellerId');
      expect(response.body).to.have.property('deliveryAddress');
      expect(response.body).to.have.property('deliveryNumber');
      expect(response.body).to.have.property('status');
    });

    it('testa se não é possível criar uma venda sem o token', async () => {
      const response = await chai
      .request(app)
      .post("/sales")
      .send({
        products: [
          { id: 1, quantity: 20 },
          { id: 2, quantity: 2 },
        ],
        sellerId: 2,
        deliveryAddress: 'Rua sem saída',
        deliveryNumber: 0,
        totalPrice: 48,
      });
  
      expect(response.status).to.eq(401);
      expect(response.body.message).to.eq('Unauthorized');
    });
  
    describe('validação de body', async () => {
      it('testa se não é possível criar uma venda sem products', async () => {
        const response = await chai
        .request(app)
        .post("/sales")
        .set("Authorization", customerToken)
        .send({
          sellerId: 2,
          deliveryAddress: 'Rua sem saída',
          deliveryNumber: 0,
          totalPrice: 48,
        });
  
        expect(response.status).to.eq(400);
        expect(response.body.message).to.eq('"products" is required');
      });
  
      it('testa se não é possível criar uma venda com um objeto diferente em products', async () => {
        const response = await chai
        .request(app)
        .post("/sales")
        .set("Authorization", customerToken)
        .send({
          products: [
            { bottle: 1, drinks: 20 },
            { bottle: 2, drinks: 2 },
          ],
          sellerId: 2,
          deliveryAddress: 'Rua sem saída',
          deliveryNumber: 0,
          totalPrice: 48,
        });
  
        expect(response.status).to.eq(400);
        expect(response.body.message).to.eq('"products[0].id" is required');
      });
  
      it('testa se não é possível criar uma venda com o id de products em string', async () => {
        const response = await chai
        .request(app)
        .post("/sales")
        .set("Authorization", customerToken)
        .send({
          products: [
            { id: 'número', quantity: 20 },
            { id: 1, quantity: 2 },
          ],
          sellerId: 2,
          deliveryAddress: 'Rua sem saída',
          deliveryNumber: 0,
          totalPrice: 48,
        });
        
        expect(response.status).to.eq(400);
        expect(response.body.message).to.eq('"products[0].id" must be a number');
      });
  
      it('testa se não é possível criar uma venda com o quantity de products em string', async () => {
        const response = await chai
        .request(app)
        .post("/sales")
        .set("Authorization", customerToken)
        .send({
          products: [
            { id: 1, quantity: 'muitos' },
            { id: 1, quantity: 2 },
          ],
          sellerId: 2,
          deliveryAddress: 'Rua sem saída',
          deliveryNumber: 0,
          totalPrice: 48,
        });
        
        expect(response.status).to.eq(400);
        expect(response.body.message).to.eq('"products[0].quantity" must be a number');
      });
  
      it('testa se não é possível criar uma venda com o id de products inválido', async () => {
        const response = await chai
        .request(app)
        .post("/sales")
        .set("Authorization", customerToken)
        .send({
          products: [
            { id: 1, quantity: 15 },
            { id: 20, quantity: 2 },
          ],
          sellerId: 2,
          deliveryAddress: 'Rua sem saída',
          deliveryNumber: 0,
          totalPrice: 48,
        });
        
        expect(response.status).to.eq(404);
        expect(response.body.message).to.eq('Not Found');
      });
  
      it('testa se não é possível criar uma venda sem o sellerId', async () => {
        const response = await chai
        .request(app)
        .post("/sales")
        .set("Authorization", customerToken)
        .send({
          products: [
            { id: 1, quantity: 15 },
            { id: 4, quantity: 2 },
          ],
          deliveryAddress: 'Rua sem saída',
          deliveryNumber: 0,
          totalPrice: 48,
        });
        
        expect(response.status).to.eq(400);
        expect(response.body.message).to.eq('"sellerId" is required');
      });
  
      it('testa se não é possível criar uma venda sem o sellerId', async () => {
        const response = await chai
        .request(app)
        .post("/sales")
        .set("Authorization", customerToken)
        .send({
          products: [
            { id: 1, quantity: 15 },
            { id: 4, quantity: 2 },
          ],
          sellerId: 'vendedor',
          deliveryAddress: 'Rua sem saída',
          deliveryNumber: 0,
          totalPrice: 48,
        });
        
        expect(response.status).to.eq(400);
        expect(response.body.message).to.eq('"sellerId" must be a number');
      });
  
      it('testa se não é possível criar uma venda com o sellerId inválido', async () => {
        const response = await chai
        .request(app)
        .post("/sales")
        .set("Authorization", customerToken)
        .send({
          products: [
            { id: 1, quantity: 15 },
            { id: 4, quantity: 2 },
          ],
          sellerId: 10,
          deliveryAddress: 'Rua sem saída',
          deliveryNumber: 0,
          totalPrice: 48,
        });
        
        expect(response.status).to.eq(404);
        expect(response.body.message).to.eq('Not Found');
      });
  
      it('testa se não é possível criar uma venda sem o deliveryAddress', async () => {
        const response = await chai
        .request(app)
        .post("/sales")
        .set("Authorization", customerToken)
        .send({
          products: [
            { id: 1, quantity: 15 },
            { id: 4, quantity: 2 },
          ],
          sellerId: 2,
          deliveryNumber: 0,
          totalPrice: 48,
        });
        
        expect(response.status).to.eq(400);
        expect(response.body.message).to.eq('"deliveryAddress" is required');
      });
  
      it('testa se não é possível criar uma venda com o deliveryAddress em number', async () => {
        const response = await chai
        .request(app)
        .post("/sales")
        .set("Authorization", customerToken)
        .send({
          products: [
            { id: 1, quantity: 15 },
            { id: 4, quantity: 2 },
          ],
          sellerId: 2,
          deliveryAddress: 10,
          deliveryNumber: 0,
          totalPrice: 48,
        });
        
        expect(response.status).to.eq(400);
        expect(response.body.message).to.eq('"deliveryAddress" must be a string');
      });
  
      it('testa se não é possível criar uma venda sem o deliveryNumber', async () => {
        const response = await chai
        .request(app)
        .post("/sales")
        .set("Authorization", customerToken)
        .send({
          products: [
            { id: 1, quantity: 15 },
            { id: 4, quantity: 2 },
          ],
          sellerId: 2,
          deliveryAddress: 'Rua sem saída',
          totalPrice: 48,
        });
        
        expect(response.status).to.eq(400);
        expect(response.body.message).to.eq('"deliveryNumber" is required');
      });
  
      it('testa se não é possível criar uma venda com o deliveryNumber em string', async () => {
        const response = await chai
        .request(app)
        .post("/sales")
        .set("Authorization", customerToken)
        .send({
          products: [
            { id: 1, quantity: 15 },
            { id: 4, quantity: 2 },
          ],
          sellerId: 2,
          deliveryAddress: 'Rua sem saída',
          deliveryNumber: 'lá em cima',
          totalPrice: 48,
        });
        
        expect(response.status).to.eq(400);
        expect(response.body.message).to.eq('"deliveryNumber" must be a number');
      });
  
      it('testa se não é possível criar uma venda sem o totalPrice', async () => {
        const response = await chai
        .request(app)
        .post("/sales")
        .set("Authorization", customerToken)
        .send({
          products: [
            { id: 1, quantity: 15 },
            { id: 4, quantity: 2 },
          ],
          sellerId: 2,
          deliveryAddress: 'Rua sem saída',
          deliveryNumber: 328,
        });
        
        expect(response.status).to.eq(400);
        expect(response.body.message).to.eq('"totalPrice" is required');
      });
  
      it('testa se não é possível criar uma venda com o totalPrice em string', async () => {
        const response = await chai
        .request(app)
        .post("/sales")
        .set("Authorization", customerToken)
        .send({
          products: [
            { id: 1, quantity: 15 },
            { id: 4, quantity: 2 },
          ],
          sellerId: 2,
          deliveryAddress: 'Rua sem saída',
          deliveryNumber: 328,
          totalPrice: 'muito dinheiro'
        });
        
        expect(response.status).to.eq(400);
        expect(response.body.message).to.eq('"totalPrice" must be a number');
      });
  
    })
  });

  describe('método GET em /', async () => {
    it('testa se é possível buscar todas as vendas como vendedor', async () => {
      const response = await chai
      .request(app)
      .get("/sales")
      .set("Authorization", sellerToken);

      expect(response.status).to.eq(200);
      response.body.forEach((sale) => {
        expect(sale).to.have.property('id');
        expect(sale).to.have.property('saleDate');
        expect(sale).to.have.property('userId');
        expect(sale).to.have.property('sellerId');
        expect(sale).to.have.property('deliveryAddress');
        expect(sale).to.have.property('deliveryNumber');
        expect(sale).to.have.property('status');
      });
    });

    it('testa se não é possível buscar todas as vendas como cliente', async () => {
      const response = await chai
      .request(app)
      .get("/sales")
      .set("Authorization", customerToken);

      expect(response.status).to.eq(401);
      expect(response.body.message).to.eq('Unauthorized');
    });
  });

  describe('método GET em /user', async () => {
    it('testa se é possível buscar todas as vendas de um usuário', async () => {
      const response = await chai
      .request(app)
      .get("/sales/user")
      .set("Authorization", customerToken);

      expect(response.status).to.eq(200);
      response.body.forEach((sale) => {
        expect(sale).to.have.property('id');
        expect(sale).to.have.property('saleDate');
        expect(sale).to.have.property('userId');
        expect(sale).to.have.property('sellerId');
        expect(sale).to.have.property('deliveryAddress');
        expect(sale).to.have.property('deliveryNumber');
        expect(sale).to.have.property('status');
      });
    });
  });

  describe('método GET em /:id', async () => {
    it('testa se é possível buscar venda por id', async () => {
      const response = await chai
      .request(app)
      .get("/sales/1")
      .set("Authorization", customerToken);

      expect(response.status).to.eq(200);

      expect(response.body).to.have.property('id');
      expect(response.body).to.have.property('saleDate');
      expect(response.body).to.have.property('userId');
      expect(response.body).to.have.property('sellerId');
      expect(response.body).to.have.property('deliveryAddress');
      expect(response.body).to.have.property('deliveryNumber');
      expect(response.body).to.have.property('status');
    });
  });

  describe('método PATCH em /:id', async () => {
    it('testa se é possível atualizar status da venda', async () => {
      const response = await chai
      .request(app)
      .patch("/sales/1")
      .set("Authorization", sellerToken)
      .send({
        status: 'Entregue'
      });

      expect(response.status).to.eq(200);
    });

    it('testa se não é possível atualizar status da venda como customer', async () => {
      const response = await chai
      .request(app)
      .patch("/sales/1")
      .set("Authorization", customerToken)
      .send({
        status: 'Entregue'
      });

      expect(response.status).to.eq(401);
      expect(response.body.message).to.eq('Unauthorized');
    });
  });

});


