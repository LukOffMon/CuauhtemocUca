import { test } from 'node:test';
import assert from 'node:assert/strict';
import crypto from 'node:crypto';
import { initCrypto, encrypt, decrypt, blindIndex, needsReencrypt } from '../src/security/crypto.js';

const k = () => crypto.randomBytes(32).toString('base64');

test('cifra y descifra con AES-256-GCM', () => {
  initCrypto({ dataKeyId: 'k1', dataKey: k(), dataKeysOld: '', blindIndexKey: k() });
  const c = encrypt('Calificación: 95', 'tasks:1:data');
  assert.notEqual(c, 'Calificación: 95');
  assert.ok(!c.includes('95'));
  assert.equal(decrypt(c, 'tasks:1:data'), 'Calificación: 95');
});

test('cada cifrado usa un IV distinto', () => {
  assert.notEqual(encrypt('hola', 'a'), encrypt('hola', 'a'));
});

test('falla si el AAD no coincide (no se puede mover un dato a otro usuario)', () => {
  const c = encrypt('nota privada', 'user_data:1:notes');
  assert.throws(() => decrypt(c, 'user_data:2:notes'));
});

test('falla si el texto cifrado fue alterado', () => {
  const c = encrypt('dato', 'x').split('.');
  c[4] = Buffer.from('otra cosa').toString('base64url');
  assert.throws(() => decrypt(c.join('.'), 'x'));
});

test('rotación de claves: descifra con la clave anterior', () => {
  const old = k();
  initCrypto({ dataKeyId: 'k0', dataKey: old, dataKeysOld: '', blindIndexKey: k() });
  const c = encrypt('viejo', 'x');
  initCrypto({ dataKeyId: 'k1', dataKey: k(), dataKeysOld: `k0:${old}`, blindIndexKey: k() });
  assert.equal(decrypt(c, 'x'), 'viejo');
  assert.equal(needsReencrypt(c), true);
});

test('índice ciego determinista', () => {
  assert.equal(blindIndex('a@b.mx'), blindIndex('a@b.mx'));
  assert.notEqual(blindIndex('a@b.mx'), blindIndex('c@b.mx'));
});

test('rechaza claves de tamaño incorrecto', () => {
  assert.throws(() => initCrypto({ dataKeyId: 'k1', dataKey: 'corta', dataKeysOld: '', blindIndexKey: k() }));
});
