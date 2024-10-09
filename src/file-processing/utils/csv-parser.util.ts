import { parse } from 'csv-parse';

export function parseCsv(fileBuffer: Buffer): Promise<any[]> {
  return new Promise((resolve, reject) => {
    const results = [];

    parse(fileBuffer, { delimiter: ';', columns: true, trim: true, encoding: 'utf8'  })
      .on('data', (row) => {
        const sanitizedRow = {
          name: String(row.name || '')
            .replace(/#\([^)]*\)/g, '')
            .replace(/[\u{1F600}-\u{1F64F}]/gu, '')
            .replace(/[\u200B-\u200D\uFEFF]/g, '')
            .normalize('NFKD')
            .replace(/[^\x20-\x7E]/g, '')
            .replace(/[^a-zA-Z0-9\s\-]/g, '')
            .trim(),
          price: parseFloat(row.price.replace('$', '')),
          expiration: String(row.expiration || '').trim(),
        };

        results.push(sanitizedRow);
      })
      .on('end', () => resolve(results))
      .on('error', (error) => reject(error));
  });
}

