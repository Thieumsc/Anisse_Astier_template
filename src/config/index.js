import PACKAGE from '../../package.json'
import path from 'path';
import { fileURLToPath } from 'url'
import YAML from 'yamljs'
import fs from 'fs'

// eslint-disable-next-line no-unused-vars
const {
    COMMIT = '1',
    URL_SERVE = 'localhost',
    PORT = 4280,
    NODE_ENV = 'dev',
} = process.env

// eslint-disable-next-line no-unused-vars
const {
    version = '',
    name = '',
    description = ''
} = PACKAGE
const __filename = fileURLToPath(import.meta.url);
const __dirnamea = path.dirname(__filename);
console.log(__filename,__dirnamea)
/**
 * getConfigInfo
 * @returns {{absolutePATH: string, directoryName: string}}
 */
export const getConfigInfo = () => {
    const absolutePATH = decodeURIComponent(path.dirname(new URL(import.meta.url).pathname))
console.log(decodeURIComponent(absolutePATH))
    return {
        absolutePATH:__dirnamea,
        directoryName: absolutePATH.split('/')[absolutePATH.split('/').length - 1]
    }
}

export const configInfo = getConfigInfo()
export const __dirname = configInfo.absolutePATH.replace(`/${configInfo.directoryName}`, '')
export const templateEmailPATH = __dirname.split("src")[0] + "template/email.html"
export const serviceName =/\//.test(__dirname)? __dirname.split('/')[__dirname.split('/').length - 1]:__dirname.split('\\')[__dirname.split('\\').length - 2]
console.log(serviceName,/\//.test(__dirname))
export const configYAML = YAML.load(`${configInfo.absolutePATH}/${NODE_ENV}.yaml`)
console.log(serviceName)
/**
 * loader: load and build configuration
 * @returns {*&{port: number, swagger: {projectInfo: {name: string, host: string, description, version}, yamlPaths: string[]}, jSend: {release: string, name: string, version}}}
 */
export const loader = function () {
    return {
        templateEmailPATH,
        swagger: swaggerConfig(),
        jSend: jSendConfig(),
        port: PORT,
        ...configYAML
    }
}

/**
 * jSendConfig
 * @returns {{release: string, name: string, version: string}}
 */
export const jSendConfig = () => {
    return { name: `${serviceName}-${name}`, version, release: COMMIT }
}

/**
 * swaggerConfig
 * @returns {{projectInfo: {name: string, host: string, description: string, version: string}, yamlPaths: unknown[]}}
 */
export const swaggerConfig = () => {
    const directorySpec = path.join(__dirname.split(serviceName)[0], `${serviceName}/spec/`)
    const files = fs.readdirSync(directorySpec)

    return {
        yamlPaths: files.map(f => directorySpec + f),
        projectInfo: {
            version, name: serviceName, description, host: `${URL_SERVE}:${PORT}`
        }
    }
}

export default loader
