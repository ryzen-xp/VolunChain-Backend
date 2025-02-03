import { AppDataSource } from '../data-source';
import { NFT } from '../entities/NFT';

class NFTService {
  private repository = AppDataSource.getRepository(NFT);

  async createNFT(data: {
    userId: string;
    organizationId: string;
    description: string;
  }): Promise<NFT> {
    const nft = this.repository.create({
      user: { id: data.userId },
      organization: { id: data.organizationId },
      description: data.description
    });
    
    return this.repository.save(nft);
  }

  async getNFTById(id: string): Promise<NFT | null> {
    return this.repository.findOne({
      where: { id },
      relations: ['user', 'organization']
    });
  }

  async getNFTsByUserId(userId: string): Promise<NFT[]> {
    return this.repository.find({
      where: { user: { id: userId } },
      relations: ['organization']
    });
  }
}

export default new NFTService();