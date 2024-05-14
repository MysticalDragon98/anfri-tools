export default function get0xArg (pos: number) {
    return process.argv.slice(2)[pos];
}