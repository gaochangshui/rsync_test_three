import cryptoJs from "crypto-js";

const key = cryptoJs.enc.Utf8.parse('chuangji12345678');
const iv = cryptoJs.enc.Utf8.parse('chuangji00000000');

export function Encrypt(word){
    let srcs,encrypted;
    srcs=cryptoJs.enc.Utf8.parse(word);
    encrypted=cryptoJs.AES.encrypt(srcs,key,{
        iv:iv,
        mode:cryptoJs.mode.ECB,
        padding:cryptoJs.pad.Pkcs7
    });
    return cryptoJs.enc.Base64.stringify(encrypted.ciphertext);
}