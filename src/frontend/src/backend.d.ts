import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export class ExternalBlob {
    getBytes(): Promise<Uint8Array<ArrayBuffer>>;
    getDirectURL(): string;
    static fromURL(url: string): ExternalBlob;
    static fromBytes(blob: Uint8Array<ArrayBuffer>): ExternalBlob;
    withUploadProgress(onProgress: (percentage: number) => void): ExternalBlob;
}
export interface Product {
    id: bigint;
    name: string;
    description: string;
    category: string;
    image: ExternalBlob;
    price: string;
}
export interface backendInterface {
    addProduct(name: string, price: string, category: string, description: string, image: ExternalBlob): Promise<bigint>;
    checkAdminPassword(password: string): Promise<boolean>;
    deleteProduct(id: bigint): Promise<boolean>;
    getFeaturedProducts(): Promise<Array<Product>>;
    getProducts(): Promise<Array<Product>>;
    getProductsByCategory(category: string): Promise<Array<Product>>;
    updateProduct(id: bigint, name: string, price: string, category: string, description: string, image: ExternalBlob): Promise<boolean>;
}
