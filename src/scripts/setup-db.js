const { exec } = require('child_process');
const util = require('util');
const execPromise = util.promisify(exec);

async function setupDatabase() {
  console.log('🚀 Iniciando configuración de la base de datos...\n');

  try {
    console.log('📦 Paso 1: Creando la base de datos...');
    const { stdout: createOut, stderr: createErr } = await execPromise('npx sequelize-cli db:create');
    if (createOut) console.log(createOut);
    if (createErr && !createErr.includes('already exists')) {
      console.error(createErr);
    }

    console.log('\n📊 Paso 2: Ejecutando las migraciones...');
    const { stdout: migrateOut, stderr: migrateErr } = await execPromise('npx sequelize-cli db:migrate');
    if (migrateOut) console.log(migrateOut);
    if (migrateErr) console.error(migrateErr);

    console.log('\n✅ ¡Configuración completada exitosamente!');
    console.log('\n📋 Tablas creadas:');
    console.log('   - Categories');
    console.log('   - Products');
    console.log('\n La base de datos está lista para usar.');

  } catch (error) {
    console.error('\n❌ Error durante la configuración:', error.message);
    console.error('\n💡 Asegúrate de que:');
    console.error('   1. MySQL está corriendo');
    console.error('   2. Las credenciales en src/config/config.json son correctas');
    console.error('   3. El usuario tiene permisos para crear bases de datos');
    process.exit(1);
  }
}

setupDatabase();
