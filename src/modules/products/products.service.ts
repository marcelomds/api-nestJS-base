import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  // Injetando os repositórios (Exemplo usando TypeORM)
  constructor(
    private readonly productRepository: any, // Substitua pelo seu Repository real
    private readonly categoryRepository: any, // Repositório da relação que causará o N+1
  ) {}

  create(createProductDto: CreateProductDto) {
    return 'This action adds a new product';
  }

  // ⚠️ MÉTODO COM PROBLEMA N+1
  async findAll() {
    // 1ª Consulta (O "1" do N+1): Busca todos os produtos do banco
    const products = await this.productRepository.find();

    // Consultas extras (O "N" do N+1):
    // Para cada produto da lista, o código faz um novo SELECT individual no banco
    const productsWithCategory = await Promise.all(
      products.map(async (product) => {
        // Dispara uma query por produto: SELECT * FROM category WHERE id = product.categoryId
        const category = await this.categoryRepository.findOne({
          where: { id: product.categoryId },
        });

        return {
          ...product,
          category, // Anexa a categoria ao produto
        };
      }),
    );

    return productsWithCategory;
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
    // ainda testando
  }
}
