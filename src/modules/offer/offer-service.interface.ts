import { DocumentType } from '@typegoose/typegoose';
import { OfferEntity } from './offer.entity.js';
import CreateOfferDto from './dto/create-offer.dto.js';
import UpdateOfferDto from './dto/update-offer.dto.js';
import { DocumentExistsInterface } from '../../types/document-exists.interface.js';

export interface OfferServiceInterface extends DocumentExistsInterface {
  exists(offerId: string): Promise<boolean>;
  hasOwnOffer(offerId: string, userId: string): Promise<boolean>;
	create(dto: CreateOfferDto): Promise<DocumentType<OfferEntity>>;
  updateById(offerId: string, dto: UpdateOfferDto, userId?: string): Promise<void>;
  deleteById(offerId: string): Promise<DocumentType<OfferEntity> | null>;
  find(count?: string): Promise<DocumentType<OfferEntity>[]>;
	findById(offerId: string, userId?: string): Promise<DocumentType<OfferEntity> | null>;
  findPremiums(count: number, city?: string): Promise<DocumentType<OfferEntity>[]>;
  findFavorites(userId?: string): Promise<DocumentType<OfferEntity>[]>;
  calcRank(offerId: string): Promise<number>;
}
