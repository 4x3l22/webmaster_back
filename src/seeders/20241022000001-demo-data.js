'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Insertar categorías de ejemplo para tienda de ropa
    await queryInterface.bulkInsert('Categories', [
      {
        name: 'Hombre',
        description: 'Ropa y accesorios para hombre',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Mujer',
        description: 'Ropa y accesorios para mujer',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Niños',
        description: 'Ropa infantil y juvenil',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Calzado',
        description: 'Zapatos y zapatillas para toda la familia',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Accesorios',
        description: 'Complementos y accesorios de moda',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});

    // Obtener los IDs de las categorías
    const categories = await queryInterface.sequelize.query(
      'SELECT id, name FROM Categories;',
      { type: Sequelize.QueryTypes.SELECT }
    );

    const menId = categories.find(c => c.name === 'Hombre').id;
    const womenId = categories.find(c => c.name === 'Mujer').id;
    const kidsId = categories.find(c => c.name === 'Niños').id;
    const shoesId = categories.find(c => c.name === 'Calzado').id;
    const accessoriesId = categories.find(c => c.name === 'Accesorios').id;

    // Insertar productos de ejemplo
    await queryInterface.bulkInsert('Products', [
      // Ropa de Hombre
      {
        name: 'Camisa Formal Blanca',
        categoryId: menId,
        price: 45.99,
        stock: 50,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Pantalón Chino Beige',
        categoryId: menId,
        price: 55.00,
        stock: 40,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Polo Deportivo',
        categoryId: menId,
        price: 28.99,
        stock: 65,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Jeans Clásico Azul Oscuro',
        categoryId: menId,
        price: 65.00,
        stock: 55,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      // Ropa de Mujer
      {
        name: 'Blusa Estampada',
        categoryId: womenId,
        price: 38.50,
        stock: 70,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Vestido Casual Negro',
        categoryId: womenId,
        price: 75.00,
        stock: 45,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Pantalón Skinny Fit',
        categoryId: womenId,
        price: 52.99,
        stock: 60,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Falda Midi Plisada',
        categoryId: womenId,
        price: 42.00,
        stock: 35,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      // Ropa de Niños
      {
        name: 'Camiseta Infantil con Estampado',
        categoryId: kidsId,
        price: 18.99,
        stock: 80,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Pantalón Deportivo Niño',
        categoryId: kidsId,
        price: 25.50,
        stock: 70,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Vestido Infantil Floral',
        categoryId: kidsId,
        price: 32.00,
        stock: 50,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      // Calzado
      {
        name: 'Zapatillas Deportivas Unisex',
        categoryId: shoesId,
        price: 89.99,
        stock: 100,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Zapatos Formales Hombre',
        categoryId: shoesId,
        price: 95.00,
        stock: 35,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Sandalias Mujer',
        categoryId: shoesId,
        price: 45.50,
        stock: 60,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Botas Chelsea',
        categoryId: shoesId,
        price: 120.00,
        stock: 25,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      // Accesorios
      {
        name: 'Cinturón de Cuero',
        categoryId: accessoriesId,
        price: 28.99,
        stock: 90,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Gorra Deportiva',
        categoryId: accessoriesId,
        price: 22.50,
        stock: 75,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Bufanda de Invierno',
        categoryId: accessoriesId,
        price: 18.00,
        stock: 55,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Bolso de Mano',
        categoryId: accessoriesId,
        price: 65.00,
        stock: 40,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    // Eliminar productos primero (por la foreign key)
    await queryInterface.bulkDelete('Products', null, {});
    // Luego eliminar categorías
    await queryInterface.bulkDelete('Categories', null, {});
  }
};
