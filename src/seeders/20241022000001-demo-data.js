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
      'SELECT id, name FROM "Categories";',
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
        imageUrl: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=500',
        size: 'M',
        color: 'Blanco',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Pantalón Chino Beige',
        categoryId: menId,
        price: 55.00,
        stock: 40,
        imageUrl: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=500',
        size: 'L',
        color: 'Beige',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Polo Deportivo',
        categoryId: menId,
        price: 28.99,
        stock: 65,
        imageUrl: 'https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=500',
        size: 'M',
        color: 'Azul Marino',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Jeans Clásico Azul Oscuro',
        categoryId: menId,
        price: 65.00,
        stock: 55,
        imageUrl: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=500',
        size: '32',
        color: 'Azul Oscuro',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      // Ropa de Mujer
      {
        name: 'Blusa Estampada',
        categoryId: womenId,
        price: 38.50,
        stock: 70,
        imageUrl: 'https://images.unsplash.com/photo-1564584217132-2271feaeb3c5?w=500',
        size: 'S',
        color: 'Floral',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Vestido Casual Negro',
        categoryId: womenId,
        price: 75.00,
        stock: 45,
        imageUrl: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=500',
        size: 'M',
        color: 'Negro',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Pantalón Skinny Fit',
        categoryId: womenId,
        price: 52.99,
        stock: 60,
        imageUrl: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=500',
        size: 'M',
        color: 'Negro',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Falda Midi Plisada',
        categoryId: womenId,
        price: 42.00,
        stock: 35,
        imageUrl: 'https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=500',
        size: 'S',
        color: 'Rosa',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      // Ropa de Niños
      {
        name: 'Camiseta Infantil con Estampado',
        categoryId: kidsId,
        price: 18.99,
        stock: 80,
        imageUrl: 'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=500',
        size: '8-10',
        color: 'Multicolor',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Pantalón Deportivo Niño',
        categoryId: kidsId,
        price: 25.50,
        stock: 70,
        imageUrl: 'https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?w=500',
        size: '10-12',
        color: 'Gris',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Vestido Infantil Floral',
        categoryId: kidsId,
        price: 32.00,
        stock: 50,
        imageUrl: 'https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?w=500',
        size: '6-8',
        color: 'Floral',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      // Calzado
      {
        name: 'Zapatillas Deportivas Unisex',
        categoryId: shoesId,
        price: 89.99,
        stock: 100,
        imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500',
        size: '42',
        color: 'Blanco/Negro',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Zapatos Formales Hombre',
        categoryId: shoesId,
        price: 95.00,
        stock: 35,
        imageUrl: 'https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?w=500',
        size: '41',
        color: 'Negro',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Sandalias Mujer',
        categoryId: shoesId,
        price: 45.50,
        stock: 60,
        imageUrl: 'https://images.unsplash.com/photo-1603487742131-4160ec999306?w=500',
        size: '38',
        color: 'Marrón',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Botas Chelsea',
        categoryId: shoesId,
        price: 120.00,
        stock: 25,
        imageUrl: 'https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=500',
        size: '43',
        color: 'Café',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      // Accesorios
      {
        name: 'Cinturón de Cuero',
        categoryId: accessoriesId,
        price: 28.99,
        stock: 90,
        imageUrl: 'https://images.unsplash.com/photo-1624222247344-550fb60583bb?w=500',
        size: 'Ajustable',
        color: 'Negro',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Gorra Deportiva',
        categoryId: accessoriesId,
        price: 22.50,
        stock: 75,
        imageUrl: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=500',
        size: 'Única',
        color: 'Gris',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Bufanda de Invierno',
        categoryId: accessoriesId,
        price: 18.00,
        stock: 55,
        imageUrl: 'https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?w=500',
        size: 'Única',
        color: 'Beige',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Bolso de Mano',
        categoryId: accessoriesId,
        price: 65.00,
        stock: 40,
        imageUrl: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=500',
        size: 'Mediano',
        color: 'Café',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Products', null, {});
    await queryInterface.bulkDelete('Categories', null, {});
  }
};
