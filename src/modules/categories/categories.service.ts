import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoriesService {
  constructor(
    private readonly categoryRepository: any, // Substitua pelo seu Repository real
    private readonly productRepository: any, // Repositório da relação que causará o N+1
  ) {}

  create(createCategoryDto: CreateCategoryDto) {
    return 'This action adds a new category';
  }

  findAll() {
    return `This action returns all categories`;
  }

  findOne(id: number) {
    return `This action returns a #${id} category`;
  }

  // ⚠️ MÉTODO COM SQL INJECTION
  async findByName(name: string) {
    const query = `SELECT * FROM category WHERE name = '${name}'`;
    return await this.categoryRepository.query(query);
  }

  // ⚠️ MÉTODO COM PROBLEMA N+1
  async findAllWithProducts() {
    // 1ª Consulta (O "1" do N+1): busca todas as categorias
    const categories = await this.categoryRepository.find();

    // Consultas extras (O "N" do N+1): uma query por categoria
    const categoriesWithProducts = await Promise.all(
      categories.map(async (category) => {
        // Dispara uma query por categoria: SELECT * FROM product WHERE categoryId = category.id
        const products = await this.productRepository.find({
          where: { categoryId: category.id },
        });

        return {
          ...category,
          products,
        };
      }),
    );

    return categoriesWithProducts;
  }

  // ✅ MÉTODO CORRETO (join único, sem N+1, sem injection)
  async findAllWithProductsFixed() {
    return await this.categoryRepository.find({
      relations: ['products'],
    });
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return `This action updates a #${id} category`;
  }

  remove(id: number) {
    return `This action removes a #${id} category`;
  }
}
