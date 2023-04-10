"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerRoutes = void 0;
const lambert_server_1 = require("lambert-server");
const DEFAULT_FILTER = /^([^\.].*)(?<!\.d)\.(js)$/;
function registerRoutes(server, root) {
    return lambert_server_1.traverseDirectory({ dirname: root, recursive: true, filter: DEFAULT_FILTER }, server.registerRoute.bind(server, root));
}
exports.registerRoutes = registerRoutes;
//# sourceMappingURL=TraverseDirectory.js.map