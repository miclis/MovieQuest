// TO RUN: node -r esm .\rsa-init.js
import rsaWrapper from './rsa-wrapper';

const generator = new rsaWrapper();

generator.generate();
console.log('Keys generated...');
