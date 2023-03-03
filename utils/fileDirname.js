import { dirname } from "path";
import { fileURLToPath } from "url";

export default function fileDirname(meta) {
    const __filename = fileURLToPath(meta.url);
    const __dirname = dirname(__filename);
    
    return { __dirname, __filename}
}