import {
    Controller,
    Get,
    Post,
    Body,
} from '@nestjs/common';
import {
    StoreDialCodeDto,
} from './dto/student.dto';
import { CountryCodeService } from './countrycode.service';

@Controller('code')
export class CountryDialcodeController {
    constructor(private readonly countryService: CountryCodeService) { }
    @Post('store')
    async storeCountryDailCode() {
        return this.countryService.storeCountryDailCode();
    }

    @Get('/')
    async findAll() {
        return this.countryService.findAll();
    }

    @Get('/:dialcode')
    async findOne() {
        return this.countryService.findSingle();
    }
}



