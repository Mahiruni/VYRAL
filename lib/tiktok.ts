import crypto from 'node:crypto'
const algorithm='aes-256-gcm'
function key(){const raw=process.env.TIKTOK_TOKEN_ENCRYPTION_KEY;if(!raw) throw new Error('TIKTOK_TOKEN_ENCRYPTION_KEY is not configured');return crypto.createHash('sha256').update(raw).digest()}
export function encryptToken(value:string){const iv=crypto.randomBytes(12);const cipher=crypto.createCipheriv(algorithm,key(),iv);const encrypted=Buffer.concat([cipher.update(value,'utf8'),cipher.final()]);return `${iv.toString('base64url')}.${cipher.getAuthTag().toString('base64url')}.${encrypted.toString('base64url')}`}
export function decryptToken(value:string){const [iv,tag,data]=value.split('.');const decipher=crypto.createDecipheriv(algorithm,key(),Buffer.from(iv,'base64url'));decipher.setAuthTag(Buffer.from(tag,'base64url'));return Buffer.concat([decipher.update(Buffer.from(data,'base64url')),decipher.final()]).toString('utf8')}
