import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PrismaClient } from '@prisma/client';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: 'dputhhzyb',
  api_key: '645242162575664',
  api_secret: 'hXQFGVBItNRiiJ7DPD_8B4Avmew',
});

@Injectable()
export class PostService {
  async create(createPostDto: CreatePostDto) {
    const { title, description, image, postScope } = createPostDto;
    const { secure_url } = await cloudinary.uploader.upload(image[0]);
    const {
      architecture,
      civilEngineering,
      industrialEngineering,
      systemsEngineering,
    } = postScope;

    const prisma = new PrismaClient();

    const response = await prisma.post.create({
      include: {
        postScope: true,
      },
      data: {
        title,
        description,
        image: [secure_url],
        postScope: {
          create: {
            architecture,
            civilEngineering,
            industrialEngineering,
            systemsEngineering,
          },
        },
      },
    });

    return response;
  }

  findAll() {
    return `This action returns all post`;
  }

  findOne(id: number) {
    return `This action returns a #${id} post`;
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    updatePostDto;
    return `This action updates a #${id} post`;
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }
}
