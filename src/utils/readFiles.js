const fs = require('fs').promises;
const path = require('path');

const readFile = async () => {
 try {
    const caminhoRelativo = '../talker.json';
    const caminho = path.join(__dirname, caminhoRelativo);
    const talkers = await fs.readFile(caminho, 'utf-8');
    const result = JSON.parse(talkers);
    return result
 } catch (error) {
    console.log(`Arquivo não pode ser lido, erro: ${error}`);
 }
};

module.exports = {
    readFile,
};
