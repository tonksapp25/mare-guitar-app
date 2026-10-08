(() => {
  'use strict';
  const KEY = 'gitarska-pustolovina-ulaz';
  const ROUNDS = 80000;
  const SALT = bytes('e37e998e42a3cf6d9637ce290e6022a6');
  const CHECK = bytes('5469498add51fe415906bad170d26cefbd315f4d96faa41353156b634d294a59');

  function bytes(hex) {
    const out = new Uint8Array(hex.length / 2);
    for (let i = 0; i < out.length; i++) out[i] = parseInt(hex.substr(i * 2, 2), 16);
    return out;
  }
  function rotr(x, n) { return (x >>> n) | (x << (32 - n)); }
  function sha256(data) {
    const K = new Uint32Array([
      0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5, 0x3956c25b, 0x59f111f1, 0x923f82a4, 0xab1c5ed5,
      0xd807aa98, 0x12835b01, 0x243185be, 0x550c7dc3, 0x72be5d74, 0x80deb1fe, 0x9bdc06a7, 0xc19bf174,
      0xe49b69c1, 0xefbe4786, 0x0fc19dc6, 0x240ca1cc, 0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da,
      0x983e5152, 0xa831c66d, 0xb00327c8, 0xbf597fc7, 0xc6e00bf3, 0xd5a79147, 0x06ca6351, 0x14292967,
      0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13, 0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85,
      0xa2bfe8a1, 0xa81a664b, 0xc24b8b70, 0xc76c51a3, 0xd192e819, 0xd6990624, 0xf40e3585, 0x106aa070,
      0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5, 0x391c0cb3, 0x4ed8aa4a, 0x5b9cca4f, 0x682e6ff3,
      0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208, 0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2
    ]);
    const h = new Uint32Array([
      0x6a09e667, 0xbb67ae85, 0x3c6ef372, 0xa54ff53a, 0x510e527f, 0x9b05688c, 0x1f83d9ab, 0x5be0cd19
    ]);
    const bitLen = data.length * 8;
    const padded = new Uint8Array((((data.length + 9 + 63) >> 6) << 6));
    padded.set(data);
    padded[data.length] = 0x80;
    const view = new DataView(padded.buffer);
    view.setUint32(padded.length - 8, Math.floor(bitLen / 0x100000000), false);
    view.setUint32(padded.length - 4, bitLen >>> 0, false);
    const w = new Uint32Array(64);
    for (let i = 0; i < padded.length; i += 64) {
      for (let t = 0; t < 16; t++) w[t] = view.getUint32(i + t * 4, false);
      for (let t = 16; t < 64; t++) {
        const s0 = rotr(w[t - 15], 7) ^ rotr(w[t - 15], 18) ^ (w[t - 15] >>> 3);
        const s1 = rotr(w[t - 2], 17) ^ rotr(w[t - 2], 19) ^ (w[t - 2] >>> 10);
        w[t] = (w[t - 16] + s0 + w[t - 7] + s1) >>> 0;
      }
      let a = h[0], b = h[1], c = h[2], d = h[3], e = h[4], f = h[5], g = h[6], hh = h[7];
      for (let t = 0; t < 64; t++) {
        const S1 = rotr(e, 6) ^ rotr(e, 11) ^ rotr(e, 25);
        const ch = (e & f) ^ (~e & g);
        const t1 = (hh + S1 + ch + K[t] + w[t]) >>> 0;
        const S0 = rotr(a, 2) ^ rotr(a, 13) ^ rotr(a, 22);
        const maj = (a & b) ^ (a & c) ^ (b & c);
        const t2 = (S0 + maj) >>> 0;
        hh = g; g = f; f = e; e = (d + t1) >>> 0; d = c; c = b; b = a; a = (t1 + t2) >>> 0;
      }
      h[0] = (h[0] + a) >>> 0; h[1] = (h[1] + b) >>> 0; h[2] = (h[2] + c) >>> 0; h[3] = (h[3] + d) >>> 0;
      h[4] = (h[4] + e) >>> 0; h[5] = (h[5] + f) >>> 0; h[6] = (h[6] + g) >>> 0; h[7] = (h[7] + hh) >>> 0;
    }
    const out = new Uint8Array(32);
    const ov = new DataView(out.buffer);
    for (let i = 0; i < 8; i++) ov.setUint32(i * 4, h[i], false);
    return out;
  }
  function hmac(key, msg) {
    const block = 64;
    const k = key.length > block ? sha256(key) : key;
    const kip = new Uint8Array(block);
    const kop = new Uint8Array(block);
    kip.set(k);
    kop.set(k);
    for (let i = 0; i < block; i++) { kip[i] ^= 0x36; kop[i] ^= 0x5c; }
    const inner = new Uint8Array(block + msg.length);
    inner.set(kip);
    inner.set(msg, block);
    const ih = sha256(inner);
    const outer = new Uint8Array(block + 32);
    outer.set(kop);
    outer.set(ih, block);
    return sha256(outer);
  }
  function pbkdf2(password, salt, iterations) {
    const block = new Uint8Array(salt.length + 4);
    block.set(salt);
    block[salt.length + 3] = 1;
    let u = hmac(password, block);
    const t = new Uint8Array(u);
    for (let i = 1; i < iterations; i++) {
      u = hmac(password, u);
      for (let j = 0; j < 32; j++) t[j] ^= u[j];
    }
    return t;
  }
  function same(a, b) {
    let diff = a.length ^ b.length;
    const n = Math.max(a.length, b.length);
    for (let i = 0; i < n; i++) diff |= (a[i] || 0) ^ (b[i] || 0);
    return diff === 0;
  }
  async function stretch(password) {
    const pw = new TextEncoder().encode(password);
    try {
      if (crypto.subtle) {
        const key = await crypto.subtle.importKey('raw', pw, 'PBKDF2', false, ['deriveBits']);
        const bits = await crypto.subtle.deriveBits({
          name: 'PBKDF2', salt: SALT, iterations: ROUNDS, hash: 'SHA-256'
        }, key, 256);
        return new Uint8Array(bits);
      }
    } catch (err) {}
    return pbkdf2(pw, SALT, ROUNDS);
  }

  const form = document.getElementById('gate-form');
  if (!form || document.documentElement.classList.contains('gate-open')) return;
  const input = document.getElementById('gate-pass');
  const error = document.getElementById('gate-error');
  const button = form.querySelector('button');
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (form.dataset.busy === '1') return;
    form.dataset.busy = '1';
    button.disabled = true;
    const label = button.textContent;
    button.textContent = 'Provjeravam…';
    let ok = false;
    try { ok = same(await stretch((input.value || '').trim()), CHECK); } catch (err) { ok = false; }
    button.disabled = false;
    button.textContent = label;
    form.dataset.busy = '';
    if (ok) {
      try { localStorage.setItem(KEY, '1'); } catch (err) {}
      error.hidden = true;
      input.value = '';
      document.documentElement.classList.add('gate-open');
    } else {
      error.hidden = false;
      input.value = '';
      input.focus();
    }
  });
  input.focus();
})();
