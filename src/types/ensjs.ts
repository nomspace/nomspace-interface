// NOTE: Handwritten types. Is not a complete list.
// Refer to https://github.com/ensdomains/ensjs/blob/master/src/index.js if needed
export type ENSJS = {
  name: (name: string) => Name;

  // Reverse DNS
  getName: (address: string) => Promise<{ name: string | null }>;
};

export type Name = {
  // Useful
  getAddress: (coinId?: string) => Promise<string>;

  // Probably not used
  getOwner: () => Promise<string>;
  getResolver: () => Promise<string>;
  getTTL: () => Promise<string>;
  getResolverAddr: () => Promise<string>;
  getContent: () => Promise<string>;
  getText: (key: string) => Promise<string>;
};
