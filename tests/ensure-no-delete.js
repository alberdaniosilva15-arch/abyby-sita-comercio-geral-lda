import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Procurar nos ficheiros de rotas por QUALQUER ocorrência de .delete(
const routesDir = path.join(__dirname, '../server/routes');
const files = fs.readdirSync(routesDir).filter(f => f.endsWith('.ts'));

let hasError = false;

for (const file of files) {
  const content = fs.readFileSync(path.join(routesDir, file), 'utf-8');
  
  // Regex simples e implacável: qualquer invocação de .delete(
  // Isto apanha router.delete( , app.delete( , e .route(...).delete(
  // E cobre rotas aninhadas como .delete('/:id')
  const deleteRegex = /\.delete\s*\(/i;
  
  if (deleteRegex.test(content)) {
    console.error(`\n[ERRO CRÍTICO DE SEGURANÇA] Encontrada uma rota HTTP DELETE no ficheiro ${file}.`);
    console.error(`O sistema foi desenhado com uma política restrita de SOFT-DELETE (arquivar em vez de apagar).`);
    console.error(`Isto aplica-se a Vagas (is_active = false) e a Candidaturas (status = 'Arquivado').`);
    console.error(`A eliminação física viola a restrição ON DELETE RESTRICT na base de dados de produção e causa perda de histórico.`);
    console.error(`Por favor remova a rota DELETE e utilize PATCH/PUT!\n`);
    hasError = true;
  }
}

if (hasError) {
  process.exit(1);
} else {
  console.log('✅ Teste de segurança (Soft-Delete) passou: Nenhuma rota DELETE (hard-delete) encontrada.');
  process.exit(0);
}
