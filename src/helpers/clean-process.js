import {execSync} from 'child_process';

export const cleanProcess = (server) => {
    process.once('SIGINT', () => shutdown(server))
    process.once('SIGTERM', () => shutdown(server))
    process.once('uncaughtException', () => {
        execSync(
            `fuser -k ${process.env.PORT}/tcp || echo '---'`, // fuser exits with 1 when no process has been killed
            {stdio: ['ignore', 'pipe', 'ignore']}, // https://nodejs.org/api/child_process.html#child_process_options_stdio
        )
    })
}
export const shutdown = (server) => {
    server.close(() => {
        console.debug('HTTP server closed')
    })
    process.exit(0);
}
