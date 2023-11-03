class HexEncodePlugin {
    apply(compiler) {
      compiler.hooks.emit.tap('HexEncodePlugin', compilation => {
        for (const fileName in compilation.assets) {
          if (fileName.endsWith('.js')) {
            const asset = compilation.assets[fileName];
            const source = asset.source(); // 获取压缩后的代码
            const hexString = Buffer.from(source, 'utf8').toString('hex'); // 将代码转换为十六进制字符串
            compilation.assets[fileName] = {
              source: () => hexString,
              size: () => hexString.length
            };
          }
        }
      });
    }
  }
  
  module.exports = HexEncodePlugin;