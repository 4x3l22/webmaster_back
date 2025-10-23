const { exec } = require('child_process');
const util = require('util');
const execPromise = util.promisify(exec);

async function setupDatabase() {
  console.log('🚀 Iniciando configuración de Supabase...\n');

  try {
    console.log('� Ejecutando las migraciones en Supabase...');
    const { stdout: migrateOut, stderr: migrateErr } = await execPromise('npx sequelize-cli db:migrate');
    if (migrateOut) console.log(migrateOut);
    if (migrateErr) console.error(migrateErr);

    console.log('\n✅ ¡Configuración completada exitosamente!');
    console.log('\n📋 Tablas creadas en Supabase:');
    console.log('   - Categories');
    console.log('   - Products');
    console.log('\n🎉 La base de datos está lista para usar.');

  } catch (error) {
    console.error('\n❌ Error durante la configuración:', error.message);
    console.error('\n💡 Asegúrate de que:');
    console.error('   1. Supabase está accesible');
    console.error('   2. Las credenciales en src/config/config.json son correctas');
    console.error('   3. La conexión SSL está configurada correctamente');
    process.exit(1);
  }
}

setupDatabase();
