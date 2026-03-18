import Text "mo:core/Text";
import Map "mo:core/Map";
import Iter "mo:core/Iter";
import Array "mo:core/Array";
import Order "mo:core/Order";
import MixinStorage "blob-storage/Mixin";
import Storage "blob-storage/Storage";

actor {
  include MixinStorage();

  // Product type
  type Product = {
    id : Nat;
    name : Text;
    price : Text;
    category : Text;
    description : Text;
    image : Storage.ExternalBlob;
  };

  module Product {
    public func compare(product1 : Product, product2 : Product) : Order.Order {
      Nat.compare(product1.id, product2.id);
    };
  };

  // Stable persistent state - survives restarts
  stable var nextId = 1;
  stable let products = Map.empty<Nat, Product>();

  // Password hash for "Elora.inh" (should be securely hashed)
  let adminPasswordHash : Text = "Elora.inh";

  // Product Management
  public shared ({ caller }) func addProduct(name : Text, price : Text, category : Text, description : Text, image : Storage.ExternalBlob) : async Nat {
    let product : Product = {
      id = nextId;
      name;
      price;
      category;
      description;
      image;
    };

    products.add(nextId, product);
    nextId += 1;
    product.id;
  };

  public shared ({ caller }) func updateProduct(id : Nat, name : Text, price : Text, category : Text, description : Text, image : Storage.ExternalBlob) : async Bool {
    switch (products.get(id)) {
      case (null) { false };
      case (?_) {
        let product : Product = {
          id;
          name;
          price;
          category;
          description;
          image;
        };
        products.add(id, product);
        true;
      };
    };
  };

  public shared ({ caller }) func deleteProduct(id : Nat) : async Bool {
    if (products.containsKey(id)) {
      products.remove(id);
      true;
    } else {
      false;
    };
  };

  public query ({ caller }) func getProducts() : async [Product] {
    products.values().toArray().sort();
  };

  public query ({ caller }) func getFeaturedProducts() : async [Product] {
    products.values().toArray().sort().sliceToArray(0, 6);
  };

  public query ({ caller }) func getProductsByCategory(category : Text) : async [Product] {
    products.values().toArray().filter(
      func(product) {
        product.category == category;
      }
    ).sort();
  };

  public query ({ caller }) func checkAdminPassword(password : Text) : async Bool {
    password == adminPasswordHash;
  };
};
