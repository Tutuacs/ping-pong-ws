import { CreateSseDto } from './dto/create-sse.dto';
import { UpdateSseDto } from './dto/update-sse.dto';
export declare class SseService {
    create(createSseDto: CreateSseDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateSseDto: UpdateSseDto): string;
    remove(id: number): string;
}
