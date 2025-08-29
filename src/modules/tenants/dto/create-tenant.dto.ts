export class CreateTenantDto {
  uuid: string;
  name: string;
  email: string;
  phone?: string;
  document?: string;
  logo?: string;
}
