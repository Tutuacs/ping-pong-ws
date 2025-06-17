"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateSseDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_sse_dto_1 = require("./create-sse.dto");
class UpdateSseDto extends (0, mapped_types_1.PartialType)(create_sse_dto_1.CreateSseDto) {
}
exports.UpdateSseDto = UpdateSseDto;
//# sourceMappingURL=update-sse.dto.js.map