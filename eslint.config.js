import { build } from "eslint-config-teppeis";

export default await build({ base: "node18", esm: true });
