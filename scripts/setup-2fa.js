import { authenticator } from 'otplib';
import QRCode from 'qrcode';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function setup2FA() {
  // 2. Gerar um segredo aleatório
  const secret = authenticator.generateSecret();
  
  // 3. Imprimir o segredo no terminal
  console.log('\n======================================================');
  console.log('SEGREDO GERADO — copia isto para ADMIN_TOTP_SECRET no .env:');
  console.log(secret);
  console.log('======================================================\n');
  
  // 4. Gerar um QR code a partir de uma "otpauth URL"
  const accountName = 'Admin AbybySita';
  const serviceName = 'AbybySita';
  const otpauth = authenticator.keyuri(accountName, serviceName, secret);
  
  // 5. Guardar como ficheiro PNG
  const qrPath = path.join(__dirname, 'qr-2fa-setup.png');
  await QRCode.toFile(qrPath, otpauth);
  
  // 6. Imprimir instruções
  console.log(`QR code guardado em scripts/qr-2fa-setup.png`);
  console.log(`— abre a app Google Authenticator no telemóvel e digitaliza este ficheiro.`);
  console.log(`Depois apaga o ficheiro PNG por segurança.\n`);
}

setup2FA().catch(console.error);
