const fs = require('fs').promises;
const path = require('path');

const writeFile = async (talker) => {
 try {
    const caminhoRelativo = '../talker.json';
    const caminho = path.join(__dirname, caminhoRelativo);
    await fs.writeFile(caminho, JSON.stringify(talker, null, 2));
 } catch (error) {
    console.log(`Os inputs não foram lidos: ${error}`);
 }
};

module.exports = {
    writeFile,
};
