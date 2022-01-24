export class DnaNotValid extends Error {
  constructor(message?: string) {
    super(message || 'DNA not valid');
  }
}
