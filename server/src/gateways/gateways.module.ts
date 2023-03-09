import { Module } from '@nestjs/common';
import { ProjectGateway } from './project/project.gateway';

@Module({
    imports: [],
    providers: [ProjectGateway]
})
export class GatewaysModule {
    
}
