import { readFileSync } from 'fs';
import { Offer } from '../../types/offer.type.js';
import { FileReaderInterface } from './file-reader.interface.js';

export default class TSVFileReader implements FileReaderInterface {
  private rawData = '';

  constructor(public filename: string) {}

  public read(): void {
    this.rawData = readFileSync(this.filename, { encoding: 'utf8' });
  }

  public toArray(): Offer[] {
    if (!this.rawData) {
      return [];
    }

    return this.rawData
      .split('\n')
      .filter((row) => row.trim() !== '')
      .map((line) => line.split('\t'))
      .map(([bedrooms, cityLatitude, cityLongitude, cityZoom, cityName, description, goods, hostAvatar, hostId, hostStatus, hostName, offerId, images, isFavorite, isPremium, offerLatitude, offerLongitude, offerZoom, maxAdults, previewImage, price, rating, title, type]) => ({
        bedrooms: Number(bedrooms),
        city: {
          name: cityName,
          location: {
            latitude: Number(cityLatitude),
            longitude: Number(cityLongitude),
            zoom: Number(cityZoom)
          }
        },
        description: description,
        goods: [goods],
        host: {
          avatarUrl: hostAvatar,
          id: Number(hostId),
          isPro: Boolean(hostStatus),
          name: hostName
        },
        id: Number(offerId),
        images: [images],
        isFavorite: Boolean(isFavorite),
        isPremium: Boolean(isPremium),
        location: {
          latitude: Number(offerLatitude),
          longitude: Number(offerLongitude),
          zoom: Number(offerZoom)
        },
        maxAdults: Number(maxAdults),
        previewImage,
        price: Number(price),
        rating: Number(rating),
        title,
        type
      }));
  }
}