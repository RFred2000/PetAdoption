export interface ShelterInfo {
    id: number;
    name: string;
    email: string;
    phone: string;
    animals: string;
}

export interface PetInfo {
    id: number;
    species: string;
    name: string;
    breed: string;
    color: string;
    imageURL: string;
    shelter: ShelterInfo;
}

export interface Favorite {
    id: number;
    userId: string;
    petId: number;
    pet: PetInfo;
}

export interface AttributeCallback {
    (input: Array<PetInfo>): void
}