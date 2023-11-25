export default class RemoveLicenseCompilerPlugin {
    apply(compiler) {
        compiler.hooks.run.tap('RemoveLicenseCompilerPlugin', (compilation) => {
            console.log('compilation', compilation);
        });
    }
}
