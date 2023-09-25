import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cep'
})
export class CepPipe implements PipeTransform {

  transform(value: any): string {
    if (typeof value !== 'string') {
      throw new Error('O valor fornecido não é uma string.');
    }

    const numericValue = value.replace(/\D/g, '');

    if (numericValue.length !== 8) {
      throw new Error('CEP inválido.');
    }

    const formattedCep = `${numericValue.substring(0, 2)}.${numericValue.substring(2, 5)}-${numericValue.substring(5, 8)}`;
    return formattedCep;
  }

}
